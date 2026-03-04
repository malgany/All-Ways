import Link from "next/link";
import { ReferralModal } from "@/components/forms/referral-modal";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { offer } from "@/lib/content";

export function OfferSection() {
  return (
    <section
      className="bg-[linear-gradient(145deg,#ff3a67_0%,#f42857_46%,#df1745_100%)] py-16 text-white sm:py-20"
    >
      <Container className="mx-auto flex max-w-4xl flex-col items-center">
        <div className="flex w-full max-w-3xl flex-col items-center space-y-8 text-center">
          <SectionTitle
            eyebrow="Planos & Benefícios"
            title={offer.title}
            description={offer.subtitle}
            align="center"
            className="text-white [&_h2]:text-white [&_p]:text-white/90 [&_.rounded-full]:!bg-white"
          />

          <ul className="grid w-full max-w-2xl gap-3 text-left sm:grid-cols-2">
            {offer.rules.map((rule) => (
              <li
                key={rule}
                className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/12 px-4 py-3 text-sm text-white/95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-5 w-5 shrink-0 text-[var(--brand-yellow)]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span>{rule}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <ReferralModal />
            <Link
              href="https://wa.me/5561999990000"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.05em] text-white transition hover:bg-white/12"
            >
              Tirar dúvidas no WhatsApp
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
