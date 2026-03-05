import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { benefits } from "@/lib/content";

export function BenefitsSection() {
  return (
    <section id="diferenciais" className="bg-[var(--sand)] py-16 sm:py-20">
      <Container className="space-y-10">
        <SectionTitle
          eyebrow="Benefícios"
          title="A estrutura completa que acelera sua fluência e mantém sua constância"
          description="Tudo o que você precisa para estudar com clareza, ritmo e acompanhamento."
          align="center"
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <li
              key={benefit}
              className="flex flex-col gap-3 rounded-2xl border border-[var(--sand-strong)] bg-white px-4 py-4 text-sm text-[var(--ink-soft)] shadow-sm"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-blue)]/10 text-sm font-extrabold text-[var(--brand-blue)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.95rem]">{benefit}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
