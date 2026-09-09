import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowUpRight, ShieldCheck, Star } from "@/components/ui/icons";
import { fiverr, guarantee } from "@/lib/site";

/**
 * "Also on Fiverr" — the marketplace shopfront.
 *
 * Some buyers would rather book a single scoped job through Fiverr's escrow
 * than sign an engagement, so the gigs are surfaced here as their own entry
 * point rather than buried in the footer. Every link, price and the seller
 * strip is read from `lib/site.ts`, so swapping in the real gig URLs is a
 * one-file edit.
 *
 * Fiverr's brand green is used only for the marketplace badge — the rest of
 * the section stays on the LLW palette so it reads as ours, not theirs.
 */

const FIVERR_GREEN = "#1dbf73";

export function Fiverr() {
  return (
    <section id="fiverr" className="scroll-mt-28 py-20 md:py-28">
      <div className="container-wide">
        <SectionHeading
          label="Also on Fiverr"
          title="Hire Us on Fiverr"
          align="between"
          description="Prefer a marketplace? The same team, the same code — booked as a single fixed-price gig, with Fiverr holding the payment until you approve the work."
          action={
            <ButtonLink
              href={fiverr.profile}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Fiverr Profile
            </ButtonLink>
          }
        />

        {/* ---- Seller strip ---- */}
        <Reveal direction="up" delay={0.08}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-[20px] bg-surface px-6 py-5 md:mt-12">
            <span
              className="font-display rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-white"
              style={{ backgroundColor: FIVERR_GREEN }}
            >
              Fiverr
            </span>

            {fiverr.sellerLevel ? (
              <span className="text-[15px] text-ink">{fiverr.sellerLevel}</span>
            ) : null}

            {fiverr.rating ? (
              <span className="flex items-center gap-1.5">
                {/* Fiverr renders its rating stars in the same brand green. */}
                <span
                  aria-hidden="true"
                  className="flex gap-0.5"
                  style={{ color: FIVERR_GREEN }}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-3.5" />
                  ))}
                </span>
                <span className="text-[15px] text-ink">
                  {fiverr.rating}
                  {fiverr.reviewCount ? (
                    <span className="text-ink-faint">
                      {" "}
                      ({fiverr.reviewCount} reviews)
                    </span>
                  ) : null}
                </span>
              </span>
            ) : null}

            <span className="ml-auto text-[14px] text-ink-soft">
              Payment held in escrow until you approve
            </span>
          </div>
        </Reveal>

        {/* ---- Gigs ---- */}
        <RevealGroup className="mt-5 grid gap-5 md:grid-cols-2">
          {fiverr.gigs.map((gig) => (
            <RevealItem key={gig.title}>
              <a
                href={gig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-8 rounded-[24px] bg-surface p-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 md:p-8"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="display max-w-[26ch] text-[22px] leading-[1.15] md:text-[24px]">
                      {gig.title}
                    </h3>
                    <ArrowUpRight className="mt-1 size-5 shrink-0 text-ink-faint transition-colors duration-300 group-hover:text-accent" />
                  </div>
                  <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-ink-soft">
                    {gig.blurb}
                  </p>
                </div>

                <dl className="flex items-end justify-between gap-6 border-t border-line pt-5">
                  <div>
                    <dt className="text-[13px] text-ink-faint">Delivery</dt>
                    <dd className="display mt-1.5 text-[20px] leading-none">
                      {gig.delivery}
                    </dd>
                  </div>
                  <div className="text-right">
                    <dt className="text-[13px] text-ink-faint">Starting at</dt>
                    <dd className="display mt-1.5 text-[28px] leading-none">
                      {gig.price}
                    </dd>
                  </div>
                </dl>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ---- Guarantee ---- */}
        <Reveal direction="up" delay={0.1}>
          <div className="relative mt-5 grid gap-8 overflow-hidden rounded-[24px] bg-night p-8 text-white md:grid-cols-[1.4fr_auto] md:items-center md:rounded-[32px] md:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-1/2 right-0 size-[460px] opacity-45"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,0.6) 0%, rgba(124,58,237,0) 70%)",
              }}
            />

            <div className="relative">
              <p className="flex items-center gap-2 text-[13px] tracking-wide text-white/60 uppercase">
                <ShieldCheck className="size-4" />
                Our promise
              </p>
              <h3 className="display mt-4 text-[30px] leading-none text-white md:text-[38px]">
                {guarantee.headline}
              </h3>
              <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-white/64 md:text-base">
                {guarantee.copy}
              </p>
            </div>

            <div className="relative">
              <ButtonLink href="/contact" variant="accent">
                Start a Project
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
