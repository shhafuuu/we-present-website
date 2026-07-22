import { NextResponse } from "next/server";
import { sendSubmission } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const { allowed, retryAfterSeconds } = checkRateLimit(`contact:${getClientIp(request)}`);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, inquiryType, message, consent, company_website } = body as Record<
    string,
    string | boolean
  >;

  // Honeypot: real users never fill this hidden field (spec Section 8.4 anti-spam).
  if (company_website) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (!name || !email || !message || !consent) {
    return NextResponse.json(
      { ok: false, error: "Name, email, message and consent are required." },
      { status: 400 }
    );
  }

  const result = await sendSubmission({
    subject: `We Present · Contact form (${inquiryType || "General"})`,
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
