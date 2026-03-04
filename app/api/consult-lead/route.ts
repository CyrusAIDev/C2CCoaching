import { NextResponse } from "next/server"

type ConsultLeadPayload = {
  firstName?: string
  email?: string
  phone?: string
  roleTarget?: string
  visa?: string
  linkedinUrl?: string
  resumeLink?: string
  source?: string
}

export async function POST(req: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "Server misconfiguration: missing webhook URL." },
      { status: 500 }
    )
  }

  let payload: ConsultLeadPayload
  try {
    payload = (await req.json()) as ConsultLeadPayload
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 }
    )
  }

  const firstName = payload.firstName?.trim() ?? ""
  const email = payload.email?.trim() ?? ""

  if (!firstName || !email) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields: firstName and email." },
      { status: 400 }
    )
  }

  const webhookPayload = {
    first_name: firstName,
    email,
    phone: payload.phone?.trim() ?? "",
    role_target: payload.roleTarget?.trim() ?? "",
    visa_status: payload.visa?.trim() ?? "",
    linkedin_url: payload.linkedinUrl?.trim() ?? "",
    resume_link: payload.resumeLink?.trim() ?? "",
    source: payload.source?.trim() ?? "consult_form",
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { ok: false, error: `Webhook error (${response.status}): ${errorText || "Unknown error"}` },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to connect to webhook." },
      { status: 502 }
    )
  }
}
