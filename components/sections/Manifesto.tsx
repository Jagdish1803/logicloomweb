"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Marquee } from "@/components/ui/Marquee";
import { capabilityWords } from "@/lib/data";

/**
 * Large statement paragraph whose words brighten as the section scrolls
 * through the viewport — the reference site's scroll-linked text reveal.
 */
export function Manifesto({
  text = "We build websites from scratch, fix the ones that are already broken, and get both of them ranking — with clarity, speed, and no drama.",
}: {
  text?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");

  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <p className="eyebrow">( )</p>

        <div ref={ref} className="mt-6 md:mt-8">
          <p className="display text-[30px] leading-[1.15] tracking-[-0.02em] sm:text-[40px] md:text-[52px] lg:text-[60px]">
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
              {words.map((word, index) => (
                <Word
                  key={`${word}-${index}`}
                  progress={scrollYProgress}
                  range={[index / words.length, (index + 1.6) / words.length]}
                >
                  {word}
                </Word>
              ))}
            </span>
          </p>
        </div>
      </div>

      {/* Capability ticker */}
      <div className="mt-14 md:mt-20">
        <Marquee speed={26} fade>
          {capabilityWords.map((word) => (
            <span
              key={word}
              className="display flex items-center gap-6 pr-6 text-[40px] whitespace-nowrap text-ink md:gap-10 md:pr-10 md:text-[64px]"
            >
              {word}
              <span aria-hidden="true" className="text-accent">
                •
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}
