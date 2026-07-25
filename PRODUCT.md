# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: RU/CIS travel agents and agency staff**, invited to participate based on their agency's production (room-nights sold), who use the site to learn about upcoming editions, register interest, and get destination/resort/tour detail ahead of a trip. RU is the real target market — the site's RU experience carries the full registration/inquiry forms.

**Secondary: hotels and resorts** interested in becoming a partner property, served through a lighter-weight "Become a Partner" funnel rather than the primary registration flow. EN-language visitors (largely international hotel/media contacts) get a simplified contact-block experience rather than the full RU forms — this asymmetry is a durable design decision, not a temporary gap to be closed as English demand grows.

## Product Purpose

We Present by COATI (company: COATI Global Sales Agency) is a B2B familiarization tour programme for the travel trade: it brings a merit-selected group of RU/CIS travel agents to a destination's partner resorts to experience them first-hand, network with hoteliers/media/industry experts, and convert that first-hand knowledge into bookings. Success is measured on both sides: agent production/bookings after the trip, and, for hotel partners, destination/brand awareness, industry connections, media exposure, and long-term partnership value (the platform's own "Value" framing).

## Positioning

Not a one-off familiarization junket a single hotel or DMC might run. We Present's mechanism a neighboring product couldn't easily copy: (1) participation is **earned**, gated by measurable agency production rather than open application or lobbying; (2) it's an **ongoing, multi-destination platform** (Maldives running now, Oman and Kenya announced as upcoming editions), not a single trip or a single-destination programme.

Trade-event attendance (e.g. Tour 2 combining the Maldives resort tour with Travel Trade Maldives, TTM) is a **value-add specific to that destination's edition**, not a defining mechanism of the platform overall — TTM is a Maldives-only event, and We Present operates in other countries too. Don't generalize "tied to a trade event" into the core positioning claim; the two structural differentiators are earned participation and the ongoing multi-destination platform, full stop.

## Operating Context

- Bilingual RU/EN site (Next.js 16, App Router), content managed partly through a Decap CMS admin (`/admin`) for resorts/tours/destinations/settings, partly through i18n dictionaries for UI chrome.
- Core visitor workflows: browse destinations → resort detail → register interest (RU: full form; EN: contact block) or submit a per-resort inquiry; separately, hotels apply via Become a Partner.
- Each edition is a **Tour** (e.g. "Maldives + TTM · Tour 2") spanning multiple resort stops across atolls; resorts belong to a **Destination** (Maldives is active; Oman/Kenya are "coming soon" placeholders pending real rosters).
- Editions are dated and merit-gated — there's no open self-serve booking flow; forms collect interest/production data for the operator (COATI) to review and confirm participants.

## Capabilities and Constraints

- RU is feature-complete (Register, Contact, Become a Partner all have full forms with rate-limiting/honeypot/upload validation); EN intentionally shows a `mailto:` contact block on those same three pages instead of a form. Do not "fix" this asymmetry as if it were a bug.
- House copy style (established, non-negotiable across every round of work): no em dashes, destination-neutral positioning copy (doesn't over-index on Maldives-only language, since Oman/Kenya are coming), minimum `text-ink/70` for muted text, `text-amethyst`/`text-ivory` rather than `text-gold` for small text (contrast).
- `hello@wepresent.org` is a **placeholder** email, not final — do not treat it as production-confirmed.
- Undecided/open product facts (explicitly not to be invented): official WePresent/Coati logo SVG, footer phone/office contact details, "TTM Tier 1/2" naming, Tour 2's exact per-resort night counts, real project-case-study content (About page's Cases section is built and waiting), Oman/Kenya resort and partner rosters, hosting/domain (client is handling this directly) and the CMS's production OAuth backend.

## Brand Commitments

- Brand name: **WePresent by COATI**. Company: **COATI Global Sales Agency**. Never "Coati Travel" (an earlier, now-retired name).
- Real, confirmed external references: resort partner sites (so-hotels.com/en/maldives, fushifaru.com, meyyafushi.com, madifushiprivateisland.com) and the Travel Trade Maldives site (traveltrademaldives.com) are linked from the Partners page and each resort's Key Facts box.
- Instagram: `@wepresentproject`.

## Evidence on Hand

- Real, shipped content: 4 built resorts (SO/ Maldives, Fushifaru, Meyyafushi, Madifushi) under the Maldives destination; 2 tours (a 3-resort tour, and a TTM-anchored 4-stop tour); About, Partners, How It Was, Contact, Legal pages.
- Real resort/hotel photography for all 4 built resorts; About page uses destination-neutral imagery (seaplane arrival, sandbank picnic) rather than single-resort amenity shots.
- No real project-case-study content yet (About page's "Cases" section ships in a coming-soon state). No confirmed testimonials beyond one pull-quote already on the homepage from the client's own brief. Do not fabricate either.

## Product Principles

1. **Participation is earned, not marketed.** Merit-based access via agency production keeps the audience high-value and self-selecting; copy and flows should never read as an open, self-serve booking funnel.
2. **RU/CIS is the real market.** Locale treatment is intentionally asymmetric (RU full-featured, EN contact-only) — this reflects where the actual audience is, not incomplete localization.
3. **Partner-resort relationships and measurable outcomes are the substance behind the "platform" claim**, not a standalone leisure trip. Trade-event attendance (e.g. TTM in the Maldives) is a real value-add where it exists, but it's destination-specific, not a defining feature of every edition — don't generalize it into the platform's core pitch.
4. **Hotels are a secondary audience served through a lighter funnel.** Don't elevate the partner-acquisition flow to parity with agent registration without a specific reason.
5. **The destination roster is expanding.** Maldives is live; Oman and Kenya are committed future editions. Positioning copy and value-proposition language should stay destination-neutral rather than assuming Maldives is the whole story.
