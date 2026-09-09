"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";
import { stats, testimonials } from "@/lib/data";
import { EASE_OUT_EXPO } from "@/lib/motion";

const AUTOPLAY_MS = 6000;

/**
 * Dark stats + testimonial block.
 *
 * The quote carousel autoplays, pauses on hover/focus, and exposes explicit
 * dot controls with `aria-live` so screen-reader users are told when the
 * quote changes.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((current) => (current + 1) % testimonials.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, next]);

  const active = testimonials[index];

  return (
    <section className="relative overflow-hidden bg-night py-20 text-white md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[50vh] w-[110vw] -translate-x-1/2 opacity-45"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, rgba(124,58,237,0.5) 0%, rgba(124,58,237,0) 70%)",
        }}
      />

      <div className="container-wide relative">
        <SectionHeading
          label="Why clients love LLW"
          title="Testimonials"
          tone="dark"
        />

        {/* ---- Stats ---- */}
        <dl className="mt-14 grid gap-10 border-y border-white/12 py-12 sm:grid-cols-3 md:mt-20">
          {stats.map((stat, statIndex) => (
            <Reveal key={stat.label} direction="up" delay={statIndex * 0.08}>
              <div>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="display text-[48px] leading-none md:text-[72px]">
                  <Counter
                    to={stat.value}
                    prefix={stat.prefix ?? ""}
                    suffix={stat.suffix}
                  />
                </dd>
                <p className="mt-3 text-[15px] text-white/56">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </dl>

        {/* ---- Quote carousel ---- */}
        <div
          className="mt-14 md:mt-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <p className="text-[13px] text-white/40 tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </p>

          <div
            className="relative mt-6 min-h-[240px] sm:min-h-[220px] md:min-h-[240px]"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={active.author}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                <blockquote className="display max-w-[22ch] text-[30px] leading-[1.12] sm:max-w-[26ch] sm:text-[40px] md:text-[52px]">
                  “{active.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <Avatar seed={index + 1} initials={active.initials} size={44} />
                  <span>
                    <span className="block text-[15px] font-medium">
                      {active.author}
                    </span>
                    <span className="block text-[13px] text-white/48">
                      {active.role}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* ---- Dot controls ---- */}
          <div className="mt-8 flex gap-2">
            {testimonials.map((testimonial, dotIndex) => (
              <button
                key={testimonial.author}
                type="button"
                onClick={() => setIndex(dotIndex)}
                aria-label={`Show testimonial from ${testimonial.author}`}
                aria-current={dotIndex === index}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-400 ${
                  dotIndex === index
                    ? "w-10 bg-accent"
                    : "w-4 bg-white/24 hover:bg-white/48"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
