import { Hero } from "@/components/sections/Hero";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { Manifesto } from "@/components/sections/Manifesto";
import { Testimonials } from "@/components/sections/Testimonials";
import { Works } from "@/components/sections/Works";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Founder } from "@/components/sections/Founder";
import { Awards } from "@/components/sections/Awards";
import { Pricing } from "@/components/sections/Pricing";
import { Fiverr } from "@/components/sections/Fiverr";
import { Faq } from "@/components/sections/Faq";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <Manifesto />
      <Testimonials />
      <Works />
      <ServicesSection />
      <Founder />
      <Awards />
      <Pricing />
      <Fiverr />
      <Faq />
      <ContactSection />
    </>
  );
}
