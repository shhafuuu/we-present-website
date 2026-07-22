import { NextResponse } from "next/server";
import { sendSubmission } from "@/lib/mailer";
import { validateUpload, toAttachment } from "@/lib/uploads";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const { allowed, retryAfterSeconds } = checkRateLimit(`register:${getClientIp(request)}`);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field (spec Section 8.4 anti-spam).
  if (form.get("company_website")) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const name = form.get("name");
  const agency = form.get("agency");
  const phone = form.get("phone");
  const email = form.get("email");
  const comments = form.get("comments");
  const stats = form.get("stats");
  const businessCard = form.get("businessCard");
  const consent = form.get("consent");

  if (
    typeof name !== "string" || !name ||
    typeof agency !== "string" || !agency ||
    typeof phone !== "string" || !phone ||
    typeof email !== "string" || !email ||
    !consent
  ) {
    return NextResponse.json(
      { ok: false, error: "Name, agency, phone, email and consent are required." },
      { status: 400 }
    );
  }

  if (!(stats instanceof File) || !(businessCard instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "Statistics and business card uploads are required." },
      { status: 400 }
    );
  }

  for (const file of [stats, businessCard]) {
    const error = validateUpload(file);
    if (error) return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  const result = await sendSubmission({
    subject: `We Present 2027 · Agent registration from ${agency}`,
    replyTo: email,
    fields: {
      "Full Name": name,
      "Agency / Company": agency,
      Phone: phone,
      Email: email,
      Comments: typeof comments === "string" ? comments : "",
    },
    attachments: [
      { ...(await toAttachment(stats)), filename: `statistics-${stats.name}` },
      { ...(await toAttachment(businessCard)), filename: `business-card-${businessCard.name}` },
    ],
  });

  return NextResponse.json({ ok: true, delivered: result.delivered });
}
