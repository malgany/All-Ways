import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { howItWorksSteps } from "@/lib/content";

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-white py-16 sm:py-20">
      <Container className="space-y-10">
        <SectionTitle
          eyebrow="Como funciona"
          title="Um processo direto para aprender sem travar."
          description="Você entra, recebe um plano claro e evolui com acompanhamento contínuo."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-[var(--sand-strong)] bg-[var(--sand)] p-5 shadow-sm"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-red)] text-sm font-extrabold text-white">
                {index + 1}
              </span>
              <h3 className="mt-3 font-display text-2xl text-[var(--brand-blue)]">
                {step.title.replace(/^\d+\.\s*/, "")}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
