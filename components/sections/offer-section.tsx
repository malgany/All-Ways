import Link from "next/link";
import { LeadForm } from "@/components/forms/lead-form";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { offer } from "@/lib/content";

export function OfferSection() {
  return (
    <section
      className="bg-[linear-gradient(145deg,#ff3a67_0%,#f42857_46%,#df1745_100%)] py-16 text-white sm:py-20"
    >
      <Container className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <SectionTitle
            eyebrow="Planos e oferta"
            title={offer.title}
            description={offer.subtitle}
            className="text-white [&_h2]:text-white [&_p]:text-white/90"
          />

          <ul className="grid gap-3">
            {offer.rules.map((rule) => (
              <li
                key={rule}
                className="rounded-xl border border-white/30 bg-white/12 px-4 py-3 text-sm text-white/95"
              >
                {rule}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Link
              href="#lead-form"
              className="rounded-full bg-[var(--brand-yellow)] px-6 py-3 text-sm font-extrabold uppercase tracking-[0.05em] text-[var(--brand-navy)] transition hover:brightness-105"
            >
              {offer.ctaLabel}
            </Link>
            <Link
              href="https://wa.me/5561999990000"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.05em] text-white transition hover:bg-white/12"
            >
              Tirar dúvidas no WhatsApp
            </Link>
          </div>

          <article
            className="rounded-2xl border border-white/30 bg-white/12 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-yellow)]">
              Para crianças
            </p>
            <p className="mt-2 text-sm text-white/85">
              Opções para responsáveis que querem começar junto com os filhos em
              trilhas separadas por faixa etária.
            </p>
          </article>
        </div>

        <LeadForm
          source="offer-form"
          title="Garanta sua vaga"
          description="Preencha para receber detalhes dos planos e turmas disponíveis."
          buttonLabel="Solicitar proposta"
          className="bg-white shadow-[0_18px_40px_rgba(127,10,42,0.32)]"
        />
      </Container>
    </section>
  );
}
