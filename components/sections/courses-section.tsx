"use client";

import { CoursesCarousel } from "@/components/courses/courses-carousel";
import { CoursesScroll } from "@/components/courses/courses-scroll";
import { CoursesStatic } from "@/components/courses/courses-static";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { courses } from "@/lib/content";

export function CoursesSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div id="cursos">
        <CoursesStatic courses={courses} />
      </div>
    );
  }

  return (
    <div id="cursos">
      <CoursesScroll courses={courses} />
      <CoursesCarousel courses={courses} />
    </div>
  );
}
