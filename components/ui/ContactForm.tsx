"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Check } from "@/components/ui/icons";
import { services } from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

const serviceOptions = [
  ...services.map((service) => service.title),
  "Something else",
];

const fieldClass =
  "peer w-full rounded-2xl border border-line bg-surface px-5 pt-7 pb-3 text-[15px] " +
  "text-ink outline-none transition-colors duration-300 placeholder:text-transparent " +
  "focus:border-ink";

/**
 * Floating label. Rests over the field while empty, then shrinks to the top
 * on focus or once a value is present.
 *
 * `restClass` differs per control: single-line inputs centre the resting
 * label, textareas keep it near the top edge so it does not float in the
 * middle of a tall box.
 */
const labelClass =
  "pointer-events-none absolute left-5 top-4 text-[13px] text-ink-faint " +
  "transition-all duration-200 peer-placeholder-shown:text-[15px] " +
  "peer-focus:top-4 peer-focus:translate-y-0 peer-focus:text-[13px] peer-focus:text-accent";

const inputRestClass =
  "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2";

const textareaRestClass = "peer-placeholder-shown:top-5";

/**
 * Contact form with floating labels, inline validation and an optimistic
 * success state.
 *
 * There is no backend in this build, so submission is simulated. Swap the
 * `submit` body for a server action or API route to go live.
 */
export function ContactForm({
  withServiceField = false,
}: {
  withServiceField?: boolean;
}) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      nextErrors.email = "Enter a valid email address.";
    if (message.length < 10)
      nextErrors.message = "A little more detail helps — 10 characters minimum.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    // Placeholder for the real transport (server action, API route, CRM…).
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
    form.reset();
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <Field
        id={`${id}-name`}
        name="name"
        label="Your Name"
        autoComplete="name"
        error={errors.name}
      />
      <Field
        id={`${id}-email`}
        name="email"
        type="email"
        label="Your Email"
        autoComplete="email"
        error={errors.email}
      />

      {withServiceField ? (
        <Select
          name="service"
          label="What do you need from us?"
          options={serviceOptions}
        />
      ) : null}

      <Field
        id={`${id}-message`}
        name="message"
        label="Project Description"
        textarea
        error={errors.message}
      />

      <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? "Sending…" : "Send Now!"}
        </Button>

        <AnimatePresence>
          {status === "success" ? (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="flex items-center gap-2 text-[14px] text-ink-soft"
            >
              <span className="grid size-5 place-items-center rounded-full bg-accent text-white">
                <Check className="size-3" />
              </span>
              Thanks — we will be in touch within one working day.
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  textarea = false,
  error,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    placeholder: label,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    className: `${fieldClass} ${error ? "border-accent" : ""}`,
  } as const;

  return (
    <div className="relative">
      {textarea ? (
        <textarea {...shared} rows={5} className={`${shared.className} resize-none`} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}

      <label
        htmlFor={id}
        className={`${labelClass} ${textarea ? textareaRestClass : inputRestClass}`}
      >
        {label}
      </label>

      {error ? (
        <p id={errorId} className="mt-1.5 pl-1 text-[13px] text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
