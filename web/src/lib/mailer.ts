import nodemailer from "nodemailer";
import { appendFile, mkdir, writeFile } from "fs/promises";
import path from "path";

const NOTIFY_TO = process.env.NOTIFY_EMAIL || "wepresentproject@gmail.com";
const LOG_DIR = path.join(process.cwd(), ".submissions");
const UPLOADS_DIR = path.join(LOG_DIR, "uploads");

export type Attachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

type MailInput = {
  subject: string;
  replyTo?: string;
  fields: Record<string, string>;
  attachments?: Attachment[];
};

function renderText(fields: Record<string, string>) {
  return Object.entries(fields)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

async function logLocally(input: MailInput) {
  await mkdir(LOG_DIR, { recursive: true });

  let savedFiles: string[] = [];
  if (input.attachments?.length) {
    await mkdir(UPLOADS_DIR, { recursive: true });
    savedFiles = await Promise.all(
      input.attachments.map(async (file) => {
        const safeName = `${Date.now()}-${file.filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        await writeFile(path.join(UPLOADS_DIR, safeName), file.content);
        return safeName;
      })
    );
  }

  const line =
    JSON.stringify({
      at: new Date().toISOString(),
      subject: input.subject,
      replyTo: input.replyTo,
      fields: input.fields,
      savedFiles,
    }) + "\n";
  await appendFile(path.join(LOG_DIR, "submissions.log"), line, "utf8");
}

export async function sendSubmission(input: MailInput) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  // Always keep a local durable record — stands in for the spec's
  // "append every submission to a Google Sheet" backup (Section 9.1)
  // until that's wired up. Uploaded files are saved to .submissions/uploads/
  // as a stopgap for the spec's private S3 bucket (Section 8.4).
  await logLocally(input);

  if (!user || !pass) {
    console.log(
      `[mailer] GMAIL_USER/GMAIL_APP_PASSWORD not set — logged submission locally only (.submissions/submissions.log). Subject: "${input.subject}"`
    );
    return { delivered: false, reason: "not-configured" as const };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"We Present — Website" <${user}>`,
    to: NOTIFY_TO,
    replyTo: input.replyTo,
    subject: input.subject,
    text: renderText(input.fields),
    attachments: input.attachments,
  });

  return { delivered: true as const };
}
