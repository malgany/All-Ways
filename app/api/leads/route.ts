import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Payload inválido." },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      {
        ok: false,
        message: "Revise os dados informados.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Integração indisponível no momento. Configure WEBHOOK_URL no ambiente.",
      },
      { status: 500 },
    );
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...parsed.data,
        submittedAt: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Não foi possível registrar seu lead agora. Tente novamente em instantes.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Recebemos seus dados. Em breve entraremos em contato.",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Falha de conexão com a integração de leads.",
      },
      { status: 502 },
    );
  }
}
