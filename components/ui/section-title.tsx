import { cn } from "@/lib/cn";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--brand-red)]" />
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--brand-red)]">
            {eyebrow}
          </p>
        </div>
      ) : null}
      <h2 className="font-display text-3xl leading-tight tracking-tight text-[var(--brand-blue)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base text-[var(--ink-soft)] sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
