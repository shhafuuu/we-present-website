---
target: homepage (web/src/app/[locale]/page.tsx)
total_score: 21
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 1
timestamp: 2026-07-25T19-15-51Z
slug: web-src-app-locale-page-tsx
---
Method: dual-agent (Assessment A: design review, Assessment B: detector + browser evidence — ran as two isolated, parallel sub-agents with no shared context, and with no access to any prior critique snapshot)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | "More" dropdown gives clear open/closed feedback (chevron rotation, aria-expanded) |
| 2 | Match Between System and Real World | 3/4 | Domain-appropriate throughout; a few marketing-register phrases lean corporate but don't confuse |
| 3 | User Control and Freedom | 3/4 | "More" dropdown closes on outside click and Escape (verified live) |
| 4 | Consistency and Standards | 2/4 | Pending tour cards (Cinnamon, Oman, Kenya) get the same hover lift as clickable tours — the exact defect class already fixed on /tours but never ported to the homepage's ToursTimeline |
| 5 | Error Prevention | 2/4 | Same root cause as #4 — false affordance invites a wasted click |
| 6 | Recognition Rather Than Recall | 4/4 | All nav text-labeled, no icon-only controls |
| 7 | Flexibility and Efficiency | n/a | Not relevant to a Persuade-mode landing page |
| 8 | Aesthetic and Minimalist Design | 4/4 | Matches DESIGN.md's restraint precisely |
| 9 | Error Recovery | n/a | No forms/destructive actions on this page |
| 10 | Help and Documentation | n/a | Not applicable |
| **Total** | | **21/28 (75%) — Good** | |

## Score Trend

**20/28 → 23/32 → 21/28.** Different applicable maximums each run (3, 2, 3 heuristics marked n/a respectively) — not strictly comparable as raw fractions. Normalized: **71.4% → 71.9% → 75%.** Real, continued upward movement this time, not just a severity-tier improvement.

## What happened to every previously-flagged issue, checked against this fresh pass

- **P0 (2026/2027 date contradiction):** Still resolved. Assessment A specifically re-checked Hero, Tours Calendar, and RegisterBand live and found them internally consistent.
- **Contrast finding:** Still resolved in practice. Assessment A raised zero contrast concerns and didn't need to — the detector's structural false-positive (transparent background-color reads) persists in Assessment B's output unchanged, same root cause as before, not a new regression.
- **IntroSection list density:** **Resolved, independently confirmed.** Assessment A: "a real, verified fix" — the list reads as 4 grouped items now. Only a much lower-severity residue remains (the closing sentence still chains 4 gerund phrases in one clause), downgraded to a Minor Observation, not a Priority Issue.
- **Button focus ring:** Still resolved and re-confirmed as a strength — "real and per-variant... confirmed in Button.tsx."
- **Header item count (9→7):** **Real, measured improvement, independently confirmed** — but not fully resolved against the strict ≤5 guideline. The "More" dropdown itself is called out as "genuinely well-built... progressive disclosure done properly." Two new, more granular findings surfaced on it (below).

## Design Specificity Verdict

Still clears the bar comfortably: the palette, type pairing, kicker+sparkle motif, real 2026 tour dates, and the "earned, not open-registration" CTA logic are all load-bearing, product-specific content — this couldn't be repurposed for an unrelated travel brand without a real rewrite.

## Overall Impression

Genuine, continued improvement. The two headline fixes from last round (intro list, header count) both held up under fully independent re-inspection. What surfaced this time is a believable next layer: one real, previously-fixed-elsewhere-but-not-here bug (pending tour card hover states), one known-and-previously-acknowledged accessibility gap (Reveal ignoring reduced-motion) surfacing as a formal finding for the first time, and a small correctness nitpick on the new dropdown's ARIA semantics.

## What's Working

1. **The "More" dropdown is genuinely well-built** — real conditional render, correct core ARIA attributes, verified live to close on outside-click and Escape.
2. **Button focus-visible rings are real and per-variant**, contrasting correctly against each button's own fill.
3. **Design specificity and restraint** — the site's visual system reads as a coherent, deliberate whole, not assembled defaults.

## Priority Issues

**[P1] Pending tour cards carry a false "clickable" affordance.**
- **What**: `ToursTimeline.tsx` applies its `hover:-translate-y-1 hover:shadow-md` classes unconditionally to every tour card. The `tour.status === "confirmed"` check only controls whether the card is wrapped in a `<Link>`, not whether it gets hover styling — so Cinnamon Resorts, Oman, and Kenya all lift and shadow on hover despite being non-interactive.
- **Why it matters**: This is the identical defect this project already diagnosed and fixed, conditionally, on the standalone `/tours` page — it was never ported to the homepage's own `ToursTimeline` component, so the homepage regressed a pattern already solved elsewhere in the same codebase. A visitor excited about the expanding roster hovers, gets an interactive-looking response, clicks, and nothing happens.
- **Fix**: Make the hover classes conditional on `tour.status === "confirmed"`, mirroring the exact fix already shipped on `tours/page.tsx`.
- **Suggested command**: `/impeccable harden`

**[P2] `Reveal` (the homepage's universal scroll-animation wrapper) ignores `prefers-reduced-motion`.**
- **What**: Every homepage section is wrapped in `Reveal.tsx`, which always animates via Framer Motion's `whileInView` with no `useReducedMotion()` gate — unlike the newer `ValueJourney` component (About page), which gates correctly.
- **Why it matters**: A visitor with reduced-motion set in their OS still gets a slide-and-fade on every section of the homepage. This is a known, previously-acknowledged gap in this specific component, not a new discovery contradicted by other evidence.
- **Fix**: Gate `Reveal`'s `initial`/`animate` behind `useReducedMotion()`, rendering fully visible with zero transform when reduced motion is requested — same pattern already proven in `ValueJourney.tsx`.
- **Suggested command**: `/impeccable harden`

**[P2] "More" dropdown declares ARIA menu semantics it doesn't behaviorally support.**
- **What**: The dropdown uses `role="menu"`/`role="menuitem"` but only supports plain Tab order, not the arrow-key/Home/End navigation that `role="menu"` implies per ARIA Authoring Practices.
- **Why it matters**: A screen-reader user hears "menu, 3 items" and finds only Tab works — a real, if small, mismatch between what's announced and what's supported.
- **Fix**: Either implement arrow-key navigation, or (simpler, given this is just 3 disclosure links) drop `role="menu"`/`role="menuitem"` and let it behave as a plain nav list.
- **Suggested command**: `/impeccable harden`

**[P3] Desktop nav still holds 7 simultaneous top-level items.**
- **What**: About, Tours, Destinations, More, Become a Partner, Register Interest, and the language switch all sit in one row.
- **Why it matters**: Real, measured improvement from 9 → 7, but still above the ≤5 guideline and in the "pushing the boundary" working-memory zone.
- **Fix**: Consider moving "Become a Partner" (a secondary-audience, lighter-funnel action per PRODUCT.md) into "More" or de-emphasizing it further, for a clean 5-item primary row.
- **Suggested command**: `/impeccable clarify`

## Persona Red Flags

**Jordan**: Hovers "Kenya" or "Oman" expecting to learn more (visual lift, identical to the real clickable tours) — clicks, nothing happens, no visible cue beforehand that it's not yet interactive.

**Riley**: Confirmed the same false-affordance bug by inspecting DOM state directly, flagged as an inconsistency against `/tours`'s own confirmed-only hover pattern. Tested the "More" dropdown's Escape and outside-click closing — both correct.

**Casey**: Couldn't fully verify true mobile-viewport rendering this round (environment limitation, not a claim of pass or fail) — source inspection shows the mobile menu correctly renders as a flat list of all 6 links, not replicating desktop's "More" split.

**Dasha (RU/CIS agency staffer, project-specific)**: RU homepage fully and naturally localized, verified live. One real friction point (pre-existing, client-blocked, not a code defect): the footer's "Phone: to be confirmed" / "Office address: to be confirmed" sit in plain visible text next to the working email/Instagram link — a small credibility ding at a trust-building moment for a skeptical B2B evaluator. Flagged as a design question (show incomplete rows vs. omit until real data exists), not a bug.

## Minor Observations

- IntroSection's closing sentence still chains four concepts in one clause, a lower-severity residue of the same chunking issue class, now in prose rather than a list.
- PartnersStrip logos vary in visual weight — likely an asset constraint, not a layout defect.
- RU translation of the intro and hero quote reads naturally, no regression found.
- "Register Interest" copy/positioning is consistent across Header, Hero, and RegisterBand — worth naming as a strength since it's easy to let CTA copy drift across many edit rounds.
- Assessment B's detector shows a `line-length` finding (3 instances) that had disappeared in the prior run's scan and reappeared this run, despite the intro text getting shorter, not longer. Likely a viewport-width artifact of the detector's line-wrapping measurement (browser window size wasn't pinned identically across the three independent sub-agent runs) rather than a real content regression — Assessment A's fresh read didn't independently corroborate a line-length problem anywhere. Flagging as detector noise to watch, not treating as an action item without further, viewport-controlled verification.

## Questions to Consider

1. If a visitor's first instinct is to click an exciting new-destination card and nothing happens, does that read as "coming soon" or as "broken"? What would make "not yet clickable" legible before the click?
2. Is hiding half the site's core pages behind "More" the right cut line, or would demoting "Become a Partner" free up room for a clean 5-item primary row?
3. With every homepage section sharing one motion signature that never turns off for reduced-motion visitors, is there a version of this page's "quiet confidence" that reads just as confident standing still?
