import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { testimonials } from "@/lib/content";

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="relative overflow-hidden bg-white py-16 sm:py-24">
      {/* Container for the title */}
      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Depoimentos"
          title="Resultados reais de alunos em diferentes objetivos"
          description="Feedback de quem já passou pelo programa e aplicou inglês na prática."
          align="center"
        />
      </Container>

      {/* Container for the infinite carousel */}
      <div className="relative z-10 mx-auto mt-16 flex w-full max-w-[100vw] overflow-hidden">
        {/* Overlay Gradients for smooth edges */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-12 bg-gradient-to-r from-white to-transparent sm:w-24 md:w-32 lg:w-48" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-12 bg-gradient-to-l from-white to-transparent sm:w-24 md:w-32 lg:w-48" />

        <div className="flex w-max animate-slide-left items-start hover:[animation-play-state:paused]">
          {/* First loop track */}
          <div className="flex flex-nowrap shrink-0 gap-10 pr-10">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={`t1-${idx}`} testimonial={testimonial} />
            ))}
          </div>

          {/* Second loop track */}
          <div className="flex flex-nowrap shrink-0 gap-10 pr-10" aria-hidden="true">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={`t2-${idx}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <article className="group flex w-[280px] shrink-0 flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] sm:w-[320px]">
      {/* Avatar border in gray, inside image (or initials). */}
      <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[var(--sand-strong)] text-3xl font-bold tracking-wider text-[var(--ink)] shadow-inner transition-transform duration-300 group-hover:-translate-y-1">
        {initials}
      </div>

      {/* Name & Role (in red) */}
      <div className="mt-6">
        <p className="font-display text-lg font-bold text-[var(--brand-red)]">
          {testimonial.name}, <span className="text-[1rem] font-medium">{testimonial.role}</span>
        </p>
      </div>

      {/* Quote */}
      <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-[var(--ink)] opacity-80 px-2 font-medium">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Red double quotes */}
      <span className="mt-8 block font-serif text-6xl leading-[0.3] text-[var(--brand-red)] font-bold">
        &rdquo;
      </span>
    </article>
  );
}
