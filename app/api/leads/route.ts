import { NextResponse } from "next/server";
import {
  buildCrmLeadPayload,
  getLeadSuccessMessage,
} from "@/lib/lead-integration";
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

  const ingestUrl = process.env.CRM_SIMPLE_INGEST_URL;
  const ingestToken = process.env.CRM_SIMPLE_INGEST_TOKEN;

  if (!ingestUrl || !ingestToken) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Integração indisponível no momento. Configure CRM_SIMPLE_INGEST_URL e CRM_SIMPLE_INGEST_TOKEN.",
      },
      { status: 500 },
    );
  }

  try {
    const submittedAt = new Date().toISOString();
    const crmResponse = await fetch(ingestUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ingestToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildCrmLeadPayload(parsed.data, submittedAt)),
      cache: "no-store",
    });

    let crmPayload: { message?: string; ok?: boolean } | null = null;

    try {
      crmPayload = (await crmResponse.json()) as {
        message?: string;
        ok?: boolean;
      };
    } catch {
      crmPayload = null;
    }

    if (!crmResponse.ok || !crmPayload?.ok) {
      return NextResponse.json(
        {
          ok: false,
          message:
            crmPayload?.message ||
            "Não foi possível registrar seu lead agora. Tente novamente em instantes.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: getLeadSuccessMessage(parsed.data.source),
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
