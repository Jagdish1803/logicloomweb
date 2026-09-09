import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Founder } from "@/components/sections/Founder";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { Tools } from "@/components/sections/Tools";
import { Awards } from "@/components/sections/Awards";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ContactSection } from "@/components/sections/ContactSection";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Logic first, then craft — the web development, fixing and SEO studio behind LLW.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet LLW"
        title="Logic First, Then Craft"
        description="Structure the problem, then weave the interface around it. At LLW, every website starts as a system before it becomes a screen — and stays one long after launch."
        action={<ButtonLink href="/works">View Projects</ButtonLink>}
      />
      <Manifesto text="We build websites from scratch, fix the ones that are already broken, and get both of them ranking. Think clean code, honest pricing and fast turnarounds — from a small team in Mumbai that answers the same day." />
      <Founder />
      <TrustMarquee />
      <Tools />
      <CtaBanner />
      <Awards />
      <ContactSection />
    </>
  );
}
