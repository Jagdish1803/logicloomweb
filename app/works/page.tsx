import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Works } from "@/components/sections/Works";
import { ContactSection } from "@/components/sections/ContactSection";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Selected branding, website and product work from the LLW studio.",
  alternates: { canonical: "/works" },
};

export default function WorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work In Action"
        title="Featured Work"
        description="We have helped businesses across industries achieve their goals. Here are some of our selected works."
        action={<ButtonLink href="/#pricing">View Plans</ButtonLink>}
      />
      <Works label="Portfolio" title="Recent Works" />
      <ContactSection />
    </>
  );
}
