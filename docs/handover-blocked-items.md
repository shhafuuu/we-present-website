# Blocked items at handover

Compiled 5 August 2026 for WO-70. Every item below is something the site cannot
finish without a decision or an asset from outside the repo. Each one is listed with
what the site does *in the meantime*, so nothing here reads as a bug to whoever picks
the project up.

WO-62 folds this list into the handover README. Re-verify it against
`BUILD-PLAN.md`'s Asset status table immediately before transfer — an item was carried
as BLOCKED for two weeks after it had actually been supplied (WO-04), so this list is
only worth what its last check is worth.

---

## Needs a client decision or asset

### 1. Per-tour programme PDFs — WO-26
The gated download mechanism is built and tested; the files do not exist. Drop them in
`web/private/programme-pdfs/` (**never** `web/public/`, or the gate is decorative) and
declare them on the tour's JSON entry.
**Meanwhile:** the download block renders only when the declared file is present on
disk, so the tours show no dead button.
**Also unanswered:** whether the PDFs are Russian only, or Russian and English.

### 2. Tour dates for Cinnamon, Oman and Kenya — WO-11, WO-12, WO-13
**Meanwhile:** Cinnamon has a confirmed line-up but no dates, and gets a detail page on
the strength of the line-up (`hasDetailPage()`, not `status === "confirmed"`). Oman and
Kenya render as non-linked "Coming Soon" cards.

### 3. Oman and Kenya rosters and imagery — WO-12, WO-13
No property list and no photography for either destination.
**Meanwhile:** `programmeType` (`destination` for Oman, `collection` for Kenya)
suppresses the property grid entirely, so neither page shows an empty grid that could be
mistaken for a page still loading.

### 4. Production email address — WO-27
`hello@wepresent.org` was never confirmed, and spec v2.1 §6 says show nothing rather
than a placeholder.
**Meanwhile:** `EMAIL` is exported as `null` from `src/lib/contact.ts`; the contact-page
email row and the mail CTA are both guarded on it. Setting that one constant switches
email back on site-wide. English-language blocks lead with WhatsApp, because English has
no form and without a contact address those visitors would have no route to a person.

### 5. Workshop dates, venue and programme — WO-84
Only "November 2026, Moscow" is confirmed.
**Meanwhile:** the calendar card reads "November 2026". Note this **departs from spec
Appendix A.4**, which asks for "Dates to be confirmed" — but the detail page banner
already says November 2026, and showing "to be confirmed" above it would make the site
contradict itself between two clicks. Worth putting to the client explicitly.

### 6. Russian copy has not been reviewed by a native speaker
The Russian throughout is a first-pass machine/LLM translation. It reads naturally but
has not been checked by a native Russian travel-trade speaker. **Flag this to the client
before launch.** Related: spec v2.2 Appendix B.4 spells Lhaviyani "Лавиани" while the
repo has used "Лавияни" since WO-14 — the repo spelling is believed correct, but the
client should confirm.

### 7. Copy drafted in-house and not client-approved
The Maldives destination intro, the About value-grid items, the cases coming-soon text,
the hero wording and the Legal page are all drafted rather than client-supplied. They
are marked as such in the source. The client reviews before launch.

### 8. True vector export of the Meyyafushi logo — cosmetic
The file supplied as `Meyyafushi Logo.svg` is a single base64 PNG inside an SVG wrapper
— no vector paths, white background baked into the raster.
**Meanwhile:** a background-removed, ink-cropped transparent PNG is live and looks
correct. Only worth chasing for print-grade sharpness.

---

## Blocked on the hosting and repository decision

### 9. CMS production login — WO-63 · *blocks the client's stated top priority*
`public/admin/config.yml` still carries `local_backend: true`, which works only against
`npx decap-server` on localhost. Production needs a GitHub OAuth App **registered under
the COATI organisation** (not a personal account, since the client owns this at
handover), its client ID and secret in the host's environment, and the two route
handlers at `/api/auth` and `/api/callback`.
**Client action required:** only the org owner can register the OAuth App.
**Do not build on Netlify Identity or Git Gateway** — both are deprecated.
`backend.repo` currently reads `shhafuuu/we-present-website` and must be repointed at
the COATI repository.

### 10. Rebuild-on-publish webhook
Pages are statically generated per build, so a CMS publish does not reach the live site
until the next `next build` and redeploy. Most static hosts wire this to a push on
`main`. Unconfigured until hosting is settled.

### 11. Email delivery is a stopgap
Form submissions append to `.submissions/submissions.log` and then, if `GMAIL_USER` and
`GMAIL_APP_PASSWORD` are set, email `NOTIFY_EMAIL` (defaulting to the temporary
`wepresentproject@gmail.com`) over Gmail SMTP. The SES migration is blocked on hosting.
Without the env vars it degrades quietly: logged, not emailed.

### 12. Uploads are stored on local disk
`validateUploadBatch()` enforces an extension whitelist, magic-byte signature checks, a
15MB per-file cap and 5 files / 40MB per submission, then writes to `.submissions/uploads/`.
The spec's private-S3 destination is blocked on hosting.

### 13. Rate limiting is in-memory
`src/lib/rateLimit.ts` is per-IP, 5 requests / 15 minutes, keyed off `x-forwarded-for`.
It resets on every deploy and does not share state between instances. If the host runs
more than one instance, swap it for Redis/Upstash.

### 14. CloudWatch abuse monitoring and CI `npm audit` — unstarted
Both assume the hosting platform. `npm audit`'s three findings sit inside Next's bundled
`postcss`/`sharp`; the only offered fix is a destructive Next downgrade, so they are left
for Dependabot to surface a real fix.

---

## Standing constraints — not blockers, but do not regress them

- **Avoid Cloudflare** in any DNS or CDN configuration. Russian users must reach the
  site without a VPN. Do not geo-block either.
- **Scrub secrets before transfer.** No `.env.local`, no Gmail app password, no
  `.submissions/`. A credential found in git history must be **rotated**, not just
  removed — squashing hides it from the new repo, it does not un-expose it.
- The domain **WePresent.org** is purchased; AWS deployment and Russia-reachability
  testing (spec §10) are the client's to run.
