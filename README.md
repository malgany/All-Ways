# Web English Landing Page

Landing page em Next.js + TypeScript para captação de leads e apresentação de cursos com seção dinâmica scroll-driven.

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Configuração de integração de lead

Crie um arquivo `.env.local`:

```bash
WEBHOOK_URL=https://seu-endpoint.com/leads
```

O formulário envia `POST` para `/api/leads`, que encaminha o payload para `WEBHOOK_URL`.

## Onde editar conteúdo

- Textos, frases, cursos, benefícios, depoimentos, FAQ e links:
  - `lib/content.ts`
- Tipos dos blocos de conteúdo:
  - `lib/types.ts`
- Configurações globais (tempos de animação e metadados):
  - `lib/config.ts`

## Onde editar imagens e logo

- Logo: `public/assets/logo.svg`
- Foto do instrutor: `public/assets/instructor-placeholder.svg`
- Para substituir, mantenha o mesmo nome de arquivo ou ajuste os caminhos em `lib/content.ts`.

## Onde alterar animações

- Hero (frases rotativas):
  - `ANIMATION_CONFIG.heroRotation.intervalMs`
  - `ANIMATION_CONFIG.heroRotation.fadeMs`
- Seção dinâmica de cursos (distância por etapa):
  - `ANIMATION_CONFIG.coursesScroll.stepScrollPx`

## Estrutura principal

- Página: `app/page.tsx`
- Header/Footer: `components/sections/site-header.tsx`, `components/sections/site-footer.tsx`
- Hero: `components/sections/hero-section.tsx`
- Cursos:
  - Desktop scroll-driven: `components/courses/courses-scroll.tsx`
  - Mobile fallback (carrossel): `components/courses/courses-carousel.tsx`
  - Reduced motion (lista): `components/courses/courses-static.tsx`
- Formulário de lead: `components/forms/lead-form.tsx`
