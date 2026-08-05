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

There is no test suite. Node.js is not installed via Homebrew here (no `brew`) — it's at `~/.local/node`, added to `PATH` via `~/.zshrc`. Don't assume `brew`/`nvm` are available.

## Source of truth

Two documents, different jobs. `../We-Present-Website-Technical-Specification-v2.1.docx` (one directory up) is the client-facing spec and is authoritative on **intent and client-agreed content** — palette, fonts, sitemap, form fields, copy. `../BUILD-PLAN.md` is the **execution** document: the same scope as 31 numbered work orders with files, acceptance criteria and verification steps, consolidating rounds 2, 3 and 4. Where they differ, BUILD-PLAN.md wins on implementation detail. Read the spec with:

```bash
textutil -convert txt -stdout "../We-Present-Website-Technical-Specification-v2.1.docx"
```

**v2.1's "Repo state" line is wrong.** It claims the repository reflects round 1 only. Much of round 2 shipped in July (Destinations restructure, security pass, RU/EN form split, About rebuild, the atoll corrections). Audit before starting a work order rather than trusting that line, and skip orders already satisfied instead of rebuilding them.

Raw resort photo/video/logo libraries (e.g. `../Fushifaru Images and Videos/`) also live one directory up and are **not** in the repo (gitignored, 5–17GB each). `public/images/` holds only a curated, resized subset copied via `sips -Z <maxdim> -s format jpeg -s formatOptions 82`. Pull source files from those sibling folders the same way rather than committing raw originals.

`../PRODUCT.md` and `../DESIGN.md` (also one directory up, generated via the `impeccable` skill's `document` flow) capture durable product positioning and visual-system truth. Check these before treating a design-review finding as a bug — the violet/ivory palette, the card hover-lift pattern, and the repeated `.kicker` treatment are documented intentional choices, not defaults a linter should flag.

## Architecture

Next.js 16 App Router + TypeScript + Tailwind v4 + Framer Motion. All routes live under `src/app/[locale]/`: `/[locale]` (+ `/about`, `/tours`, `/tours/[slug]`, `/destinations`, `/destinations/[slug]`, `/partners`, `/contact`, `/register`, `/become-a-partner`, `/how-it-was`, `/legal`, `/resorts/[slug]`) — full sitemap built for both `ru` and `en`. There is no separate root layout — `src/app/[locale]/layout.tsx` **is** the root layout (sets `<html lang>`, loads fonts, renders `Header`/`Footer`) and `generateStaticParams()`s both locales.

**Design tokens** live in `src/app/globals.css` as CSS custom properties (`--color-ivory`, `--color-aubergine`, `--color-gold`, etc.) re-exposed to Tailwind via `@theme inline` (utilities like `bg-ivory`, `text-amethyst`). Fonts: Playfair Display (`font-display`, headings) + Manrope (body), both loaded via `next/font/google` in `layout.tsx`, Cyrillic subsets verified.

**Content is portal-managed (Decap CMS).** `tours.ts`, `resorts.ts`, `destinations.ts`, `cases.ts`, and `settings.ts` in `src/lib/` are server-side loaders (`fs.readdirSync`/`readFileSync`, Server Components only) reading `content/{tours,resorts,destinations}/*.json` (one file per entity, each with an `order` field) and `content/settings/*.json` (page-level copy like the home intro and the shared tours "What's Included" block). Types/getters (`getTour`, `getResort`, `t`, `tl`) are stable — components consume them unchanged.
- **Resorts** have `heroImage`, `heroVideo`, `story`, `keyFacts`, `gallery`, `website?`, `destinationSlug`, plus `built: boolean` (false → non-linked "Coming Soon" card, skips `generateStaticParams`) and `logoBg: "none" | "dark"` (dark = wrap the logo in an aubergine pill when the art is light-on-transparent), and `logoAspect` (width ÷ height of the *visible ink*). Logos render through **`components/PartnerLogo.tsx`**, which sizes them to equal bounding-box area (height ∝ `1/sqrt(logoAspect)`) off a `--logo-base` custom property set by the row — a shared fixed box made the 9.4:1 SO Maldives wordmark ~12x the ink area of the stacked emblem logos. **Crop a new logo to its ink and measure `logoAspect` with `scripts/logo-bbox.mjs` before adding it**; every logo supplied so far arrived on an export canvas with 40–60% empty margin, which `object-contain` then scales as if it were artwork. Check transparency/background too.
- **Tours** have `status: "confirmed" | "pending"` (pending → non-linked card, skipped by `generateStaticParams`); stops optionally reference a `resortSlug`. The home `ToursTimeline` reads this same file — add tours here, never inline.
- **Destinations** have `status: "active" | "coming-soon"` (only active gets a page). Oman/Kenya are `coming-soon` cards. A tour "visits" a destination when its free-text `destination.en` matches the destination's English name (deliberate lightweight coupling, no second slug).

**Round 4 additions** (spec v2.1, built 1 Aug 2026):
- **`cases.ts` + `content/cases/*.json`** — COATI's delivered results, a *separate* collection from `how_it_was` (that is post-tour reportage; these predate We Present). Every case renders the agreed attribution line. `published: false` holds a finished case back while a permission question is open — Oman ships that way and its route 404s. Only cases with a `description` get a detail page, so a half-written case never ships a dead link. **Every published figure must trace to a named slide in `../docs/cases-source-extract.md`** — the source decks are gitignored at 583MB, so that file is the only audit trail.
- **`contact.ts`** — single source of truth for phone/WhatsApp/Instagram/LinkedIn. `EMAIL` is exported as `null` on purpose: `hello@wepresent.org` was never confirmed and v2.1 §6 says show nothing until the production address exists. Both the contact-page row and the mail CTA are guarded on it, so setting that one constant switches email back on site-wide. The English blocks lead with WhatsApp because English has no form — without the phone, removing the placeholder would have left those visitors no route to a person.
- **`programmePdf.ts` + `/api/programme-pdf`** — gated per-tour download. Files live in `web/private/programme-pdfs/`, **never** `public/`, or the gate would be decorative. POST returns the bytes directly; there is no GET handler and no public URL. The requested filename is only ever matched against entries the tour declares, then rebuilt from the declared value with its directory stripped. Render is guarded on the file existing *on disk*, not merely being declared.
- **`Logo.tsx`** — `LogoMark` (monogram + sparkle) and `LogoLockup` (full, with wordmark), generated from the client SVG with the white backing rect removed and the artboard cropped to the ink. Both fill with `currentColor`, which is why there are no per-colour variants to keep in sync. The raster `wp-*.png` files are retained but unused.
- **Tour `properties`** — a named line-up for a tour with no confirmed dates (Cinnamon). `hasDetailPage()` derives page-worthiness from content rather than status, because Cinnamon has confirmed hotels and unconfirmed dates; a tour gets a page as soon as its line-up is entered. Use it, not `status === "confirmed"`, wherever a tour is linked.
- **Destination `programmeType`** (`hotels` | `destination` | `collection`) — guards the resort grid. Oman is represented as a destination and Kenya as a lodge collection, so neither will *ever* have a property roster; guarding on type rather than "are there resorts yet" stops an empty grid reading as one still loading.

**`Reveal`** (`src/components/Reveal.tsx`) is the standard scroll-in fade/slide, used on nearly every section — reuse it. It respects `prefers-reduced-motion` and ships a `<noscript>` override (`[data-reveal] { opacity: 1 }`) so no-JS visitors aren't blank.

To add a resort: curated images to `public/images/resorts/<slug>/`, full entry to `content/resorts/<slug>.json`, done — no page code changes.

The How It Was page intentionally has no images yet (no photo galleries/trip reports/reviews exist until 2026 tours actually run) — it's a deliberate "elegant coming-soon, never looks empty" state, not a missing feature. Convert it from static copy to portal-managed content once real tours complete.

## Internationalization (RU/EN)

`src/proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`) redirects un-prefixed requests to `/ru` (default locale). `src/i18n/config.ts` defines `locales`, `defaultLocale`, and `href(locale, path)` — **every internal `Link`/`Button` href must use `href()`** or it silently drops the user's locale. `/admin` and `/api` are excluded from the locale matcher.

Two-tier content: UI chrome and page copy live in `src/i18n/dictionaries/en.ts` (canonical) + `ru.ts` (typed as `typeof en`, so a missing key is a compile error). Per-entity content (resort/tour text) is localized in place as `{ en, ru }` objects in the JSON, read via each lib's `t()`/`tl()` helper.

**The Russian copy is a first-pass machine/LLM translation** — natural-reading but not reviewed by a native travel-trade speaker. Flag to the client before launch; don't treat as final.

**RU/EN form split**: `/register`, `/contact`, and `/become-a-partner` all branch by locale — RU shows the full form, EN shows a simple heading + `mailto:` contact block (`RegisterEnContactBlock` / `ContactEnBlock` / `PartnerEnContactBlock`). Only `InquiryForm` (per-resort "request price/availability") stays a full form on both locales.

## Forms

Four forms (`InquiryForm`, `ContactForm`, `RegisterForm`, `PartnerForm`) POST to `src/app/api/{inquiry,contact,register,partner}/route.ts`, all calling `sendSubmission()` in `src/lib/mailer.ts`. That appends to `.submissions/submissions.log` (gitignored) then, if `GMAIL_USER`/`GMAIL_APP_PASSWORD` are set, emails `NOTIFY_EMAIL` (default `wepresentproject@gmail.com`, temporary) via Gmail SMTP. Without env vars it degrades gracefully (logs, no email). See `.env.local.example`. This Gmail path is a stopgap — SES migration is blocked on the hosting decision.

**Uploads** (`src/lib/uploads.ts`): extension whitelist + 15MB cap + real magic-byte signature check (rejects a `.txt` renamed `.pdf`; `file.type` is never trusted). `validateUploadBatch()` caps 5 files / 40MB per submission. Saved to `.submissions/uploads/`, attached to the notification email. Stopgap for the spec's private-S3 approach.

**Anti-spam**: all four routes check a hidden `company_website` honeypot **and** a `formLoadedAt` time-trap (submits <2s after mount, `src/lib/antiSpam.ts`) — either returns silent `{ok: true, delivered: false}`. `src/lib/rateLimit.ts` is in-memory per-IP (5 / 15min), keyed off `x-forwarded-for`; it resets per deploy and doesn't share state across instances — swap for Redis/Upstash if hosting topology changes. `src/lib/validate.ts` gates email format (RFC 254-char cap) before it's used as the `replyTo` header, and caps field lengths.

## Security notes

- **CSP / headers** (`next.config.ts`): `headers()` sends CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. Uses Next's documented **non-nonce** pattern (`'unsafe-inline'` in `script-src`; `'unsafe-eval'` dev-only) — a nonce CSP would force this SSG site into per-request rendering for no benefit (no user content is ever rendered back into a page; forms only email). `script-src` allows `unpkg.com` (Decap bundle); `connect-src` allows `localhost:8081` (decap-server) only when not production.
- **SVG in the image optimizer**: enabled via `dangerouslyAllowSVG` + a locked-down `contentSecurityPolicy: "script-src 'none'; sandbox;"` in `next.config.ts`, since resort logos are SVG and the CMS `logo` field can accept SVG uploads.
- `.env*` and `.submissions/` are gitignored. **Before handing the repo to the client, scrub secrets** (no `.env.local`, Gmail app password, or `.submissions/`).
- `.github/dependabot.yml` runs a weekly npm scan. `npm audit`'s 3 findings are inside Next's bundled `postcss`/`sharp`; the only offered fix is a destructive Next downgrade, so left for Dependabot to surface a real fix.

## Conventions & recurring gotchas

- **Contrast: two repeatable audits live at `scripts/a11y/`** (run from `web/`, with the dev server up). Read that README before trusting a result — three measurement traps produced 16 false failures out of the first 19 in the WO-52 pass. In short: Tailwind v4 emits `oklab()` for any alpha-modified colour, so a regex over `rgb()` drops translucent layers; antialiasing halos sit at an intermediate luminance and can only be excluded by pixel population, not colour distance; and the ancestor walk must include the element's own background or every filled button looks unreadable. Also re-run at 390px — two real defects were mobile-only.
- **Contrast (WCAG AA is the standard on this project — aim for margin, not a bare pass).** Gold is for fills/dividers/rules, **never small text on light backgrounds** (default `text-amethyst` there). Over photographic heroes, use `text-ivory` + a text-shadow. Header-nav legibility is now handled globally by `Header.tsx`'s frosted panel (`bg-aubergine/75 backdrop-blur-sm` in the unscrolled state) — do **not** reintroduce per-page top scrims. When you add/swap a hero photo, re-measure contrast by **pixel-sampling a real screenshot** (top ~1–3% brightest pixels cross-checked against an analytical alpha-composite), not computed CSS — the detector reads `background-color: transparent` on text-over-photo and reports spurious 1:1 failures.
- **A stale `.next` makes every route 404, including ones that worked seconds ago.** Two triggers: a `.next` left over from a previous session, and — more often — running `npm run build` and then `npm run dev`, since the dev server misreads the production build. The tell is a suspiciously fast `✓ Ready in ~250ms` followed by 404s on every path, `/ru` included. `rm -rf .next` and restart; don't go hunting for a real breakage first. Hit three times in one session.
- **Verify beyond the happy path: reduced motion *and* JavaScript disabled.** Three real defects this project shipped were invisible to code review and to a normal browser check. The Cases stat rail seeded state to `0`, so server-rendered HTML, no-JS visitors, reduced-motion users and anyone who never scrolled it into view all got "0 room nights delivered". Its count-up also never finished, because `parse()` returned a fresh object into the effect deps and restarted the animation on every re-render it caused itself. Pattern to copy: hold the animated value as `null` until the animation actually starts, and render the real figure otherwise.
- **When adding images to a gallery, diff the new alt text against the existing entries first.** Three of four picks in one round silently duplicated a subject already present (a wine cellar, a sea turtle, an aqua-yoga shot). Conversely, near-identical *captions* on genuinely different photographs read as duplicates too — a screen-reader user hears two identical descriptions. Describe what is in frame, not the folder it came from (`dining.jpg` was captioned "Baa main bar" but shows the pool at that venue).
- **Grid packing is arithmetic, not vibes.** A 2x2 feature tile occupies 4 cells, so a 3-column grid needs a total cell count divisible by 3 to avoid a trailing hole, and the feature's aspect ratio must match its span (a 2x2 span in an equal-column grid is *square*; the gallery's old `4/3` could not fill its own cells). Where a count cannot be made to divide at every breakpoint, let the feature span only from `sm` up and add `[grid-auto-flow:dense]`.
- **Every `fill` image needs a `sizes` prop** matching its real rendered width, or Next serves the largest breakpoint.
- **Heading outline discipline**: no skipped levels, no orphaned `h3`s, no heading that just repeats the one above it. Add `sr-only` `<h2>`s where a section has none. Verify via `document.querySelectorAll("h1,h2,h3")`.
- **Copy is em-dash-free** site-wide (use commas/colons/parentheses/`·`). En dashes (`–`) for date ranges are fine.
- **Interim/unapproved copy** (Maldives destination intro, About value-grid items, cases coming-soon, hero wording, Legal draft) is flagged as not-client-reviewed. Keep flagging new drafted copy the same way; the client reviews before launch.
- **When the client/user reports a text problem, grep the actual source string first** — browser auto-translate of `/ru` produces English text that doesn't exist in the code. Verify against the real dictionary string, then fix the real intent.
- **Asset replacement convention**: never delete client photography/logos outright — leave the old file in place unused when swapping.
- **CSS gotcha**: don't put `position: fixed` inside an ancestor with `backdrop-filter`/`filter`/`transform` — it re-roots the containing block and can zero the element's size (bit the mobile nav; it's now a sibling of `<header>`, not a child).
- **Header nav breakpoint**: full desktop nav only fits from `min-[1400px]` (RU labels are ~120px wider than EN and wrap the logo lockup below that). Re-check with real screenshots at 1280/1360/1400/1440 in both locales if you add a nav item.

## Content portal (Decap CMS)

`public/admin/index.html` + `public/admin/config.yml` define collections for tours, resorts, destinations, settings, how_it_was (every field has an editor `hint`; folder collections need `extension: "json"` + `format: "json"`). `local_backend: true` runs it offline against real repo files via `npx decap-server` (from repo root, alongside `npm run dev`) — no OAuth needed for local editing. `/admin` needs a `rewrites()` rule (`/admin` → `/admin/index.html`) and an explicit `<link rel="cms-config-url" href="/admin/config.yml">` since it loads at a bare path.

**Non-obvious: content changes don't appear live until the next process restart / rebuild.** The libs read JSON via `fs.readFileSync` at module scope, invisible to Turbopack's watch graph. In local dev, restart `next dev` after a CMS edit (check the `content/` JSON on disk first to confirm the save worked). In production, pages are SSG-baked per build, so a publish only reaches the site after the next `next build` + redeploy — most static hosts wire this via a webhook on push to `main`. **Production OAuth is built** (WO-63): `/api/auth` + `/api/callback` + `src/lib/cmsAuth.ts`, with `base_url`/`auth_endpoint` in `config.yml`. It needs `GITHUB_OAUTH_CLIENT_ID`, `GITHUB_OAUTH_CLIENT_SECRET` and `SITE_URL` in the host environment; without them sign-in returns a plain message naming what's missing. `local_backend: true` stays and is **inert in production** — verified in the Decap bundle, the proxy is only contacted when `location.hostname` is `localhost`/`127.0.0.1`. The handshake is three steps (popup posts `authorizing:github`, opener echoes, popup posts `authorization:github:success:{token,provider}`) and the opener rejects any message whose origin isn't exactly `base_url`, so `SITE_URL` must be a bare origin with no trailing slash and must match `base_url`. **Still blocked on hosting**: the rebuild-on-publish webhook. `backend.repo` is `shhafuuu/we-present-website` and `base_url` is `https://wepresent.org` — repoint both at handover.

## Current scope / not yet implemented

- **Hosting**: AWS deployment and Russia-reachability testing (spec §10) unstarted — client handles domain/hosting directly. SES email migration, CloudWatch abuse monitoring, and CI `npm audit` are all blocked on that decision. CMS production OAuth is now **built** (WO-63) and blocked only on the client registering the GitHub OAuth App under the COATI org; see the Content portal section. (Domain WePresent.org is purchased; avoid Cloudflare entirely — Russia throttles it — and don't geo-block.)
- **Pending client assets** (spec Appendix D): official WePresent/Coati **logo SVG** (site's own header wordmark/monogram — still blocks finalizing the header typeface); parent-brand logo/link and footer **phone/office** details; confirmation of "TTM Tier 1/2" naming + Tour 2 per-resort nights + whether Madifushi stays in the shorter window; real **project-cases** content (About section built, showing coming-soon); **Oman/Kenya** resort/partner rosters (needed before those destinations become real pages). *Lower priority*: a true vector export of the Meyyafushi logo (the "SVG" received was a raster PNG in disguise; current background-removed version works).
- **Resolved**: Fushifaru/Meyyafushi/Madifushi resort logos, Instagram handle (`@wepresentproject`), all four resort website URLs, TTM website link.

## Visual verification

No interactive browser here. Playwright + Chromium are installed (devDependencies) for headless screenshots — write a throwaway `.mjs` under `web/`, launch `chromium`, `goto` the dev server, `page.screenshot()`. **Scroll incrementally** (200–300px steps with short waits), not in one jump — `Reveal`'s `whileInView` is easy to miss with big scroll jumps, producing false "blank section" screenshots. To test reduced motion use `page.emulateMedia({ reducedMotion: "reduce" })`; `window.matchMedia` can't be toggled after load. The `resize_window` browser tool doesn't reliably change the rendered viewport in this environment — use headless Playwright at an explicit viewport for mobile checks.
