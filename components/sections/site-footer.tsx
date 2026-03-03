import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { contacts, socialLinks } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--brand-navy)] py-12 text-white">
      <Container className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <Link href="#para-voce" className="inline-block">
            <Image
              src="/logos/logo-white.png"
              alt="Web English"
              width={196}
              height={48}
              className="h-11 w-auto object-contain"
            />
          </Link>
          <p className="max-w-sm text-sm text-white/75">
            Escola online de inglês com foco em resultado prático para carreira,
            viagens e vida real.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/60">
            Contato
          </h3>
          <ul className="space-y-2 text-sm">
            {contacts.map((contact) => (
              <li key={contact.label}>
                <Link href={contact.href} className="text-white/85 hover:text-white">
                  {contact.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/60">
            Redes e políticas
          </h3>
          <ul className="space-y-2 text-sm">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/85 hover:text-white"
                >
                  {social.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="#" className="text-white/85 hover:text-white">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="#" className="text-white/85 hover:text-white">
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
