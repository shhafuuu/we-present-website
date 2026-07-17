import { NextResponse } from "next/server";
import { sendSubmission } from "@/lib/mailer";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, inquiryType, message, consent } = body as Record<
    string,
    string | boolean
  >;

  if (!name || !email || !message || !consent) {
    return NextResponse.json(
      { ok: false, error: "Name, email, message and consent are required." },
      { status: 400 }
    );
  }

  const result = await sendSubmission({
    subject: `We Present — contact form (${inquiryType || "General"})`,
    replyTo: String(email),
    fields: {
      "Full Name": String(name),
      Email: String(email),
      Phone: String(phone ?? ""),
      "Inquiry Type": String(inquiryType ?? "General"),
      Message: String(message),
    },
  });

  return NextResponse.json({ ok: true, delivered: result.delivered });
}
