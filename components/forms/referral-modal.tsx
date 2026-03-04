"use client";

import { useState } from "react";
import { offer } from "@/lib/content";

const PHONE_MAX_DIGITS = 11;

function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, PHONE_MAX_DIGITS);
    if (!digits) return "";
    if (digits.length < 3) return `(${digits}`;
    if (digits.length < 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function ReferralModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [phone, setPhone] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API request
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);

            // Close after showing success
            setTimeout(() => {
                setIsOpen(false);
                setSubmitted(false);
                setPhone("");
            }, 3000);
        }, 1000);
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
                    <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-200 rounded-2xl bg-white p-6 shadow-2xl sm:p-8 text-left">
                        <button
                            onClick={() => setIsOpen(false)}
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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-2xl font-black uppercase text-[var(--brand-navy)]">Sucesso!</h3>
                                <p className="text-sm text-gray-600">
                                    Anotamos sua indicação. Entraremos em contato com seu amigo em breve.
                                </p>
                            </div>
                        ) : (
                            <>
                                <h3 className="mb-2 text-2xl font-black uppercase text-[var(--brand-red)]">Indicar um Amigo</h3>
                                <p className="mb-6 text-sm text-gray-600">
                                    Preencha os dados abaixo. Ao realizar a matrícula, vocês dois ganham 100% de gratuidade!
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
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-[var(--brand-red)] focus:ring-1 focus:ring-[var(--brand-red)] text-gray-800"
                                                placeholder="Seu nome"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                required
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-[var(--brand-red)] focus:ring-1 focus:ring-[var(--brand-red)] text-gray-800"
                                                placeholder="Seu e-mail"
                                            />
                                        </div>
                                        <div
                                            className="flex overflow-hidden rounded-lg border border-gray-300 bg-white transition focus-within:border-[var(--brand-red)] focus-within:ring-1 focus-within:ring-[var(--brand-red)]"
                                        >
                                            <span className="inline-flex items-center justify-center border-r border-gray-300 bg-gray-50 px-3 text-sm font-bold text-gray-600">
                                                +55
                                            </span>
                                            <input
                                                type="tel"
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(formatPhone(e.target.value))}
                                                className="w-full px-4 py-2.5 outline-none text-gray-800 placeholder:text-gray-400"
                                                placeholder="DDD + WhatsApp"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="border-b border-gray-100 pb-2 text-xs font-bold uppercase tracking-wider text-[var(--brand-navy)]">
                                            Dados do Amigo
                                        </p>
                                        <div>
                                            <input
                                                type="text"
                                                required
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-[var(--brand-red)] focus:ring-1 focus:ring-[var(--brand-red)] text-gray-800"
                                                placeholder="Nome do amigo"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                required
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-[var(--brand-red)] focus:ring-1 focus:ring-[var(--brand-red)] text-gray-800"
                                                placeholder="Telefone ou e-mail do amigo"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="mt-6 w-full cursor-pointer rounded-full bg-[var(--brand-red)] py-3.5 text-sm font-extrabold uppercase tracking-wider text-white transition hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
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
