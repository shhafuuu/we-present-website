---
target: homepage (web/src/app/[locale]/page.tsx)
total_score: 23
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 1
timestamp: 2026-07-25T20-13-25Z
slug: web-src-app-locale-page-tsx
---
Method: dual-agent (Assessment A: design review, Assessment B: detector + browser evidence — ran as two isolated, parallel sub-agents with no shared context, and with no access to any prior critique snapshot)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Hero's "View Tours Calendar" button produces zero visible effect when clicked from within the app — a labeled action that silently does nothing |
| 2 | Match Between System and Real World | 3/4 | Trade-appropriate language throughout; the Intro paragraph's generic-corporate phrasing is the one weak spot |
| 3 | User Control and Freedom | 3/4 | Mobile menu and "More" dropdown both close correctly via X/outside-click/Escape |
| 4 | Consistency and Standards | 3/4 | Disciplined system overall; docked for the focus-ring inconsistency and the hash-link handling gap |
| 5 | Error Prevention | 4/4 | Pending tour cards correctly carry no false hover/click affordance — verified live |
| 6 | Recognition Rather Than Recall | 4/4 | Nav items text-labeled, states (Explore vs Coming Soon) visible, not memorized |
| 7 | Flexibility and Efficiency | n/a | Not relevant to a Persuade-mode page |
| 8 | Aesthetic and Minimalist Design | 4/4 | One decisive photo per section, genuinely restrained |
| 9 | Error Recovery | n/a | No data-entry surface on this page to evaluate |
| 10 | Help and Documentation | n/a | Not applicable |
| **Total** | | **23/28 (82%) — Good** | Just under Excellent; the single biggest drag is the dead hero CTA |

## Score Trend

**20/28 → 23/32 → 21/28 → 20/24 → 23/28.** Normalized: **71.4% → 71.9% → 75% → 83.3% → 82.1%.** Essentially flat vs. the last run (within normal run-to-run variance from two fully independent fresh assessments), but severity shifted: a real, concrete P1 bug surfaced this round that no prior run had caught.

## What happened to all three fixes from last round, checked against this fresh pass

- **CTA routing (Hero "Register Interest" → `/register` directly):** Holds. Not flagged as broken. But fixing it appears to have redirected attention to the *other* Hero button, which has the identical underlying defect class (see P1 below) — this was likely always broken and simply wasn't the focus of any prior assessment.
- **Peak-end reorder (`HowItWas` moved earlier):** **The peak-end problem is confirmed solved** — Assessment A explicitly: "Moving it off the end... was the right call for peak-end." But it surfaced a *different*, legitimate trade-off: `HowItWas` (an empty placeholder) is now the second real content section, before any concrete proof (dates, photography). This is a real, still-open pacing question, not a regression — see the new P2 below.
- **Register reassurance copy:** **Confirmed working well, called out as a strength**: "Reassurance at the highest-stakes moment is present and well-placed... Good peak-end execution."

## Design Specificity Verdict

Largely still authored for this product — palette, type pairing, kicker treatment, rare-gold discipline, sparkle motif, real dated tour cards, real atoll names, and an actual client pull-quote all read as specific. One passage breaks this: the Intro paragraph's "prestigious initiative... sharing cutting-edge expertise... guarantee measurable business results" is generic B2B-conference boilerplate that could describe any industry summit — the one spot where the copy stops sounding like this product, and it sits in tension with the Concept section's Maldives-specific quote two screens later.

## Overall Impression

Real, continued strength on cognitive load and error prevention, undercut this round by one concrete, verified technical bug (a dead secondary CTA) that happened to not be on anyone's radar until now, plus a legitimate second-order trade-off from last round's peak-end fix (moving the empty section off the end front-loaded it instead).

## What's Working

1. **The rare-gold discipline is genuinely held** across all 8 sections — no small-text gold, no gold fills, verified again independently.
2. **False-affordance prevention on pending content is real and re-verified** — `ToursTimeline`'s hover-lift classes are still correctly conditional on `tour.status === "confirmed"`.
3. **The reassurance sentence before the final CTA** is specific, non-invented, and placed exactly where the emotional-journey guidance says it should be.

## Priority Issues

**[P1] Hero's "View Tours Calendar" button is a dead click in normal use.**
- **What**: The Hero's secondary CTA (`href="/#tours"`) does not scroll to the Tours section when clicked from within the app. Verified directly: clicking the rendered link twice from a fully-hydrated `/en` page produced zero scroll. Navigating to `http://localhost:3000/en#tours` as a fresh URL load *does* scroll correctly — the anchor and section id are fine; the defect is specifically that Next.js's client-side `Link` transition isn't performing the hash-scroll on a same-page navigation. This is now the *only* remaining same-page hash link on the site (the equivalent `#register` links were fixed last round).
- **Why it matters**: A labeled button that silently does nothing on click is a trust hit, especially for a skeptical visitor wanting to see real dates before committing to "Register."
- **Fix**: Don't rely on `Link`'s implicit hash-scroll for same-page navigation — give the button an `onClick` that calls `document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" })`, or handle `window.location.hash` after client-side transitions.
- **Suggested command**: `/impeccable audit`

**[P2] The "What Is We Present" (Intro) section has no heading element at all.**
- **What**: `IntroSection.tsx` renders a `Kicker` (a styled `<span>`, not a heading) followed by a plain `<p>` — no `<h2>`/`<h3>` anywhere in the section. Verified live via the full heading outline: H1 jumps straight to H2 "Our Concept," completely skipping this section.
- **Why it matters**: This is arguably the single most important explanatory paragraph on the page — the direct answer to "what is We Present?" — and it's invisible to a screen-reader user navigating by heading, the standard assistive-tech navigation pattern. Every other homepage section has a real or `sr-only` heading; this one was missed.
- **Fix**: Add a `sr-only` `<h2>` above the Kicker, reusing the existing `settings.intro.kicker` string, matching the pattern already used in `ConceptSection`.
- **Suggested command**: `/impeccable harden`

**[P2] "Become a Partner" now has full visual parity with the primary IA nav links.**
- **What**: `About`/`Tours`/`Destinations` and `Become a Partner` all share the identical `.kicker` link class with the identical gold-underline hover — nothing distinguishes "site section" from "secondary conversion path for a different audience."
- **Why it matters**: Demoting the old bordered-pill button removed *button* parity with Register Interest (good), but created a subtler parity problem — it now reads as a 4th primary IA item rather than what it actually is. PRODUCT.md is explicit that hotels are a secondary, lighter-funnel audience.
- **Fix**: Give "Become a Partner" a distinct treatment from the 3 primary links (reduced opacity, or fold it into "More" alongside Partners/How It Was/Contact).
- **Suggested command**: `/impeccable clarify`

**[P2] Three soft/placeholder sections now stack before any concrete proof — a side effect of the peak-end fix.**
- **What**: The scroll order is Hero → Intro (abstract) → Concept (abstract quote) → HowItWas (an empty "coming soon" placeholder) — all before ToursTimeline's real dated calendar or ResortsGrid's real photography.
- **Why it matters**: A skeptical first-time visitor now has to scroll past three consecutive abstract/empty sections before hitting anything concrete beyond the Hero's single date pill. Moving `HowItWas` off the end (last round's fix) was correct for peak-end, but front-loaded the same weak content instead.
- **Fix**: Either compress Intro+Concept into one section, or move `ResortsGrid`/`ToursTimeline` earlier so real proof appears within the first 1-2 scrolls. This is a genuine trade-off, not a clear-cut bug — worth a decision, not an autopilot fix.
- **Suggested command**: `/impeccable layout`

**[P3] Focus-visible treatment is inconsistent between components.**
- **What**: `Button.tsx` has a deliberate per-variant focus ring; the header's plain nav `Link`s (About/Tours/Destinations/Become a Partner/language switch) and the "More" dropdown items have no custom focus style, falling back to the browser default outline.
- **Why it matters**: A keyboard user tabbing through the header gets a jarring unbranded outline on nav links sandwiched between two styled-ring buttons.
- **Fix**: Extend the same ring pattern (or a lighter version) to the header's Link elements.
- **Suggested command**: `/impeccable polish`

## Persona Red Flags

**Jordan**: Hits the empty `HowItWas` placeholder as the second real content section, before seeing a resort photo or real tour date. Would click "View Tours Calendar" expecting dates and get nothing — reads as "the site is broken."

**Riley**: Confirmed, reproducible: double-clicking "View Tours Calendar" does nothing while manually typing `/en#tours` works — an inconsistency between entry paths. Pending tour cards tested clean (no false affordance).

**Casey**: Couldn't verify true mobile viewport this round (environment limitation, not a claim either way). The dead "View Tours Calendar" button would be at least as confusing on mobile.

**Alina (RU/CIS agency sales manager, project-specific)**: RU homepage renders cleanly, Hero immediately shows a real dated tour — the concrete signal she scans for. But she'd hit the same generic Intro-paragraph language in Russian too, which reads as templated pitch-deck copy she's trained to distrust. Lands on `/ru/register` and correctly gets the full real form (confirmed, a genuine strength for her specifically).

## Minor Observations

- `Kicker`'s `tone="gold"` branch is confirmed dead code (never invoked anywhere) — harmless, worth pruning eventually.
- `ToursTimeline`'s pending-tour date pills (e.g. "OCTOBER 2026" next to "Dates coming soon") looked like a possible contradiction but is confirmed correct: the month is genuinely known, only exact days are pending.
- Header now carries 7 simultaneous top-level items — not a failure, but worth watching if anything else gets added to the primary row.

## Questions to Consider

1. If "View Tours Calendar" has been silently non-functional, how many other same-page CTA affordances elsewhere on the site have never actually been click-tested end-to-end rather than just code-reviewed?
2. What would the Intro paragraph read like if it used the same concrete, dated, named-resort specificity the Hero and Tours calendar already use?
3. Does "Become a Partner" belong in the primary nav row at all, or does it belong inside "More," freeing the top row down to the ≤4 items the working-memory guidance recommends?
