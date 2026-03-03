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
};

type FieldErrors = Partial<Record<"name" | "email" | "phone", string>>;

type FormStatus = "idle" | "submitting" | "success" | "error";

const emptyFields = { name: "", email: "", phone: "" };

export function LeadForm({
  id,
  source = "landing-page",
  title = "Receba uma aula diagnóstico gratuita",
  description = "Preencha seus dados e nosso time retorna via WhatsApp.",
  buttonLabel = "Quero falar com a equipe",
  badgeLabel,
  className,
}: LeadFormProps) {
  const [fields, setFields] = useState(emptyFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const isSubmitting = useMemo(() => status === "submitting", [status]);

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
        id={id}
        onSubmit={handleSubmit}
        className={cn(
          "space-y-4 rounded-[1.5rem] border border-[#d7dbea] bg-white p-6 shadow-[0_18px_48px_rgba(45,53,85,0.16)]",
          className,
        )}
        noValidate
      >
        <div className="space-y-2">
          <h3 className="font-display text-[1.85rem] font-bold text-[var(--brand-blue)]">
            {title}
          </h3>
          <p className="text-sm font-semibold text-[var(--ink-soft)]">{description}</p>
        </div>

        <div className="space-y-3">
          <label className="block space-y-1 text-sm font-bold text-[#5a6587]">
            <span>Nome *</span>
            <input
              type="text"
              value={fields.name}
              onChange={(event) => updateField("name", event.target.value)}
              autoComplete="name"
              className={cn(
                "w-full rounded-xl border border-[#dbe0ec] bg-[#f4f6fb] px-3 py-2.5 text-sm font-semibold text-[#3d4b77] outline-none transition",
                errors.name
                  ? "border-[var(--brand-red)] ring-2 ring-[var(--brand-red)]/20"
                  : "focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--brand-blue)]/20",
              )}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </label>
          {errors.name ? (
            <p id="name-error" className="text-xs text-[var(--brand-red)]">
              {errors.name}
            </p>
          ) : null}

          <label className="block space-y-1 text-sm font-bold text-[#5a6587]">
            <span>E-mail *</span>
            <input
              type="email"
              value={fields.email}
              onChange={(event) => updateField("email", event.target.value)}
              autoComplete="email"
              className={cn(
                "w-full rounded-xl border border-[#dbe0ec] bg-[#f4f6fb] px-3 py-2.5 text-sm font-semibold text-[#3d4b77] outline-none transition",
                errors.email
                  ? "border-[var(--brand-red)] ring-2 ring-[var(--brand-red)]/20"
                  : "focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--brand-blue)]/20",
              )}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </label>
          {errors.email ? (
            <p id="email-error" className="text-xs text-[var(--brand-red)]">
              {errors.email}
            </p>
          ) : null}

          <label className="block space-y-1 text-sm font-bold text-[#5a6587]">
            <span>Telefone *</span>
            <input
              type="tel"
              value={fields.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              autoComplete="tel"
              className={cn(
                "w-full rounded-xl border border-[#dbe0ec] bg-[#f4f6fb] px-3 py-2.5 text-sm font-semibold text-[#3d4b77] outline-none transition",
                errors.phone
                  ? "border-[var(--brand-red)] ring-2 ring-[var(--brand-red)]/20"
                  : "focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--brand-blue)]/20",
              )}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
          </label>
          {errors.phone ? (
            <p id="phone-error" className="text-xs text-[var(--brand-red)]">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-[var(--brand-red)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.04em] text-white transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-blue)] disabled:cursor-not-allowed disabled:opacity-70"
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
