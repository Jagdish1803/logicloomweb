import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { faqs } from "@/lib/data";

/**
 * FAQ block. Also emits FAQPage structured data so the questions are
 * eligible for rich results.
 */
export function Faq() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          label="FAQs"
          title="Your Questions, Answered"
          description="Helping you understand our process and offerings at LLW."
        />

        <div className="mt-12 md:mt-16">
          <Accordion items={faqs} />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </section>
  );
}
