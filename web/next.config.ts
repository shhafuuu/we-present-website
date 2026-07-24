import type { NextConfig } from "next";

// decap-server's local filesystem proxy (npx decap-server, run alongside `npm run
// dev` — see the "Content portal" section in CLAUDE.md) only exists in local dev;
// only loosen connect-src for it outside production so the prod CSP stays tight.
const isDev = process.env.NODE_ENV !== "production";

// Deliberately NOT using a nonce-based CSP: per Next's own docs
// (node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md),
// nonces require every page to be dynamically rendered — no static generation, no
// CDN caching — which would gut the SSG architecture this entire site relies on
// (every route is prebuilt via generateStaticParams) for a marginal security gain
// this app doesn't need: no user-submitted content is ever rendered back into a
// page anywhere on the site (forms only ever go to email), so there's no
// stored/reflected-XSS surface for 'unsafe-inline' script execution to exploit.
// This matches Next's own documented "Without Nonces" recommendation for apps
// that don't require nonces. 'unsafe-inline' unblocks Next/React's own
// framework-injected inline bootstrap scripts (confirmed live — without it,
// hydration fails entirely with "Invariant: Expected a request ID to be defined
// ... self.__next_r"); 'unsafe-eval' is dev-only, required for React's dev-mode
// stack-trace reconstruction per the same Next docs, and is never sent in prod.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://unpkg.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " http://localhost:8081" : ""}`,
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // No-op over plain HTTP (browsers ignore HSTS on non-TLS responses), so safe to
  // always send — takes effect the moment the site is served over HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Resort partner logos are delivered as SVG (transparent vector art) — Next's
    // image optimizer blocks SVG by default since an untrusted SVG can embed
    // <script> tags. The mitigations below are Next's own documented pairing for
    // this flag: served SVGs get a strict per-response CSP (no scripts at all)
    // and a forced download disposition, so even a malicious SVG uploaded later
    // via the CMS can't execute in the browser. All current logo SVGs are
    // static, hand-verified, script-free vector art, not untrusted uploads.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async rewrites() {
    return [
      // The content portal (public/admin/index.html) is a static file, and
      // Next.js's public-folder serving only matches exact filenames — it
      // doesn't resolve a directory request to its index.html the way a
      // conventional static host would. Rewrite the bare /admin path editors
      // will actually type to the real file.
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
