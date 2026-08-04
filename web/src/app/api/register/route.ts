import { NextResponse } from "next/server";
import { sendSubmission } from "@/lib/mailer";
import { validateUpload, validateUploadBatch, toAttachment } from "@/lib/uploads";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isSubmittedTooFast } from "@/lib/antiSpam";
import { isValidEmail, isWithinLength } from "@/lib/validate";
import { getTour, isWorkshop } from "@/lib/tours";

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

  // Time-trap: a submission filled in and sent faster than a real person could
  // read the form is almost certainly a bot (spec Section 12.2). Same "look
  // successful, log nothing" response as the honeypot, so bots get no signal.
  if (isSubmittedTooFast(form.get("formLoadedAt"))) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const name = form.get("name");
  const agency = form.get("agency");
  const phone = form.get("phone");
  const email = form.get("email");
  const comments = form.get("comments");
  const event = form.get("event");
  const stats = form.get("stats");
  const businessCard = form.get("businessCard");
  const consent = form.get("consent");

  // Resolved here rather than trusted from the client: the form sends a slug, and
  // whether that slug is a workshop decides whether statistics are mandatory.
  const programme = typeof event === "string" && event ? getTour(event) : undefined;
  const workshop = programme ? isWorkshop(programme) : false;

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

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please provide a valid email address." }, { status: 400 });
  }

  if (
    !isWithinLength(name, 200) ||
    !isWithinLength(agency, 200) ||
    !isWithinLength(phone, 50) ||
    (typeof comments === "string" && !isWithinLength(comments, 5000))
  ) {
    return NextResponse.json({ ok: false, error: "One or more fields are too long." }, { status: 400 });
  }

  // The business card is always required. Statistics are not required for a workshop:
  // attendance is complimentary and open to agents generally, so there is no agency
  // performance to assess. Tour registrations are unchanged, and still require both.
  if (!(businessCard instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "A business card upload is required." },
      { status: 400 }
    );
  }

  if (!workshop && !(stats instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "Statistics and business card uploads are required." },
      { status: 400 }
    );
  }

  // A workshop submission may still carry statistics if the visitor changed their
  // selection after attaching one, so validate whatever actually arrived.
  const files = [businessCard, ...(stats instanceof File ? [stats] : [])];

  const batchError = validateUploadBatch(files);
  if (batchError) return NextResponse.json({ ok: false, error: batchError }, { status: 400 });

  for (const file of files) {
    const error = await validateUpload(file);
    if (error) return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  // English name, deliberately: this is read by the team, not by the visitor.
  const programmeName = programme ? programme.name.en : "No specific programme";
  const kind = workshop ? "Workshop registration" : "Agent registration";

  const result = await sendSubmission({
    subject: `${programmeName} · ${kind} from ${agency}`,
    replyTo: email,
    fields: {
      Programme: programmeName,
      "Registration type": kind,
      "Full Name": name,
      "Agency / Company": agency,
      Phone: phone,
      Email: email,
      Comments: typeof comments === "string" ? comments : "",
    },
    attachments: [
      ...(stats instanceof File
        ? [{ ...(await toAttachment(stats)), filename: `statistics-${stats.name}` }]
        : []),
      { ...(await toAttachment(businessCard)), filename: `business-card-${businessCard.name}` },
    ],
  });

  return NextResponse.json({ ok: true, delivered: result.delivered });
}
