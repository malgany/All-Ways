import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { benefits } from "@/lib/content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function BenefitsSection() {
  return (
    <section id="diferenciais" className="relative overflow-hidden bg-[var(--sand)] py-16 sm:py-24">
      <Container className="relative z-10 space-y-12 sm:space-y-16">
        <SectionTitle
          eyebrow="Benefícios"
          title="A estrutura completa que acelera sua fluência e mantém sua constância"
          description="Tudo o que você precisa para estudar com clareza, ritmo e acompanhamento."
          align="center"
        />

        <div className="relative mx-auto w-full max-w-6xl">
          <ul className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <li
                key={benefit.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--sand-strong)] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] shadow-sm"
              >
                <div>
                  <div className="mb-6 flex items-start justify-between">
                    <span className="text-[2.5rem] leading-none font-extrabold tracking-tight text-[var(--brand-blue)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] transition-transform duration-300 group-hover:scale-110">
                      <FontAwesomeIcon icon={benefit.icon} className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-base font-bold text-[var(--ink)]">
                      {benefit.title}
                    </h3>
                    <p className="text-[0.9rem] leading-snug text-[var(--ink-soft)]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
