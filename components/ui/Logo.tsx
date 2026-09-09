import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
import { site } from "@/lib/site";

/**
 * Horizontal lockup — icon left, "LLW" wordmark right — for the navbar and
 * footer. The wordmark is a single letterform group set in the display face,
 * so the mark and type read as one object rather than a mark floating beside
 * small text. The `gap` doubles as the mandated clear space.
 */
export function Logo({
  tone = "dark",
  className = "",
}: {
  /** `dark` = brand ink on light ground; `light` = reversed on dark ground. */
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`inline-flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-70 md:gap-3 ${className}`}
    >
      <LogoMark
        tone={light ? "light" : "brand"}
        className="size-8 shrink-0 md:size-[35px]"
      />

      <span
        className={`font-display text-[22px] leading-none font-bold tracking-[-0.02em] md:text-[24px] ${
          light ? "text-white" : "text-brand"
        }`}
      >
        LLW
      </span>
    </Link>
  );
}
