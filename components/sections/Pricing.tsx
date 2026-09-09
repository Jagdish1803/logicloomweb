import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "@/components/ui/icons";
import { plans, type Plan } from "@/lib/data";

/**
 * Two-card pricing block. The featured plan inverts to the dark surface.
 */
export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-28 py-20 md:py-28">
      <div className="container-wide">
        <SectionHeading label="Pricing Plan" title="Explore Pricing" />

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} direction="up" delay={index * 0.1}>
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const dark = Boolean(plan.featured);

  return (
    <article
      className={`flex h-full flex-col justify-between gap-8 rounded-[24px] p-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 md:rounded-[32px] md:p-10 ${
        dark
          ? "relative overflow-hidden bg-night text-white"
          : "bg-surface text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
      }`}
    >
      {dark ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/3 right-0 size-[420px] opacity-45"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,0.6) 0%, rgba(124,58,237,0) 70%)",
          }}
        />
      ) : null}

      <div className="relative">
        <h3 className="display text-[28px] leading-none md:text-[32px]">
          {plan.name}
        </h3>
        <p
          className={`mt-4 max-w-[44ch] text-[15px] leading-relaxed ${
            dark ? "text-white/60" : "text-ink-soft"
          }`}
        >
          {plan.copy}
        </p>

        <div
          className={`mt-8 flex flex-wrap items-end justify-between gap-6 border-t pt-6 ${
            dark ? "border-white/12" : "border-line"
          }`}
        >
          <div>
            <p className={`text-[13px] ${dark ? "text-white/48" : "text-ink-faint"}`}>
              Delivery Time
            </p>
            <p className="display mt-1.5 text-[24px] leading-none">
              {plan.delivery}
            </p>
          </div>

          <div className="text-right">
            {plan.priceLabel ? (
              <p
                className={`text-[13px] ${dark ? "text-white/48" : "text-ink-faint"}`}
              >
                {plan.priceLabel}
              </p>
            ) : null}
            <p className="display mt-1.5 text-[40px] leading-none md:text-[48px]">
              {plan.price}
              {plan.cadence ? (
                <span
                  className={`ml-1 text-[15px] font-normal ${
                    dark ? "text-white/48" : "text-ink-faint"
                  }`}
                >
                  {plan.cadence}
                </span>
              ) : null}
            </p>
          </div>
        </div>

        <ul className="mt-8 space-y-3.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-[15px]">
              <span
                className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                  dark ? "bg-accent text-white" : "bg-ink text-white"
                }`}
              >
                <Check className="size-3" />
              </span>
              <span className={dark ? "text-white/76" : "text-ink-soft"}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ButtonLink
        href="/contact"
        variant={dark ? "accent" : "dark"}
        className="relative w-full"
      >
        Get Started
      </ButtonLink>
    </article>
  );
}
