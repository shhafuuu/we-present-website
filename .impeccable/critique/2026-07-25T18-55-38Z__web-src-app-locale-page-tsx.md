---
target: homepage (web/src/app/[locale]/page.tsx)
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
timestamp: 2026-07-25T18-55-38Z
slug: web-src-app-locale-page-tsx
---
Method: dual-agent (Assessment A: design review, Assessment B: detector + browser evidence — ran as two isolated, parallel sub-agents with no shared context, and with no access to the prior critique snapshot, so this is a genuinely independent re-run, not a comparison exercise performed by the agents themselves)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Hover/focus states and the header's scroll transition work well; no current-section nav indicator |
| 2 | Match Between System and Real World | 2/4 | "TTM" and "familiarization tours" appear unexplained for an EN/hotel audience that PRODUCT.md itself says won't know the jargon |
| 3 | User Control and Freedom | 3/4 | Clear mobile-nav close; no traps; no skip-to-content link |
| 4 | Consistency and Standards | 3/4 | Shared components used everywhere; the 4 partner-resort logos' clashing palette is the one visible break |
| 5 | Error Prevention | 3/4 | No forms live on this page; low-stakes pass |
| 6 | Recognition Rather Than Recall | 3/4 | All CTAs text-labeled; "Dates coming soon" next to a specific month badge reads as self-contradictory on first pass |
| 7 | Flexibility and Efficiency | n/a | Not a relevant expectation for a Persuade-mode landing page |
| 8 | Aesthetic and Minimalist Design | 3/4 | Restrained layout undercut by the IntroSection's 7-item audience list and the logo-palette clash |
| 9 | Error Recovery | 3/4 | No error states exist to fail; scored on absence of failure modes |
| 10 | Help and Documentation | n/a | Not applicable to this page |
| **Total** | | **23/32 (72%) — Good** | Low end of the band: systemic discipline intact, pulled down by copy-density and terminology gaps, not structural failures |

## Score Trend

**20/28 → 23/32.** These use different applicable maximums (the two independent runs marked a different number of heuristics n/a — 3 before, 2 now — so this isn't a strict like-for-like number). Normalized: **71.4% → 71.9%**, essentially flat in aggregate.

That flatness is worth explaining, not smoothing over: severity dropped substantially even though the percentage didn't move. The prior run's worst finding was a P0 (a real content contradiction) plus three P1s. This run's worst findings are P2s — **zero P0s and zero P1s this time.** The percentage stayed flat because this fully independent pass surfaced a different set of real, previously-unflagged issues (header item density, unexplained trade jargon, one illegible partner logo, a palette clash in the partner strip) rather than because the fixed issues regressed or weren't real fixes.

## What happened to the 5 previously-fixed issues, checked one by one against this fresh, independent pass

- **P0 (RegisterBand year contradiction):** Resolved. Not flagged by either agent; Assessment B's detector output shows the kicker text now reads "We Present 2026," matching the live tours.
- **P1 (Hero/RegisterBand contrast):** Effectively resolved. Assessment A — evaluating with fresh eyes, not hunting for this specific issue — didn't flag contrast as a problem anywhere and explicitly called out accessibility as a strength. Assessment B's detector still reports the same 1.0:1/1.5:1 readings on the same elements, but this is the same structural false-positive already root-caused last round (the detector reads a transparent `background-color`, not real rendered pixels, and that mechanism didn't change) — not a sign the real, pixel-verified fix regressed.
- **P1 (IntroSection chunking): partially resolved, not fully.** Assessment B confirms the `line-length` detector finding (3 instances) is completely gone — the sentence-length fix worked. But Assessment A independently re-flagged the *same underlying problem from a different angle*: the audience list is still 7 items in one enumeration ("the most influential tourism leaders, elite media representatives, digital platform innovators, journalists, tour operators, their exclusive agency partners, and key industry professionals"), which still fails the ≤4-item chunking/working-memory guidance regardless of how many sentences surround it. The earlier fix addressed sentence length; it didn't reduce list density. Re-tagged as **[P2]** this round (down from P1, since it's no longer a raw run-on, but the item-count problem is real and independently reconfirmed).
- **P1 (Button focus ring): Resolved, and independently validated as a strength.** Assessment A live-tested it without any prompting to do so: "Live-verified: focus lands correctly and produces an actual non-transparent box-shadow ring... This is uncommon thoroughness for a page this visually driven." Direct confirmation the computed-style verification from last round reflects real behavior.
- **P2 (header CTA parity, Become a Partner vs Register Interest): Resolved as originally scoped.** Neither agent flagged competing/equal-weight buttons this time. A related but distinct issue was freshly found instead: the header has 9 total clickable items at once (a raw density/working-memory problem, not a hierarchy-between-two-buttons problem) — see new Priority Issues below.

## Design Specificity Verdict

Still authored for this product, not a template: the `.kicker` + sparkle signature, the disciplined gold-only-on-CTAs rule, destination-neutral copy, and the atoll-labeled resort cards all recur with real consistency. The one place that still reads generic: the four partner-resort logos sit in a row with no unifying treatment, so third-party brand marks in four unrelated palettes interrupt an otherwise disciplined color system.

## Overall Impression

The fixes did what they were meant to do — the worst problem (a real content contradiction) is gone, and severity across the board dropped from P0/P1 to P2/P3. What's left is a believable "next layer down" of issues an independent, fresh pass catches once the loudest problems are cleared: information density in the header and the intro copy, two points of unexplained jargon, and one illegible partner asset. None of these are structural; all are refinement-tier.

## What's Working

1. **A genuine, consistent brand signature** — the kicker/sparkle motif, the fade-and-rise reveal, gold used exactly where the "Rare Gold Rule" says it should be.
2. **Accessibility rigor that's real, not just claimed** — independently live-verified focus rings, correct ARIA on the mobile nav, a proper `sr-only` heading. Flagged unprompted as uncommon for a page this visual.
3. **Restrained, editorial photography** that matches the "invitation, not a sales pitch" positioning.

## Priority Issues (this run)

**[P2] Header presents 9 simultaneous clickable items.**
- **What**: About, Tours, Destinations, Partners, How It Was, Contact, Become a Partner, Register Interest, and the EN/RU switch are all visible at once with no grouping or de-emphasis among them.
- **Why it matters**: Past the ≤5-top-level-nav-items guidance and into the cognitive-load framework's "Wall of Options" territory — a first-time visitor has to scan nine items to find the one CTA that matters, even though it's gold.
- **Fix**: Group lower-traffic links (How It Was, Contact, Partners) or reduce their visual emphasis so Tours/Destinations/Register read first.
- **Suggested command**: `/impeccable clarify`

**[P2] Unexplained trade jargon on first read ("TTM," "familiarization tours").**
- **What**: "Maldives + TTM · Tour 2" appears on the homepage tours calendar with zero expansion; "familiarization tours" leads the hero copy unexplained.
- **Why it matters**: PRODUCT.md names EN visitors as largely international hotel/media contacts — the exact audience least likely to know this shorthand. Direct, verifiable Heuristic 2 miss for a named secondary audience.
- **Fix**: Expand on first mention ("TTM — Travel Trade Maldives") or add a one-line parenthetical.
- **Suggested command**: `/impeccable clarify`

**[P2] IntroSection's audience list still violates the ≤4-item chunking rule (partial carryover from the prior P1).**
- **What**: The list itself is unchanged — 7 named audience segments in one enumeration, now inside its own sentence but still one dense clause.
- **Why it matters**: This is the first substantive copy a skeptical reader encounters, in the section whose entire job is answering "what is We Present." Item count, not sentence length, is what the chunking guidance actually measures.
- **Fix**: Compress to a shorter representative list (e.g., "agents, hoteliers, media, and industry leaders") rather than enumerating all 7 roles.
- **Suggested command**: `/impeccable clarify`

**[P2] Madifushi's partner logo is illegible at its rendered size.**
- **What**: A wide, short-aspect-ratio mark with small caption text shrinks to an unreadable squiggle once fit into the same bounding box as the other three (roughly square) logos.
- **Why it matters**: One of four credibility-signaling brand marks in the partner strip isn't actually recognizable.
- **Fix**: Re-export/crop tighter to the mark itself before placing it in the shared box.
- **Suggested command**: `/impeccable polish`

**[P3] Partner-logo palette clash inside an otherwise disciplined color system.**
- **What**: Teal, orange/pink-gradient, and dark-line-art marks sit together, all outside the site's own violet/gold/ivory palette.
- **Why it matters**: The one place four unrelated hues appear together, right after a very controlled scroll sequence.
- **Fix**: A real constraint (can't recolor a partner's brand) — mitigate with a consistent grayscale/duotone treatment that resolves to color on hover.
- **Suggested command**: `/impeccable polish`

## Persona Red Flags (new findings this run)

**Jordan**: "Dates coming soon" sitting directly beside a specific "OCTOBER 2026" badge on the same card reads as self-contradictory on first pass; must tab through ~9 header items before reaching page content (no skip link).

**Riley**: Clicking the hero's own "Register Interest" button doesn't go to the registration form — it's an in-page anchor (`/#register`) to a teaser section containing a *second* "Register Interest" button that's the one that actually navigates to `/register`. Confirmed live, a real extra hop. Also: the footer email renders as plain text, not a `mailto:` link, inconsistent with every other contact touchpoint on the site.

**Casey**: Core mobile mechanics (nav collapse, 44px targets) are solid; the same two-step CTA hop above is extra friction for someone who wants to tap once.

**Marina (RU/CIS agency staffer, project-specific)**: The RU IntroSection has the identical 7-item chunking problem, arguably denser given longer Russian compound nouns. RegisterBand's "merit-based" claim still isn't cashed in with any specific threshold or process — the exact fact this persona most wants confirmed before spending time on a form. On the positive side: partner logos now click through to real resort sites, a genuine trust signal that lands correctly.

## Minor Observations

- Footer email is static text, not a `mailto:` link — inconsistent with every other contact touchpoint site-wide.
- No skip-to-content link in `[locale]/layout.tsx`.
- Footer's `EN / RU` span beside the copyright line is non-interactive text that visually resembles a link.
- The "Dates coming soon" + specific month badge combination (intentional — the text refers to the missing itinerary, not the date) reads as contradictory without that context.

## Questions to Consider

1. Is the hero's "Register Interest" button meant as a real shortcut, or a deliberate two-step funnel (build context, then convert)? If intentional, could the label signal that instead of implying direct action?
2. Should the closing pitch name the actual selection mechanism (e.g., "top-producing agencies," a rough threshold) rather than asserting "merit-based" without specifics?
3. Would a confident version of the partner-logo strip lean into the four-brands-one-program mismatch with a unifying frame, rather than trying to make incompatible palettes sit quietly together?
