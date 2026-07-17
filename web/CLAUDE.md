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

Next.js 16 App Router + TypeScript + Tailwind v4 + Framer Motion. Routes: `/`, `/about`, `/tours`, `/tours/[slug]`, `/partners`, `/contact`, `/resorts/[slug]` — all 4 resorts and both confirmed 2026 tours are built out. Not yet built: Register Interest, Become a Partner, How It Was, and Legal as standalone pages — header/footer nav links to these still point to `/#section-id` anchors on the home page (`Resorts` and `How It Was` are anchors by design, since there's no standalone listing page for either in the spec).

**Design tokens** live in `src/app/globals.css` as CSS custom properties (`--color-ivory`, `--color-aubergine`, `--color-gold`, etc., matching the spec's palette exactly) re-exposed to Tailwind via `@theme inline`, giving utilities like `bg-ivory`, `text-amethyst`, `bg-aubergine`. Fonts are Playfair Display (`font-display` class, headings) and Manrope (default body sans), both loaded through `next/font/google` in `src/app/layout.tsx`.

**Resort data model** (`src/lib/resorts.ts`) is the single source of truth for the 4 resorts — including `heroImage`, `story` paragraphs, `keyFacts`, and `gallery` array, so `src/app/resorts/[slug]/page.tsx` is fully generic with no per-resort hardcoding. Each entry also has a `built: boolean` and `logoBg: "light" | "dark"` flag:
- `built: false` would render as a non-linked "Coming Soon" card in `ResortsGrid` and skip `generateStaticParams` (404 via `notFound()`) — all 4 are currently `true`, but the flag stays live for adding a 5th resort later without a code change.
- `logoBg` exists because the delivered logo files are inconsistent — some are transparent wordmarks meant for a light background, others (Meyyafushi, Madifushi) are opaque badges or light-on-transparent art meant for a dark background. `PartnersStrip` and the `/partners` page both read this flag. Check a new resort's actual logo file (transparency, foreground color) before assuming a default.

**Tour data model** (`src/lib/tours.ts`) mirrors this pattern for `/tours` and `/tours/[slug]` — `status: "pending"` tours (Oman, 2027) render as non-linked cards; `generateStaticParams` only builds detail pages for `"confirmed"` tours. Tour stops optionally reference a `resortSlug` to link into the resort pages. The home page's `ToursTimeline` reads from this same file rather than duplicating tour data — always add new tours here, not inline in a component.

To add a 5th resort: add curated images to `public/images/resorts/<slug>/` (see the `sips` pattern below), add its full entry to `resorts.ts` (`heroImage`, `story`, `keyFacts`, `gallery`), done — no page code changes needed.

**`Reveal`** (`src/components/Reveal.tsx`) wraps Framer Motion's `whileInView` fade/slide-up and is the standard scroll animation used across every section — reuse it rather than hand-rolling `motion.div` calls, to keep the "slow, refined" motion feel consistent.

**Known CSS gotcha**: don't let an element with `position: fixed` live inside an ancestor that has `backdrop-filter`/`filter`/`transform` — it changes the fixed element's containing block from the viewport to that ancestor's box, which can silently zero out its size. This bit the mobile nav overlay (it was a child of `<header>`, which has `backdrop-blur-sm`); fixed by rendering the overlay as a sibling of `<header>` instead of a descendant (see `src/components/Header.tsx`).

## Forms

`InquiryForm` and `ContactForm` POST to `src/app/api/inquiry/route.ts` and `src/app/api/contact/route.ts`, which both call `sendSubmission()` in `src/lib/mailer.ts`. That function always appends the submission to `.submissions/submissions.log` (gitignored) — a local stand-in for the spec's "append every submission to a Google Sheet" backup (Section 9.1) — then, if `GMAIL_USER`/`GMAIL_APP_PASSWORD` env vars are set, sends a real email via Gmail SMTP (Nodemailer) to `NOTIFY_EMAIL` (defaults to `wepresentproject@gmail.com`, a temporary test inbox — will change before real launch). Without those env vars it degrades gracefully: submission still succeeds and logs locally, no email sent. See `.env.local.example` for the exact vars; `GMAIL_APP_PASSWORD` requires 2-Step Verification enabled on the Gmail account first (myaccount.google.com/apppasswords).

There's no file upload handling yet (spec Sections 8.1/8.3 need it for the registration and partnership forms, which aren't built) and no honeypot/rate-limiting anti-spam (spec Section 8.4).

## Current scope / not yet implemented

- **Bilingual RU/EN**: spec requires `/ru` and `/en` locales; only English exists right now. Cyrillic glyph coverage for both Playfair Display and Manrope was verified via a throwaway test route (build + visual check) — safe to build i18n on the current font choices.
- **Register Interest / Become a Partner forms**: retained by spec but not built as standalone pages yet (file upload fields needed).
- **CMS / hosting**: the Git-based CMS (Decap/Tina), AWS deployment, and Russia-reachability testing from spec Sections 9–10 are unstarted — client is handling domain/hosting setup directly.

## Visual verification

There's no interactive browser in this environment. Playwright (`devDependencies`) plus its Chromium binary are installed for headless screenshot verification — write a throwaway `.mjs` script under `web/` (so it resolves `node_modules`), launch `chromium`, `goto` the dev server, and `page.screenshot()`. Scroll incrementally (e.g. 200–300px steps with short waits) rather than jumping straight to a scroll position — `Reveal`'s `whileInView` triggers are easy to miss with large scroll jumps, producing false-looking "blank section" screenshots that aren't real bugs.
