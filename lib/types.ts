export type NavItem = {
  label: string;
  href: string;
};

export type HeroContent = {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  rotatingPhrases: string[];
  image: {
    src: string;
    alt: string;
  };
};

export type CourseIconKey =
  | "travel"
  | "technology"
  | "conversation"
  | "business"
  | "certification"
  | "kids";

export type CourseItem = {
  id: string;
  name: string;
  description: string;
  icon: CourseIconKey;
  theme: {
    background: string;
    ringColor: string;
  };
};

export type StepItem = {
  title: string;
  description: string;
};

export type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
};

export type PlanOffer = {
  title: string;
  subtitle: string;
  rules: string[];
  ctaLabel: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContactLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};
