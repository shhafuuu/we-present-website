import { NextResponse } from "next/server";
import { sendSubmission } from "@/lib/mailer";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const { name, agency, email, phone, message, hotel } = body as Record<string, string>;

  if (!name || !email || !hotel) {
    return NextResponse.json(
      { ok: false, error: "Name, email and hotel are required." },
      { status: 400 }
    );
  }

  const result = await sendSubmission({
    subject: `We Present — inquiry for ${hotel}`,
    replyTo: email,
    fields: {
      Hotel: hotel,
      "Full Name": name,
      "Agency / Company": agency ?? "",
      Email: email,
      Phone: phone ?? "",
      Message: message ?? "",
    },
  });

  return NextResponse.json({ ok: true, delivered: result.delivered });
}
