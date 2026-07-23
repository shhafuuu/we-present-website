import { NextResponse } from "next/server";
import { sendSubmission } from "@/lib/mailer";
import { validateUpload, validateUploadBatch, toAttachment } from "@/lib/uploads";
import type { Attachment } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isSubmittedTooFast } from "@/lib/antiSpam";
import { isValidEmail, isWithinLength } from "@/lib/validate";

export async function POST(request: Request) {
  const { allowed, retryAfterSeconds } = checkRateLimit(`partner:${getClientIp(request)}`);
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

  // Time-trap: same "look successful, log nothing" response as the honeypot.
  if (isSubmittedTooFast(form.get("formLoadedAt"))) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const hotelName = form.get("hotelName");
  const contactPerson = form.get("contactPerson");
  const email = form.get("email");
  const phone = form.get("phone");
  const website = form.get("website");
  const message = form.get("message");
  const files = form.getAll("files").filter((f): f is File => f instanceof File);

  if (
    typeof hotelName !== "string" || !hotelName ||
    typeof contactPerson !== "string" || !contactPerson ||
    typeof email !== "string" || !email
  ) {
    return NextResponse.json(
      { ok: false, error: "Hotel name, contact person and email are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please provide a valid email address." }, { status: 400 });
  }

  if (
    !isWithinLength(hotelName, 200) ||
    !isWithinLength(contactPerson, 200) ||
    (typeof phone === "string" && !isWithinLength(phone, 50)) ||
    (typeof website === "string" && !isWithinLength(website, 500)) ||
    (typeof message === "string" && !isWithinLength(message, 5000))
  ) {
    return NextResponse.json({ ok: false, error: "One or more fields are too long." }, { status: 400 });
  }

  const batchError = validateUploadBatch(files);
  if (batchError) return NextResponse.json({ ok: false, error: batchError }, { status: 400 });

  for (const file of files) {
    const error = await validateUpload(file);
    if (error) return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  const attachments: Attachment[] = await Promise.all(files.map(toAttachment));

  const result = await sendSubmission({
    subject: `We Present · Partnership request from ${hotelName}`,
    replyTo: email,
    fields: {
      "Hotel / Company": hotelName,
      "Contact Person": contactPerson,
      Email: email,
      Phone: typeof phone === "string" ? phone : "",
      Website: typeof website === "string" ? website : "",
      Message: typeof message === "string" ? message : "",
    },
    attachments,
  });

  return NextResponse.json({ ok: true, delivered: result.delivered });
}
