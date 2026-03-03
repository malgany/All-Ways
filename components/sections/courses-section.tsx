"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { courses } from "@/lib/content";
import { CourseIcon } from "@/components/courses/course-icon";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";

export function CoursesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 4000); // 4 sec autoplay
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="cursos" className="bg-[var(--sand)] py-16 sm:py-24 overflow-hidden">
      <Container className="space-y-12">
        <SectionTitle
          eyebrow="O Curso"
          title="Escolha sua Trilha de Inglês"
          description="Todas as trilhas são personalizadas conforme seu nível e objetivo."
          align="left"
        />

        <div className="relative group">
          <div className="overflow-hidden mix-blend-multiply" ref={emblaRef}>
            <div className="flex -ml-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%]"
                >
                  <div className="flex h-full flex-col items-center text-center bg-white rounded-2xl shadow-sm border border-[var(--sand-strong)] hover:border-[var(--brand-blue)] hover:shadow-md transition-all duration-300 p-10 group/card">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--brand-blue)]/5 text-[var(--brand-blue)] group-hover/card:bg-[var(--brand-blue)] group-hover/card:text-white transition-colors">
                      <CourseIcon icon={course.icon} className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--brand-blue)] mb-4">
                      {course.name}
                    </h3>
                    <div className="w-full h-px bg-[var(--sand-strong)] mb-6 opacity-50" />
                    <p className="text-[var(--ink-soft)] leading-relaxed flex-grow text-[1.05rem]">
                      {course.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute -left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg text-[var(--brand-blue)] hover:bg-[var(--brand-blue)] hover:text-white transition-all border border-[var(--sand-strong)] z-10 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0 hidden sm:flex"
            aria-label="Anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          <button
            onClick={scrollNext}
            className="absolute -right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg text-[var(--brand-blue)] hover:bg-[var(--brand-blue)] hover:text-white transition-all border border-[var(--sand-strong)] z-10 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0 hidden sm:flex"
            aria-label="Próximo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 pt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${selectedIndex === index
                  ? "w-8 bg-[var(--brand-blue)]"
                  : "w-2.5 bg-[var(--brand-blue)]/20 hover:bg-[var(--brand-blue)]/50"
                }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
