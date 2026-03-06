# Web English Landing Page

Landing page em Next.js + TypeScript para captacao de leads e apresentacao de cursos com secao dinamica scroll-driven.

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Configuracao de integracao de lead

Crie um arquivo `.env` a partir de `.env.example`:

```bash
CRM_SIMPLE_INGEST_URL=http://localhost:3000/api/integrations/site-leads
CRM_SIMPLE_INGEST_TOKEN=change-me
```

Os dois formularios enviam `POST` para `/api/leads`, e essa rota encaminha o payload validado para o endpoint interno do CRM Simple.

## Onde editar conteudo

- Textos, frases, cursos, beneficios, depoimentos, FAQ e links:
  - `lib/content.ts`
- Tipos dos blocos de conteudo:
  - `lib/types.ts`
- Configuracoes globais (tempos de animacao e metadados):
  - `lib/config.ts`

## Onde editar imagens e logo

- Logo: `public/assets/logo.svg`
- Foto do instrutor: `public/assets/instructor-placeholder.svg`
- Para substituir, mantenha o mesmo nome de arquivo ou ajuste os caminhos em `lib/content.ts`.

## Onde alterar animacoes

- Hero (frases rotativas):
  - `ANIMATION_CONFIG.heroRotation.intervalMs`
  - `ANIMATION_CONFIG.heroRotation.fadeMs`
- Secao dinamica de cursos (distancia por etapa):
  - `ANIMATION_CONFIG.coursesScroll.stepScrollPx`

## Estrutura principal

- Pagina: `app/page.tsx`
- Header/Footer: `components/sections/site-header.tsx`, `components/sections/site-footer.tsx`
- Hero: `components/sections/hero-section.tsx`
- Cursos:
  - Desktop scroll-driven: `components/courses/courses-scroll.tsx`
  - Mobile fallback (carrossel): `components/courses/courses-carousel.tsx`
  - Reduced motion (lista): `components/courses/courses-static.tsx`
- Formularios de lead: `components/forms/lead-form.tsx`, `components/forms/referral-modal.tsx`
