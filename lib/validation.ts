import { z } from "zod";

export const LEAD_SOURCES = {
  hero: "hero-form",
  referral: "referral-modal",
} as const;

export type LeadSource = (typeof LEAD_SOURCES)[keyof typeof LEAD_SOURCES];

const phoneSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/\D/g, ""))
  .refine(
    (digits) => digits.length === 10 || digits.length === 11,
    "Informe um telefone/WhatsApp com DDD.",
  );

const baseLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo.")
    .max(80, "Nome muito longo."),
  email: z
    .string()
    .trim()
    .email("Informe um e-mail valido.")
    .max(120, "E-mail muito longo."),
  phone: phoneSchema,
});

export const leadSchema = z.discriminatedUnion("source", [
  baseLeadSchema.extend({
    source: z.literal(LEAD_SOURCES.hero),
  }),
  baseLeadSchema.extend({
    source: z.literal(LEAD_SOURCES.referral),
    friendName: z
      .string()
      .trim()
      .min(2, "Informe o nome do amigo.")
      .max(80, "Nome do amigo muito longo."),
    friendContact: z
      .string()
      .trim()
      .min(3, "Informe telefone ou e-mail do amigo.")
      .max(120, "Contato do amigo muito longo."),
  }),
]);

export type LeadInput = z.infer<typeof leadSchema>;
export type ReferralLeadInput = Extract<
  LeadInput,
  { source: typeof LEAD_SOURCES.referral }
>;
