import { NextResponse } from "next/server";
import { sendSubmission } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const { allowed, retryAfterSeconds } = checkRateLimit(`inquiry:${getClientIp(request)}`);
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

  const { name, agency, email, phone, message, hotel, company_website } = body as Record<
    string,
    string
  >;

  // Honeypot: real users never fill this hidden field (spec Section 8.4 anti-spam).
  if (company_website) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (!name || !email || !hotel) {
    return NextResponse.json(
      { ok: false, error: "Name, email and hotel are required." },
      { status: 400 }
    );
  }

  const result = await sendSubmission({
    subject: `We Present · Inquiry for ${hotel}`,
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
