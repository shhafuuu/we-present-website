# WePresent by COATI — Build Plan

Consolidated work orders for rounds 2, 3 and 4. Supersedes the loose backlog in specs v1.9, v2.0 and v2.1 as the *execution* document. The v2.1 .docx remains the client-facing record; this file is what Claude Code works from.

**Repo:** `github.com/shhafuuu/we-present-website` · **App root:** `web/`
**Companion docs in repo:** `DESIGN.md` (visual system), `PRODUCT.md` (product truth), `CLAUDE.md` (incl. Security section)

---

## How to use this file

Work one order at a time, in order, unless a phase says otherwise.

**Status key.** `[x]` done. `[~]` partially done, see the order for what is left.
`[ ]` outstanding. As of 1 August 2026 the only genuinely outstanding orders are
WO-04 (blocked on web-format partner logos), WO-52 (a systematic contrast pass;
individual pairings have been measured as they were touched) and WO-62 (the
handover zip, which is best produced last). WO-10 is partial by decision: the
Destinations restructure shipped, the URL nesting was judged not worth the churn.

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
| Partner logos as SVG or transparent PNG | **BLOCKED** — AI and PSD only | WO-04 |
| Per-tour programme PDFs | **BLOCKED** — client producing | WO-26 |
| Tour dates for Cinnamon, Oman, Kenya | **BLOCKED** — client confirming | WO-11, WO-12, WO-13 |
| Production email address | **BLOCKED** — pending hosting | WO-27 |
| Oman and Kenya rosters and imagery | **BLOCKED** | WO-12, WO-13 |

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

### [ ] WO-04 — Standardise partner logos — **BLOCKED**

**Origin:** round 2

Client supplied Meyyafushi and Fushifaru as `.ai` and Madifushi as `.psd`. Not web formats.

**When unblocked:** export to SVG or transparent PNG; strip coloured backdrops (no black or purple plates); normalise to a single optical height rather than a single pixel height; make each logo a link to the partner's official site; increase display size per round 1 feedback.

**Accept:** all partner logos transparent, optically aligned on one baseline, clickable, and visually consistent in weight.

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

### [ ] WO-52 — Contrast pass

**Origin:** round 1, recurring

White against lilac was reported as too similar. Related: adjacent near-identical tints erase section seams.

**Steps**

1. Pixel-sample every section boundary and card-on-background pairing.
2. Fix any pairing below a visible delta, and any text below `text-ink/70`.
3. Confirm no `text-gold` at small sizes.

**Accept:** every section boundary is visible without squinting; no muted text below `/70`; no small gold text.

**Verify:** run the accessibility review skill; report contrast ratios for the flagged pairings.

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

### [ ] WO-62 — Handover package

**Origin:** round 2, client is hosting

Client wants a zip on completion.

**Steps**

1. Scrub secrets: no `.env.local`, no Gmail app password, no `.submissions/`.
2. Verify `.gitignore` covers all of the above and that nothing sensitive is in git history.
3. Include a README covering build, environment variables required, CMS access and deployment.
4. Avoid Cloudflare in any recommended DNS or CDN configuration — the client's Russian users must reach the site without a VPN.

**Accept:** the zip contains no credential of any kind; a clean clone builds from the README alone.

---

# Phase 8 — Final verification

### [x] WO-70 — Full QA sweep

- [ ] Every page, both locales, at 1440px, 1024px and 390px
- [ ] `rg -i "coati travel"` returns nothing
- [ ] `rg` for em dashes in `web/src/i18n/dictionaries/` returns nothing
- [ ] No fabricated dates, rosters, metrics or contact details anywhere
- [ ] `prefers-reduced-motion` verified on every animated section
- [ ] Accessibility review skill run, findings addressed
- [ ] `npm run build` clean, no type errors
- [ ] Lighthouse on homepage, About and a tour detail page
- [ ] Every BLOCKED item still blocked is listed in the handover notes

---

## Where to pick this up

State as of 1 August 2026, end of the round-4 session. Working tree clean, everything
pushed to `main`.

**Do this first.** Re-read the Guardrails above, then `docs/round-4-status.md` for what
shipped and the nine open client questions. `docs/cases-source-extract.md` is the audit
trail for every published case figure; the source decks are gitignored at 583MB and live
only on local disk, so that file is all that survives a fresh clone.

**Only three orders are genuinely outstanding**, and one of them is blocked:

1. **WO-52, contrast pass.** The only unblocked build work left. Individual pairings have
   been measured as they were touched (gold on aubergine 5.16:1, the hero panel 6.29:1,
   the lilac card fill 5.00:1 for `ink/70`), but the systematic sweep has not been run.
2. **WO-04, partner logos.** Blocked: the client's files are still `.ai` and `.psd`.
3. **WO-62, handover zip.** Best produced last, once the blocked items land.

**Do not reopen WO-10's URL nesting** without a new reason. Moving resort pages under
`/destinations/[destination]/[resort]` was considered and declined: nothing is broken, no
visitor sees a difference, and it rewrites URLs already live in the review build.

**The review build is stale.** `playful-cassata-3c1ccf.netlify.app` responds but does not
reflect any round-4 work, so Netlify is not auto-deploying from `main`. Wiring that up
also unblocks the CMS, which needs the same rebuild-on-publish webhook.

**Two facts on the site still want client confirmation before launch:** the Cases stat
now reads "in market since 2014" (confirm the basis), and the eighth case, the
full-resort buy-outs, is sourced from a "Real facts" slide but sits outside the spec's
approved Tier 1 table.

---

## Open points for the client

Carry these into the next client summary. None of them block the orders above.

1. **Inclusions** — the included and not-included split needs client fact-check. Included: accommodation, dining, transfers, exclusive programme. Not included: international flights, TTM entry, insurance, visa.
2. **PDF language** — RU only, or RU and EN?
3. **"TTM Tier 1 / Tier 2"** — naming for the two August tours, unconfirmed since round 1.
4. **Partner logos** — SVG or transparent PNG needed. AI and PSD are not web formats.
5. **Tour dates** — Cinnamon, Oman, Kenya.
6. **Oman and Kenya content** — itinerary, lodge roster, imagery, partner permissions.
7. **Production email** — pending hosting decision.
8. **Oman ministry representation** — confirm whether this can be published as a case and whether the ministry logo may be used.
