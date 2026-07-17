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

Next.js 16 App Router + TypeScript + Tailwind v4 + Framer Motion. Only two routes exist so far: `/` (home) and `/resorts/fushifaru`. Most of the spec's sitemap (About, Tours, Partners, Contact, Register, Become a Partner as standalone pages) is not yet built — header/footer nav links point to `/#section-id` anchors on the home page instead of separate routes.

**Design tokens** live in `src/app/globals.css` as CSS custom properties (`--color-ivory`, `--color-aubergine`, `--color-gold`, etc., matching the spec's palette exactly) re-exposed to Tailwind via `@theme inline`, giving utilities like `bg-ivory`, `text-amethyst`, `bg-aubergine`. Fonts are Playfair Display (`font-display` class, headings) and Manrope (default body sans), both loaded through `next/font/google` in `src/app/layout.tsx`.

**Resort data model** (`src/lib/resorts.ts`) is the single source of truth for the 4 resorts. Each entry has a `built: boolean` and `logoBg: "light" | "dark"` flag:
- `built: false` resorts render as non-linked "Coming Soon" cards in `ResortsGrid` — no detail page exists for them, and `generateStaticParams` in `src/app/resorts/[slug]/page.tsx` only generates params for `built: true` slugs (others 404 via `notFound()`).
- `logoBg` exists because the delivered logo files are inconsistent — some are transparent wordmarks meant for a light background, others (Meyyafushi, Madifushi) are opaque badges or light-on-transparent art meant for a dark background. `PartnersStrip` reads this flag to pick the right card background per logo. Check a new resort's actual logo file (transparency, foreground color) before assuming a default.

To add a new resort page: add gallery images to `public/images/resorts/<slug>/`, add its `GALLERY` and `KEY_FACTS` entries in `src/app/resorts/[slug]/page.tsx`, flip `built: true` in `resorts.ts`. The `ResortPage` component is written generically but currently hardcodes the hero image path to Fushifaru's — update that when a second resort goes live.

**`Reveal`** (`src/components/Reveal.tsx`) wraps Framer Motion's `whileInView` fade/slide-up and is the standard scroll animation used across every section — reuse it rather than hand-rolling `motion.div` calls, to keep the "slow, refined" motion feel consistent.

**Known CSS gotcha**: don't let an element with `position: fixed` live inside an ancestor that has `backdrop-filter`/`filter`/`transform` — it changes the fixed element's containing block from the viewport to that ancestor's box, which can silently zero out its size. This bit the mobile nav overlay (it was a child of `<header>`, which has `backdrop-blur-sm`); fixed by rendering the overlay as a sibling of `<header>` instead of a descendant (see `src/components/Header.tsx`).

## Current scope / not yet implemented

- **Bilingual RU/EN**: spec requires `/ru` and `/en` locales; only English exists right now. Verify Cyrillic glyph coverage for both Google Fonts before wiring this up — Manrope's Cyrillic support is not guaranteed despite the spec assuming it.
- **Forms**: `InquiryForm` is UI-only (local React state, no network call) — the serverless backend, email routing, and file uploads from spec Section 8–9 aren't built.
- **CMS / hosting**: the Git-based CMS (Decap/Tina), AWS deployment, and Russia-reachability testing from spec Sections 9–10 are unstarted.

## Visual verification

There's no interactive browser in this environment. Playwright (`devDependencies`) plus its Chromium binary are installed for headless screenshot verification — write a throwaway `.mjs` script under `web/` (so it resolves `node_modules`), launch `chromium`, `goto` the dev server, and `page.screenshot()`. Scroll incrementally (e.g. 200–300px steps with short waits) rather than jumping straight to a scroll position — `Reveal`'s `whileInView` triggers are easy to miss with large scroll jumps, producing false-looking "blank section" screenshots that aren't real bugs.
