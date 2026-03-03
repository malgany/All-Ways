import { BenefitsSection } from "@/components/sections/benefits-section";
import { CoursesSection } from "@/components/sections/courses-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { OfferSection } from "@/components/sections/offer-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <CoursesSection />
        <BenefitsSection />
        <TestimonialsSection />
        <OfferSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
