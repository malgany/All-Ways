import Image from "next/image";
import { RotatingPhrases } from "@/components/hero/rotating-phrases";
import { LeadForm } from "@/components/forms/lead-form";
import { Container } from "@/components/ui/container";
import { ANIMATION_CONFIG } from "@/lib/config";
import { heroContent } from "@/lib/content";

export function HeroSection() {
  return (
    <section
      id="para-voce"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#edf6fd_0%,#d7eef8_44%,#cbe7f5_100%)] pt-[7.75rem] pb-12 sm:pt-[8.5rem] sm:pb-16"
    >
      <div className="pointer-events-none absolute right-[-18rem] bottom-[-18rem] h-[40rem] w-[68rem] rounded-[50%] bg-[var(--hero-wave)]/55" />
      <div className="pointer-events-none absolute left-[-24rem] bottom-[-21rem] h-[34rem] w-[66rem] rounded-[50%] bg-[var(--hero-wave-soft)]/70" />

      <Container className="relative z-10 grid gap-10 lg:min-h-[calc(100vh-9.5rem)] lg:grid-cols-[minmax(0,36rem)_1fr] lg:items-center">
        <div className="mx-auto w-full max-w-[36rem] space-y-6 lg:mx-0">
          <RotatingPhrases
            items={heroContent.heroPairs}
            intervalMs={ANIMATION_CONFIG.heroRotation.intervalMs}
            fadeMs={ANIMATION_CONFIG.heroRotation.fadeMs}
          />

          <LeadForm
            id="lead-form"
            source="hero-form"
            buttonLabel="Receber mais infos"
            showHeader={false}
            className="border-white/80 bg-white/95 shadow-[0_18px_42px_rgba(36,63,143,0.16)]"
          />

          <p className="max-w-[33rem] text-xs text-[#2f3b64]/85 sm:text-sm">
            Ao continuar você aceita nossa política de privacidade e termos de uso,
            incluindo o recebimento de mensagens.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[32rem] lg:justify-self-end">
          <div className="pointer-events-none absolute inset-x-6 bottom-2 h-20 rounded-full bg-[var(--hero-wave)]/70 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(175deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.1)_65%,rgba(36,63,143,0.08)_100%)] p-4 sm:p-6">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#9adcf4]/70 via-[#9adcf4]/28 to-transparent" />
            <Image
              src="/prof.png"
              alt="Pessoa sorrindo representando alunos de inglês"
              width={400}
              height={500}
              priority
              className="relative z-10 mx-auto h-auto w-full max-w-[24rem] object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
