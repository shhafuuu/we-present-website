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

Next.js 16 App Router + TypeScript + Tailwind v4 + Framer Motion. All routes live under `src/app/[locale]/` — `/[locale]`, `/[locale]/about`, `/[locale]/tours`, `/[locale]/tours/[slug]`, `/[locale]/partners`, `/[locale]/contact`, `/[locale]/register`, `/[locale]/become-a-partner`, `/[locale]/how-it-was`, `/[locale]/legal`, `/[locale]/resorts/[slug]` — the full spec sitemap is now built out for both `ru` and `en`. `Resorts` is the only nav item still an anchor (`/[locale]/#resorts` on the home page) since the spec has no standalone resorts-listing page — the grid lives on Home.

The Legal page's privacy-policy copy (`dict.legalPage`) is an honest first-pass draft, not lawyer-reviewed — it says so on the page itself (`draftNotice`) and is written to describe what the site *actually* does right now (forms → Coati team + local log, no analytics yet) rather than the eventual AWS/S3/analytics end-state from the spec, so it doesn't overclaim infrastructure that doesn't exist yet. Update it as real infra (S3 uploads, Yandex.Metrica/GA, defined retention periods) comes online — don't just relax the draft-notice wording without also updating the substance.

The How It Was page intentionally has no images — the spec (Section 6.9) calls for photo galleries, trip reports, and reviews, but none exist yet since 2026 is the launch season. It follows the same "elegant coming-soon, never looks empty" pattern as the Home teaser, just with a full 4-section breakdown (Photo Galleries / Trip Reports / Agent Reviews / Hotel Partner Reviews) instead of one card. When real tours complete, this is the page to convert from static dictionary copy to portal-managed content.

**Design tokens** live in `src/app/globals.css` as CSS custom properties (`--color-ivory`, `--color-aubergine`, `--color-gold`, etc., matching the spec's palette exactly) re-exposed to Tailwind via `@theme inline`, giving utilities like `bg-ivory`, `text-amethyst`, `bg-aubergine`. Fonts are Playfair Display (`font-display` class, headings) and Manrope (default body sans), both loaded through `next/font/google` in `src/app/layout.tsx`.

**Resort data model** (`src/lib/resorts.ts`) is the single source of truth for the 4 resorts — including `heroImage`, `heroVideo`, `story` paragraphs, `keyFacts`, and `gallery` array, so `src/app/resorts/[slug]/page.tsx` is fully generic with no per-resort hardcoding. Each entry also has a `built: boolean` and `logoBg: "none" | "dark"` flag:
- `built: false` would render as a non-linked "Coming Soon" card in `ResortsGrid` and skip `generateStaticParams` (404 via `notFound()`) — all 4 are currently `true`, but the flag stays live for adding a 5th resort later without a code change.
- `logoBg` exists because the delivered logo files aren't uniform: some are transparent wordmarks/marks that read fine directly against any light section background ("none" — SO/Maldives, Fushifaru), one already has its own solid-black background baked into the PNG itself ("none" — Meyyafushi, since the image *is* the card, no wrapper needed), and one is light-colored art on a transparent background that's invisible without a dark backdrop ("dark" — Madifushi, wrapped in a small aubergine pill). `PartnersStrip` and the `/partners` page both branch on this flag. Logos render at a shared height via a fixed bounding box (`relative h-14 w-32` + `fill` + `object-contain`) rather than sized to each logo's own aspect ratio — an earlier attempt at "auto-width, shared height" made the extremely wide SO/Maldives wordmark dwarf the square marks next to it. Check a new resort's actual logo file (transparency, aspect ratio, background) before assuming a default.

**Hero videos**: each resort's hero section plays a short (~7-8s) looped, muted `<video>` cut from that resort's official brand video, with `heroImage` as the `poster` fallback. Source footage lives in the sibling raw asset folders (e.g. `../Fushifaru Images and Videos/FF Brand Video.mov`, 4K/200MB+) and is NOT in the repo; `public/videos/<slug>-hero.mp4` holds only the trimmed, 1080p, ~3-6MB encoded output. `ffmpeg` isn't installed on this machine — it's pulled in as the `ffmpeg-static` npm package (`node_modules/ffmpeg-static/ffmpeg`), not a system binary. To re-cut a clip: extract 1fps preview frames (`ffmpeg -i src -vf fps=1,scale=320:-1 out_%02d.jpg`) or tile them into one contact-sheet image (`-vf tile=8x8`) to find a good window fast, since these source videos are 30s-2min and a good moment isn't obvious from the filename. Then trim + re-encode: `ffmpeg -ss <start> -i src -t <duration> -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" -an -c:v libx264 -crf 26 -preset veryfast -movflags +faststart out.mp4`. Watch for burned-in captions in the source footage (Meyyafushi and Madifushi's official videos have on-screen text like "A touch of tranquility" in some sections) — avoid those windows since our own page copy overlays the video already.

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

**Header nav breakpoint**: the full desktop nav (6 links + Become a Partner + Register Interest + language switch) only fits comfortably from `xl` (1280px) up — it was originally `lg` (1024px), but at 1024-1279px the logo's "BY COATI TRAVEL" byline wraps and collides with the first nav link. The hamburger menu now covers everything below `xl`. If you add another nav item, re-check this breakpoint with real screenshots at 1024/1279/1280/1440 rather than assuming — it's tight even at 1280.

## Forms

All four forms (`InquiryForm`, `ContactForm`, `RegisterForm`, `PartnerForm`) POST to their own route under `src/app/api/{inquiry,contact,register,partner}/route.ts`, which all call `sendSubmission()` in `src/lib/mailer.ts`. That function always appends the submission to `.submissions/submissions.log` (gitignored) — a local stand-in for the spec's "append every submission to a Google Sheet" backup (Section 9.1) — then, if `GMAIL_USER`/`GMAIL_APP_PASSWORD` env vars are set, sends a real email via Gmail SMTP (Nodemailer) to `NOTIFY_EMAIL` (defaults to `wepresentproject@gmail.com`, a temporary test inbox — will change before real launch). Without those env vars it degrades gracefully: submission still succeeds and logs locally, no email sent. See `.env.local.example` for the exact vars; `GMAIL_APP_PASSWORD` requires 2-Step Verification enabled on the Gmail account first (myaccount.google.com/apppasswords).

**File uploads** (Register's statistics + business card, Partner's images/brochure) are validated server-side in `src/lib/uploads.ts` — extension whitelist (pdf/jpg/jpeg/png/doc/docx/xls/xlsx) and a 15MB cap, per spec Section 8.4. Files are read from the route's `request.formData()` (native Web API, not JSON — these two routes are the only ones that take `multipart/form-data`), saved to `.submissions/uploads/` alongside the log entry, and passed to `sendSubmission()` as Nodemailer `attachments` so they arrive on the notification email directly. This is a stopgap for the spec's private-S3-bucket-plus-secure-link approach (Section 8.4) — fine for testing, not for production launch volume.

**Anti-spam**: `register` and `partner` routes both check a hidden `company_website` honeypot field (rendered off-screen in the form, named plausibly so bots fill it) — if present, the route returns a normal-looking `{ok: true, delivered: false}` without logging or emailing, so bots get no signal they were caught. `inquiry` and `contact` don't have this yet. No rate-limiting anywhere yet (spec Section 8.4 also asks for this).

## Impeccable audit (homepage, 2026-07-18)

Ran the `impeccable` skill's `audit` flow manually against the homepage (13/20, "Acceptable" band — full report in conversation history, not duplicated here). The three P1s are fixed:
- **Gold text on light backgrounds** (`ToursTimeline.tsx` year label, `ResortsGrid.tsx` "Explore →" label) measured 2.3:1 contrast, failing WCAG AA — swapped to `text-amethyst` (6.09:1). This also matches the spec's own Section 4.1, which reserves gold for fills/dividers/rules, never small text on light backgrounds — don't reintroduce `text-gold` for body-sized text anywhere.
- **`Reveal` shipped invisible without JS**: every `Reveal`-wrapped element (nearly all homepage content) starts at `opacity: 0` in the server-rendered HTML and only becomes visible once JS hydrates and `whileInView` fires — a no-JS or failed-hydration visitor saw a blank page. Fixed with a `<noscript>` override in `app/[locale]/layout.tsx` targeting a `data-reveal` attribute now set on every `Reveal` instance (`[data-reveal] { opacity: 1 !important; transform: none !important; }`). Verified with a real JS-disabled Playwright context, not just code review — keep that verification method if you touch `Reveal` again, since a visual check with JS on won't catch this class of bug.
- **Missing `sizes` prop** on every `fill` image on the homepage (Hero, `ResortsGrid` ×4, `PartnersStrip` ×4) — Next.js was serving the largest breakpoint image regardless of actual rendered size. Added per-component: `sizes="100vw"` for the full-bleed hero, `sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"` for the 4-column resort grid, `sizes="144px"` for the small fixed-size partner logos. Any new `fill` image needs a `sizes` prop matching its actual responsive rendered width — this was flagged by a real dev-server console warning, not just the audit.

The P2/P3s are fixed too:
- **Mobile hamburger tap target**: was ~28×15px (no padding around the three lines); now `min-h-11 min-w-11` + centering gets it to a verified 44×44px without changing the visual icon size.
- **Mobile nav missing ARIA/landmark**: the toggle button now has `aria-expanded`/`aria-controls="mobile-nav"`, and the overlay is a `<nav id="mobile-nav" aria-label="Mobile menu">` instead of a plain `<div>` — desktop and mobile nav are now both real landmarks.
- **Marginal contrast on `text-ink/60` / `text-soft-lilac/60`**: bumped to `/70` in `ResortsGrid.tsx`, `ToursTimeline.tsx`, `HowItWas.tsx`, and `Footer.tsx` (4.06:1 → 5.52:1, 3.96:1 → 4.81:1). This was only fixed in these homepage-scoped components — the same `/60` pattern likely recurs on the resort/tours/about pages if you want a broader sweep later.
- **`ConceptSection` missing heading**: added a `sr-only` `<h2>` (`dict.home.concept.sectionLabel`) so it appears in the screen-reader heading outline without changing the visual design.
- **Generic resort card alt text**: added a `cardImageAlt: string` field per resort in `resorts.ts` (scene-descriptive, e.g. "Aerial view of Fushifaru Maldives, rows of overwater villas stretching into the lagoon") — `resort.name` is still used for the `name` field itself (headings, logo alt, etc.), just no longer doubles as image alt text.

All fixes verified live in a real browser (computed styles, bounding boxes, ARIA attribute values, heading outline via `document.querySelectorAll`), not just code review.

## Current scope / not yet implemented

- **CMS / hosting**: the Git-based CMS (Decap/Tina), AWS deployment, and Russia-reachability testing from spec Sections 9–10 are unstarted — client is handling domain/hosting setup directly.

## Visual verification

There's no interactive browser in this environment. Playwright (`devDependencies`) plus its Chromium binary are installed for headless screenshot verification — write a throwaway `.mjs` script under `web/` (so it resolves `node_modules`), launch `chromium`, `goto` the dev server, and `page.screenshot()`. Scroll incrementally (e.g. 200–300px steps with short waits) rather than jumping straight to a scroll position — `Reveal`'s `whileInView` triggers are easy to miss with large scroll jumps, producing false-looking "blank section" screenshots that aren't real bugs.
