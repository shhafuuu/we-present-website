// Submission time-trap (spec Section 12.2): a real visitor needs at least a couple
// of seconds to read the form and type into it, so anything arriving faster than
// this is almost certainly a bot filling every field programmatically the instant
// the page loads. Each form records its own mount time in a hidden field
// (formLoadedAt) and the value round-trips back on submit.
export const MIN_SUBMIT_MS = 2000;

export function isSubmittedTooFast(loadedAt: unknown): boolean {
  const ts = typeof loadedAt === "string" ? Number(loadedAt) : typeof loadedAt === "number" ? loadedAt : NaN;
  // Missing or malformed timestamp: don't apply the trap. The honeypot field
  // already covers bots that skip fields entirely; this avoids false-blocking a
  // real visitor over a client-side quirk we can't otherwise explain.
  if (!Number.isFinite(ts)) return false;
  return Date.now() - ts < MIN_SUBMIT_MS;
}
