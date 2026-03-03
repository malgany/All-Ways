import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { faqItems } from "@/lib/content";

export function FaqSection() {
  return (
    <section id="faq" className="bg-[var(--sand)] py-16 sm:py-20">
      <Container className="space-y-10">
        <SectionTitle
          eyebrow="FAQ"
          title="Dúvidas frequentes antes de começar."
          description="Se ainda restar alguma pergunta, fale com nosso time pelo WhatsApp."
        />

        <div className="space-y-3">
          {faqItems.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-[var(--sand-strong)] bg-white p-4"
            >
              <summary className="cursor-pointer list-none pr-6 text-[1rem] font-extrabold text-[var(--brand-blue)] marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-3 border-t border-[var(--sand-strong)] pt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
