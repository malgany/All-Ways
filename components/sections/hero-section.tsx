import Image from "next/image";
import { RotatingPhrases } from "@/components/hero/rotating-phrases";
import { LeadForm } from "@/components/forms/lead-form";
import { Container } from "@/components/ui/container";
import { ANIMATION_CONFIG } from "@/lib/config";
import { heroContent } from "@/lib/content";

export function HeroSection() {
  return (
    <section
      id="para-voce"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#edf6fd_0%,#d7eef8_44%,#cbe7f5_100%)] pt-[7.75rem] pb-20 sm:pt-[8.5rem] sm:pb-28"
    >
      <Container className="relative z-10 flex flex-col gap-16 lg:grid lg:grid-cols-[1fr_minmax(0,36rem)] lg:items-center">
        {/* Text Container */}
        <div className="order-1 mx-auto w-full max-w-[36rem] space-y-6 lg:order-2 lg:mx-0 lg:justify-self-end">
          <RotatingPhrases
            items={heroContent.heroPairs}
            intervalMs={ANIMATION_CONFIG.heroRotation.intervalMs}
            fadeMs={ANIMATION_CONFIG.heroRotation.fadeMs}
          />

          <LeadForm
            id="lead-form"
            source="hero-form"
            buttonLabel="Receber mais infos"
            showHeader={false}
            className="border-white/80 bg-white/95 shadow-[0_18px_42px_rgba(36,63,143,0.16)]"
          />

          <p className="max-w-[33rem] text-xs text-[#2f3b64]/85 sm:text-sm">
            Ao continuar você aceita nossa política de privacidade e termos de uso,
            incluindo o recebimento de mensagens.
          </p>
        </div>

        {/* Image Container */}
        <div className="order-2 relative mx-auto w-full max-w-[32rem] lg:order-1 lg:mx-0 lg:max-w-none lg:justify-self-start">
          <div className="relative mx-auto w-fit">
            <div className="absolute top-[12%] -left-[0%] sm:-left-[0%] z-20 w-20 sm:w-38 animate-float">
              <Image
                src="/images/emojis/bandeira-eua.png"
                alt="Bandeira EUA"
                width={112}
                height={112}
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="absolute top-[10%] -right-[-15%] sm:-right-[-10%] z-20 w-16 sm:w-30 animate-float-delayed">
              <Image
                src="/images/emojis/bandeira-reino-unido.png"
                alt="Bandeira Reino Unido"
                width={80}
                height={80}
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="absolute top-[30%] -right-[20%] sm:-right-[25%] z-0 w-32 sm:w-48 animate-float">
              <Image
                src="/images/emojis/estata-da-liberdade.png"
                alt="Estátua da Liberdade"
                width={192}
                height={192}
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="absolute bottom-[2%] -left-[05%] sm:-left-[-5%] z-20 w-24 sm:w-36 animate-float-delayed">
              <Image
                src="/images/emojis/emoji-tio-san.png"
                alt="Emoji Tio Sam"
                width={144}
                height={144}
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="absolute bottom-[10%] -right-[-10%] sm:-right-[-10%] z-10 w-24 sm:w-32 animate-float">
              <Image
                src="/images/emojis/emoji-oculos.png"
                alt="Emoji Óculos"
                width={128}
                height={128}
                className="h-auto w-full object-contain"
              />
            </div>

            <Image
              src="/images/professor.png"
              alt="Professor sorrindo"
              width={500}
              height={650}
              priority
              className="relative z-10 mx-auto h-auto w-full max-w-[20rem] sm:max-w-[26rem] object-contain [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
