"use client";

import { useState } from "react";
import { offer } from "@/lib/content";
import { LEAD_SOURCES, leadSchema } from "@/lib/validation";

const PHONE_MAX_DIGITS = 11;
const emptyFields = {
  email: "",
  friendContact: "",
  friendName: "",
  name: "",
  phone: "",
};

type ReferralFields = typeof emptyFields;
type FieldErrors = Partial<Record<keyof ReferralFields, string>>;

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, PHONE_MAX_DIGITS);
  if (!digits) return "";
  if (digits.length < 3) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function ReferralModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [fields, setFields] = useState<ReferralFields>(emptyFields);

  const resetForm = () => {
    setErrors({});
    setFields(emptyFields);
    setIsSubmitting(false);
    setMessage("");
    setSubmitted(false);
  };

  const updateField = (name: keyof ReferralFields, value: string) => {
    setFields((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const validation = leadSchema.safeParse({
      ...fields,
      source: LEAD_SOURCES.referral,
    });

    if (!validation.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0];
        if (
          field === "email" ||
          field === "friendContact" ||
          field === "friendName" ||
          field === "name" ||
          field === "phone"
        ) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      setMessage("Revise os campos destacados.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const payload = (await response.json()) as {
        fieldErrors?: Partial<Record<keyof ReferralFields, string[]>>;
        message: string;
        ok: boolean;
      };

      if (!response.ok || !payload.ok) {
        if (payload.fieldErrors) {
          const nextErrors: FieldErrors = {};
          for (const [field, messages] of Object.entries(payload.fieldErrors)) {
            if (
              (field === "email" ||
                field === "friendContact" ||
                field === "friendName" ||
                field === "name" ||
                field === "phone") &&
              messages?.[0]
            ) {
              nextErrors[field] = messages[0];
            }
          }
          setErrors(nextErrors);
        }
        throw new Error(payload.message || "Falha ao enviar indicação.");
      }

      setIsSubmitting(false);
      setSubmitted(true);
      setMessage(payload.message);

      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar agora. Tente novamente.",
      );
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-full bg-[var(--brand-yellow)] px-6 py-3 text-sm font-extrabold uppercase tracking-[0.05em] text-[var(--brand-navy)] transition hover:brightness-105"
      >
        {offer.ctaLabel}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--brand-navy)]/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 rounded-2xl bg-white p-6 text-left shadow-2xl duration-200 sm:p-8">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 cursor-pointer text-gray-400 transition hover:text-[var(--brand-red)]"
              aria-label="Fechar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-[var(--brand-navy)]">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-2xl font-black uppercase text-[var(--brand-navy)]">
                  Sucesso!
                </h3>
                <p className="text-sm text-gray-600">
                  {message || "Anotamos sua indicação. Entraremos em contato em breve."}
                </p>
              </div>
            ) : (
              <>
                <h3 className="mb-2 text-2xl font-black uppercase text-[var(--brand-red)]">
                  Indicar um Amigo
                </h3>
                <p className="mb-6 text-sm text-gray-600">
                  Preencha os dados abaixo. Ao realizar a matrícula, vocês dois ganham
                  100% de gratuidade!
                </p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-3">
                    <p className="border-b border-gray-100 pb-2 text-xs font-bold uppercase tracking-wider text-[var(--brand-navy)]">
                      Seus Dados (O Indicador)
                    </p>
                    <div>
                      <input
                        type="text"
                        required
                        value={fields.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition focus:border-[var(--brand-red)] focus:ring-1 focus:ring-[var(--brand-red)]"
                        placeholder="Seu nome"
                      />
                      {errors.name ? (
                        <p className="mt-1 text-xs text-[var(--brand-red)]">{errors.name}</p>
                      ) : null}
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={fields.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition focus:border-[var(--brand-red)] focus:ring-1 focus:ring-[var(--brand-red)]"
                        placeholder="Seu e-mail"
                      />
                      {errors.email ? (
                        <p className="mt-1 text-xs text-[var(--brand-red)]">{errors.email}</p>
                      ) : null}
                    </div>
                    <div className="flex overflow-hidden rounded-lg border border-gray-300 bg-white transition focus-within:border-[var(--brand-red)] focus-within:ring-1 focus-within:ring-[var(--brand-red)]">
                      <span className="inline-flex items-center justify-center border-r border-gray-300 bg-gray-50 px-3 text-sm font-bold text-gray-600">
                        +55
                      </span>
                      <input
                        type="tel"
                        required
                        value={fields.phone}
                        onChange={(event) =>
                          updateField("phone", formatPhone(event.target.value))
                        }
                        className="w-full px-4 py-2.5 text-gray-800 outline-none placeholder:text-gray-400"
                        placeholder="DDD + WhatsApp"
                      />
                    </div>
                    {errors.phone ? (
                      <p className="text-xs text-[var(--brand-red)]">{errors.phone}</p>
                    ) : null}
                  </div>

                  <div className="space-y-3">
                    <p className="border-b border-gray-100 pb-2 text-xs font-bold uppercase tracking-wider text-[var(--brand-navy)]">
                      Dados do Amigo
                    </p>
                    <div>
                      <input
                        type="text"
                        required
                        value={fields.friendName}
                        onChange={(event) => updateField("friendName", event.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition focus:border-[var(--brand-red)] focus:ring-1 focus:ring-[var(--brand-red)]"
                        placeholder="Nome do amigo"
                      />
                      {errors.friendName ? (
                        <p className="mt-1 text-xs text-[var(--brand-red)]">
                          {errors.friendName}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        value={fields.friendContact}
                        onChange={(event) =>
                          updateField("friendContact", event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition focus:border-[var(--brand-red)] focus:ring-1 focus:ring-[var(--brand-red)]"
                        placeholder="Telefone ou e-mail do amigo"
                      />
                      {errors.friendContact ? (
                        <p className="mt-1 text-xs text-[var(--brand-red)]">
                          {errors.friendContact}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {message ? (
                    <p className="text-sm text-[var(--brand-red)]">{message}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full cursor-pointer rounded-full bg-[var(--brand-red)] py-3.5 text-sm font-extrabold uppercase tracking-wider text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Indicação"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
