import { Container } from "@/components/ui/container";

const brandNames = [
  "TechFlow",
  "Inova RH",
  "Global Desk",
  "EduPlay",
  "MoveUp",
  "NetSales",
];

export function BrandsSection() {
  return (
    <section className="bg-white py-10">
      <Container className="space-y-5">
        <p className="text-center text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--brand-red)]">
          Alunos de empresas e times de todo o Brasil
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {brandNames.map((brand) => (
            <div
              key={brand}
              className="flex h-16 items-center justify-center rounded-xl border border-[var(--sand-strong)] bg-[var(--sand)] text-sm font-extrabold text-[var(--ink-soft)]"
            >
              {brand}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
