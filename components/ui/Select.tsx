"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Check, Chevron } from "@/components/ui/icons";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Select — a custom listbox that matches the form's other fields.
 *
 * A native <select> renders the operating system's dropdown, which ignores
 * every style we set on it, so the menu looked nothing like the rest of the
 * site. This rebuilds the control out of a button plus a listbox we own, and
 * mirrors the APG select-only combobox pattern: focus never leaves the
 * trigger, and the active option is announced through `aria-activedescendant`.
 *
 * The chosen value rides along in a hidden input, so the form still reads it
 * from `FormData` exactly as it did with the native control.
 */

type SelectProps = {
  name: string;
  label: string;
  options: readonly string[];
  /** Shown in the value slot until the user picks something. */
  placeholder?: string;
};

export function Select({
  name,
  label,
  options,
  placeholder = "Select",
}: SelectProps) {
  const id = useId();
  const listboxId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;

  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  /** Index the keyboard is currently on — not necessarily the chosen one. */
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  /** Buffer for type-to-select, cleared after a short pause. */
  const typeahead = useRef({ query: "", timer: 0 });

  // Close when the click lands anywhere outside the control.
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the active option in view when arrowing through a scrolled list.
  useEffect(() => {
    if (!open) return;
    optionRefs.current[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function openAt(index: number) {
    setActive(Math.max(0, Math.min(index, options.length - 1)));
    setOpen(true);
  }

  function choose(index: number) {
    setSelected(options[index]);
    setActive(index);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function searchFrom(char: string) {
    window.clearTimeout(typeahead.current.timer);
    typeahead.current.query += char.toLowerCase();
    typeahead.current.timer = window.setTimeout(() => {
      typeahead.current.query = "";
    }, 600);

    const query = typeahead.current.query;
    const match = options.findIndex((option) =>
      option.toLowerCase().startsWith(query),
    );
    if (match === -1) return;

    if (open) setActive(match);
    else choose(match);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (open) setActive((index) => Math.min(index + 1, options.length - 1));
        else openAt(selected ? options.indexOf(selected) : 0);
        return;
      case "ArrowUp":
        event.preventDefault();
        if (open) setActive((index) => Math.max(index - 1, 0));
        else openAt(selected ? options.indexOf(selected) : 0);
        return;
      case "Home":
        if (!open) return;
        event.preventDefault();
        setActive(0);
        return;
      case "End":
        if (!open) return;
        event.preventDefault();
        setActive(options.length - 1);
        return;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) choose(active);
        else openAt(selected ? options.indexOf(selected) : 0);
        return;
      case "Escape":
        if (!open) return;
        event.preventDefault();
        setOpen(false);
        return;
      case "Tab":
        setOpen(false);
        return;
      default:
        // Single printable character starts (or extends) a type-ahead search.
        if (event.key.length === 1 && !event.metaKey && !event.ctrlKey) {
          event.preventDefault();
          searchFrom(event.key);
        }
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={selected ?? ""} />

      <span
        id={`${id}-label`}
        className="pointer-events-none absolute top-4 left-5 z-10 text-[13px] text-ink-faint"
      >
        {label}
      </span>

      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-activedescendant={open ? optionId(active) : undefined}
        onClick={() => (open ? setOpen(false) : openAt(selected ? options.indexOf(selected) : 0))}
        onKeyDown={onKeyDown}
        className={`w-full cursor-pointer rounded-2xl border bg-surface px-5 pt-7 pb-3 text-left text-[15px] outline-none transition-colors duration-300 ${
          open ? "border-ink" : "border-line hover:border-ink-faint"
        }`}
      >
        <span
          id={`${id}-value`}
          className={selected ? "text-ink" : "text-ink-faint"}
        >
          {selected ?? placeholder}
        </span>
      </button>

      <Chevron
        className={`pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-ink-faint transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "rotate-180" : ""
        }`}
      />

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-labelledby={`${id}-label`}
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{
              duration: reduceMotion ? 0 : 0.24,
              ease: EASE_OUT_EXPO,
            }}
            className="absolute top-[calc(100%+8px)] right-0 left-0 z-30 max-h-64 overflow-y-auto rounded-2xl border border-line bg-canvas p-1.5 shadow-[0_18px_44px_rgba(26,26,46,0.14)]"
          >
            {options.map((option, index) => {
              const isSelected = option === selected;
              const isActive = index === active;

              return (
                <li
                  key={option}
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  id={optionId(index)}
                  role="option"
                  aria-selected={isSelected}
                  onPointerEnter={() => setActive(index)}
                  onClick={() => choose(index)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[15px] transition-colors duration-150 ${
                    isActive ? "bg-surface text-accent" : "text-ink"
                  }`}
                >
                  {option}
                  {isSelected ? (
                    <span className="grid size-4 shrink-0 place-items-center rounded-full bg-accent text-white">
                      <Check className="size-2.5" />
                    </span>
                  ) : null}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
