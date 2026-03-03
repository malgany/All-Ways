"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { leadSchema } from "@/lib/validation";

type LeadFormProps = {
  id?: string;
  source?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  badgeLabel?: string;
  className?: string;
  showHeader?: boolean;
};

type FieldErrors = Partial<Record<"name" | "email" | "phone", string>>;

type FormStatus = "idle" | "submitting" | "success" | "error";

const emptyFields = { name: "", email: "", phone: "" };
const PHONE_MAX_DIGITS = 11;

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, PHONE_MAX_DIGITS);

  if (!digits) {
    return "";
  }

  if (digits.length < 3) {
    return `(${digits}`;
  }

  if (digits.length < 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function LeadForm({
  id,
  source = "landing-page",
  title = "Receba uma aula diagnóstico gratuita",
  description = "Preencha seus dados e nosso time retorna via WhatsApp.",
  buttonLabel = "Quero falar com a equipe",
  badgeLabel,
  className,
  showHeader = true,
}: LeadFormProps) {
  const [fields, setFields] = useState(emptyFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const isSubmitting = useMemo(() => status === "submitting", [status]);

  const formId = id ?? `${source}-lead`;
  const fieldIds = {
    name: `${formId}-name`,
    email: `${formId}-email`,
    phone: `${formId}-phone`,
  };

  function updateField(name: keyof typeof fields, value: string) {
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const validation = leadSchema.safeParse({ ...fields, source });

    if (!validation.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0];
        if (field === "name" || field === "email" || field === "phone") {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      setStatus("error");
      setMessage("Revise os campos destacados.");
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message: string;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Falha ao enviar lead.");
      }

      setStatus("success");
      setMessage(payload.message);
      setFields(emptyFields);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar agora. Tente novamente.",
      );
    }
  }

  return (
    <div className="relative">
      {badgeLabel ? (
        <p className="absolute top-[-0.95rem] left-1/2 z-10 -translate-x-1/2 rounded-full bg-[var(--brand-red)] px-5 py-1 text-center text-[0.72rem] font-extrabold uppercase tracking-[0.05em] text-white sm:top-[-1.1rem] sm:text-xs">
          {badgeLabel}
        </p>
      ) : null}

      <form
        id={formId}
        onSubmit={handleSubmit}
        className={cn(
          "space-y-3.5 rounded-[1.45rem] border border-[#d7ddec] bg-white/96 p-4 shadow-[0_16px_38px_rgba(46,67,122,0.14)] backdrop-blur sm:p-5",
          className,
        )}
        noValidate
      >
        {showHeader ? (
          <div className="space-y-1.5">
            <h3 className="font-display text-[1.5rem] leading-tight font-bold text-[var(--brand-blue)]">
              {title}
            </h3>
            <p className="text-sm font-semibold text-[var(--ink-soft)]">{description}</p>
          </div>
        ) : null}

        <div className="space-y-2.5">
          <div className="space-y-1.5">
            <label className="sr-only" htmlFor={fieldIds.name}>
              Seu nome
            </label>
            <input
              id={fieldIds.name}
              type="text"
              value={fields.name}
              onChange={(event) => updateField("name", event.target.value)}
              autoComplete="name"
              placeholder="Seu nome"
              className={cn(
                "h-12 w-full rounded-xl border border-[#dbe1ef] bg-[#f7f9ff] px-4 text-[0.96rem] font-semibold text-[#2f3e68] outline-none transition placeholder:font-medium placeholder:text-[#8d97b6]",
                errors.name
                  ? "border-[var(--brand-red)] ring-2 ring-[var(--brand-red)]/20"
                  : "focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--brand-blue)]/20",
              )}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${fieldIds.name}-error` : undefined}
            />
            {errors.name ? (
              <p id={`${fieldIds.name}-error`} className="text-xs text-[var(--brand-red)]">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label className="sr-only" htmlFor={fieldIds.email}>
              Seu e-mail
            </label>
            <input
              id={fieldIds.email}
              type="email"
              value={fields.email}
              onChange={(event) => updateField("email", event.target.value)}
              autoComplete="email"
              placeholder="Seu e-mail"
              className={cn(
                "h-12 w-full rounded-xl border border-[#dbe1ef] bg-[#f7f9ff] px-4 text-[0.96rem] font-semibold text-[#2f3e68] outline-none transition placeholder:font-medium placeholder:text-[#8d97b6]",
                errors.email
                  ? "border-[var(--brand-red)] ring-2 ring-[var(--brand-red)]/20"
                  : "focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--brand-blue)]/20",
              )}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${fieldIds.email}-error` : undefined}
            />
            {errors.email ? (
              <p id={`${fieldIds.email}-error`} className="text-xs text-[var(--brand-red)]">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label className="sr-only" htmlFor={fieldIds.phone}>
              DDD e WhatsApp
            </label>
            <div
              className={cn(
                "flex h-12 overflow-hidden rounded-xl border border-[#dbe1ef] bg-[#f7f9ff] transition",
                errors.phone
                  ? "border-[var(--brand-red)] ring-2 ring-[var(--brand-red)]/20"
                  : "focus-within:border-[var(--brand-blue)] focus-within:ring-2 focus-within:ring-[var(--brand-blue)]/20",
              )}
            >
              <span className="inline-flex min-w-[4.35rem] items-center justify-center border-r border-[#d6ddec] bg-[#eef2fb] px-3 text-sm font-bold text-[#4a5884]">
                +55
              </span>
              <input
                id={fieldIds.phone}
                type="tel"
                value={fields.phone}
                onChange={(event) => updateField("phone", formatPhone(event.target.value))}
                autoComplete="tel-national"
                inputMode="tel"
                placeholder="DDD + WhatsApp"
                className="w-full bg-transparent px-4 text-[0.96rem] font-semibold text-[#2f3e68] outline-none placeholder:font-medium placeholder:text-[#8d97b6]"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? `${fieldIds.phone}-error` : undefined}
              />
            </div>
            {errors.phone ? (
              <p id={`${fieldIds.phone}-error`} className="text-xs text-[var(--brand-red)]">
                {errors.phone}
              </p>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--brand-red)] px-5 text-sm font-extrabold uppercase tracking-[0.04em] text-white transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-blue)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Enviando..." : buttonLabel}
        </button>

        {message ? (
          <p
            className={cn(
              "text-sm",
              status === "success" ? "text-emerald-700" : "text-[var(--brand-red)]",
            )}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
