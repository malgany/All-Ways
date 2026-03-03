import { cn } from "@/lib/cn";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "light";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
}: SectionTitleProps) {
  const isLight = tone === "light";

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
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              isLight ? "bg-[#ff5f80]" : "bg-[var(--brand-red)]",
            )}
          />
          <p
            className={cn(
              "text-xs font-extrabold uppercase tracking-[0.16em]",
              isLight ? "text-[#ff8ba4]" : "text-[var(--brand-red)]",
            )}
          >
            {eyebrow}
          </p>
        </div>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl leading-tight tracking-tight sm:text-4xl",
          isLight ? "text-white" : "text-[var(--brand-blue)]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-base sm:text-lg",
            isLight ? "text-[#b8c3df]" : "text-[var(--ink-soft)]",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
