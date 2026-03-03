import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { testimonials } from "@/lib/content";

export function TestimonialsSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="space-y-10">
        <SectionTitle
          eyebrow="Depoimentos"
          title="Resultados reais de alunos em diferentes objetivos."
          description="Feedback de quem já passou pelo programa e aplicou inglês na prática."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex h-full flex-col rounded-2xl border border-[var(--sand-strong)] bg-[var(--sand)] p-5 shadow-sm"
            >
              <p className="flex-1 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-4 border-t border-[var(--sand-strong)] pt-3">
                <p className="font-display text-xl text-[var(--brand-blue)]">
                  {testimonial.name}
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--brand-red)]">
                  {testimonial.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
