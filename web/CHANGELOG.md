# Changelog

Work history for the We Present by Coati website, newest first. This is a parked archive of what was done and *why* — the durable rules these rounds established live in `CLAUDE.md`. Not loaded into context; here for reference only.

---

## 2026-07-26 — Direct user feedback round (6 screenshots of the live site)

Distinct from the `impeccable` critique cycle; came from the user viewing the live site. Complaints mapped by screenshot content (stated numbering didn't match the images).

- Moved "What's Included" and "At every resort you will enjoy" off the Tour 2/TTM detail page onto the main `/tours` page — they read as generic to every tour, not Maldives/TTM-specific. Migrated from per-tour JSON to a new page-level `content/settings/tours.json` (`getToursSettings()`), removed the two fields from the `Tour` type and CMS schema. Genericized copy: dropped "(at Meyyafushi)" and the TTM fine print, swapped "resort" → "hotel".
- Header "More" dropdown was clipping "Become a Partner" (panel was fixed `w-40`) → `w-max` + `whitespace-nowrap`.
- Removed internal spec-tracking language that had leaked into Madifushi's public resort story ("...still being confirmed with the client, see Technical Specification Section 3.3").
- `ValueJourney` (About): removed the per-icon hover scale/rotate (read as arbitrary); the scroll-triggered connecting-arrow `pathLength` draw-in, staggered by stage, is now the section's motion device.
- Swapped "world's finest resorts" → "hotels" in the three evergreen-claim spots (Hero headline, About banner, `<meta>` description, both locales) — Oman isn't necessarily resort-type accommodation. Left contextual "resort" uses (today's real Maldives roster) untouched.

## 2026-07-25 — Homepage critique cycle (five rounds) + v2.0 spec

**v2.0 spec, rounds 1–2 — positioning copy + gradient banners.** Corrected About "how it works" copy that contradicted the live site (said the group was "already confirmed" / not a recruitment tool, but the site has real forms and multiple destinations) → merit-based/open-to-interest/multi-destination framing. Restored the `from-soft-lilac via-amethyst to-aubergine` gradient on 8 page banners that had regressed to flat `bg-aubergine`. Header frosted-panel fix meant zero nav-contrast rework needed — the payoff of fixing at the header layer.

**v2.0 round 3 — invitation details on tour detail page.** New `whatsIncluded`/`onSiteProgram` Tour fields (later moved to page-level, see 07-26), 5 hand-drawn thin-line SVG icons in the site's own style, conditional render (only shows when data present).

**v2.0 round 4 — About Value grid → 3-stage journey.** Rejected the literal "add icons to 6 cards" reading (the skill bans identical card grids). Restructured the six values into a Visibility → Relationships → Results narrative with a real focal point (color progression to a dark `bg-aubergine` "Results" panel) and scroll-drawn connector arrows. Six new hand-drawn icons.

**Other 07-25 content work.** SO/ Maldives card image → aerial `channel.jpg` (consistent aerial set across the 4 cards); populated `website` for all four resorts and wired the Key Facts "Official Website" link; TTM "Associated Partners" panel now links to traveltrademaldives.com. Confirmed linking out to resort/TTM sites poses no Russia-reachability risk to We Present itself (`rel="noreferrer"`, no embeds/dependencies).

**Impeccable skill setup + homepage critique (five dual-agent rounds).** Captured `PRODUCT.md` / `DESIGN.md` / `.impeccable/` config; live mode wired (dev-only, never committed). Fixes across the rounds:
- P0: RegisterBand/`/register` said "We Present 2027" while the Hero showed a 2026 tour — primary CTA advertising the wrong season. Fixed 3 spots each locale.
- Contrast flag verified by pixel-sampling: mostly false positives (detector reads `transparent` background over video/gradient); two real minor fixes (Hero caption `/60`→`/85`, RegisterBand `/75`→`/85`).
- `IntroSection`: split a 70-word run-on, then separately compressed the 7-item audience list to 4 (chunking = fewer items, not just shorter sentences).
- Added `focus-visible` rings to `Button` and every header link. Demoted "Become a Partner" from a pill to a text link, then folded it into a new "More" dropdown (9→6 top-level nav items; real conditional render + `aria-expanded`/`aria-controls`, later stripped the over-claimed `role="menu"`).
- Ported the pending-tour false-hover-affordance fix and `prefers-reduced-motion` gate into the homepage `ToursTimeline` and the shared `Reveal` component.
- Fixed the Hero's dead "View Tours Calendar" click (made Hero a client component with a manual `scrollIntoView`) and `#register` double-hop CTAs (point straight to `/register`). Peak-end reorder so real content (Tours/Resorts) closes the page, not the "coming soon" placeholder.

## 2026-07-24 — Real resort logos + `/become-a-partner` split

- Client sent proper logo files for Fushifaru/Meyyafushi/Madifushi (closed a long-pending Appendix D item). Two are genuine vector art (stripped baked-in white background rects); **Meyyafushi's "SVG" was a base64 PNG in disguise** — extracted and background-removed via Pillow, kept as PNG (flagged: worth a real vector export if the designer can provide one). Madifushi's new logo is dark art → flipped `logoBg` to `"none"`. Enabled `dangerouslyAllowSVG` with a locked-down CSP in `next.config.ts`.
- Extended the RU-full-form / EN-contact-block split to `/become-a-partner` (per explicit user instruction, overriding my earlier reasoning that its EN audience *is* the form's target). All three long forms now split; only `InquiryForm` stays full on both locales.

## 2026-07-23 — Security, Destinations, About rebuild, hero gradients

**Security hardening (v1.9 §12).** CSP + security headers (non-nonce pattern, documented rationale — no reflected/stored XSS surface since forms only email). Upload magic-byte validation + batch caps. Form time-trap (`antiSpam.ts`). Email-format + length validation before the `replyTo` header. Dependabot. (SES/CloudWatch/CI-audit stay blocked on hosting.)

**Resorts → Destinations restructure (v1.9 §6.4a) + RU/EN form split (§8.6).** New `content/destinations/*.json` + `destinations.ts` loader; `/destinations` landing (Maldives active, Oman/Kenya coming-soon cards) and `/destinations/[slug]` detail (only Maldives built). Nav `resorts` → `destinations`. `/register` EN → contact block.

**About page rebuild (v1.9 §6.3).** Platform-positioning opener, six-item Value Grid, honest coming-soon Cases section (real content is Pending per Appendix D). Interim copy flagged unapproved.

**Hero gradient redesign (× several).** Root-caused "too purple" to a previous fix stacking a second top gradient — replaced both with one gradient tuned to the text's actual measured position. Then found the fixed header nav had *never* had dedicated contrast protection (relied on ambient photo darkness — Meyyafushi hero measured 1.51:1). Final resolution: **moved nav protection off the photo entirely onto `Header.tsx` (`bg-aubergine/75 backdrop-blur-sm` unscrolled)** and removed all per-page top scrims — fixes contrast globally and kills the top+bottom "vignette" look. Lesson recorded: prefer one fix at the shared layer over N per-page patches.

**Post-v1.9 spot fixes + full RU copy re-read.** Strengthened the RU hero headline ("Ваше место..."); confirmed "Направления" is correct travel-industry RU (the "Direction" reading is a back-translation artifact). Extended the `/register` split pattern to `/contact`. Read `ru.ts` string-by-string; fixed 5 Runglish/calque/comma-splice instances (e.g. "тревел-профессионалов" → "специалистов туриндустрии").

## 2026-07-22 — Content portal, motifs, copy, feedback round 2

**Content portal (Decap CMS, spec §9.2) — the client's top priority.** Migrated `tours.ts`/`resorts.ts` from hardcoded arrays to JSON-file loaders; home intro → `content/settings/home.json`. Decap admin at `/admin` (`local_backend: true` for offline editing; three infra bugs fixed to get it loading; `extension: "json"` needed per collection). **Key finding: content changes don't appear live until process restart/rebuild** — `fs.readFileSync` at module scope is invisible to Turbopack's watch graph, and prod pages are SSG-baked per build. Production OAuth + rebuild webhook blocked on hosting.

**Star/monogram motif (spec §4.3).** New `Sparkle.tsx` inline SVG; wired into the shared `Kicker` (hit nearly every section header in one change), hero scroll cue, quote watermarks, list bullets, form success states, favicon. Deliberately kept off dense card grids to avoid clutter.

**Hero photo / headline / wordmark.** Replaced the low-res portrait hero with an available high-res aerial (then, in feedback round 2, with the client's actual destination-neutral ocean photo). Headline → "world's finest resorts" (destination-neutral). Header wordmark Playfair → Manrope as an interim match to the monogram (final pending the logo SVG).

**Em-dash removal.** Removed every em dash (80 hits / 10 files) from user-facing copy site-wide; en dashes kept for date ranges. Home intro replaced with the client's exact invitation wording.

**Feedback round 2 (v1.9) first slice.** Meyyafushi atoll Raa → Lhaviyani. "COATI" casing sweep in RU. Each hero photo swap needs its own pixel-sampled contrast re-check — it doesn't carry over.

**RU-rendering confirmation sweep.** Automated 15 routes × 4 viewports; found one real RU bug (Legal H1 "конфиденциальности" overflowed at mobile) → added `break-words` to the shared banner-H1 className on all 9 pages.

## 2026-07-21 — Client feedback round 1 (v1.8) + audits

**v1.8 implementation.** Brand rename: "Coati Travel" removed everywhere → "COATI Global Sales Agency" (body) / "Coati" (small UI). Madifushi atoll Thaa → Meemu, hero replaced with client aerial. Dropped "inaugural" framing; added Cinnamon (Oct 2026) + Kenya (TBC) as coming-soon tours. RU-only nav relabels. New destination-neutral home intro block. Contrast pass (client: "white and lilac look similar") → `soft-lilac` default panels + section-boundary borders + site-wide `text-ink/60`→`/70`. Partner logos bigger + bordered + clickable-when-`website`-set. Root-caused the "RU header byline misplaced" bug to Cyrillic label width at the `xl` breakpoint → moved full-nav to `min-[1400px]`.

**Impeccable audits (partners + remaining pages).** Partners 17/20; About/HowItWas/Register/Become-a-Partner/Contact/Legal audited. Recurring fixes: `text-gold` on light → `text-amethyst`, tap targets → 44×44, orphaned/ missing headings → promoted or `sr-only` added, missing `sizes` props, file-input focus indicator.

**Repo-wide `text-gold` sweep.** Closed the recurring contrast defect: 7 hits, 2 real failures on photographic heroes (home 3.59:1, resort 1.86:1) → `text-ivory` + text-shadow. Future gold-on-photo should default to that treatment.

## 2026-07-18 — Impeccable audits (homepage, resort, tours pages)

First audit rounds. Homepage 13/20, resort template 11/20, tours 16/20. Recurring P1s fixed across all three: gold small-text-on-light contrast failures → `text-amethyst`; `Reveal` shipped invisible without JS → `<noscript>` override on `[data-reveal]`; missing `sizes` props on `fill` images; hero video ignoring `prefers-reduced-motion` → `ResortHeroMedia` client component via `useSyncExternalStore`. P2/P3s: tap targets to 44×44, ARIA landmarks on mobile nav, scene-descriptive image alt text, heading-outline fixes, false hover affordances on non-clickable cards. All verified live in a real browser (computed styles, bounding boxes, JS-disabled Playwright), not code review.
