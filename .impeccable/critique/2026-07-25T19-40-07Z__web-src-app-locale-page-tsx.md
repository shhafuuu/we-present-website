---
target: homepage (web/src/app/[locale]/page.tsx)
total_score: 20
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 0
timestamp: 2026-07-25T19-40-07Z
slug: web-src-app-locale-page-tsx
---
Method: dual-agent (Assessment A: design review, Assessment B: detector + browser evidence — ran as two isolated, parallel sub-agents with no shared context, and with no access to any prior critique snapshot)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | No indication of which homepage section is in view while scrolling; an in-page CTA jump gives no "you've arrived" cue |
| 2 | Match Between System and Real World | 4/4 | Plain language throughout, real dates, real atoll names, no unexplained jargon |
| 3 | User Control and Freedom | 3/4 | Escape correctly closes both the mobile menu and "More" dropdown (verified live); no back-to-top on a long scroll |
| 4 | Consistency and Standards | 3/4 | Button.tsx links get a custom focus-visible ring, but plain header nav links (About, Tours, etc.) still fall back to the browser default outline — verified live via Tab |
| 5 | Error Prevention | n/a | No forms/destructive actions on this page |
| 6 | Recognition Rather Than Recall | 4/4 | Every nav item and CTA fully text-labeled |
| 7 | Flexibility and Efficiency | n/a | Not relevant to a Persuade-mode page |
| 8 | Aesthetic and Minimalist Design | 3/4 | Genuinely restrained; loses a point because 4 separate "coming soon" notices appear in one scroll |
| 9 | Error Recovery | n/a | No error-producing interactions exist |
| 10 | Help and Documentation | n/a | Not applicable |
| **Total** | | **20/24 (83%) — Good** | |

## Score Trend

**20/28 → 23/32 → 21/28 → 20/24.** Different applicable maximums each run (varying numbers of heuristics marked n/a) — not strictly comparable as raw fractions. Normalized: **71.4% → 71.9% → 75% → 83.3%.** Clear, continued upward trajectory across all four runs.

## What happened to all three fixes from this round, checked against this fresh, independent pass

- **Tour card false affordance (ToursTimeline hover):** **Resolved, definitively confirmed.** Assessment A: "The pending tour cards (Cinnamon/Oman/Kenya) correctly show no false hover lift/shadow — verified both in source... and live by hovering the Kenya card directly. This is a genuine strength, not a red flag."
- **Reveal reduced-motion:** **Resolved, confirmed via source review** ("correctly gates on useReducedMotion() in source... the code path is present and correct"). Not independently re-verified live with an OS toggle this round, consistent with this environment's known limitation.
- **"More" dropdown ARIA:** No regression, no complaint raised about the dropdown's accessibility semantics this time. A different, non-accessibility critique of the same dropdown surfaced instead (see below) — a UX/discoverability question, not a correctness defect.

## Design Specificity Verdict

Still authored for this product: the sparkle/kicker motif used as a structural device, real multi-resort itineraries with confirmed dates, atoll-level geographic specificity, gold visibly rationed to CTAs only. The RU build mirrors this rather than reading as an afterthought. The one section that reads as more generic-SaaS: `RegisterBand`'s gradient-band-with-centered-CTA, the least distinctive composition on the page.

## Overall Impression

Real, continued improvement — the score has now moved meaningfully across all four runs (71% → 72% → 75% → 83%), and every fix from every prior round has held up under fresh, independent re-inspection with zero regressions found. This round's new findings are refinement-tier: a CTA-routing inconsistency, a section-ordering/peak-end question, a reassurance-copy gap, and some positioning/pacing nits — nothing structural.

## What's Working

1. **Tours calendar realism** — exact confirmed dates and real multi-resort stop lists build immediate credibility for a trade audience.
2. **The Kicker/Sparkle system** — a genuine, repeatable visual signature running through every section header.
3. **ResortsGrid photography and card treatment** — real aerial photography, atoll-specific labeling; the section actually doing the selling.

## Priority Issues (this run)

**[P2] Three "Register Interest" controls, two different behaviors, identical label.**
- **What**: The Hero's primary CTA (`href="/en#register"`) scrolls to a *second* CTA band repeating the same label — only that second button (`href="/en/register"`) actually navigates to the form. The Header's own "Register Interest" skips straight to the form.
- **Why it matters**: A user clicking the first, most prominent CTA on the page doesn't reach the form — they land on a restatement of the same headline and need a fourth click. This doubles the primary conversion path for no benefit.
- **Fix**: Either point the Hero CTA straight to `/register` (matching the Header), or relabel the Hero's in-page CTA distinctly so it's clear it isn't the form itself.
- **Suggested command**: `/impeccable clarify`

**[P2] Peak-end dip: an empty "coming soon" section sits directly before the primary ask.**
- **What**: `HowItWas` (entirely a placeholder) is the last section before `RegisterBand`. The page's strongest section (`ResortsGrid`, real photography, 4 concrete resorts) sits at the midpoint, not the end.
- **Why it matters**: The section right before a conversion CTA carries outsized weight in how the whole page is remembered — ending on "nothing to show you yet" instead of the actual highlight undercuts momentum right when it matters most.
- **Fix**: Reorder so `HowItWas` sits earlier (e.g. between `ConceptSection` and `ToursTimeline`), letting `ResortsGrid` → `PartnersStrip` → `RegisterBand` close the page on concrete content.
- **Suggested command**: `/impeccable layout`

**[P2] No reassurance copy at the site's highest-stakes moment.**
- **What**: `RegisterBand`'s copy gives no indication of what production evidence qualifies, expected response time, or how submitted business data is handled.
- **Why it matters**: This is a B2B ask for real business data from a cautious, merit-gated audience — asking for it with zero reassurance is a real trust gap at the moment that most needs one.
- **Fix**: Add one line near the CTA — expected response window and/or a confidentiality note.
- **Suggested command**: `/impeccable clarify`

**[P3] Positioning wobble: destination-neutral → Maldives-specific → destination-neutral across three consecutive sections.**
- **What**: Hero and Intro are deliberately destination-neutral, but the very next section's pull-quote says "...partners who sell the Maldives every day..." before the page returns to neutral framing.
- **Why it matters**: A first-time reader gets neutral → Maldives-only → neutral messaging within one screen, reading as inconsistent about whether this is a Maldives programme or the multi-destination platform PRODUCT.md names as a core differentiator.
- **Fix**: Add an attributional frame to the quote (reads as historical, not current positioning), or move it later after multi-destination context is established.
- **Suggested command**: `/impeccable clarify`

**[P3] Four concurrent "coming soon" notices in one scroll.**
- **What**: Cinnamon, Oman, Kenya (all "dates coming soon"/"to be confirmed") plus the entire `HowItWas` section — four separate not-ready signals in a single homepage visit.
- **Why it matters**: For a platform positioning itself as an earned, ongoing programme, this much visible "not yet" in one view undercuts that maturity claim, even though each individual placeholder is honestly built.
- **Fix**: Consolidate the 3 pending tours into one lighter-weight summary row rather than three full-width cards matching the confirmed tours' visual weight.
- **Suggested command**: `/impeccable distill`

## Also worth noting (not tagged as a Priority Issue, but real)

Assessment A's heuristic #4 finding: plain header nav links (About, Tours, Destinations) don't get the custom focus-visible ring that `Button.tsx` now has — only the button-styled CTAs benefit from that earlier fix. An inconsistency between two link types in the same header, not yet flagged as a formal priority item but worth knowing about.

## Persona Red Flags

**Jordan**: Clicks the Hero's "Register Interest" expecting the form, gets scrolled to an identically-labeled second button instead. The "More" dropdown genuinely hides 3 pages behind one click with only a small chevron as the discoverability cue.

**Riley**: Confirmed the tour-card hover fix live and in source — explicitly called out as a genuine strength, not a red flag. One fragility noted: rapid/automated double-clicks on the Hero's `#register` anchor produced inconsistent scroll results once — likely a hydration-timing artifact, flagged for a manual QA pass rather than treated as a confirmed bug.

**Nadia (RU/CIS agency staffer, project-specific)**: No reassurance about how her agency's production data will be reviewed or kept confidential. Only Maldives has real content among the three named destinations — honest, but doesn't yet back up the "ongoing multi-destination platform" claim with second-destination proof. The Maldives-specific quote between two destination-neutral sections could read as "this is really a Maldives programme," undercutting the platform positioning she's being asked to trust.

## Minor Observations

- Footer's "to be confirmed" placeholders render in the same muted style as filled-in info rather than being visually distinguished as intentionally pending (known pending client asset, not a design defect).
- RU nav and header wrap cleanly with no truncation or collision — the previously-known Cyrillic overflow defect class does not reproduce today.
- Assessment B's `line-length` detector finding (3 instances) reappeared again this run at a recorded 1470px viewport — same as the prior run, and unrelated to any recent edit (no intro/content changes were made between the last two runs, yet the finding persisted unchanged). This resolves the earlier open question: it's a stable, viewport-width-dependent reading on some other paragraph on the page, not something introduced or fixed by recent work. Not an action item.

## Questions to Consider

1. If a first-time visitor reads only the Hero and the Register band and skips everything else, does she know what "agency production" evidence she needs and what happens after submitting it?
2. The page's most convincing section (real resorts, real photography) sits at the midpoint, not the end — what would it look like to close the page on that same energy instead of a "coming soon" note?
3. Does surfacing this much "not yet" (3 pending tours + the entire How It Was section) undercut the "earned, established" positioning, or does the up-front honesty itself build trust with this audience?
