"use client";

import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { AvatarStack } from "@/components/ui/Avatar";
import { HeroPill } from "@/components/ui/Artwork";
import { Magnetic } from "@/components/ui/Magnetic";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Home hero.
 *
 * The headline mixes three treatments the way the reference does: solid ink,
 * an accent-coloured word, and an outlined "ghost" phrase — with small media
 * pills nested inline between words.
 */

const line = {
  hidden: { opacity: 0, y: 34 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: 0.15 + i * 0.09, ease: EASE_OUT_EXPO },
  }),
  /** Reduced motion: land on the final state with no transition. */
  static: { opacity: 1, y: 0, transition: { duration: 0 } },
};

/** Inline media pill sized to sit on the headline baseline. */
function Pill({ seed }: { seed: number }) {
  return (
    <HeroPill
      seed={seed}
      className="mx-1 h-[0.62em] w-[0.98em] translate-y-[0.03em] md:mx-2"
    />
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20"
    >
      {/* Soft radial wash behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgba(241,241,245,0.9) 0%, rgba(241,241,245,0) 100%)",
        }}
      />

      <div className="container-wide relative">
        {/* ---- Social proof ---- */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE_OUT_EXPO }}
          className="flex items-center justify-center gap-3"
        >
          <AvatarStack />
          <p className="text-[15px] text-ink-soft">Trusted by founders.</p>
        </motion.div>

        {/* ---- Headline ---- */}
        <h1 className="display mx-auto mt-6 max-w-[1160px] text-center text-[46px] leading-[0.94] sm:text-[68px] md:mt-8 md:text-[92px] lg:text-[104px]">
          <span className="sr-only">
            Websites built, fixed and ranked — from Mumbai, India.
          </span>

          <span aria-hidden="true" className="block">
            <motion.span
              custom={0}
              variants={line}
              initial="hidden"
              animate={reduceMotion ? "static" : "visible"}
              className="block"
            >
              Websites
              <Pill seed={0} />
              <span className="text-accent">Built</span>
            </motion.span>

            <motion.span
              custom={1}
              variants={line}
              initial="hidden"
              animate={reduceMotion ? "static" : "visible"}
              className="block"
            >
              <span className="display-outline">Fixed &amp;</span>
              <Pill seed={1} />
              Ranked
            </motion.span>

            <motion.span
              custom={2}
              variants={line}
              initial="hidden"
              animate={reduceMotion ? "static" : "visible"}
              className="block"
            >
              <span className="display-outline">from</span> Mumbai,
              <Pill seed={2} />
              India
            </motion.span>
          </span>
        </h1>

        {/* ---- Subcopy + CTA ---- */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.5, ease: EASE_OUT_EXPO }}
          className="mx-auto mt-7 max-w-[52ch] text-center text-[15px] leading-relaxed text-ink-soft md:mt-9 md:text-[17px]"
        >
          Custom sites built from scratch, broken ones fixed fast, and technical
          SEO that moves the needle — at honest prices, backed by a money-back
          guarantee.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.62, ease: EASE_OUT_EXPO }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10"
        >
          <Magnetic strength={0.2}>
            <ButtonLink href="/#pricing">View Plans</ButtonLink>
          </Magnetic>
          <Magnetic strength={0.2}>
            <ButtonLink href="/#fiverr" variant="outline">
              See Fiverr Gigs
            </ButtonLink>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
