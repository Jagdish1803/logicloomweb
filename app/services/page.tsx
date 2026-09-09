import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Pricing } from "@/components/sections/Pricing";
import { Fiverr } from "@/components/sections/Fiverr";
import { Faq } from "@/components/sections/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development from scratch, bug fixing, technical SEO and WordPress or Shopify work — scoped, priced and delivered without the drama.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Creative Services"
        title="Excellence Delivered"
        description="Build it, fix it, rank it. Four services that cover a website end to end — from the first wireframe to the day it outranks the competition."
        action={<ButtonLink href="/#pricing">View Plans</ButtonLink>}
      />
      <ServicesSection showPricing />
      <Pricing />
      <Fiverr />
      <Faq />
      <ContactSection />
    </>
  );
}
