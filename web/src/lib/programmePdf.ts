import fs from "fs";
import path from "path";
import { getTour, type Tour } from "./tours";

/**
 * Programme PDFs live outside `public/` on purpose.
 *
 * Anything under `public/` is served directly by its own URL, which would make the
 * gate decorative: the form would ask for a name and email while the file sat at a
 * guessable address. Keeping them here means the only route to the bytes is the POST
 * handler, so there is no public URL to share around or find.
 */
const PDF_DIR = path.join(process.cwd(), "private", "programme-pdfs");

export type ResolvedPdf = { absolutePath: string; downloadName: string };

/**
 * Resolves a requested file to a path on disk, or null.
 *
 * The requested filename is never used to build a path. It is only ever compared
 * against the entries the tour itself declares, and the path is then built from the
 * declared value with its directory component stripped. That is two independent
 * guards against traversal: a request for "../../.env" matches no declared entry, and
 * even a malicious content file could not escape the directory.
 */
export function resolveProgrammePdf(tourSlug: string, file: string): ResolvedPdf | null {
  const tour = getTour(tourSlug);
  if (!tour) return null;

  const entry = tour.programmePdf?.find((p) => p.file === file);
  if (!entry) return null;

  const safeName = path.basename(entry.file);
  const absolutePath = path.join(PDF_DIR, safeName);

  // Belt and braces: confirm the resolved path really is inside the directory.
  const rel = path.relative(PDF_DIR, absolutePath);
  if (rel.startsWith("..") || path.isAbsolute(rel)) return null;

  if (!fs.existsSync(absolutePath)) return null;

  return { absolutePath, downloadName: safeName };
}

/** Whether a tour has at least one PDF actually present on disk. Drives the render
 *  guard: a tour with no file shows no download block, rather than a form that would
 *  collect an email and then fail. */
export function hasProgrammePdf(tour: Tour): boolean {
  return (tour.programmePdf ?? []).some((entry) =>
    fs.existsSync(path.join(PDF_DIR, path.basename(entry.file)))
  );
}

/** The entries that are actually downloadable right now. */
export function availableProgrammePdfs(tour: Tour) {
  return (tour.programmePdf ?? []).filter((entry) =>
    fs.existsSync(path.join(PDF_DIR, path.basename(entry.file)))
  );
}
