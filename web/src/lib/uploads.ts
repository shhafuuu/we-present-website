import type { Attachment } from "./mailer";

export const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB, per spec Section 8.4
export const MAX_FILES_PER_SUBMISSION = 5;
export const MAX_TOTAL_SIZE = 40 * 1024 * 1024; // 40MB combined, per spec Section 12.2 upload hardening

const ALLOWED_EXTENSIONS = ["pdf", "jpg", "jpeg", "png", "doc", "docx", "xls", "xlsx"];

// Magic-byte (file signature) checks — per spec Section 12.2, never trust the
// client-supplied extension or file.type alone, since both are just attacker-
// controlled labels. .doc/.xls (legacy OLE2) share one signature, and
// .docx/.xlsx (both OOXML-in-a-zip) share another — that's a real limit of
// signature checking, not a bug: it proves "this is genuinely an OLE2/zip
// container", not the exact sub-type, which is the standard, practical depth
// for this kind of check.
const SIGNATURES: Record<string, number[][]> = {
  pdf: [[0x25, 0x50, 0x44, 0x46]], // %PDF
  jpg: [[0xff, 0xd8, 0xff]],
  jpeg: [[0xff, 0xd8, 0xff]],
  png: [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  doc: [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]],
  xls: [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]],
  docx: [
    [0x50, 0x4b, 0x03, 0x04],
    [0x50, 0x4b, 0x05, 0x06],
    [0x50, 0x4b, 0x07, 0x08],
  ],
  xlsx: [
    [0x50, 0x4b, 0x03, 0x04],
    [0x50, 0x4b, 0x05, 0x06],
    [0x50, 0x4b, 0x07, 0x08],
  ],
};

function matchesSignature(bytes: Uint8Array, signature: number[]): boolean {
  if (bytes.length < signature.length) return false;
  return signature.every((byte, i) => bytes[i] === byte);
}

async function hasValidSignature(file: File, ext: string): Promise<boolean> {
  const signatures = SIGNATURES[ext];
  if (!signatures) return false;
  const head = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  return signatures.some((sig) => matchesSignature(head, sig));
}

export async function validateUpload(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
    return `"${file.name}" is not an allowed file type (PDF, JPG, PNG, DOC(X), XLS(X) only).`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `"${file.name}" is larger than the 15MB limit.`;
  }
  if (!(await hasValidSignature(file, ext))) {
    return `"${file.name}" doesn't look like a valid ${ext.toUpperCase()} file.`;
  }
  return null;
}

export function validateUploadBatch(files: File[]): string | null {
  if (files.length > MAX_FILES_PER_SUBMISSION) {
    return `Too many files attached (max ${MAX_FILES_PER_SUBMISSION}).`;
  }
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_TOTAL_SIZE) {
    return `Attached files are too large combined (max ${MAX_TOTAL_SIZE / (1024 * 1024)}MB total).`;
  }
  return null;
}

export async function toAttachment(file: File): Promise<Attachment> {
  const buffer = Buffer.from(await file.arrayBuffer());
  // file.type is client-supplied and untrusted for validation (already checked via
  // magic bytes above) — still fine to pass through here, it only affects how the
  // attachment is labeled in the notification email, not any security decision.
  return { filename: file.name, content: buffer, contentType: file.type };
}
