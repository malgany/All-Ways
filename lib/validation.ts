import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/\D/g, ""))
  .refine(
    (digits) => digits.length === 10 || digits.length === 11,
    "Informe um telefone/WhatsApp com DDD.",
  );

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo.")
    .max(80, "Nome muito longo."),
  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido.")
    .max(120, "E-mail muito longo."),
  phone: phoneSchema,
  source: z.string().trim().max(100).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
