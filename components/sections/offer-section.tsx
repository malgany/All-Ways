import Link from "next/link";
import { ReferralModal } from "@/components/forms/referral-modal";
import { Container } from "@/components/ui/container";
import { offer } from "@/lib/content";

export function OfferSection() {
  return (
    <section
      className="bg-[linear-gradient(145deg,#ff3a67_0%,#f42857_46%,#df1745_100%)] py-16 text-white sm:py-20"
    >
      <Container className="mx-auto flex max-w-5xl flex-col items-center">
        {/* Header container */}
        <div className="flex w-full max-w-4xl flex-col items-center space-y-2 text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-white opacity-80" />
            <p className="text-xs font-black uppercase tracking-[0.16em] text-white opacity-90">
              Planos & Benefícios
            </p>
          </div>
          <h2
            className="font-display text-3xl leading-tight tracking-tight sm:text-[40px] text-white font-semibold"
            dangerouslySetInnerHTML={{ __html: offer.title }}
          />
          <p
            className="text-base sm:text-lg text-white/95 max-w-2xl"
            dangerouslySetInnerHTML={{ __html: offer.subtitle }}
          />
        </div>

        {/* Content columns - Reduced gap to be closer as in design */}
        <div className="flex w-full flex-col gap-8 md:flex-row md:items-start md:justify-center md:gap-16">

          {/* Left Column */}
          <div className="flex w-full max-w-[380px] flex-col space-y-8">
            <ul className="flex flex-col space-y-2">
              {offer.rules.map((rule) => (
                <li
                  key={rule}
                  className="flex items-center gap-3 text-base sm:text-[17px] font-bold text-white"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4ade80] text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span dangerouslySetInnerHTML={{ __html: rule }} />
                </li>
              ))}
            </ul>

            <div className="w-full">
              <div className="[&>button]:w-full [&>button]:whitespace-nowrap [&>button]:py-4 [&>button]:text-[13px] sm:[&>button]:text-[15px] [&>button]:shadow-lg [&>button]:shadow-black/10">
                <ReferralModal />
              </div>
            </div>
          </div>

          {/* Right Column: Card */}
          <div className="flex w-full max-w-[300px] flex-col relative">

            {/* Top Light/Glow Effect exactly as design */}
            <div className="absolute -top-1 -left-1 z-20 h-10 w-10 rounded-tl-2xl bg-white/50 blur-md" />

            <div className="relative z-10 rounded-2xl bg-gradient-to-br from-[#ffffff] to-[#f4f2f0] p-6 shadow-2xl sm:px-8 sm:py-7">
              <h3 className="mb-5 text-center text-[22px] font-extrabold tracking-tight text-[#df1745]">Como funciona</h3>

              <ul className="space-y-3">
                {offer.howItWorks.map((step, index) => (
                  <li key={index} className="flex gap-3 text-[15px] font-medium text-[#3b3554] leading-relaxed">
                    <span className="shrink-0 text-[16px] font-extrabold text-[#2a2347]">{index + 1}.</span>
                    <span className="mt-[1px] tracking-tight">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp Button - Wider than card */}
            <div className="relative z-20 -mt-5 flex justify-center w-full sm:-mx-4 sm:w-[calc(100%+2rem)]">
              <Link
                href="https://wa.me/5561999990000"
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#49a855] px-4 py-3 text-[11px] sm:text-[12px] font-black uppercase tracking-[0.05em] text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition hover:scale-[1.02] active:scale-[0.98] group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
                Tirar dúvidas no WhatsApp
              </Link>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
