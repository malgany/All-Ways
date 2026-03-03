import type { CourseIconKey } from "@/lib/types";

type CourseIconProps = {
  icon: CourseIconKey;
  className?: string;
};

export function CourseIcon({ icon, className }: CourseIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {icon === "travel" ? (
        <>
          <path d="M6 33h52" />
          <path d="M16 22l9 11-9 11" />
          <path d="M48 22l-9 11 9 11" />
          <circle cx="32" cy="33" r="16" />
        </>
      ) : null}
      {icon === "technology" ? (
        <>
          <rect x="10" y="14" width="44" height="30" rx="4" />
          <path d="M22 50h20" />
          <path d="M27 44v6M37 44v6" />
          <path d="M23 26l5 6-5 6M41 26l-5 6 5 6" />
        </>
      ) : null}
      {icon === "conversation" ? (
        <>
          <path d="M11 18h28v22H26l-8 7v-7h-7z" />
          <path d="M53 24H39v16h8l6 6v-6h0z" />
          <path d="M19 27h13M19 33h9" />
        </>
      ) : null}
      {icon === "business" ? (
        <>
          <rect x="12" y="18" width="40" height="34" rx="4" />
          <path d="M24 18v-4h16v4" />
          <path d="M12 31h40" />
          <path d="M27 37h10" />
        </>
      ) : null}
      {icon === "certification" ? (
        <>
          <rect x="11" y="12" width="42" height="40" rx="4" />
          <path d="M20 24h24M20 31h24M20 38h16" />
          <path d="M43 44l5 7 5-7" />
          <circle cx="48" cy="40" r="6" />
        </>
      ) : null}
      {icon === "kids" ? (
        <>
          <circle cx="20" cy="22" r="6" />
          <circle cx="44" cy="22" r="6" />
          <path d="M20 30v22M44 30v22" />
          <path d="M12 39l8-5 8 5M36 39l8-5 8 5" />
          <path d="M24 47h16" />
        </>
      ) : null}
    </svg>
  );
}
