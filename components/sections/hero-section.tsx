import Link from "next/link";
import { RotatingPhrases } from "@/components/hero/rotating-phrases";
import { LeadForm } from "@/components/forms/lead-form";
import { Container } from "@/components/ui/container";
import { ANIMATION_CONFIG } from "@/lib/config";
import { heroContent } from "@/lib/content";

export function HeroSection() {
  return (
    <section
      id="para-voce"
      className="relative overflow-hidden bg-white pt-[8.5rem] pb-14 sm:pt-[9.5rem] sm:pb-[4.5rem]"
    >
      <div className="pointer-events-none absolute right-[-20rem] bottom-[-18rem] h-[44rem] w-[72rem] rounded-[50%] bg-[var(--hero-wave)]" />
      <div className="pointer-events-none absolute left-[-26rem] bottom-[-22rem] h-[36rem] w-[68rem] rounded-[50%] bg-[var(--hero-wave-soft)]/65" />

      <Container className="relative z-10 grid gap-8 lg:grid-cols-[1fr_430px] lg:items-start">
        <div className="max-w-3xl space-y-6">
          <RotatingPhrases
            items={heroContent.heroPairs}
            intervalMs={ANIMATION_CONFIG.heroRotation.intervalMs}
            fadeMs={ANIMATION_CONFIG.heroRotation.fadeMs}
          />

          <div className="flex flex-wrap gap-3">
            <Link
              href="#lead-form"
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand-red)] px-6 py-3 text-sm font-extrabold uppercase tracking-[0.05em] text-white transition hover:bg-[var(--brand-red-dark)]"
            >
              {heroContent.ctaLabel}
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <LeadForm
            id="lead-form"
            source="hero-form"
            title="Comece sua jornada hoje!"
            description="Preencha os dados e receba contato rápido da equipe."
            buttonLabel="Quero meu plano"
            badgeLabel="Inglês Online: Compre 1 Leve 2"
          />
        </div>
      </Container>
    </section>
  );
}
