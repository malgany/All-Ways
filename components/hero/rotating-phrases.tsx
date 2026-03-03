"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

type RotatingPhrasesProps = {
  items: { grande: string; medio: string }[];
  intervalMs: number;
  fadeMs: number;
  className?: string;
};

export function RotatingPhrases({
  items,
  intervalMs,
  fadeMs,
  className,
}: RotatingPhrasesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || items.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setIsFadingOut(true);
      timeoutRef.current = window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % items.length);
        setIsFadingOut(false);
      }, fadeMs);
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [fadeMs, intervalMs, items.length, prefersReducedMotion]);

  const animationClasses = isFadingOut
    ? "translate-y-1 opacity-0"
    : "translate-y-0 opacity-100";
  const transitionStyle = { transitionDuration: `${fadeMs}ms` };

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "max-h-[60vh] overflow-auto rounded-xl border border-[var(--sand-strong)] bg-white/65 px-4 py-3",
          className,
        )}
      >
        <ul className="space-y-6" aria-label="Destaques">
          {items.map((item, idx) => (
            <li key={idx} className="space-y-2">
              <h2 className="font-display text-[2rem] leading-tight text-[var(--brand-blue)]">
                {item.grande}
              </h2>
              <p
                className="text-[1.1rem] font-bold text-[var(--brand-blue)]"
                dangerouslySetInnerHTML={{ __html: item.medio }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)} aria-live="polite">
      {items[activeIndex].grande && (
        <h1
          className={cn(
            "font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.98] tracking-tight text-[var(--brand-blue)] transition-[opacity,transform]",
            animationClasses,
          )}
          style={transitionStyle}
          dangerouslySetInnerHTML={{ __html: items[activeIndex].grande }}
        />
      )}

      <p
        className={cn(
          "max-w-xl text-[clamp(1.05rem,1.6vw,1.45rem)] font-semibold leading-snug text-[var(--brand-blue)] transition-[opacity,transform]",
          animationClasses,
          !items[activeIndex].grande && "pt-8",
        )}
        style={transitionStyle}
        dangerouslySetInnerHTML={{ __html: items[activeIndex].medio }}
      />
    </div>
  );
}
