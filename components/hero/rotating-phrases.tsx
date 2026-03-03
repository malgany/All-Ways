"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

type RotatingPhrasesProps = {
  phrases: string[];
  intervalMs: number;
  fadeMs: number;
  className?: string;
};

export function RotatingPhrases({
  phrases,
  intervalMs,
  fadeMs,
  className,
}: RotatingPhrasesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || phrases.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setIsFadingOut(true);
      timeoutRef.current = window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % phrases.length);
        setIsFadingOut(false);
      }, fadeMs);
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [fadeMs, intervalMs, phrases.length, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "max-h-44 overflow-auto rounded-xl border border-[var(--sand-strong)] bg-white/65 px-4 py-3",
          className,
        )}
      >
        <ul className="space-y-1.5" aria-label="Frases de destaque">
          {phrases.map((phrase) => (
            <li key={phrase} className="text-lg font-extrabold text-[var(--brand-blue)]">
              {phrase}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-[2.7rem] rounded-xl bg-white/45 px-3 py-2",
        className,
      )}
      aria-live="polite"
    >
      <p
        className={cn(
          "text-[1.45rem] font-extrabold text-[var(--brand-blue)] transition-[opacity,transform] sm:text-[1.65rem]",
          isFadingOut ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100",
        )}
        style={{ transitionDuration: `${fadeMs}ms` }}
      >
        {phrases[activeIndex]}
      </p>
    </div>
  );
}
