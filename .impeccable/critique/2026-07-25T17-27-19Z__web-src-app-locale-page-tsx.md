---
target: homepage (web/src/app/[locale]/page.tsx)
total_score: 20
max_score: 28
na_heuristics: 7,9,10
p0_count: 1
p1_count: 3
timestamp: 2026-07-25T17-27-19Z
slug: web-src-app-locale-page-tsx
---
Method: dual-agent (Assessment A: design review, Assessment B: detector + browser evidence — ran as two isolated, parallel sub-agents with no shared context)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | `Button.tsx` defines hover treatments for all 3 variants but zero `focus`/`focus-visible` styling — keyboard focus falls back to the unstyled browser default on every CTA. |
| 2 | Match Between System and Real World | 2/4 | `RegisterBand`'s own CTA ("We Present 2027") contradicts the Hero's "Next Tour · 17-23 August 2026" pill and the "2026 season, at a glance" calendar shown earlier on the same scroll. |
| 3 | User Control and Freedom | 3/4 | No modals/traps; straightforward navigation throughout. |
| 4 | Consistency and Standards | 3/4 | Kicker, Reveal motion, and button variants used with real discipline — one break: no focus treatment despite DESIGN.md mandating visible focus rings. |
| 5 | Error Prevention | 3/4 | Unbuilt resorts/tours render as non-clickable "coming soon" states rather than dead links. |
| 6 | Recognition Rather Than Recall | 3/4 | All nav text-labeled; docked for header density (9 simultaneous top-level choices). |
| 7 | Flexibility and Efficiency | n/a | Persuade-mode marketing page; not a relevant expectation. |
| 8 | Aesthetic and Minimalist Design | 3/4 | Individually clean sections, but a repeated kicker/H2/paragraph/button block across 6 of 8 sections reads as sameness. |
| 9 | Error Recovery | n/a | No error-producing interactions on this page (pure navigation). |
| 10 | Help and Documentation | n/a | Not applicable to a marketing landing page. |
| **Total** | | **20/28 (71%) — Good** | Dragged down by one serious content contradiction, thinned by structural repetition. |

## Design Specificity Verdict

**Mixed: specific in surface, generic in structure.** The photography, the Playfair italic pull-quote, the sparkle/kicker motif, and the merit-based-invitation copy are genuinely authored for this product. But 6 of 8 homepage sections follow the identical centered kicker → H2 → paragraph → pill-button pattern on alternating ivory/lavender-mist bands — that scaffolding is category-interchangeable; only `ResortsGrid` and the tour-card list break from it.

**Where the detector corroborates this from a different angle**: the deterministic scan independently flagged `repeated-section-kickers` (5 on page) and `ai-color-palette`/`cream-palette` hits — two unrelated signals converging on the same underlying read (templated rhythm), which strengthens confidence in the finding.

**Detector findings that are likely false positives, not action items**: `ai-color-palette` (violet/purple) and `cream-palette` (ivory) both flag colors that DESIGN.md names and defends as deliberate, differentiated brand identity ("Twilight Aubergine," "Vivid Amethyst," ivory explicitly chosen as "a true near-white, not a warm cream drift") — established across a mature, already-shipped site, not a lazy default. `image-hover-transform` (×4) matches DESIGN.md's documented hover-lift pattern on cards — by design, not a defect. The `repeated-section-kickers` flag itself sits in a genuine gray zone: DESIGN.md explicitly names and defends this as "The Kicker Rule," and the skill's own guidance carves out an exception for "a deliberate, named brand system" — so the kicker repetition alone isn't the issue; the fact that the *entire section template* repeats 6 times (kicker + rhythm + button, not just the kicker) is what compounds it into the specificity finding above.

## Overall Impression

A well-crafted, disciplined design system executed faithfully at the section level, undermined by two things: a real content contradiction sitting at the page's highest-stakes conversion moment, and a compositional rhythm that's more repetitive than the individual sections' quality would suggest. The single biggest opportunity is breaking the kicker→headline→paragraph→button template that 6 of 8 sections share — the page has the assets (photography, a real value story) to be far more differentiated than its current rhythm lets it be.

## What's Working

1. **Photography and motif discipline.** One decisive photo per section, the sparkle/kicker motif as a quiet signature, the italic Playfair pull-quote — genuinely earns the "editorially restrained invitation" positioning DESIGN.md describes.
2. **Honest coming-soon handling.** Unbuilt resorts, pending tours, and the How It Was teaser render as clearly non-interactive states rather than dead links or fake content.
3. **Contrast/typography execution is careful *almost* everywhere** — text sizing, weight, and color pairing generally read as tuned. (Two specific exceptions below in Priority Issues — worth naming as a tension with this general strength, not a contradiction of it.)

## Priority Issues

**[P0] The page's primary conversion CTA contradicts its own hero and calendar.**
- **What**: `RegisterBand`'s copy reads "We Present 2027" / "the 2027 calendar takes shape" (confirmed in both `en.ts`/`ru.ts`), while the same homepage's Hero shows "NEXT TOUR · 17-23 AUGUST 2026" and `ToursTimeline` (scrolled past immediately before) is headed "The 2026 season, at a glance" with four real 2026-dated tours.
- **Why it matters**: This is the highest-stakes moment on the page for a merit-gated, invite-only programme — a visitor deciding whether registering is worth their time is told the calendar being formed is for next year, when a real tour is weeks out. Risks suppressing registration for tours that are open now.
- **Fix**: Update the copy to reference the current/active season, ideally derived from the same tours data `ToursTimeline` already reads so the two can't drift again.
- **Suggested command**: `/impeccable clarify`

**[P1 — verify before treating as confirmed] Detector flags near-total contrast collapse in the Hero and RegisterBand.**
- **What**: Browser-injected contrast checking reported 4 instances of `#fcfaf6` text on a `#fcfaf6` background (1.0:1) in the hero, and 2 instances of `#fcfaf6` on `#dcc9f0` (1.5:1) in the register section — both far below the 4.5:1 floor.
- **Why it matters**: If real, this would mean hero headline/kicker text and register-section copy are effectively invisible — about as severe as a defect gets. But there's a strong signal this is a detector artifact, not a real bug: Assessment A's independent visual read describes the RegisterBand as a "deep aubergine-to-gold gradient," which doesn't match the `#dcc9f0` (soft-lilac) the checker sampled — suggesting the tool read a different element's `background-color` property (likely a layer behind a video/gradient/image background) rather than the actual rendered pixels. The Hero is known to render over a background video, which commonly causes this class of false positive in computed-style-based contrast checkers.
- **Fix**: Don't dismiss this on my say-so — run this project's own established verification method (pixel-sampled screenshot contrast, not computed CSS) on the hero and register sections before deciding whether it's a real bug or a checker artifact.
- **Suggested command**: `/impeccable audit`

**[P1] The section right after the hero fails basic chunking, and the detector independently flags the same section for line length.**
- **What**: `IntroSection`'s body is a single 70+ word sentence naming seven distinct audience segments with no visual grouping (cognitive-load checklist failure, Assessment A). The detector separately flagged 3-4 instances of >80-character line length site-wide (Assessment B) — plausibly the same paragraph, unconfirmed but likely given the description.
- **Why it matters**: This sits at the exact moment a first-time visitor decides whether the page is worth reading further, and it's the hardest-to-scan text on the page.
- **Fix**: Restructure into a scannable form (short list or 2-3 shorter sentences) instead of one run-on sentence; check whether it's also the source of the flagged line-length instances.
- **Suggested command**: `/impeccable clarify`

**[P1] No custom focus state on the shared Button component, contradicting the design system's own accessibility commitment.**
- **What**: `Button.tsx` defines hover treatments for all three variants but zero `focus`/`focus-visible` classes. Every CTA on the homepage relies on the unstyled browser default outline.
- **Why it matters**: DESIGN.md explicitly requires a visible, branded focus ring ("no color-only focus state, always a visible ring for accessibility") for the input component — the far more frequently used button component has no equivalent.
- **Fix**: Add a shared `focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2` (ivory-ring variant for `ghost-light` on dark backgrounds) to the Button base class.
- **Suggested command**: `/impeccable harden`

**[P2] Header gives "Become a Partner" near-equal visual weight to "Register Interest," contradicting the product's own stated priority.**
- **What**: The header renders both as adjacent, similarly-sized pill buttons on every page including home.
- **Why it matters**: PRODUCT.md states hotels are "a secondary audience served through a lighter funnel" and explicitly warns against elevating partner acquisition to parity with agent registration — the header currently does exactly that.
- **Fix**: Reduce "Become a Partner"'s visual weight (smaller/plain-text link, or separated from the primary CTA) so there's one unambiguous primary action for the agent audience.
- **Suggested command**: `/impeccable distill`

## Persona Red Flags

**Jordan (confused first-timer)**
- Hits `IntroSection`'s run-on sentence naming 7 audience types before ever seeing the plain phrase "travel agent."
- Reaches `RegisterBand` right after reading about an August 2026 tour, is told registration is for "the 2027 calendar" — will likely conclude nothing is open yet and leave.
- Sees "Become a Partner" and "Register Interest" as similarly-weighted header buttons with no signal for which is "for people like me."

**Riley (stress tester)**
- Finds the exact 2026-vs-2027 contradiction above — precisely the class of gap this persona exists to catch.
- Notices three different year-label conventions on one screen: "2026," "2026/27" (Kenya), and "2027" (RegisterBand) directly below.
- Tabs through every CTA and finds no custom focus ring anywhere — confirmed in source, not just by eye.

**Casey (distracted mobile user)** — *lower confidence: could not physically verify a live mobile viewport in this session's browser environment; inferred from Tailwind breakpoints in source, not measured pixels.*
- Header correctly collapses to a hamburger below 1400px; cards stack to single-column below sm/lg.
- Register Interest lives on a separate `/register` page reached after a full homepage scroll — if interrupted between scrolling and the form, nothing preserves her place. Standard multi-page pattern, worth naming given the "checking quickly on a phone" audience profile.

**Marina — RU/CIS travel-agency staffer** *(project-specific persona, derived from PRODUCT.md)*
- **Profile**: Mid-tier agency staffer, forwarded this link, five minutes to decide if it's worth flagging to her manager.
- The platform's single most credibility-building fact — that participation is *earned* by agency production, not open self-serve — is buried as secondary body text under a pull-quote, even though PRODUCT.md names it one of exactly two structural differentiators of the whole platform.
- No visible outcome proof anywhere on the homepage (no case studies, no numbers, no participant testimonial about results) — PRODUCT.md states success is measured on agent bookings after the trip, but the homepage shows nothing about what past participants gained. (The About page's Cases section is honestly coming-soon per this project's own history — a content gap, not a design defect — but it still weakens the homepage's evaluator-facing case.)
- The 2026/2027 date contradiction lands hardest on exactly this persona — a careful B2B evaluator checking "is this current and real" is the first to notice the dates don't hang together.

## Minor Observations

- **Bounce easing on the Hero** (`Hero.tsx:56`, confirmed by both the static CLI scan and live browser evidence — not a false positive): an `animate-bounce` scroll-indicator element. The impeccable skill's own motion guidance explicitly bans bounce/elastic easing ("Ease out with exponential curves... No bounce, no elastic"). Minor, but a direct violation of stated system guidance — quick fix.
- **Undersized label text**: the header's "BY COATI" / "ОТ COATI" byline renders at 10.4px, just under the 11px legibility floor. Likely acceptable as a small decorative sub-label, but worth a look.
- **`nested-cards` flagged 10×** — Assessment B judged the selectors plausible (tour cards, resort cards, partner cards, story cards), not obviously false positives. Worth a quick visual check given the skill's own absolute ban on nested cards, but not yet confirmed as a real structural problem.
- Kenya's tour card reads "2026 / 27" while every sibling card reads a plain "2026" — small formatting inconsistency worth normalizing (connects to the year-contradiction issue above).
- Footer shows two literal "to be confirmed" lines (Phone, Office address) in the live, public-facing footer — a visible seam next to otherwise-polished links, though understandable given pending client assets.
- `PartnersStrip` logos vary substantially in visual weight (SO/ Maldives is a plain text wordmark; others are colorful circular marks) — a pre-existing asset constraint, not a code defect.

## Questions to Consider

1. If the real audience is a merit-selected professional deciding whether to engage at all, should "earned participation" be a headline-level claim rather than a secondary sentence two sections down?
2. Does the homepage need three centered-text sections in a row (hero lead, intro, concept quote) before showing a single resort or tour date — or would leading with the photography and dates that are already the page's strongest asset make the "this is real and happening" case faster?
3. Now that the platform is genuinely multi-destination and mid-season, should the site's primary conversion CTA ever hardcode a year at all, rather than pulling from the same tours data the calendar section already renders?
