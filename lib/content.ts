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
  { label: "Para Crianças", href: "#para-criancas" },
  { label: "Para Sua Empresa", href: "#para-empresa" },
  { label: "O Curso", href: "#cursos" },
  { label: "Como Funciona", href: "#como-funciona" },
];

export const heroContent: HeroContent = {
  headline: "Ganhe confiança no inglês.",
  subheadline:
    "Aulas online com professores e suporte de IA para acelerar seu aprendizado.",
  ctaLabel: "Comece agora",
  image: {
    src: "/assets/instructor-placeholder.svg",
    alt: "Instrutor da Web English",
  },
  rotatingPhrases: [
    "Inglês para viagens sem travar",
    "Inglês para tecnologia e carreira",
    "Conversação do básico ao avançado",
    "Aulas práticas com feedback rápido",
    "Rotina leve, progresso consistente",
    "Reuniões internacionais com segurança",
    "Fale inglês no trabalho remoto",
    "Vocabulário útil para o dia a dia",
    "Pronúncia clara sem complicação",
    "Inglês para entrevistas de emprego",
    "Ganhe fluidez em poucas semanas",
    "Aprenda com situações reais",
    "Treino de listening com apoio",
    "Escreva e-mails profissionais melhores",
    "Inglês para apresentações impactantes",
    "Entenda filmes e séries melhor",
    "Aprenda com plano personalizado",
    "Aula ao vivo com foco no seu objetivo",
    "Estude no seu ritmo",
    "Mentoria contínua com especialistas",
    "Destrave a fala com confiança",
    "Do zero à conversação funcional",
    "Inglês para atendimento ao cliente",
    "Inglês para freelancers e autônomos",
    "Inglês para marketing digital",
    "Inglês para TI e programação",
    "Inglês para RH e liderança",
    "Inglês para vendas internacionais",
    "Inglês para provas de proficiência",
    "Simulados e estratégia de prova",
    "Inglês para crianças com método lúdico",
    "Família toda estudando junto",
    "Conteúdo moderno e atualizado",
    "Aulas curtas e objetivas",
    "Plataforma com suporte de IA",
    "Correção rápida de exercícios",
    "Comunidade para prática semanal",
    "Metas claras de aprendizado",
    "Plano de estudos de 15 minutos",
    "Inglês para networking global",
    "Inglês para viagens de negócio",
    "Ganhe autonomia para estudar",
    "Evolução medida por resultados",
    "Comece hoje e mantenha constância",
    "Inglês que cabe na sua rotina",
  ],
};

export const courses: CourseItem[] = [
  {
    id: "viagem",
    name: "Viagem",
    description:
      "Frases úteis, situações de aeroporto, hotel e restaurantes para você viajar sem travar e com segurança.",
    icon: "travel",
    theme: {
      background:
        "radial-gradient(circle at 30% 20%, #ffe9c7, #f6b564 45%, #e08a2d 100%)",
      ringColor: "#f7cf9a",
    },
  },
  {
    id: "tecnologia",
    name: "Tecnologia",
    description:
      "Vocabulário técnico para reuniões, documentação, code review e comunicação global em times de produto e engenharia.",
    icon: "technology",
    theme: {
      background:
        "radial-gradient(circle at 20% 20%, #d5ecff, #77b5f8 45%, #2d72c7 100%)",
      ringColor: "#a9d2fb",
    },
  },
  {
    id: "conversacao",
    name: "Conversação",
    description:
      "Treinos guiados para destravar a fala, melhorar pronúncia e responder com naturalidade em contextos reais.",
    icon: "conversation",
    theme: {
      background:
        "radial-gradient(circle at 25% 20%, #e4ffe3, #8fd38d 45%, #3d9c57 100%)",
      ringColor: "#bfe8be",
    },
  },
  {
    id: "negocios",
    name: "Negócios",
    description:
      "Inglês corporativo para apresentações, negociações, networking e comunicação com clientes internacionais.",
    icon: "business",
    theme: {
      background:
        "radial-gradient(circle at 35% 15%, #f0ecff, #a79be5 45%, #6151ba 100%)",
      ringColor: "#cfc7f8",
    },
  },
  {
    id: "certificacoes",
    name: "Provas",
    description:
      "Preparação focada para certificações com simulados, estratégia de prova e acompanhamento de desempenho.",
    icon: "certification",
    theme: {
      background:
        "radial-gradient(circle at 20% 20%, #ffe8e8, #ee9a9a 45%, #c85555 100%)",
      ringColor: "#f7c3c3",
    },
  },
  {
    id: "criancas",
    name: "Crianças",
    description:
      "Metodologia lúdica com atividades interativas para construir base sólida e tornar o inglês parte da rotina.",
    icon: "kids",
    theme: {
      background:
        "radial-gradient(circle at 30% 20%, #fff3cf, #ffd777 45%, #e09d22 100%)",
      ringColor: "#ffe3a0",
    },
  },
];

export const howItWorksSteps: StepItem[] = [
  {
    title: "1. Diagnóstico rápido",
    description:
      "Você responde um formulário curto e fazemos um mapeamento de nível, objetivos e rotina disponível.",
  },
  {
    title: "2. Plano personalizado",
    description:
      "Montamos trilha de aulas, materiais e exercícios com metas semanais claras e acompanhamento próximo.",
  },
  {
    title: "3. Evolução contínua",
    description:
      "Você recebe feedback frequente, ajustes de rota e suporte de IA para ganhar ritmo e manter constância.",
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
