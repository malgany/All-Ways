import type {
  ContactLink,
  CourseItem,
  FaqItem,
  HeroContent,
  NavItem,
  PlanOffer,
  SocialLink,
  TestimonialItem,
  BenefitItem,
} from "@/lib/types";

import {
  faLaptopCode,
  faUserTie,
  faMapLocationDot,
  faPuzzlePiece,
  faClock,
  faTrophy,
  faBookOpenReader,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

export const navItems: NavItem[] = [
  { label: "Para Você", href: "#para-voce" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "O Curso", href: "#cursos" },
  { label: "Diferenciais", href: "#diferenciais" },
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

export const benefits: BenefitItem[] = [
  {
    title: "Aulas online ao vivo",
    description: "para tirar dúvidas em tempo real",
    icon: faLaptopCode,
  },
  {
    title: "Acompanhamento individual",
    description: "com foco na sua evolução",
    icon: faUserTie,
  },
  {
    title: "Plano de estudos adaptado",
    description: "ao seu objetivo",
    icon: faMapLocationDot,
  },
  {
    title: "Curso flexível",
    description: "para o que você quer alcançar",
    icon: faPuzzlePiece,
  },
  {
    title: "Rotina flexível",
    description: "para quem trabalha ou estuda",
    icon: faClock,
  },
  {
    title: "Relatórios de progresso",
    description: "com metas objetivas",
    icon: faTrophy,
  },
  {
    title: "Materiais atualizados",
    description: "para cenários reais",
    icon: faBookOpenReader,
  },
  {
    title: "Atendimento rápido",
    description: "pelo WhatsApp",
    icon: faHeadset,
  },
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
      "A promoção 'Indique & Ganhe' me incentivou a convidar um colega de trabalho. Começamos juntos e foi excelente para o nosso desenvolvimento.",
  },
];

export const offer: PlanOffer = {
  title: "🔥 Indique um Amigo e os Dois<br />Estudam com <span class=\"text-[var(--brand-yellow)]\">Matrícula Grátis</span>",
  subtitle:
    "Você indica um amigo <strong>e os dois</strong> economizam. Matrícula<br />de <strong class=\"text-[var(--brand-yellow)]\">R$39,90 totalmente gratuita</strong> para ambos.",
  rules: [
    "<strong>Sem custo</strong> nenhum para <strong>você</strong> e <strong>seu amigo</strong>.",
    "Promoção <strong>mais usada</strong> pelos nossos <strong>alunos</strong>.",
    "Apenas para as próximas <strong>20 indicações</strong>.",
  ],
  howItWorks: [
    "Você indica um amigo.",
    "Ele faz a matrícula.",
    "Os dois ganham matrícula gratuita.",
  ],
  ctaLabel: "QUERO GARANTIR A MATRÍCULA GRÁTIS",
};

export const faqItems: FaqItem[] = [
  {
    question: "As aulas são ao vivo ou gravadas?",
    answer:
      "As aulas são totalmente ao vivo e você tem contato direto pelo WhatsApp para tirar dúvidas sempre que precisar.",
  },
  {
    question: "Preciso ter nível mínimo para entrar?",
    answer:
      "Não precisa. Você escolhe o curso ou tema que quer começar (viagem, tecnologia, conversação ou nível básico, intermediário ou avançado) e já inicia. Sem prova de nivelamento, direto ao ponto.",
  },
  {
    question: "Qual a duração de cada aula?",
    answer:
      "São 2 aulas por semana, com 45 minutos cada. Se preferir, você pode optar por 1 aula semanal de 1h30. A escolha é sua.",
  },
  {
    question: "Posso fazer aula pelo celular?",
    answer:
      "Sim. Você pode assistir às aulas pelo celular, computador ou tablet. Escolha o aparelho que for mais prático para você.",
  },
  {
    question: "Como funciona a promoção Indique & Ganhe?",
    answer:
      "Ao convidar um amigo e ele realizar a matrícula, tanto você quanto ele ganham 100% de gratuidade na taxa de matrícula.",
  },
  {
    question: "Como faço para começar?",
    answer:
      'Basta preencher o <a href="#para-voce" class="text-[var(--brand-red)] font-bold hover:underline">formulário disponível na página</a>. Após o envio, nossa equipe entrará em contato para ajudar na escolha da melhor turma.',
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
