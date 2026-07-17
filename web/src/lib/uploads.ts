import type { Attachment } from "./mailer";

export const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB, per spec Section 8.4
const ALLOWED_EXTENSIONS = ["pdf", "jpg", "jpeg", "png", "doc", "docx", "xls", "xlsx"];

export function validateUpload(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
    return `"${file.name}" is not an allowed file type (PDF, JPG, PNG, DOC(X), XLS(X) only).`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `"${file.name}" is larger than the 15MB limit.`;
  }
  return null;
}

export async function toAttachment(file: File): Promise<Attachment> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return { filename: file.name, content: buffer, contentType: file.type };
}
