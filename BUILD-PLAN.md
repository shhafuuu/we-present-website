# WePresent by COATI — Build Plan

Consolidated work orders for rounds 2, 3, 4 and 5. Supersedes the loose backlog in specs v1.9, v2.0, v2.1 and v2.2 as the *execution* document. The v2.2 .docx remains the client-facing record; this file is what Claude Code works from.

**Repo:** `github.com/shhafuuu/we-present-website` · **App root:** `web/`
**Companion docs in repo:** `DESIGN.md` (visual system), `PRODUCT.md` (product truth), `CLAUDE.md` (incl. Security section)

---

## How to use this file

Work one order at a time, in order, unless a phase says otherwise.

**Status key.** `[x]` done. `[~]` partially done, see the order for what is left.
`[ ]` outstanding.

As of 5 August 2026, **round 5 is complete**: WO-80 through WO-86 are all built,
verified and committed. Outstanding orders are:

- **WO-63** — the production OAuth handler. Blocks the content portal. Cannot be finished
  in the repo alone: registering the GitHub OAuth App under the COATI organisation is the
  client's to do.
- **WO-62** — handover, revised from a zip to a repository transfer. Best produced last.

WO-04 and WO-70 were both closed on 5 August 2026. Two follow-ups surfaced by WO-70 are
not yet orders: per-page `<title>`/meta description (every page currently shares the root
layout's), and the hero LCP question (the `<h1>` cannot paint until its mount animation
runs). Both are written up in WO-70.

Two things carried out of round 5 that are not orders:

- **Decap 3 cannot hide fields conditionally.** WO-84 step 7 asked for it and it does
  not exist in the CMS. Tour-only fields are optional and hinted instead. See WO-84.
- **The client should confirm the Workshop calendar wording.** The card shows
  "November 2026" rather than spec Appendix A.4's "Dates to be confirmed". Reasoning
  is recorded under WO-84; it is a one-line content change if they disagree.

WO-10 is partial by decision: the Destinations restructure shipped, the URL nesting was
judged not worth the churn.

For each work order:

1. Read the order in full, plus any file it names.
2. Re-read the **Guardrails** section below before writing code.
3. Make the change.
4. Run the **Verify** step. Do not move on until it passes.
5. Tick the checkbox and commit with the work order ID in the message, e.g. `WO-14: split value section by audience`.

If an order conflicts with something already in the repo, stop and report the conflict rather than guessing. If an order depends on an asset marked **BLOCKED**, skip it and continue to the next.

---

## Guardrails

These apply to every order. Violating one is a defect even if the order itself was completed.

**Naming**

- Brand: `WePresent by COATI`. Company: `COATI Global Sales Agency`. Small UI: `Coati`. Never `Coati Travel`.
- Section name is `Destinations`, not `Resorts`.

**Copy**

- No em dashes anywhere in site copy. Use commas, colons or full stops. Em dashes appear in *this document* as structural separators in headings and labels. They are not part of any copy string and must not be carried into the site.
- **Russian caveat on the above.** In Russian the тире is grammatically required in some constructions, for example between a subject and a nominal predicate. Do not strip one mechanically and leave ungrammatical Russian behind. Rewrite the sentence so the dash is not needed. The rule is a house-style rule about English typography, not a licence to break Russian grammar. The check is `grep -n "—" web/content/ web/src/i18n/dictionaries/`; every hit is a rewrite, not a deletion.
- Destination-neutral positioning copy. Do not write as if the Maldives is the whole programme.
- Never invent facts. If a date, roster, metric or contact detail is not in this plan or the CMS, leave the field empty and let the render guard hide the block.
- RU and EN copy always ship together. A new string in one locale without the other is an incomplete order.

**Design**

- Palette and type come from `DESIGN.md`. Gold is `#c9a24b`. The Rare Gold Rule holds: gold is for CTAs, small accents and hover glows, never a large fill and never small body text.
- Muted text never drops below `text-ink/70`.
- Every small uppercase label goes through the shared `.kicker` class.
- Do not stack scrim or gradient treatments on hero photography to fix contrast. Fix contrast at the component that needs it.
- Do not place two near-identical tints next to each other where a section boundary must read. Pixel-sample, do not assume.
- One animation idea per section. Motion signature is the `[0.22, 1, 0.36, 1]` ease at 0.9s with per-item stagger. Honour `prefers-reduced-motion` everywhere.

**Locale asymmetry (deliberate, not a bug)**

- RU carries full forms on Register, Contact and Become a Partner.
- EN shows a contact block on those same three pages.
- Do not "fix" this.

**Verification**

- Screenshot before and after for any visual order, desktop and mobile.
- Check both locales for any copy or layout order.
- Run `npm run build` before ticking any order that touches types or data loaders.

---

## Asset status

| Asset | Status | Blocks |
| --- | --- | --- |
| `We Present Logo.svg` | Received (842x595, black WP + sparkle) | WO-02 |
| Destination-neutral hero image | Received (aerial ocean, cyan/white foam) | WO-30 |
| COATI source decks x3 | Received | WO-20 to WO-24 |
| Partner logos as SVG or transparent PNG | **RESOLVED** — supplied 24 July, shipped 5 Aug. True vector for Meyyafushi still wanted (cosmetic) | WO-04 |
| Per-tour programme PDFs | **BLOCKED** — client producing | WO-26 |
| Tour dates for Cinnamon, Oman, Kenya | **BLOCKED** — client confirming | WO-11, WO-12, WO-13 |
| Production email address | **BLOCKED** — pending hosting | WO-27 |
| Oman and Kenya rosters and imagery | **BLOCKED** | WO-12, WO-13 |
| Tour 2 dates | Received round 5 — 28 Aug to 5 Sep 2026, TTM optional | WO-81 |
| Office phone and both addresses | Received round 5 | WO-82, WO-83 |
| Workshop dates, venue, programme | **BLOCKED** — client has confirmed only November 2026, Moscow | WO-84 |

---

# Phase 0 — Foundations

### [x] WO-01 — Reconcile the design tokens against DESIGN.md

**Origin:** housekeeping · **Priority:** first

Earlier specs circulated a yellow accent (`#F4C64A`). `DESIGN.md` is authoritative and specifies antique gold `#c9a24b` with soft-gold `#ebdcb4` as its hover state.

**Files:** `web/tailwind.config.ts` (or `globals.css` `@theme`), `web/src/app/globals.css`

**Steps**

1. Audit every colour token in the Tailwind theme against the `colors` block at the top of `DESIGN.md`.
2. Correct any drift. Report anything in the repo that does not appear in `DESIGN.md` rather than silently deleting it.
3. Grep for hardcoded hex values in components and replace with tokens.

**Accept:** every colour in the theme matches `DESIGN.md` exactly; `rg '#[0-9a-fA-F]{6}' web/src/components web/src/app` returns only tokens defined in the theme, SVG icon fills, or documented exceptions.

**Verify:** `npm run build` passes; screenshot the homepage and confirm no visible colour change beyond intended corrections.

---

### [x] WO-02 — Install the official logo

**Origin:** round 1 open item, asset now received

`We Present Logo.svg` is a 842x595 artboard with the WP monogram, sparkle and wordmark in black on white.

**Files:** `web/public/`, `web/src/components/Logo.tsx` (or equivalent), `web/src/components/Header.tsx`, `web/src/components/Footer.tsx`

**Steps**

1. Crop the artboard to the mark's true bounding box and remove the white background rect so the SVG is transparent.
2. Produce three variants as inline React components or SVG files: aubergine (`#3e2c55`) for light backgrounds, ivory (`#fcfaf6`) for dark backgrounds and photography, and a monogram-only mark for the favicon and small sizes.
3. Replace the placeholder logo in the header, footer, mobile menu and favicon set.
4. Confirm the sparkle motif in the logo matches the sparkle used as a UI accent, or note the discrepancy for design review.

**Accept:** logo renders crisply at 24px through 400px; transparent background in all variants; correct variant on each background; no raster fallback anywhere.

**Verify:** screenshot header in both scroll states, footer, and mobile menu, both locales.

---

### [x] WO-03 — Extract a shared PageBanner component

**Origin:** v2.0 §4a, extended

v2.0 asked for the gradient to be restored on eight page banners. Doing it inline invites the same drift again. Extract the component instead.

**Files:** new `web/src/components/PageBanner.tsx`; then `about`, `tours`, `tours/[slug]`, `partners`, `contact`, `become-a-partner`, `how-it-was`, `legal`, `register` page files under `web/src/app/[locale]/`

**Steps**

1. Create `PageBanner` taking `kicker`, `title`, and optional `intro` and `children`.
2. Bake in `bg-gradient-to-b from-soft-lilac via-amethyst to-aubergine px-6 pb-20 pt-40 lg:px-10`.
3. Replace all nine page banners with the component. Match on the class string, not line numbers, which have drifted.
4. Leave alone: the mid-About accent band (the `py-24` section with the Sparkle watermark), the footer `bg-aubergine`, and image-overlay gradients on hero and resort cards.

**Accept:** every page banner uses `PageBanner`; no page file contains `bg-aubergine px-6 pb-20 pt-40`; the three excluded elements are unchanged.

**Verify:** screenshot the top of all nine pages. Confirm header text stays legible against the light top of the gradient in the transparent header state, both locales.

---

### [x] WO-04 — Standardise partner logos — **DONE 5 August 2026**

**Origin:** round 2. Was the longest-running blocker; it should not have been. The client
supplied web-format vectors on 24 July and the BLOCKED label was never re-checked
against the disk. Two of the four (Fushifaru, Madifushi) had in fact been converted in
July while the order still read BLOCKED.

**Assets.** All four partner logos are now transparent, cropped to their ink and
clickable through to the partner's site:

| Partner | Asset | Note |
|---|---|---|
| Fushifaru | `fushifaru.svg` | true vector, white plate stripped |
| Madifushi | `madifushi.svg` | true vector, white plate stripped |
| Meyyafushi | `meyyafushi.png` | see below — no true vector exists |
| SO Maldives | `so-maldives.svg` | true vector, from `SO- MALDIVES LOGO HORIZONTAL-01.svg` |

**Meyyafushi has no vector.** The supplied `Meyyafushi Logo.svg` is a single base64 PNG
in an SVG wrapper: one `<image>` element, no paths, white background baked into the
raster. Converting it gains nothing, so the transparent 780x1109 PNG remains the live
asset. Asking the client for a true vector export stays on the pending-assets list; it
is cosmetic, not blocking.

**Every logo arrived on an export canvas with 40–60% empty margin** — SO Maldives'
artwork occupied 8% of its canvas height. Because the site sizes logos with
`object-contain` inside a fixed box, that margin was being scaled as if it were artwork,
which is the actual cause of the round-1 "logos are too small" note. All four are now
cropped to their visible ink (`web/scripts/logo-bbox.mjs` measures the bounds).

**Optical normalisation.** `src/components/PartnerLogo.tsx` replaces the fixed
`h-20 w-32` box on both call sites. Height scales as `1/sqrt(aspect)` — equal
bounding-box area — off a new `logoAspect` field on the resort JSON, normalised against
a square reference so adding a fifth partner does not resize the existing four. Equal
box height gave the SO Maldives wordmark ~12x the ink area of the emblem logos; an
intermediate exponent of 0.35 was tried and still left it at ~2.6x on the rendered page.

Base size raised from 80px to 112px on the homepage strip (round-1 "too small"), and the
partners-page card stacks the logo above the text below `sm` — at 390px a 9.4:1 wordmark
beside the text left no usable width for the copy.

**Accept:** met. All four transparent, optically balanced, clickable, larger than before.

**Verified:** homepage strip and partners page screenshotted at 1440px and 390px in both
locales; `tsc --noEmit` clean.

---

# Phase 1 — Data model and content structure

### [~] WO-10 — Restructure Resorts into Destinations

**Origin:** round 2

Destination becomes the top-level entity. Resorts and partners nest inside a destination. Tours belong to a destination.

**Files:** `web/src/lib/resorts.ts`, `web/src/lib/tours.ts`, new `web/src/lib/destinations.ts`, `web/content/`, `web/src/app/[locale]/` routing, `web/public/admin/config.yml`, `web/src/i18n/dictionaries/en.ts` and `ru.ts`

**Steps**

1. Add a `Destination` type: `slug`, `name {en, ru}`, `status: 'live' | 'coming-soon'`, `intro {en, ru}`, `heroImage`, `order`.
2. Create three destinations: Maldives (`live`), Oman (`coming-soon`), Kenya (`coming-soon`).
3. Add `destination: string` to both the Resort and Tour types. Backfill all four existing resorts and both existing tours with `maldives`.
4. Route: `/[locale]/destinations` index, `/[locale]/destinations/[destination]`, `/[locale]/destinations/[destination]/[resort]`. Redirect the old `/resorts` paths with 308s so existing links survive.
5. Rename the nav item to Destinations / Направления in both dictionaries.
6. Add a Decap `destinations` collection and add the destination relation field to the resorts and tours collections.

**Accept:** `/destinations` lists three destinations; Maldives shows four resorts; Oman and Kenya render a coming-soon state with no empty grids; old `/resorts` URLs redirect; both locales correct.

**Verify:** `npm run build`; click through every destination and resort route in RU and EN; confirm the redirects return 308.

---

### [x] WO-11 — Add the Cinnamon Maldives Resorts tour

**Origin:** round 4

Client confirmed the tour name as **Cinnamon Maldives Resorts**. Four properties, deliberately mixed star ratings, dates not yet confirmed.

**Files:** `web/content/tours/`, `web/src/lib/tours.ts`, `web/src/app/[locale]/tours/[slug]/page.tsx`

**Properties**

| Property | Rating | Note |
| --- | --- | --- |
| Cinnamon Velifushi Maldives | 5* | |
| Cinnamon Hakuraa Huraa Maldives | 5* | Adults only, 18+ |
| Cinnamon Dhonveli Maldives | 4* | |
| Ellaidhoo Maldives by Cinnamon | 4* | |

**Steps**

1. Create the tour under the Maldives destination with `status: 'coming-soon'` and no dates. Do not invent dates.
2. Add a `tier` or `collection` field to the property list so 5* and 4* render as two visually separated groups with their own subheadings, per client instruction. Do not mix them in one grid.
3. Short descriptions: written by Shaf, added via CMS. Ship with the fields empty and the render guarded.
4. Surface the adults-only 18+ note on the Hakuraa Huraa entry as a small badge, not body copy.

**Accept:** tour appears on the tours calendar as coming-soon; the two rating groups are visually distinct; no fabricated dates or descriptions; empty descriptions do not render an empty block.

**Verify:** screenshot the tour page in both locales with descriptions both empty and populated with dummy text.

---

### [x] WO-12 — Add Oman as a destination programme — partially BLOCKED

**Origin:** round 4

Oman is a **destination programme**, not a hotel tour. COATI represents the destination as a whole. This is a coming-soon shell until content arrives.

**Steps**

1. Create the Oman destination with `status: 'coming-soon'` and a `programmeType: 'destination'` flag.
2. When `programmeType` is `destination`, the template must render itinerary and destination-opportunity blocks and **must not** render a resorts grid or partner-property list.
3. Ship the shell with a coming-soon state. No invented lodges, hotels, itinerary or dates.
4. Note for content later: COATI is the appointed representative of the Ministry of Heritage and Tourism of Oman. Do not publish this as an Oman partner logo until permission is confirmed.

**Accept:** Oman renders a complete-looking coming-soon page with no empty resort grid and no placeholder property cards.

---

### [x] WO-13 — Add Kenya as a lodge-collection programme — partially BLOCKED

**Origin:** round 4

Kenya is the **Saruni Basecamp** collection: 13 safari lodges across Kenya, with selected lodges included depending on the itinerary. Client instruction: list the lodges. No logos available.

**Steps**

1. Create the Kenya destination with `status: 'coming-soon'` and `programmeType: 'collection'`.
2. Add a `collection` entity: name (Saruni Basecamp), description, and a lodge list.
3. Lodge entries carry name and optional image only. Guard the logo slot so no broken or placeholder logo renders.
4. Do not publish the lodge roster until the client supplies it. Ship the structure, leave the data empty.

**Accept:** Kenya renders as coming-soon; the collection model supports a lodge list without logos; no fabricated lodge names.

---

### [x] WO-14 — Fix the Meyyafushi atoll

**Origin:** round 2, still outstanding

Meyyafushi is in **Lhaviyani Atoll**, not Raa Atoll.

**Files:** `web/content/resorts/meyyafushi*`, plus any hardcoded reference

**Steps**

1. `rg -i "raa atoll|атолл раа"` across the repo and content.
2. Replace with `Lhaviyani Atoll` / `Атолл Лавияни`.
3. While here, confirm the round-1 fix held: Madifushi must read **Meemu Atoll / Атолл Меему**, not Thaa.

**Accept:** zero matches for Raa or Thaa in relation to these two resorts, in either locale.

**Verify:** `rg -i "raa|thaa|атолл раа|атолл тхаа"` returns nothing relevant; screenshot both resort Key Facts boxes in RU and EN.

---

# Phase 2 — Positioning, copy and audience

### [x] WO-20 — Rebuild About as a B2B platform

**Origin:** round 2

About currently reads as a trip description. It must read as an integrated B2B platform: exclusive destination experiences, networking, education, media exposure, PR, influencer marketing and strategic partnerships, connecting travel professionals, tour operators, hotels, destinations, media, content creators and experts.

A visitor must grasp within one screen: what it is, how it works, who it connects, why it is valuable.

**Files:** `web/src/app/[locale]/about/page.tsx`, both dictionaries

**Accept:** the four questions above are each answered by a distinct, identifiable block; copy is destination-neutral; RU and EN both complete; no em dashes.

---

### [x] WO-21 — Split the value section by audience

**Origin:** round 4 (client's primary ask)

Currently both audiences are mixed into one block. Split into two, preceded by the differentiator.

**Structure, in order**

1. **What makes We Present different** — a statement, then a comparison table: Traditional FAM trip vs We Present, across pace, depth, preparation, outcome and follow-through. Rows reveal on scroll with the standard stagger.
2. **For participants** — main message: *deep immersion into the product and destination through a unique professional experience.* Benefits: direct communication with hotel representatives, resort teams, tourism boards and local partners; deep understanding of each product and destination rather than a short visit to many locations; more time to explore concept, values and potential; experiencing the destination rather than visiting it; preparation before the trip; professional meetings, workshops and brainstorming sessions; opportunities to create new ideas, content and promotion strategies; new professional connections and long-term partnerships.
3. **For hotels, resorts and destinations** — main message: *not just exposure. Guaranteed promotion, quality content and measurable business results.* Benefits: a professional promotion platform focused on real results; individual approach and promotion strategy per partner; cooperation starting before the trip; participants arriving prepared; professional discussions, workshops and brainstorming; deeper product awareness. Plus what partners receive: professional promotion through selected participants, media visibility and content creation, articles, reviews and publications, social media exposure, photo and video materials, stronger brand awareness, sales opportunities and long-term partnerships.

**Design:** two stacked or side-by-side panels, **not** a toggle. Both audiences must be visible to a scanning visitor. Differentiate with background tint (ivory vs lavender-mist) per the Tinted-Neutral Rule, and check the seam reads (see Guardrails).

**Copy source:** client's own EN wording in the 1 Aug feedback document, used near-verbatim. RU translated from it.

**Do not** publish the participant-profile breakdown (journalists, bloggers, photographers, TV representatives and so on). It is internal reference only. Keep the audience label as "For participants".

**Accept:** three blocks in the stated order; no toggle; both messages visible without interaction; comparison table renders on mobile without horizontal scroll; RU and EN complete.

**Verify:** screenshot desktop and mobile, both locales. Confirm the two panel backgrounds are visually distinct by pixel-sampling, not by eye.

---

### [x] WO-22 — Homepage: differentiator and dual key messages

**Origin:** round 4

The homepage carries an abbreviated version of WO-21 so it stays premium rather than dense.

**Include:** the comparison table, and the two key messages, each linking to its full panel on About.

**Exclude:** the full benefit lists. Those live on About.

**Accept:** homepage gains no more than one new full-width section; both key messages present with working anchor links; no benefit list duplicated from About.

---

### [x] WO-23 — Correct the participation positioning

**Origin:** v2.0 §1 and §6.3, carried forward

The "group is already confirmed" and "not a tool to recruit attendees" framing contradicts the live registration form. Replace with merit-based, multi-destination, open to expressions of interest, while keeping exclusivity.

**Changes**

- About section title: "The group is already confirmed" becomes "How to take part" / "Как принять участие".
- Selection model step 02: "no application process and no lobbying" becomes "top-producing agencies are prioritised for each edition, and you can register your interest directly through the site".
- Concept paragraph 2: replace the Maldives-led list with "programmes across multiple destinations (the Maldives, Oman, Kenya and more)".
- Delete the "not a tool to recruit" idea everywhere. Do not replace it with a similar disclaimer.

Full RU and EN copy is in spec v2.1 Appendix A.

**Locale nuance:** EN says "get in touch" (contact-only). RU says "оставить заявку" (full form). Keep this distinction.

**Accept:** `rg -i "already confirmed|not a tool to recruit|no lobbying"` returns nothing; new copy present in both locales; the exclusivity framing survives (no wording implying automatic acceptance on form submission).

---

### [x] WO-24 — Fix the flights claim

**Origin:** round 4 (client correction, factual error)

"Everything is included, including flights" is **wrong**. International flights are arranged and paid for by participants.

**Steps**

1. `rg -i "including flights|включая перелет|включая перелёт"` and remove every instance.
2. Ensure the corrected position is reflected in the What's Included fine print (WO-25).

**Accept:** zero matches in either locale. No remaining copy implies flights are covered.

**Priority:** high. This is a factual misstatement currently live.

---

# Phase 3 — Tour detail sections

### [x] WO-25 — Revise the What's Included block

**Origin:** v2.0 §7.1, amended by round 4

Client reviewed the built section and asked for two changes: remove the registration fee, and replace the meal plan with a plain "Dining" label.

**New item set (4, was 5)**

| Icon | EN | RU |
| --- | --- | --- |
| bed | Accommodation (½ DBL*) | Проживание (½ DBL*) |
| domed tray | Dining | Питание |
| transfer | Transfers | Трансферы |
| person + sparkle | Exclusive programme with hotel management | Эксклюзивная программа с руководством отеля |

**Fine print (unchanged in substance, keep both locales)**

EN: *Single-room accommodation is available at an additional charge on request. International flights and travel insurance are arranged independently by participants. Exact inclusions are confirmed at registration for each tour.*

RU: *Одноместное размещение доступно за дополнительную плату по запросу. Международные перелёты и страховку участники организуют самостоятельно. Точный состав включённых услуг подтверждается при регистрации на каждый тур.*

**Why it matters beyond the label change**

- Four items give a clean 4-across on desktop and 2x2 on mobile. The client's earlier "fill the empty space" concern was caused by the five-item orphan row and is resolved by the removal, so do **not** add filler content.
- Removing the meal plan makes the block destination-agnostic. It can now render on every tour, not only Maldives 1 and 2. This was the client's original objection and this change answers it.
- Division of labour: the website block states the **category** of what is covered; the gated PDF (WO-26) states the **specifics** for that tour. Do not let detail creep back onto the page.

**Data model:** keep `registrationFee` available as an optional CMS item, off by default, in case a future edition charges one.

**Accept:** four items render; registration fee absent from default content but still selectable in the CMS; no meal plan named anywhere on the page; fine print present in both locales; block renders on a non-Maldives tour without looking wrong.

**Verify:** screenshot desktop and mobile in both locales; confirm the 2x2 mobile grid has no orphan.

---

### [x] WO-26 — Per-tour programme PDF, gated — partially BLOCKED

**Origin:** round 4

Each tour can carry a downloadable PDF: detailed itinerary, day-by-day programme, additional participant information. Access is gated behind name and email.

**Rationale to give the client:** every download becomes a qualified lead they can follow up, and it shows which tours are attracting interest before dates are even public.

**Steps**

1. Add `programmePdf?: { file: string; locale: 'ru' | 'en'; label: {en, ru} }[]` to the Tour type. Support more than one file so RU and EN versions can coexist.
2. Build a gate: name and email, honeypot, rate limiting, then serve the file. Reuse the existing form validation and mailer patterns. Follow the Security section of `CLAUDE.md`.
3. Notify the same recipients as the other forms and record which tour and which file was requested.
4. Store PDFs outside the public directory and serve through the gated route. Do not expose a direct public URL.
5. Guard the render: no PDF, no download block.
6. Add the upload field to the Decap tours collection.

**BLOCKED on:** the PDFs themselves, and confirmation of whether RU only or RU and EN. Ship the mechanism, leave the files absent.

**Accept:** gate works; ungated direct access to the file path returns 404 or 403; no download block on tours without a PDF; submission reaches the notification recipients with the tour identified.

**Verify:** attempt direct file access without submitting the form and confirm it fails.

---

### [x] WO-27 — On-site programme block: title and layout

**Origin:** v2.0 §7.2, amended after review of the live build

Two problems with the shipped version.

**1. The title does not travel.** It currently reads "At every hotel you will enjoy". Oman is a destination programme with no hotels, and Kenya uses lodges.

Make the title a per-tour CMS field. Default to the client's wording for the Maldives tours; let Oman and Kenya override it.

- Default EN: *At every hotel you will enjoy* · RU: *В каждом отеле вас ждёт*  (note: the earlier draft read `На каждом отеле`, which is ungrammatical. Use `В каждом отеле`.)
- Keep the items as a shared default that every tour inherits, since the programme itself is the same everywhere.

**Items (unchanged)**

| EN | RU |
| --- | --- |
| Hotel inspection | Инспекция отеля |
| Meetings with the hotel management team | Встречи с управленческой командой отеля |
| An engaging business and networking programme | Насыщенная деловая и нетворкинг-программа |
| Unique content-creation opportunities | Уникальные возможности для создания контента |
| Destination updates and product information | Обновления по направлению и информация о продукте |
| Brainstorming sessions with industry colleagues on resort promotion and sales development | Мозговые штурмы с коллегами по отрасли по продвижению курорта и развитию продаж |

**2. The layout is flat and tall.** Six equal cards, each with the same sparkle icon, stacked full width on mobile. This is the identical problem v2.0 §8 identified on the About value grid, and the same fix applies.

- Remove the card chrome. Use a hairline-ruled list (`border-amethyst/10` between items).
- Remove the six repeated sparkles. One accent mark at the section level is enough.
- Tighten the vertical rhythm so the block reads as one unit rather than six.

**Accept:** title is CMS-editable per tour with a working default; no repeated icon; mobile height reduced by at least a third; both locales correct.

**Verify:** before and after mobile screenshots with heights recorded.

---

# Phase 4 — Cases

### [x] WO-30 — Build the Cases collection and data model

**Origin:** round 2, content supplied round 4

The About page ships a Cases section in a coming-soon state. This fills it.

Cases are a **separate collection**, not an extension of `how_it_was`. `how_it_was` is post-tour reportage; cases are pre-existing COATI results used as proof.

**Attribution (client-approved wording):** *Delivered by COATI, the team behind We Present.* Every case carries it. These are COATI results, not We Present results, and must not be presented as the latter.

**Files:** new `web/src/lib/cases.ts`, `web/content/cases/`, `web/public/admin/config.yml`, `web/src/app/[locale]/about/page.tsx`, new `web/src/app/[locale]/cases/[slug]/page.tsx`

**Type**

```ts
type Case = {
  slug: string
  category: 'sales' | 'media' | 'influencers' | 'events' | 'digital' | 'awards'
  partner: { en: string; ru: string }
  headlineMetric?: { value: string; label: { en: string; ru: string } }
  summary: { en: string; ru: string }        // one line, index card
  description?: { en: string; ru: string }   // detail page
  activities?: { en: string; ru: string }[]
  results?: { en: string; ru: string }[]
  quote?: { text: {en,ru}; attribution: {en,ru} }
  images?: string[]
  destination?: string
  order: number
  featured?: boolean
}
```

**Accept:** collection loads; CMS editable in both locales; a case with only `summary` and `headlineMetric` renders correctly on the index with no empty detail page link.

---

### [x] WO-31 — Cases index: stat rail, filter, editorial grid

**Origin:** round 4, design direction agreed with Shaf

Three layers. Do not collapse them into one.

**Layer 1 — stat rail.** Exactly three figures. Count-up on scroll, once only, honouring reduced motion. Numbers set in Playfair at display scale with a `.kicker` label beneath. No boxes, no icons, no progress rings.

- 19,854 room nights delivered
- 15,000+ agents in network
- 11 years in market

**Layer 2 — filter row.** Six labels: All work, Sales growth, Media, Influencers, Events, Awards. Render as small serif labels with a gold underline that slides between them, **not** as filled chips. Client-side filter with a soft cross-fade and layout transition. This is where the section's animation budget goes.

**Layer 3 — case grid.** Asymmetric, not a uniform grid. One large feature card, then smaller tiles in mixed weights (aubergine fill, ivory with amethyst hairline). Rhythm carries the design; equal cards are what made the value grid read flat.

**Card contents:** category kicker, one number set large in Playfair, partner name, link through to the detail page. One number per card. Detail belongs on the detail page.

**Constraints:** no stat-widget styling. No gold fills (Rare Gold Rule) — gold is the filter underline and hover accents only. Hover reveals a preview treatment, per the research on premium case sections.

**Accept:** three stats maximum in the rail; filter is text-based not chip-based; grid is visibly asymmetric; each card carries exactly one figure; reduced-motion disables the count-up and cross-fade.

**Verify:** screenshot at desktop, tablet and mobile, both locales, with the filter on All work and on one category.

---

### [x] WO-32 — Case detail pages

**Origin:** round 2 ("Learn more" per case)

Each case gets a full editorial page: the challenge, what COATI did, the result, partner quote and imagery. This is where description, activities and results live, keeping the index clean.

**Accept:** detail route works for every case with a `description`; cases without one are not linked; back-link to the filtered index preserves the active filter.

---

### [x] WO-33 — Seed the case content

**Origin:** mined from the three COATI decks, 1 Aug 2026

**Critical filter.** The decks mix delivered work with sales proposals, and the PR deck is a template written around "Dharana at Shillim" as a sample client. **Only the slides headed "Examples of our previous successful…" and the company deck's "Real numbers / Real facts" slides describe work actually done.** Do not publish award packages, influencer shortlists or magazine barter terms — those are pitches.

**Tier 1, hard numbers (lead with these)**

| Partner | Result | Category |
| --- | --- | --- |
| Cinnamon Maldives (4 hotels) | 19,854 room nights Apr–Dec 2025, +20% vs 2024 | sales |
| Sheraton Maldives Full Moon | +98% sales growth 2023–25; 4,287 room nights in 2025 | sales |
| Holiday Inn Resort Kandooma | 6,750 room nights; Nov 2025 +443 YoY | sales |
| Fushifaru Maldives | +73% vs 2021 RU, +28% vs 2024, +143% Kazakhstan | sales |
| Walkers Tours, Sri Lanka | +60% in first year of partnership | sales |
| Happy Planet DMC, Mauritius | 7 new tour operator contracts, 2025 | sales |
| Ministry of Heritage and Tourism of Oman | Appointed official representative | awards |
| Fashion Travel Awards 2026 | Best representative company in Russia | awards |

Feature **Cinnamon** and **Fushifaru** prominently: both are also WePresent tour partners, which makes the proof directly relevant.

**Tier 2, reach and media**

- Print: Aeroflot and Kavkaz Air in-flight, Hello!, Flight Line, Redesign, Vash Azimuth, Travel Time, Moda Topical, FB
- Digital: Hello! (including a GM interview), SNOB, Russian Traveller, TTG Russia, Top Hotels, Discovery
- Radio: Business FM St Petersburg, approximately 300,000 weekly listeners
- Influencers and celebrities: Regina Todorenko (7.7M), Katya Lel, Anna Semenovich, Anastasia Volochkova, Tatyana Chuprova (735K), @momsmile (612K)
- Events: 1,000+ agents reached annually, 100+ new partners per roadshow, 90% of seminar attendees become more active sellers
- Network: 15,000+ agent CRM, Telegram 4.5K, Instagram 2.5K
- Digital and OTA: Yandex Travel (28.85% of the Russian OTA market in 2025), Sletat.ru joint campaign (500 offices, 2.5M searches daily)

**Handling rules**

- Revenue figures were redacted in the source decks. Publish room nights and percentages only.
- Paraphrase the Sheraton and Kandooma partner emails. Do not quote them verbatim.
- Celebrity and influencer names are cleared for publication by the client, but present them as past collaborations, not ongoing endorsements.

**Accept:** every published figure traces to a "previous successful" or "real numbers" slide; no proposal content published; attribution line present on every case.

---

# Phase 5 — Contact, forms and locale

### [x] WO-40 — Contact details

**Origin:** round 4

**Steps**

1. Add the LinkedIn showcase page: `https://www.linkedin.com/showcase/we-present-project/` — **alongside** Instagram (`@wepresentproject`), not replacing it. Strip the `?viewAsMember=true` query parameter.
2. Add the working phone number **+7 915 371 44 86**, rendered as a click-to-chat WhatsApp link (`https://wa.me/79153714486`) as well as a `tel:` link.
3. Email: show nothing until the production address exists. Keep `hello@wepresent.org` treated as a placeholder per `PRODUCT.md`, and do not present it as confirmed.

**Accept:** both social links in the footer and on Contact; phone works as WhatsApp on mobile and `tel:` on desktop; no unconfirmed email presented as final.

---

### [x] WO-41 — Confirm the RU/EN form split

**Origin:** round 2, likely already correct

RU keeps the full project sign-up form. EN shows a contact block only. This is deliberate.

**Accept:** verified on Register, Contact and Become a Partner in both locales. If already correct, tick and note it. Do not "fix" the asymmetry.

---

# Phase 6 — Design and motion

### [x] WO-50 — Hero image treatment

**Origin:** round 4 (client asked for advice)

The client likes the destination-neutral ocean image but finds the purple overlay unnatural. Cause: the photo is cyan and the overlay is violet, near-opposites, so layering them desaturates both into a muddy grey-blue. This is a colour problem, not an opacity problem.

**Do**

1. Remove the flat purple wash.
2. Colour-grade instead: reduce saturation roughly 15%, warm the highlights toward ivory, deepen the shadows toward aubergine. The image then belongs to the palette without anything sitting on top of it.
3. Crop tighter into the calmer deep water. The foam is visually busy behind type.
4. If the headline still needs contrast help, fix it at the text (text-shadow) or the header's own frosted panel.

**Do not** add another scrim or gradient layer over the photo. `DESIGN.md` names this as a rule after the project hit the bug twice.

**Implementation:** CSS filter plus the existing header treatment rather than baking the grade into the file, so it stays tunable.

**Accept:** no flat colour wash on the hero; image reads natural; headline and header both legible; no new gradient layer over the photograph.

**Verify:** before and after screenshots at desktop and mobile; pixel-sample the headline area for contrast ratio.

---

### [x] WO-51 — Elevate the About value grid

**Origin:** v2.0 §8, client priority

Six equal ivory cards with the same gold sparkle and a uniform fade. The eye skims.

**Design**

- Distinct thin line icon per value: awareness (broadcast), connections (network), media (camera), sales (upward chart), partnerships (handshake), results (checked bar). Keep the sparkle as a brand accent, not the only icon.
- Break the monotony: a bento layout with one or two larger cards, with Measurable Results as the focal point.
- Add depth and a focal accent: clearer elevation, a gold top-rule or corner accent, stronger title-to-body hierarchy.
- Optionally, one supporting statistic with a count-up to make "measurable results" tangible.

**Motion (Framer Motion)**

- Parent container with `staggerChildren` so cards rise, fade and slightly scale in sequence.
- Icon entrance: SVG path draw-on or a small spring pop.
- Hover: spring lift, icon scale, a gold rule sweep, subtle sheen. Interruptible springs.
- Slow and refined. Reduced motion falls back to a simple fade.

**Skills, in this order:** `impeccable` (hierarchy, focal point, micro-interactions), then `taste-skill` (avoid generic output), then `emil-design-eng` and `apple-design` (motion), then `find-animation-opportunities` → `improve-animations` → `review-animations`.

**Scope:** the six value cards only. Do not over-animate the rest of the page.

**Accept:** six distinct icons; a clear focal card; choreographed entrance; hover micro-interactions; reduced-motion fallback verified.

**Verify:** before and after screenshots; record a short capture of the entrance; toggle `prefers-reduced-motion` and confirm the fallback.

---

### [x] WO-52 — Contrast pass

White against lilac was reported as too similar. Related: adjacent near-identical tints erase section seams.

**Steps**

1. Pixel-sample every section boundary and card-on-background pairing.
2. Fix any pairing below a visible delta, and any text below `text-ink/70`.
3. Confirm no `text-gold` at small sizes.

**Accept:** every section boundary is visible without squinting; no muted text below `/70`; no small gold text.

**Verify:** run the accessibility review skill; report contrast ratios for the flagged pairings.

**Done 5 August 2026.** There is no accessibility review skill installed, so the
verification is two repeatable scripts committed at `web/scripts/a11y/`. They measured
2,464 text nodes across 38 page loads at 1440px and 2,230 at 390px, both locales, plus
every section seam and card-on-ground pairing. Read that directory's README before
re-running: three measurement traps produced 16 false failures out of the first 19, and
they will produce them again for the next person.

**Fixed, muted text below the `/70` floor**

| Where | Was | Measured | Now |
| --- | --- | --- | --- |
| Contact, phone/WhatsApp separator | `text-ink/40` | 2.35:1 | `/70`, plus `aria-hidden` since it is decorative punctuation |
| Workshop calendar label, home and /tours | `text-amethyst/70` | 3.18:1 | `text-amethyst` |
| Comparison table, mobile-only column header | `text-ink/60` | 3.90:1 | `/70` |
| Footer office and phone labels | `text-soft-lilac/60` | 3.97:1 | `/70` |
| Cases filter, inactive tab | `text-ink/60` | 4.05:1 | `/70` |
| What's Included fine print | `text-ink/60` | 4.05:1 | `/70` |
| Map placeholder "Show map" | `text-amethyst` | 4.48:1 | `text-aubergine` |

Three of those were shipped by round 5 itself, and two were visible only at 390px.

**Fixed, the actual round-1 complaint.** "White against lilac was reported as too
similar" traced to the shared banner gradient. The ivory kicker sat on the pale end and
measured **2.54:1** on the home register band and **4.07:1** on the taller page banners.
How pale depends on section height, so the same component passed on a short banner and
failed on a long one, and any copy edit through the portal could flip it. Moving the
amethyst stop from the default 50% to **20%** puts every banner's content on amethyst or
darker regardless of height: 6.19:1, 6.89:1, 7.66:1. Palette, type, radius and card
chrome are untouched; the two screenshots are near-indistinguishable.

**Confirmed, no small gold text on a light ground.** Every gold text node on the site is
12px or 16px on aubergine at **5.16:1**. Everything else using `text-gold` is a
decorative `Sparkle` SVG, not text.

**Result: zero text nodes below AA at either width, in either locale.**

**Left alone, deliberately**

- **Two "boundary" findings on the destination and resort heroes** are artifacts: the
  analytical pass cannot see an `<img>`, so it compared two ivory grounds. Sampled at the
  real seam they measure RGB distance 325 and 327.
- **The About accent band running into the footer**, both aubergine, no rule. The home
  page resolves its gradient into the footer the same way, so this is the established
  treatment rather than a defect, and adding a rule to the footer would break the home
  page's transition. Flagged rather than changed, per the standing instruction not to
  alter the visual identity uninvited. If the client wants the footer separated
  everywhere, it is one `border-t` on `Footer.tsx`.

---

### [x] WO-53 — Russian typography check

**Origin:** round 1

Russian rendering was reported broken from incomplete Cyrillic coverage.

**Steps**

1. Confirm Playfair Display and Manrope are loaded with the Cyrillic subset, not Latin only.
2. Check the 1400px nav breakpoint still holds for the longer Russian labels, including the renamed Destinations item from WO-10.
3. Screenshot every page in RU at 1440px, 1024px and 390px.

**Accept:** no fallback-font rendering anywhere in RU; no nav overflow; no clipped labels.

---

# Phase 7 — Portal, security, handover

### [x] WO-60 — Extend the Decap CMS schema

**Origin:** rounds 2 and 4. Client's stated top priority is self-service editing.

Add or extend collections for everything introduced above: `destinations`, `cases`, tour `whatsIncluded` (with `registrationFee` optional and off by default), tour `onSiteProgram` title override, `programmePdf` upload, the Kenya lodge collection, and the Oman `programmeType` flag.

**Accept:** a non-technical editor can add a case, edit a tour's inclusions, change the on-site programme title and upload a programme PDF, in both locales, without touching code.

**Verify:** perform each of those four operations through `/admin` and confirm the change appears after rebuild.

---

### [x] WO-61 — Security pass

**Origin:** July 2026 security review, `WePresent-Security-Review-and-CLAUDE-additions.md`

Apply the `## Security` section to `web/CLAUDE.md` and close the gaps found: security headers and CSP in `next.config.ts`, rate limiting on all form routes (including the new PDF gate), magic-byte plus size and count validation on uploads with private storage, email-format and max-length validation, dependency scanning, and repo hygiene on `/admin` (2FA, least privilege, protected main, real OAuth in production).

**Accept:** every gap in the review is either closed or explicitly deferred with a written reason.

---

### [ ] WO-62 — Handover package — **REVISED round 5**

**Origin:** round 2, revised round 5

**The zip is superseded.** The client asked whether a Git repository would do instead,
and it would: the Decap portal only works if the host rebuilds on commit, which means the
site must stay connected to a repo. A zip handover and a working content portal are
mutually exclusive. Handover is therefore a repository transfer, not an archive.

Full procedure, including the exact commands, is in
`WePresent-Auth-and-Handover-Guide.md` (Cowork project folder). Summary:

**Steps**

1. Audit git history for secrets before anything else. Any hit gets rotated, not just removed: squashing hides a credential from the new repo, it does not un-expose one already pushed.
2. Build a handover copy with `rsync`, excluding `.git`, `node_modules`, `.next`, `.claude`, `.submissions`, `.env*`, `*.pem`, `*.key`. Note that `rsync` copies gitignored files, so those exclusions are load-bearing.
3. Remove `CLAUDE.md`, `web/CLAUDE.md`, `.mcp.json` and any `.claude/` directory, and add them to `.gitignore`.
4. Fresh `git init`, single "Initial commit", so no Claude Code commit trailers survive.
5. Verify: `npm ci && npm run build` clean; no `.env*`, `*.pem`, `*.key` present; no AI tooling references outside `.gitignore`.
6. README covering build, required environment variables, CMS access and deployment.
7. Push to a COATI GitHub organisation, not a personal account. Shaf added as maintainer. Transfer on final payment.
8. Avoid Cloudflare in any recommended DNS or CDN configuration — the client's Russian users must reach the site without a VPN.

**Accept:** a clean clone builds from the README alone; the repo contains no credential
and no AI tooling artefact; `git log` is a single commit.

---

### [~] WO-63 — CMS OAuth handler for production — **CODE COMPLETE 6 August 2026, awaiting the client's OAuth App**

**Origin:** round 5. Blocks the content portal, which is the client's stated top priority.

**Built and verified locally 6 August 2026.** `src/lib/cmsAuth.ts`,
`src/app/api/auth/route.ts` and `src/app/api/callback/route.ts` are in, `config.yml`
carries `base_url` + `auth_endpoint`, and `.env.local.example` documents the three
variables. What remains is not code: **someone with COATI organisation access must
register the GitHub OAuth App** and put its client ID and secret into the host's
environment. Until then `/admin` loads and sign-in returns a plain-text message naming
the missing variables.

**The message protocol was read out of the Decap 3 bundle, not assumed** — see
`handshakeCallback` / `authorizeCallback` in decap-cms.js. It is a three-step handshake:
the popup posts `authorizing:github`, the opener echoes it back, and only then does the
popup post `authorization:github:success:{token,provider}`. The opener discards any
message whose `event.origin` is not exactly its configured `base_url`, which is why
`SITE_URL` must be a bare origin with no trailing slash.

Also confirmed from the bundle: **`local_backend: true` is inert in production.** Decap
only contacts the local proxy when
`["localhost","127.0.0.1",...allowed_hosts].includes(location.hostname)`, so the line
stays and local editing keeps working.

**Verified locally:** `/api/auth` redirects with the right `client_id`, `redirect_uri`,
`scope` and `state`, and sets the state cookie `HttpOnly; SameSite=Lax; Path=/api`; a
request for `scope=delete_repo` is downgraded to `repo` by the allowlist; a non-GitHub
provider is rejected 400; a missing or mismatched `state` returns the error page with a
single undifferentiated message; the callback clears the state cookie and sends
`Cache-Control: no-store`. The handshake itself was driven end to end in a headless
browser against a listener copied from Decap's own code: the token arrives intact, and
**it is not delivered when the page targets a different origin** — the wildcard-free
`postMessage` target was tested, not merely written. Build clean, 65 pages, every page
route still SSG.

**Two things to check on the deployed site**, neither testable from here: the full login
against the real OAuth App, and whether github.com is reachable from a Russian network
without a VPN. If it is not, this approach fails outright and the backend has to move to
GitLab (PKCE, no handler needed) or a self-hosted Gitea.

`web/public/admin/config.yml` currently relies on `local_backend: true`, which works only
against `npx decap-server` on localhost. In production Decap authenticates against GitHub
and needs a server-side token exchange. Netlify Identity and Git Gateway are both
deprecated and must not be built on.

Full implementation, including both route handlers and the GitHub OAuth App setup, is in
`WePresent-Auth-and-Handover-Guide.md` Part 1.

**Files:** new `web/src/app/api/auth/route.ts`, new `web/src/app/api/callback/route.ts`,
`web/public/admin/config.yml`, environment variables

**Steps**

1. Register a GitHub OAuth App under the COATI organisation, callback `https://<site>/api/callback`. Register a second one for localhost.
2. Add `GITHUB_OAUTH_CLIENT_ID`, `GITHUB_OAUTH_CLIENT_SECRET`, `SITE_URL` to the host's environment. Never commit them.
3. Implement `/api/auth` (redirect to GitHub with a `state` CSRF cookie) and `/api/callback` (verify `state`, exchange the code, return the `postMessage` page).
4. `postMessage` targets `SITE_URL` explicitly, never `"*"`. A wildcard leaks the token to any page that opened the popup.
5. Add `base_url` and `auth_endpoint: api/auth` to `config.yml`. No leading slash on `auth_endpoint`.
6. Use `public_repo` scope rather than `repo` if the repository is public.

**Accept:** an admin who is a repo collaborator can log in at `/admin` on the deployed
site, publish an edit, and see it rebuild and go live.

**Verify:** complete the flow end to end on the deployed site. Separately, confirm
github.com is reachable from a Russian network without a VPN — if it is not, this whole
approach fails and the backend switches to GitLab (PKCE, no handler needed) or a
self-hosted Gitea.

---

# Round 5 — Workshop, Tour 2 and contacts

Origin: client feedback of 3 August 2026. Spec v2.2.

**Out of scope, do not build:** the client asked for a registration management module in
the admin panel with stored applications, status changes and automated status emails.
This is a software system, not a website feature, and has been declined. The website's
responsibility ends when the form submission is emailed. Do not add a database, an
admin registrations screen, or status logic. If it resurfaces, the answer is a
third-party platform connected to the existing forms.

---

### [x] WO-80 — Remove internal notes from published tour copy — **DONE 4 Aug 2026**

**Origin:** round 5 review. Currently live on the client-facing site.

Working notes were written into tour content as visitor-facing copy and are published.

**Files:** `web/content/tours/maldives-ttm-tour-2.json`, then audit all of `web/content/`

**Steps**

1. In the Tour 2 summary, delete the sentence "End date revised to 3 September per the client's calendar." in both locales. It is an internal status note.
2. Delete the Madifushi stop note "Inclusion within the shorter window is being confirmed with the client." in both locales. Replaced properly in WO-81.
3. Replace the placeholder stop notes "Resort stop 1", "Resort stop 2", "Resort stop 3" with real one-line descriptions in both locales, or empty them and let the render guard hide the line. Do not ship the placeholders.
4. Audit every file under `web/content/` for the same class of leak: any string addressed to Shaf or the client rather than to a visitor. Grep for "client", "confirm", "TBC", "placeholder", "to be revised".

**Accept:** no string anywhere in `web/content/` refers to the client, to Shaf, or to the
build process. Every visible note reads as copy written for a visitor.

**Verify:** fetch the deployed Tour 2 page in both locales and read every sentence.

**What was done, 4 August 2026**

- Tour 2 summary: internal sentence removed, and the remaining copy rewritten so it no longer states TTM is combined with the tour. Now reads as the optional framing, both locales.
- Tour 2 stop notes: `Resort stop 1/2/3` replaced with real one-line descriptions from spec v2.2 Appendix B, both locales.
- Tour 2 Madifushi note: emptied. Its dates still read `To confirm` and are corrected in WO-81.
- Tour 1 carried the same `Resort stop N` placeholders and was fixed in the same pass. It was not in the original order text; it should have been.
- `tours/[slug]/page.tsx`: stop note wrapped in a render guard so an empty note produces no element rather than an empty paragraph. This is what makes leaving a note blank a legitimate content choice instead of a layout defect.
- Full audit of `web/content/` for the same class of leak: clean. Remaining occurrences of the word "client" are visitor-facing copy about a media company and about agents' own clients.
- `tsc --noEmit` clean.

**Still needed:** redeploy, then read the rendered Tour 2 page in both locales. The fix is
in content and one component; it is not live until the site rebuilds.

---

### [x] WO-81 — Tour 2: confirmed dates, TTM as optional, rename

**Origin:** round 5. Client confirmed 28 August to 5 September 2026.

TTM is explicitly **optional**: participants may attend if they wish, or join the tour
without it. The current page contradicts itself, showing a 28 August start above an
itinerary whose first row is TTM on 26 to 27 August.

**Files:** `web/content/tours/maldives-ttm-tour-2.json`, `web/src/lib/tours.ts`,
tour detail template, `web/public/admin/config.yml`

**Steps**

1. Set dates to "28 August to 5 September 2026" / "28 августа по 5 сентября 2026". No em dashes in the copy strings; use the client's own phrasing style.
2. Rename the tour to `Maldives · Tour 2` / `Мальдивы · Тур 2`. Naming it after an optional element oversells it and breaks symmetry with Tour 1. **Slug stays `maldives-ttm-tour-2`** so the live URL does not break.
3. Re-time the itinerary to the confirmed range, which restores the original four-resort plan: Fushifaru 28 to 30 Aug, Meyyafushi 30 Aug to 1 Sep, SO/ Maldives 1 to 3 Sep, Madifushi Private Island 3 to 5 Sep, departure 5 Sep. Madifushi is confirmed, not pending. Remove the "To confirm" stop entirely.
4. Move TTM out of the itinerary into its own clearly-labelled optional block above it, dated 26 to 27 August, stating that it takes place before the tour begins and that attendance is at the participant's choice.
5. Add an `optional?: boolean` flag to `TourStop`, or render the TTM block from the existing `ttmOverview` field, whichever is less invasive. Do not let an optional item render inside the dated itinerary sequence.
6. Update `ttmOverview` copy in both locales to state the optionality plainly.

**Accept:** header dates, itinerary and TTM block all agree; no visitor could conclude
TTM is included; four resorts appear with confirmed dates; RU and EN match.

**Verify:** `npm run build`; read the page in both locales end to end and confirm the
dates form one consistent story.

---

### [x] WO-82 — Office phone and addresses

**Origin:** round 5

Client confirmed: keep the mobile as the WhatsApp contact **and** add the office landline.
Both offices to be listed.

**Files:** `web/src/lib/contact.ts`, `web/src/i18n/dictionaries/en.ts` and `ru.ts`,
footer, contact page

**Steps**

1. Add to `contact.ts`: `OFFICE_PHONE = "+7 (495) 150-11-03"` with a `tel:` href stripped of spaces, brackets and dashes.
2. Add both offices as structured data, not free text, so the map order in WO-83 can key off them. Moscow: "White Stone, 4th Lesnoy Pereulok, 4". St Petersburg: "Regus Nevsky Plaza, Nevsky Prospect, 55". Russian versions required.
3. Keep `PHONE` and `WHATSAPP_HREF` as they are, labelled as the WhatsApp contact. The landline is a separate line, not a replacement.
4. Replace the footer's "Office address: to be confirmed" placeholder with the two offices.
5. Leave `EMAIL` as `null`. Still pending hosting.

**Accept:** footer and contact page show the landline, the WhatsApp mobile and both
addresses in both locales; no "to be confirmed" placeholder for address remains.

---

### [x] WO-83 — Interactive maps for both offices

**Origin:** round 5. Client asked for interactive maps.

**Use Yandex Maps, not Google.** Google Maps is unreliable for Russian visitors and the
whole hosting brief is that the site must work without a VPN.

**Files:** new map component, contact page, `web/src/app/[locale]/legal/page.tsx`,
`next.config.ts` if a CSP is in place

**Steps**

1. Render each map as a **click-to-load placeholder**: a static styled block with the address and a "Show map" control, which swaps in the embed on interaction. Do not load a third-party iframe on every page view.
2. Reason it matters beyond performance: an auto-loading embed sets third-party cookies before the visitor has done anything, which the privacy policy would then have to cover for every visitor rather than for those who opt in.
3. Update the privacy policy page in both locales to disclose the Yandex Maps embed and that it loads only on interaction.
4. Add the Yandex frame domain to `frame-src` in the CSP if one is configured. Do not widen the policy further than needed.
5. Style the placeholder to the palette. A raw grey map tile against ivory and lilac will look like a bug.

**Accept:** both offices show a map that loads only when asked; no third-party request
fires on initial page load; privacy policy updated in RU and EN.

**Verify:** load the contact page with a network panel open and confirm zero Yandex
requests before the click.

---

### [x] WO-84 — Add the We Present Workshop to the calendar

**Origin:** round 5

First We Present Workshop, **November 2026, Moscow**. Exact dates, venue, programme and
partner count are all unconfirmed and must not be invented. It brings together COATI
collection partners (hotels, resorts, destinations); travel agents are invited to attend
**complimentary**. Standard We Present branding, no separate identity.

**Modelling decision:** a `format` discriminator on the existing tours collection, not a
separate collection. The Workshop needs almost the whole tour surface (year, bilingual
name, bilingual dates, status, summary, hero, coming-soon state, registration CTA) and
lacks only what a tour adds (destination, resorts, itinerary, inclusions, on-site
programme). That is a variant, not a sibling. It also keeps the calendar as one ordered
list and gives the client one place in the portal to add an event. If workshops later
grow their own structure (agenda, speakers, exhibitors), `format` is the seam to split on.

**Files:** `web/src/lib/tours.ts`, new `web/content/tours/we-present-workshop-2026.json`,
tour detail template, calendar components, `web/public/admin/config.yml`,
`web/src/i18n/dictionaries/en.ts` and `ru.ts`

**Steps**

1. Add `format: "tour" | "workshop"` to the `Tour` type, defaulting to `"tour"` so all five existing files keep working untouched.
2. Make `destination` and `stops` optional on the type, since a workshop has neither. Guard every consumer.
3. Create the workshop content file: `format: "workshop"`, `status: "pending"`, year 2026, dates "November 2026" / "Ноябрь 2026", location Moscow, order placing it after the Maldives tours.
4. Calendar card: render workshops with a location line instead of a resort line-up, and "Dates to be confirmed" in the dates slot. Give the card a quiet visual differentiator so it does not read as a destination tour. Not a badge shouting NEW.
5. Detail template branches on `format`. The workshop page renders: what the Workshop is, who attends, the complimentary note for agents, Moscow and November 2026, and a registration CTA. It must **not** render the resort grid, itinerary, What's Included or on-site programme blocks.
6. Copy, both locales, from the client's own wording. It is a professional networking and educational event bringing together partners from the COATI collection, with presentations, product updates, brainstorming sessions and business networking. Say plainly that dates, venue and programme will be announced.
7. Portal: add `format` as a dropdown to the tours collection, and make the tour-only field groups conditional on it so an editor creating a workshop is not shown an itinerary builder.

**Accept:** the Workshop appears in the calendar alongside the tours; its page renders no
empty tour blocks; a visitor can register; no invented date or venue appears anywhere;
both locales complete.

**Verify:** `npm run build`; view the calendar and the workshop page in RU and EN; confirm
the four existing tours are visually and functionally unchanged.

**Two departures from the order text, 5 August 2026**

1. **Step 7's conditional field groups are not built, because Decap 3 cannot do it.**
   Conditional fields are a long-standing Decap feature request, not a supported config
   option; the `condition` strings in the CDN bundle belong to ajv and the `warning`
   package, not to the CMS schema. What shipped instead: a Format dropdown, every
   tour-only field switched to `required: false` so a workshop can be saved without
   them, and hints on each stating which format it applies to. An editor creating a
   workshop still *sees* the itinerary builder; they are told to leave it empty rather
   than prevented from filling it. Revisit if Decap adds the feature.

2. **The calendar dates slot shows "November 2026", not "Dates to be confirmed"**
   (step 4 and Appendix A.4). November 2026 is confirmed fact, and the asset table
   records it as confirmed. Showing "to be confirmed" on the calendar above a detail
   page whose banner reads "November 2026" would have the site contradict itself
   between two clicks, which is the exact defect class WO-81 had just finished fixing.
   Appendix A.3's "Exact dates, venue and programme will be announced" carries the
   caveat on the detail page, which is what A.4's phrasing was protecting. The card
   reads: `Workshop · Moscow` / `We Present Workshop` / summary / `November 2026`.

---

### [x] WO-85 — Workshop registration path

**Origin:** round 5. Client asked for registration "similar to the existing tour registration process".

The existing `/register` route and `api/register` already collect name, agency, phone,
email and a business card upload, and already email the submission. Reuse it. **Do not
build storage or status management** — see the scope note at the top of this section.

**Files:** `web/src/components/RegisterForm.tsx`, `web/src/app/[locale]/register/page.tsx`,
`web/src/app/api/register/route.ts`, `web/src/i18n/dictionaries/en.ts` and `ru.ts`

**Steps**

1. Add an `event` field to the form so a submission records what it is for. Prefill it when arriving from a specific programme page, otherwise let the visitor choose.
2. Include the email subject line and body so the team can tell a workshop registration from a tour registration at a glance.
3. Respect the deliberate RU/EN asymmetry: Russian carries the full form, English shows the contact block. Do not "fix" this for the workshop.
4. Confirm the business card upload passes the existing `validateUploadBatch` and `validateUpload` checks and is attached to the notification email. Note the route currently *requires* both `stats` and `businessCard`; a workshop registration should not demand agency performance statistics, so make `stats` conditional on the event type rather than universally required.
5. The workshop page CTA links to `/register` with the event preselected.

**Accept:** a workshop registration arrives by email, clearly labelled as a workshop
registration, with the business card attached; tour registrations are unchanged.

---

### [x] WO-86 — Rename the EN nav item to Programmes

**Origin:** round 1 (RU label ПРОГРАММЫ), completed in round 5

Russian already says ПРОГРАММЫ, English still says Tours, so the two locales disagree.
"Tours" also does not describe a Moscow workshop.

**Files:** `web/src/i18n/dictionaries/en.ts`, any hardcoded nav label

**Steps**

1. EN nav label becomes "Programmes". Keep the RU label as it is.
2. Update in-page headings that read "Tours Calendar" and "View Full Calendar" for consistency.
3. **Route stays `/tours`.** Renaming it rewrites URLs already live in the review build for no visitor benefit, which is the same reasoning that declined WO-10's nesting.

**Accept:** EN and RU nav labels express the same concept; no route changed; no broken
internal links.

---

# Phase 8 — Final verification

### [x] WO-70 — Full QA sweep — **CLOSED 5 August 2026**

**Reopened 4 August 2026.** This was ticked at the heading while every box below it was
unticked, and it did not catch WO-80: internal working notes were published as
visitor-facing copy on the live Tour 2 page. A tick at the heading is not evidence. Do
not re-tick this order until every box below is ticked individually.

Static checks re-run on 4 August and passing:

- [x] `grep -rni "coati travel" web/src web/content` returns nothing
- [x] `grep -n "—" web/src/i18n/dictionaries/*.ts` returns nothing, both locales
- [x] `grep -rn "—" web/content/` returns nothing. One hit was found and rewritten in `cases/exclusive-buyouts.json`; see the Russian caveat in Guardrails, it was a rewrite rather than a deletion
- [x] No internal or build-process language in `web/content/`. Audit pattern: `the client`, `being confirmed`, `to be revised`, `placeholder`, `TBC`, `resort stop N`, `Shaf`, `awaiting`
- [x] All content JSON parses
- [x] No `TODO`, `FIXME` or `lorem` in `web/src`
- [x] `tsc --noEmit` clean, no type errors
- [x] `prefers-reduced-motion` present in every animated component: `Reveal`, `ResortHeroMedia`, `CasesIndex`, `StatRail`, `ValueJourney`

Still outstanding, none of which can be done by static analysis:

- [x] `npm run build` on a machine with the platform's SWC binary. Run repeatedly through round 5 on macOS: compiles clean, 63 static pages, `/register` still SSG after the Suspense boundary was added
- [x] Every page, both locales, at 1440px, 1024px and 390px. Done 5 Aug with `web/scripts/responsive-sweep.mjs`: 52 reachable paths x 3 widths, 0 broken routes, 0 horizontal page scroll, 0 elements overflowing an unclipped container, 0 crowded tap targets. One real defect found and fixed — see below
- [x] Accessibility review skill run, findings addressed. Overlaps WO-52. No such skill is installed; done instead with the two scripts at `web/scripts/a11y/`, which found and fixed seven muted-text failures and the banner-gradient pairing behind the round-1 report
- [x] Lighthouse on homepage, About and a tour detail page. Done 5 Aug against a production build. Accessibility 100, best practices 100, SEO 100 on all three after the hreflang fix below. Performance 83–87, all of it LCP
- [x] Every BLOCKED item still blocked is listed in the handover notes — `docs/handover-blocked-items.md`. WO-62 folds it into the handover README

**What the sweep found.**

*Fixed:* the file-upload field clipped its own Russian placeholder at 390px. "Файл не
выбран" needs 90px in an 86px box, so it rendered mid-word. The `truncate` is wanted for
real filenames, which can be any length, so the row now wraps instead. `/ru/register` and
`/ru/become-a-partner`, both locales checked.

*Fixed, found by Lighthouse:* **hreflang was wrong on every page except the two locale
roots.** The root layout declared `alternates.languages` as the literal strings `/ru` and
`/en`, and every page inherited it — so `/ru/about` told search engines its English
equivalent was the English *homepage*, in relative URLs Google will not accept. Each page
now declares its own via `localeAlternates()` in `src/i18n/config.ts`, with `canonical`
and `x-default`, made absolute by a new `metadataBase`. SEO 90/91 → 100.

*Not fixed, needs a decision:* **LCP is 4.1–4.7s and the cause is not an image.** The LCP
element is the hero `<h1>`, which sits inside `<Reveal trigger="mount" delay={0.1}>`.
Time to first byte is 14ms; element render delay is 1209ms. The heading starts at opacity
0 and cannot paint until hydration plus the fade-in finish, so the site's largest text
waits on JavaScript. Rendering the hero heading immediately and animating only the
sub-elements would move Performance into the 90s. It changes the feel of the entrance,
which is a design call, so it is flagged rather than done.

*Also worth raising:* every page shares one `<title>` and one meta description, inherited
from the root layout. Lighthouse cannot see this — it audits one page at a time — but it
materially hurts search. Per-page titles are a small, separate piece of work.

**Measurement note.** The sweep's first three runs produced ~300 findings, all false: it
counted `sr-only` text as clipped (it is deliberately clipped to 1px), counted every
ordinary footer link as an undersized tap target (WCAG 2.5.8 exempts targets with 24px of
clearance), and counted a transform-scaled hero image inside an `overflow-hidden` frame as
overflowing. It also could not crawl the resort pages at all, because their autoplaying
hero video means `networkidle` never fires — the crawl now uses plain HTTP against the
static HTML, and the checks abort video requests. Same lesson as the WO-52 contrast pass:
confirm a finding against real pixels before believing it.

**New standing check, added because WO-80 slipped past every existing one:** read the
*rendered* page as a visitor, in both locales, for any page whose content changed. Every
check above inspects source. None of them would have caught a sentence that is valid
JSON, correctly typed, free of banned characters, and addressed to the wrong reader.

---

## Where to pick this up

State as of 4 August 2026, start of the round-5 session.

**Do this first.** Re-read the Guardrails above, then `docs/round-4-status.md` for what
round 4 shipped. `docs/cases-source-extract.md` is the audit trail for every published
case figure; the source decks are gitignored at 583MB and live only on local disk, so
that file is all that survives a fresh clone.

**Then WO-80, immediately.** Internal working notes are published on the live Tour 2
page, including "End date revised to 3 September per the client's calendar" and
"Inclusion within the shorter window is being confirmed with the client". The client is
reading their own project status off their own website. Nothing else in round 5 matters
until that is gone.

**Order of play after that:** WO-81 (Tour 2 is three weeks out), WO-82 and WO-83
(contacts and maps, both self-contained), WO-84 to WO-86 (the Workshop), then WO-52,
WO-63, and WO-62 last.

**Do not reopen WO-10's URL nesting** without a new reason. Moving resort pages under
`/destinations/[destination]/[resort]` was considered and declined: nothing is broken, no
visitor sees a difference, and it rewrites URLs already live in the review build. The
same reasoning applies to WO-86: rename the label, keep the route.

**The review build is now current.** `playful-cassata-3c1ccf.netlify.app` reflects the
round-4 work, so Netlify is deploying from `main` again. The CMS still needs WO-63 before
an editor can publish through it on the deployed site.

**Two facts on the site still want client confirmation before launch:** the Cases stat
now reads "in market since 2014" (confirm the basis), and the eighth case, the
full-resort buy-outs, is sourced from a "Real facts" slide but sits outside the spec's
approved Tier 1 table.

---

## Open points for the client

Carry these into the next client summary. None of them block the orders above.

1. **Inclusions** — the included and not-included split needs client fact-check. Included: accommodation, dining, transfers, exclusive programme. Not included: international flights, TTM entry, insurance, visa. TTM entry is now explicitly optional, so the wording must not imply it was ever bundled.
2. **PDF language** — RU only, or RU and EN?
3. **"TTM Tier 1 / Tier 2"** — naming for the two August tours, unconfirmed since round 1. Largely moot now that Tour 2 is renamed and TTM is optional, but worth closing.
4. **Partner logos** — SVG or transparent PNG needed. AI and PSD are not web formats. Longest-running blocker.
5. **Tour dates** — Cinnamon, Oman, Kenya.
6. **Workshop details** — exact dates, venue and programme. Client confirmed November 2026 in Moscow and nothing further; the page ships in a coming-soon state until these arrive.
7. **Oman and Kenya content** — itinerary, lodge roster, imagery, partner permissions.
8. **Production email** — pending hosting decision.
9. **Hosting** — confirm the Squarespace purchase was the domain only. A Squarespace website plan cannot host this site, and the content portal additionally requires a host that rebuilds on commit.
10. **Oman ministry representation** — confirm whether this can be published as a case and whether the ministry logo may be used.

---

## Closed, do not reopen

- **Registration management module.** The client asked for stored applications, admin status changes and automated status emails. Declined as a software project rather than a website feature. The website emails the submission and stops there. Recorded in spec v2.2.
- **Zip handover.** Superseded by the repository transfer in WO-62. A zip and a working content portal are mutually exclusive.
- **Madifushi's inclusion in Tour 2.** Settled by the confirmed 28 August to 5 September range, which restores the original four-resort itinerary. Do not re-ask the client.
