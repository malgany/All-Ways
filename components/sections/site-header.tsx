"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d8dcea] bg-white/96 backdrop-blur-md">
      <Container className="flex h-[5.25rem] items-center justify-between gap-4">
        <Link
          href="#para-voce"
          className="inline-flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/logos/logo.png"
            alt="All Ways"
            width={228}
            height={56}
            className="h-[3.15rem] w-auto object-contain sm:h-[4.45rem]"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[1.05rem] font-semibold text-[#5e6c8f] transition hover:text-[var(--brand-blue)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="tel:+551140031474"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand-red)] px-6 py-2 text-base font-extrabold text-[var(--brand-red)] transition hover:bg-[#fff2f2]"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 3.2 2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.1L7.3 8.4a16 16 0 0 0 8.3 8.3l.98-.98a2 2 0 0 1 2.1-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92z" />
            </svg>
            (11) 4003-1474
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#d5d9e6] text-[var(--ink)] lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label="Abrir menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d={
                mobileOpen
                  ? "M5 5L15 15M15 5L5 15"
                  : "M3 5H17M3 10H17M3 15H17"
              }
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "grid overflow-hidden border-t border-[#e5e8f0] bg-white transition-[grid-template-rows] lg:hidden",
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <Container
          className={cn(
            "overflow-hidden transition-[padding] duration-200",
            mobileOpen ? "py-4" : "py-0",
          )}
        >
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-base font-semibold text-[var(--ink-soft)] hover:bg-[var(--sand)] hover:text-[var(--ink)]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="tel:+551140031474"
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-[var(--brand-red)] px-4 py-2.5 text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Ligar agora
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}
