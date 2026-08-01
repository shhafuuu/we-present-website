# Round 4 status and open questions

Work completed 1 August 2026 against spec v2.1 and `BUILD-PLAN.md`.

---

## What shipped

| Order | Change |
| --- | --- |
| WO-03 | Gradient page banner extracted into one shared component, all 10 banners converted |
| WO-11 | Cinnamon Maldives Resorts: confirmed name, four properties, 5-star and 4-star as separate groups |
| WO-12 | Oman set up as a destination programme, resort grid guarded off |
| WO-13 | Kenya set up as the Saruni Basecamp lodge collection, roster left empty |
| WO-21 | About value section split by audience, preceded by the FAM comparison |
| WO-22 | Homepage carries the comparison and both key messages |
| WO-25 | What's Included cut from five items to four |
| WO-26 | Gated per-tour programme PDF download |
| WO-27 | On-site programme title made destination-neutral, layout rebuilt as a list |
| WO-30–33 | Cases section: stat rail, filterable index, detail pages, seeded content |
| WO-40 | LinkedIn and working phone added, placeholder email removed |
| WO-50 | Hero violet wash replaced with a colour grade |
| WO-60 | Portal fields for everything above |

Already correct before this round, verified not rebuilt: the Meyyafushi and Madifushi
atolls, the RU/EN form split, the flights claim (the spec calls this "currently live";
it is not), the About rebuild and the value grid elevation.

**Not done, by decision:** WO-10's remaining step, which would move resort pages from
`/resorts/[slug]` to `/destinations/[destination]/[resort]` with 308 redirects. Nothing
is broken, no visitor sees a difference, and it rewrites URLs already live in the review
build. Raised here rather than actioned.

---

## Questions for the client

Ordered by how much they block.

### 1. "11 years in market" will be wrong in January

The Cases stat rail carries this because it is COATI's own current wording. Its basis is
"operating since 2014", which makes it **12 in 2026**, not 11. It also goes stale every
January.

**Recommendation:** replace it with the founding year, which never needs updating, or
confirm what the 11 counts.

### 2. Can the Oman ministry appointment be published as a case?

Written, verified against source, and currently held back (`published: false`) because
Appendix D lists this as unconfirmed. It is one of the strongest proof points available.
Also needed: whether the ministry logo may be used.

**Unblocks:** one switch in the content portal.

### 3. Programme PDFs: Russian only, or both languages?

The download mechanism is built and tested. It supports both languages side by side on
the same tour. It needs the files themselves.

### 4. Tour dates

Cinnamon, Oman and Kenya all show "Dates to be confirmed". Round 1 had invented dates
for Cinnamon ("October 2026") and Oman ("December 2026"); both have been removed, as no
one agreed them.

### 5. Partner logos

Still supplied as `.ai` and `.psd`, which are not web formats. SVG or transparent PNG
needed before the logos can be standardised and made clickable.

### 6. Production email address

Nothing is shown until it exists, per the spec. The English contact blocks now lead with
WhatsApp instead, which is what made removing the placeholder possible without leaving
English visitors with no route to a person. Setting one constant in `src/lib/contact.ts`
switches email back on everywhere.

### 7. Oman and Kenya content

Itinerary, lodge roster, imagery and partner permissions. The structures are built and
empty; nothing has been invented to fill them.

### 8. Two smaller copy points

- The on-site programme items still say "hotel" ("Hotel inspection", "Meetings with the
  hotel management team"). The title now travels, but these do not, and Oman and Kenya
  have no hotels. They are client-supplied wording, so they have been left alone.
- The section kicker reads "On-site programme" directly above the heading "On every
  programme you will enjoy". Slightly repetitive; easy to change either.

### 9. Still open from earlier rounds

"TTM Tier 1 / Tier 2" naming for the two August tours, unconfirmed since round 1. The
included/not-included split still wants a fact-check: included is accommodation, dining,
transfers and the exclusive programme; not included is international flights, TTM entry,
insurance and visa.

---

## Verification performed

- 102 page/width/locale combinations (17 routes x 3 widths x 2 locales): all 200, no
  horizontal overflow, exactly one `h1` each, no console errors.
- Reduced motion: 43 reveal elements all visible, stat rail shows its real figure.
- JavaScript disabled: same, which matters because the stat rail briefly shipped
  rendering "0 room nights delivered" in exactly that case before it was fixed.
- Gated PDF route: path traversal, cross-tour file access, missing email, honeypot,
  direct URL guessing and `GET` all rejected; rate limiting confirmed active.
- Gold on aubergine measures 5.16:1. Gold on ivory measures 2.30:1 and is not used for
  text anywhere.
- `npm run build`, `npx tsc --noEmit` and `npm run lint` all clean.

Every published case figure traces to a named slide, recorded in
`docs/cases-source-extract.md`. The source decks are gitignored at 583MB, so that file
is the audit trail that survives without them.
