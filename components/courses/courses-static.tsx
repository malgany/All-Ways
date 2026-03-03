import { CourseIcon } from "@/components/courses/course-icon";
import type { CourseItem } from "@/lib/types";

type CoursesStaticProps = {
  courses: CourseItem[];
};

export function CoursesStatic({ courses }: CoursesStaticProps) {
  return (
    <section className="bg-[#181a23] px-4 py-16 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <p className="inline-flex rounded-full bg-[var(--brand-red)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-white">
          Cursos (modo reduzido)
        </p>
        <h2 className="font-display max-w-3xl text-4xl leading-tight tracking-tight">
          Preferência por movimento reduzido detectada. Exibindo lista estática dos
          cursos.
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.id}
              className="space-y-3 rounded-2xl border border-white/15 bg-white/10 p-4"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ background: course.theme.background }}
              >
                <CourseIcon
                  icon={course.icon}
                  className="h-8 w-8 stroke-[2.3px] text-[var(--ink)]"
                />
              </div>
              <h3 className="font-display text-2xl">{course.name}</h3>
              <p className="text-sm text-white/80">{course.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
