import {
  LEAD_SOURCES,
  type LeadInput,
  type LeadSource,
  type ReferralLeadInput,
} from "@/lib/validation";

export type CrmLeadPayload = {
  email: string;
  name: string;
  note: string | null;
  origin: string;
  phone: string;
  submittedAt: string;
};

const originBySource: Record<LeadSource, string> = {
  [LEAD_SOURCES.hero]: "Site - Receber mais infos",
  [LEAD_SOURCES.referral]: "Site - Indicacao matricula gratis",
};

const successMessageBySource: Record<LeadSource, string> = {
  [LEAD_SOURCES.hero]: "Recebemos seus dados. Em breve entraremos em contato.",
  [LEAD_SOURCES.referral]:
    "Recebemos sua indicacao. Em breve entraremos em contato.",
};

function buildReferralNote(input: ReferralLeadInput, submittedAt: string) {
  return [
    "Lead da campanha de matricula gratis.",
    `Amigo indicado: ${input.friendName}`,
    `Contato do amigo: ${input.friendContact}`,
    `Enviado em: ${submittedAt}`,
  ].join("\n");
}

export function getLeadSuccessMessage(source: LeadSource) {
  return successMessageBySource[source];
}

export function buildCrmLeadPayload(
  input: LeadInput,
  submittedAt: string,
): CrmLeadPayload {
  return {
    email: input.email,
    name: input.name,
    note:
      input.source === LEAD_SOURCES.referral
        ? buildReferralNote(input, submittedAt)
        : null,
    origin: originBySource[input.source],
    phone: input.phone,
    submittedAt,
  };
}
