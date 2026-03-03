"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { CourseIcon } from "@/components/courses/course-icon";
import type { CourseItem } from "@/lib/types";

type CoursesCarouselProps = {
  courses: CourseItem[];
};

export function CoursesCarousel({ courses }: CoursesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      className="bg-[#181a23] px-4 py-12 text-white md:hidden"
      aria-label="Cursos em carrossel"
    >
      <div className="mx-auto max-w-xl space-y-5">
        <p className="inline-flex rounded-full bg-[var(--brand-red)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-white">
          Cursos
        </p>
        <h2 className="font-display text-3xl leading-tight tracking-tight">
          Escolha a trilha ideal para seu objetivo.
        </h2>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {courses.map((course) => (
              <article
                key={course.id}
                className="min-w-0 flex-[0_0_100%] px-1"
              >
                <div className="space-y-4 rounded-3xl border border-white/15 bg-white/10 p-5">
                  <div
                    className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-full border-[8px]"
                    style={{
                      background: course.theme.background,
                      borderColor: course.theme.ringColor,
                    }}
                  >
                    <CourseIcon
                      icon={course.icon}
                      className="h-16 w-16 stroke-[2.2px] text-[var(--ink)]"
                    />
                  </div>
                  <h3 className="font-display text-2xl">{course.name}</h3>
                  <p className="text-sm leading-relaxed text-white/80">
                    {course.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {courses.map((course, index) => (
            <button
              key={course.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className="h-2 w-6 rounded-full transition"
              style={{
                backgroundColor: selectedIndex === index ? "#ffffff" : "#ffffff4d",
              }}
              aria-label={`Ir para ${course.name}`}
              aria-current={selectedIndex === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
