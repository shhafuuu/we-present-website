# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000 (Turbopack)
npm run build    # production build — run this to catch type errors across the app
npm run lint     # eslint
npx tsc --noEmit # type-check only, faster than a full build
```

There is no test suite configured yet.

Node.js is not installed via Homebrew on this machine (no `brew`) — it was manually installed to `~/.local/node` and added to `PATH` via `~/.zshrc`. Don't assume `brew`/`nvm` are available for tooling changes.

## Source of truth

`../We-Present-Website-Technical-Specification-v1.7.docx` (one directory above `web/`, outside this project) is the client's technical spec and drives design, copy, and information-architecture decisions — palette, fonts, sitemap, form fields, tour dates, etc. It's a binary `.docx`; read it with:

```bash
textutil -convert txt -stdout "../We-Present-Website-Technical-Specification-v1.7.docx"
```

The raw resort photo/video/logo libraries (e.g. `../Fushifaru Images and Videos/`) also live one directory up and are **not** part of this repo (excluded by the top-level `.gitignore` — they're 5–17GB each). `public/images/` contains only a curated, resized subset copied in via `sips -Z <maxdim> -s format jpeg -s formatOptions 82`. When adding imagery for a new resort or section, pull source files from those sibling folders the same way rather than committing raw originals.

## Architecture

Next.js 16 App Router + TypeScript + Tailwind v4 + Framer Motion. All routes live under `src/app/[locale]/` — `/[locale]`, `/[locale]/about`, `/[locale]/tours`, `/[locale]/tours/[slug]`, `/[locale]/partners`, `/[locale]/contact`, `/[locale]/register`, `/[locale]/become-a-partner`, `/[locale]/resorts/[slug]` — all 4 resorts and both confirmed 2026 tours are built out for both `ru` and `en`. Not yet built: How It Was and Legal as standalone pages — header/footer nav links to these still point to `/[locale]/#section-id` anchors on the home page (`Resorts` and `How It Was` are anchors by design, since there's no standalone listing page for either in the spec).

**Design tokens** live in `src/app/globals.css` as CSS custom properties (`--color-ivory`, `--color-aubergine`, `--color-gold`, etc., matching the spec's palette exactly) re-exposed to Tailwind via `@theme inline`, giving utilities like `bg-ivory`, `text-amethyst`, `bg-aubergine`. Fonts are Playfair Display (`font-display` class, headings) and Manrope (default body sans), both loaded through `next/font/google` in `src/app/layout.tsx`.

**Resort data model** (`src/lib/resorts.ts`) is the single source of truth for the 4 resorts — including `heroImage`, `story` paragraphs, `keyFacts`, and `gallery` array, so `src/app/resorts/[slug]/page.tsx` is fully generic with no per-resort hardcoding. Each entry also has a `built: boolean` and `logoBg: "light" | "dark"` flag:
- `built: false` would render as a non-linked "Coming Soon" card in `ResortsGrid` and skip `generateStaticParams` (404 via `notFound()`) — all 4 are currently `true`, but the flag stays live for adding a 5th resort later without a code change.
- `logoBg` exists because the delivered logo files are inconsistent — some are transparent wordmarks meant for a light background, others (Meyyafushi, Madifushi) are opaque badges or light-on-transparent art meant for a dark background. `PartnersStrip` and the `/partners` page both read this flag. Check a new resort's actual logo file (transparency, foreground color) before assuming a default.

**Tour data model** (`src/lib/tours.ts`) mirrors this pattern for `/tours` and `/tours/[slug]` — `status: "pending"` tours (Oman, 2027) render as non-linked cards; `generateStaticParams` only builds detail pages for `"confirmed"` tours. Tour stops optionally reference a `resortSlug` to link into the resort pages. The home page's `ToursTimeline` reads from this same file rather than duplicating tour data — always add new tours here, not inline in a component.

To add a 5th resort: add curated images to `public/images/resorts/<slug>/` (see the `sips` pattern below), add its full entry to `resorts.ts` (`heroImage`, `story`, `keyFacts`, `gallery`), done — no page code changes needed.

**`Reveal`** (`src/components/Reveal.tsx`) wraps Framer Motion's `whileInView` fade/slide-up and is the standard scroll animation used across every section — reuse it rather than hand-rolling `motion.div` calls, to keep the "slow, refined" motion feel consistent.

## Internationalization (RU/EN)

`src/proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`, same API — see AGENTS.md) redirects any request without a `/ru` or `/en` prefix to `/ru` (default locale, per spec Section 7). `src/i18n/config.ts` defines `locales`, `defaultLocale`, and the `href(locale, path)` helper — **every internal `Link`/`Button` href must be built with `href()`** so it carries the locale prefix; a bare `"/tours"` string will silently drop the user out of their locale.

There is no separate root `layout.tsx` — `src/app/[locale]/layout.tsx` **is** the root layout (sets `<html lang={locale}>`, loads fonts, renders `Header`/`Footer`), since the only top-level route segment is `[locale]`. It calls `generateStaticParams()` to pre-render both locales.

**Two-tier translation content:**
- UI chrome and page copy (nav, buttons, kickers, paragraphs) live in `src/i18n/dictionaries/en.ts` and `ru.ts`. `en.ts` is canonical; `ru.ts` is typed as `Dictionary` (`typeof en`) so a missing key is a compile error, not a silent English fallback. Look up via `getDictionary(locale)` — cheap, synchronous, safe to call in both Server and Client Components (client forms like `InquiryForm`/`ContactForm` take a `locale` prop and call it directly).
- Per-entity content (resort stories/key facts/taglines in `resorts.ts`, tour summaries/stop notes in `tours.ts`) is localized in place as `{ en: ..., ru: ... }` objects, read via each file's own `t()`/`tl()` helper. This is deliberately separate from the dictionaries file since it's data, not UI copy.

**The Russian copy throughout is a first-pass machine/LLM translation** (including `ru.ts` and all resort/tour RU content) — functionally correct and natural-reading, but written without a native Russian-market travel-trade reviewer. Flag this to the client before launch; don't treat it as final.

Cyrillic glyph coverage for Playfair Display and Manrope was verified for real (built and screenshotted a throwaway route rendering Cyrillic text in both fonts before committing to this approach) — safe to keep building on these font choices.

**Known CSS gotcha**: don't let an element with `position: fixed` live inside an ancestor that has `backdrop-filter`/`filter`/`transform` — it changes the fixed element's containing block from the viewport to that ancestor's box, which can silently zero out its size. This bit the mobile nav overlay (it was a child of `<header>`, which has `backdrop-blur-sm`); fixed by rendering the overlay as a sibling of `<header>` instead of a descendant (see `src/components/Header.tsx`).

## Forms

All four forms (`InquiryForm`, `ContactForm`, `RegisterForm`, `PartnerForm`) POST to their own route under `src/app/api/{inquiry,contact,register,partner}/route.ts`, which all call `sendSubmission()` in `src/lib/mailer.ts`. That function always appends the submission to `.submissions/submissions.log` (gitignored) — a local stand-in for the spec's "append every submission to a Google Sheet" backup (Section 9.1) — then, if `GMAIL_USER`/`GMAIL_APP_PASSWORD` env vars are set, sends a real email via Gmail SMTP (Nodemailer) to `NOTIFY_EMAIL` (defaults to `wepresentproject@gmail.com`, a temporary test inbox — will change before real launch). Without those env vars it degrades gracefully: submission still succeeds and logs locally, no email sent. See `.env.local.example` for the exact vars; `GMAIL_APP_PASSWORD` requires 2-Step Verification enabled on the Gmail account first (myaccount.google.com/apppasswords).

**File uploads** (Register's statistics + business card, Partner's images/brochure) are validated server-side in `src/lib/uploads.ts` — extension whitelist (pdf/jpg/jpeg/png/doc/docx/xls/xlsx) and a 15MB cap, per spec Section 8.4. Files are read from the route's `request.formData()` (native Web API, not JSON — these two routes are the only ones that take `multipart/form-data`), saved to `.submissions/uploads/` alongside the log entry, and passed to `sendSubmission()` as Nodemailer `attachments` so they arrive on the notification email directly. This is a stopgap for the spec's private-S3-bucket-plus-secure-link approach (Section 8.4) — fine for testing, not for production launch volume.

**Anti-spam**: `register` and `partner` routes both check a hidden `company_website` honeypot field (rendered off-screen in the form, named plausibly so bots fill it) — if present, the route returns a normal-looking `{ok: true, delivered: false}` without logging or emailing, so bots get no signal they were caught. `inquiry` and `contact` don't have this yet. No rate-limiting anywhere yet (spec Section 8.4 also asks for this).

## Current scope / not yet implemented

- **CMS / hosting**: the Git-based CMS (Decap/Tina), AWS deployment, and Russia-reachability testing from spec Sections 9–10 are unstarted — client is handling domain/hosting setup directly.

## Visual verification

There's no interactive browser in this environment. Playwright (`devDependencies`) plus its Chromium binary are installed for headless screenshot verification — write a throwaway `.mjs` script under `web/` (so it resolves `node_modules`), launch `chromium`, `goto` the dev server, and `page.screenshot()`. Scroll incrementally (e.g. 200–300px steps with short waits) rather than jumping straight to a scroll position — `Reveal`'s `whileInView` triggers are easy to miss with large scroll jumps, producing false-looking "blank section" screenshots that aren't real bugs.
