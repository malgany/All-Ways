"use client";

import { useEffect, useRef, useState } from "react";
import { CourseOrbitScene } from "@/components/courses/course-orbit-scene";
import { ANIMATION_CONFIG } from "@/lib/config";
import type { CourseItem } from "@/lib/types";

type CoursesScrollProps = {
  courses: CourseItem[];
};

export function CoursesScroll({ courses }: CoursesScrollProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(0);
  const orbitProgressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    let cleanup: (() => void) | undefined;

    async function setupScrollAnimation() {
      if (!sectionRef.current) {
        return;
      }

      if (window.matchMedia("(max-width: 767px)").matches) {
        return;
      }

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!isMounted) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${ANIMATION_CONFIG.coursesScroll.stepScrollPx * courses.length}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const stagedProgress = self.progress * courses.length;
            orbitProgressRef.current = stagedProgress;
            const nextIndex = Math.min(
              courses.length - 1,
              Math.floor(stagedProgress),
            );

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
        });

        cleanup = () => {
          trigger.kill();
          context.revert();
        };
      }, sectionRef);
    }

    setupScrollAnimation();

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, [courses]);

  const activeCourse = courses[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative hidden h-screen overflow-hidden bg-[#181a23] text-white md:block"
      aria-label="Cursos com animacao sincronizada por rolagem"
    >
      <div className="absolute inset-0 opacity-25">
        {courses.map((course, index) => (
          <div
            key={course.id}
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              background: course.theme.background,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center gap-8 px-8">
        <div className="w-[52%]">
          <div className="space-y-4">
            <p className="inline-flex w-fit rounded-full bg-[var(--brand-red)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-white">
              Secao dinamica dos cursos
            </p>
            <h2 className="font-display text-5xl leading-tight tracking-tight">
              6 trilhas para objetivos diferentes.
            </h2>
            <p className="max-w-lg text-base text-white/80">
              Role e acompanhe cada curso: a esfera 3D muda de cor e o emoji orbital
              troca conforme o objetivo.
            </p>
          </div>

          <div className="relative mt-10 aspect-square max-w-[520px]">
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.24),rgba(255,255,255,0.02)_60%)]" />
            <CourseOrbitScene
              activeCourseId={activeCourse.id}
              activeColor={activeCourse.theme.ringColor}
              scrollProgressRef={orbitProgressRef}
              className="absolute inset-0"
            />
          </div>
        </div>

        <div className="w-[48%] space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span>/</span>
            <span>{String(courses.length).padStart(2, "0")}</span>
          </div>

          <div key={activeCourse.id} className="animate-fade-slide space-y-4">
            <h3 className="font-display text-4xl tracking-tight">{activeCourse.name}</h3>
            <p className="max-w-md text-lg leading-relaxed text-white/85">
              {activeCourse.description}
            </p>
          </div>

          <div className="flex gap-2">
            {courses.map((course, index) => (
              <span
                key={course.id}
                className="h-1.5 rounded-full bg-white/25 transition-all duration-300"
                style={{ width: index === activeIndex ? 32 : 16 }}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
