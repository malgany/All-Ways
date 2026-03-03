import type {
  ContactLink,
  CourseItem,
  FaqItem,
  HeroContent,
  NavItem,
  PlanOffer,
  SocialLink,
  StepItem,
  TestimonialItem,
} from "@/lib/types";

export const navItems: NavItem[] = [
  { label: "Para Você", href: "#para-voce" },
  { label: "O Curso", href: "#cursos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

export const heroContent: HeroContent = {
  ctaLabel: "Comece agora",
  heroPairs: [
    {
      grande: "Vai viajar?",
      medio: 'Fale inglês com confiança <span class="text-[var(--brand-red)]">antes mesmo de fazer as malas</span>',
    },
    {
      grande: 'Buscando uma <span class="text-[var(--brand-red)]">vaga tech?</span>',
      medio: "O inglês será seu diferencial",
    },
    {
      grande: "Quer destravar seu inglês?",
      medio: 'Confiança para falar, <span class="text-[var(--brand-red)]">segurança para se expressar</span>',
    },
    {
      grande: "Buscando fluência?",
      medio: 'Do básico ao avançado <span class="text-[var(--brand-red)]">no seu ritmo</span>',
    },
  ],
};

export const courses: CourseItem[] = [
  {
    id: "viagem",
    name: "Inglês para Viagem",
    description:
      "Prepare-se para aeroportos, hotéis e passeios.",
    icon: "travel",
    theme: {
      background:
        "radial-gradient(circle at 30% 20%, #ffe9c7, #f6b564 45%, #e08a2d 100%)",
      ringColor: "#f7cf9a",
    },
  },
  {
    id: "tecnologia",
    name: "Inglês Tecnológico",
    description:
      "Inglês para TI e mercado digital.",
    icon: "technology",
    theme: {
      background:
        "radial-gradient(circle at 20% 20%, #d5ecff, #77b5f8 45%, #2d72c7 100%)",
      ringColor: "#a9d2fb",
    },
  },
  {
    id: "conversacao",
    name: "Inglês Conversação",
    description:
      "Fale inglês com confiança no dia a dia.",
    icon: "conversation",
    theme: {
      background:
        "radial-gradient(circle at 25% 20%, #e4ffe3, #8fd38d 45%, #3d9c57 100%)",
      ringColor: "#bfe8be",
    },
  },
  {
    id: "basico",
    name: "Inglês Básico",
    description:
      "Comece do zero e aprenda o essencial.",
    icon: "business",
    theme: {
      background:
        "radial-gradient(circle at 35% 15%, #f0ecff, #a79be5 45%, #6151ba 100%)",
      ringColor: "#cfc7f8",
    },
  },
  {
    id: "intermediario",
    name: "Inglês Intermediário",
    description:
      "Aprimore seu vocabulário e fluência.",
    icon: "certification",
    theme: {
      background:
        "radial-gradient(circle at 20% 20%, #ffe8e8, #ee9a9a 45%, #c85555 100%)",
      ringColor: "#f7c3c3",
    },
  },
  {
    id: "avancado",
    name: "Inglês Avançado",
    description:
      "Alcance a fluência em inglês.",
    icon: "kids",
    theme: {
      background:
        "radial-gradient(circle at 30% 20%, #fff3cf, #ffd777 45%, #e09d22 100%)",
      ringColor: "#ffe3a0",
    },
  },
];

export const benefits: string[] = [
  "Aulas online ao vivo com professores especialistas",
  "Suporte com IA para revisão e prática entre aulas",
  "Plano de estudos adaptado ao seu objetivo",
  "Feedback em pronúncia, escrita e fluidez",
  "Rotina flexível para quem trabalha ou estuda",
  "Relatórios de progresso com metas objetivas",
  "Materiais atualizados para cenários reais",
  "Atendimento rápido por WhatsApp",
];

export const testimonials: TestimonialItem[] = [
  {
    name: "Mariana Souza",
    role: "Product Manager",
    quote:
      "Em dois meses já conduzia reuniões em inglês com muito mais segurança. O suporte entre as aulas faz diferença.",
  },
  {
    name: "Carlos Pereira",
    role: "Desenvolvedor Full Stack",
    quote:
      "Meu foco era tecnologia. As aulas trouxeram vocabulário real de projeto e melhoraram minha comunicação com o time global.",
  },
  {
    name: "Larissa Nogueira",
    role: "Analista de RH",
    quote:
      "Ganhei confiança para entrevistas em inglês e apresentações internas. O método é direto e fácil de manter.",
  },
  {
    name: "Ricardo Almeida",
    role: "Empreendedor",
    quote:
      "Viajei para uma feira internacional e consegui negociar sem travar. A preparação prática foi essencial.",
  },
  {
    name: "Patrícia Lima",
    role: "Mãe de aluna",
    quote:
      "Minha filha passou a gostar de inglês e participa das aulas com entusiasmo. O formato lúdico funcionou muito bem.",
  },
  {
    name: "Gustavo Freitas",
    role: "Executivo Comercial",
    quote:
      "A proposta de 'compre 1 leve 2' facilitou começar com meu filho. Hoje os dois estão evoluindo juntos.",
  },
];

export const offer: PlanOffer = {
  title: "Oferta Especial: Compre 1, Leve 2",
  subtitle:
    "Assine um plano anual e adicione uma segunda matrícula sem custo adicional na mensalidade.",
  rules: [
    "Válido para novos alunos e planos anuais.",
    "A segunda matrícula deve ser ativada em até 30 dias.",
    "Oferta não cumulativa com outros descontos.",
    "Opção ideal para casal, amigos ou responsável + criança.",
  ],
  ctaLabel: "Quero garantir a oferta",
};

export const faqItems: FaqItem[] = [
  {
    question: "As aulas são ao vivo ou gravadas?",
    answer:
      "As aulas principais são ao vivo, com materiais complementares gravados para revisão quando você quiser.",
  },
  {
    question: "Preciso ter nível mínimo para entrar?",
    answer:
      "Não. Temos trilhas do básico ao avançado, com nivelamento inicial para montar a rota certa para você.",
  },
  {
    question: "Qual a duração de cada aula?",
    answer:
      "As aulas ao vivo variam entre 45 e 60 minutos, de acordo com o plano e objetivo definido.",
  },
  {
    question: "Como funciona o suporte de IA?",
    answer:
      "Você recebe atividades guiadas, prática de vocabulário e revisão de textos, sempre alinhado ao conteúdo da sua trilha.",
  },
  {
    question: "Posso fazer aula pelo celular?",
    answer:
      "Sim. Plataforma e materiais funcionam em celular, tablet e desktop sem necessidade de instalação complexa.",
  },
  {
    question: "Existe plano para empresas?",
    answer:
      "Sim. Criamos programas in-company com trilhas por área e indicadores de evolução para o RH.",
  },
  {
    question: "Como funciona a oferta Compre 1 Leve 2?",
    answer:
      "Ao contratar um plano anual, você recebe uma segunda matrícula de igual duração sem custo de mensalidade.",
  },
  {
    question: "Como faço para começar?",
    answer:
      "Basta preencher o formulário de lead. Nossa equipe entra em contato para nivelamento e definição da melhor turma.",
  },
];

export const contacts: ContactLink[] = [
  { label: "WhatsApp", href: "https://wa.me/5561999990000" },
  { label: "Telefone", href: "tel:+556133333333" },
  { label: "E-mail", href: "mailto:contato@webenglish.com.br" },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/webenglish" },
  { label: "YouTube", href: "https://youtube.com/@webenglish" },
  { label: "LinkedIn", href: "https://linkedin.com/company/webenglish" },
];
