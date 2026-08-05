/**
 * Shared pieces of the Decap CMS GitHub OAuth handshake (WO-63).
 *
 * Decap's GitHub backend has no server of its own: it opens a popup at
 * `<base_url>/<auth_endpoint>`, expects that popup to end up holding a GitHub access
 * token, and receives the token by `postMessage`. The token exchange needs the OAuth
 * app's client *secret*, which can never reach a browser, so the two route handlers at
 * `/api/auth` and `/api/callback` exist purely to keep that secret server-side.
 *
 * The exact message protocol below was read out of the Decap 3 bundle rather than
 * assumed — see `handshakeCallback` / `authorizeCallback` in decap-cms.js:
 *
 *   1. popup  -> opener:  "authorizing:github"
 *   2. opener -> popup:   the same string, echoed back
 *   3. popup  -> opener:  "authorization:github:success:" + JSON.stringify({ token, provider })
 *
 * The opener discards any message whose `event.origin` is not exactly its configured
 * `base_url`, so SITE_URL must match the site's own origin with no trailing slash.
 */

export const PROVIDER = "github";
export const STATE_COOKIE = "decap_oauth_state";

/**
 * GitHub scopes Decap is allowed to ask for. The scope arrives as a query parameter on
 * a public endpoint, so it is matched against this list rather than passed through —
 * otherwise anyone could send an editor through a consent screen for `delete_repo`.
 */
const ALLOWED_SCOPES = new Set(["repo", "public_repo"]);

export type CmsAuthConfig = {
  clientId: string;
  clientSecret: string;
  siteUrl: string;
};

/**
 * Reads and validates the three environment variables the flow needs. Returns a
 * message instead of throwing, so a misconfigured deploy shows the editor something
 * actionable rather than an unexplained 500.
 */
export function readConfig(): { config: CmsAuthConfig } | { error: string } {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  const siteUrl = process.env.SITE_URL;

  const missing = [
    !clientId && "GITHUB_OAUTH_CLIENT_ID",
    !clientSecret && "GITHUB_OAUTH_CLIENT_SECRET",
    !siteUrl && "SITE_URL",
  ].filter(Boolean);

  if (missing.length) {
    return {
      error: `Content portal login is not configured: missing ${missing.join(", ")}.`,
    };
  }

  let origin: string;
  try {
    // Normalise to a bare origin: Decap compares it against `event.origin`, which never
    // carries a path or a trailing slash.
    origin = new URL(siteUrl!).origin;
  } catch {
    return { error: `SITE_URL is not a valid URL: ${siteUrl}` };
  }

  return {
    config: { clientId: clientId!, clientSecret: clientSecret!, siteUrl: origin },
  };
}

export function resolveScope(requested: string | null): string {
  return requested && ALLOWED_SCOPES.has(requested) ? requested : "repo";
}

/** Cookies must only carry the Secure attribute over HTTPS, or local http dev drops them. */
export function isSecureOrigin(siteUrl: string): boolean {
  return siteUrl.startsWith("https://");
}

/**
 * Constant-time comparison for the CSRF state value, so a mismatch cannot be narrowed
 * down by timing the response.
 */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Escapes a string for embedding inside a <script> block in an HTML document. */
function forScript(value: string): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    // U+2028/U+2029 are valid inside JSON but terminate a line in JavaScript source,
    // so they would break the inline script. Written as escapes, not literal characters,
    // for exactly the same reason — literals break this file's own parser.
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * The page the popup lands on. It performs the three-step handshake and then closes
 * itself.
 *
 * `postMessage` targets SITE_URL explicitly and never "*": the popup is opened by
 * whatever page linked to it, and a wildcard target would hand the access token to any
 * origin that managed to open this window.
 */
export function handshakePage(
  siteUrl: string,
  result: { token: string } | { error: string },
): string {
  const payload =
    "token" in result
      ? `authorization:${PROVIDER}:success:` +
        JSON.stringify({ token: result.token, provider: PROVIDER })
      : `authorization:${PROVIDER}:error:` +
        JSON.stringify({ message: result.error });

  const humanMessage =
    "token" in result
      ? "Signing you in to the content portal…"
      : "Could not sign you in.";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<title>We Present — content portal</title>
<style>
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
         font:15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
         color:#3B2247; background:#FBF8F3; }
  p { max-width:34em; padding:0 1.5rem; text-align:center; }
</style>
</head>
<body>
<p>${humanMessage}</p>
<script>
(function () {
  var origin = ${forScript(siteUrl)};
  var payload = ${forScript(payload)};

  function post(message) {
    if (window.opener) window.opener.postMessage(message, origin);
  }

  // Step 3: only after the opener has echoed step 1 back do we send the token, which
  // proves the listener on the other end is the CMS and not an unrelated page.
  function onEcho(event) {
    if (event.origin !== origin) return;
    window.removeEventListener("message", onEcho, false);
    post(payload);
    setTimeout(function () { window.close(); }, 600);
  }

  window.addEventListener("message", onEcho, false);
  post("authorizing:${PROVIDER}");
})();
</script>
</body>
</html>`;
}
