import fs from "fs";
import { NextResponse } from "next/server";
import { sendSubmission } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isSubmittedTooFast } from "@/lib/antiSpam";
import { isValidEmail, isWithinLength } from "@/lib/validate";
import { resolveProgrammePdf } from "@/lib/programmePdf";
import { getTour } from "@/lib/tours";

/**
 * Gated programme-PDF download.
 *
 * POST only, and the response body is the file itself. There is deliberately no GET
 * handler and no public path, so the only way to the bytes is through this validation.
 *
 * The gate earns its friction: every download becomes a qualified lead the team can
 * follow up, and it shows which tours are attracting interest before dates are even
 * published. An open download gives away the same material and returns nothing.
 */
export async function POST(request: Request) {
  const { allowed, retryAfterSeconds } = checkRateLimit(
    `programme-pdf:${getClientIp(request)}`
  );
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, tourSlug, file, company_website, formLoadedAt } = body as Record<
    string,
    string | number | boolean
  >;

  // Honeypot and time-trap behave as they do on the other four routes: look
  // successful, deliver nothing. Here that means no file, which is the point.
  if (company_website) {
    return NextResponse.json({ ok: true, delivered: false });
  }
  if (isSubmittedTooFast(formLoadedAt)) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (!name || !email || !tourSlug || !file) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 400 }
    );
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (
    typeof name !== "string" ||
    !isWithinLength(name, 200) ||
    typeof tourSlug !== "string" ||
    !isWithinLength(tourSlug, 100) ||
    typeof file !== "string" ||
    !isWithinLength(file, 200)
  ) {
    return NextResponse.json({ ok: false, error: "One or more fields are too long." }, { status: 400 });
  }

  // Resolves only against files the tour itself declares. An unknown tour, an
  // undeclared filename or a traversal attempt all land here as a flat 404, with no
  // hint as to which of the three it was.
  const resolved = resolveProgrammePdf(tourSlug, file);
  if (!resolved) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const tour = getTour(tourSlug);

  // Record the lead before serving. Which tour and which file were requested is the
  // reason the gate exists, so both are captured.
  await sendSubmission({
    subject: `We Present · Programme PDF requested (${tour?.name.en ?? tourSlug})`,
    replyTo: email,
    fields: {
      "Full Name": name,
      Email: email,
      Tour: tour?.name.en ?? tourSlug,
      "Tour slug": tourSlug,
      File: resolved.downloadName,
    },
  });

  const bytes = await fs.promises.readFile(resolved.absolutePath);

  return new NextResponse(new Uint8Array(bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${resolved.downloadName}"`,
      // Never cached by a shared cache: the response is gated per submission.
      "Cache-Control": "private, no-store",
    },
  });
}
