type Bucket = { count: number; resetAt: number };

// In-memory, per-server-process only — resets on every deploy/restart and doesn't
// share state across multiple instances (e.g. serverless or multi-region hosting).
// Fine for this site's current traffic and hosting (a single Node process), but
// swap for a shared store (Redis, Upstash, DynamoDB) if that changes before launch.
// Spec Section 8.4 just asks for "rate-limiting" with no specific backend.
const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const SWEEP_THRESHOLD = 10_000;

function sweepExpired(now: number) {
  if (buckets.size < SWEEP_THRESHOLD) return;
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key);
  }
}

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  sweepExpired(now);

  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
