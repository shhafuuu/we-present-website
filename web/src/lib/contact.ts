/**
 * Canonical contact details, defined once.
 *
 * `email` is deliberately absent. hello@wepresent.org is a placeholder that was never
 * confirmed, and v2.1 section 6 is explicit that nothing is shown until the production
 * address exists. It will be created before launch, at which point adding it here and
 * re-enabling the two guarded blocks below is the whole change.
 *
 * Until then the English contact route is WhatsApp rather than mail, which is why the
 * phone matters more than it looks: without it, removing the placeholder would leave
 * English visitors with no way to make contact at all.
 */

/** Confirmed working number (v2.1 section 6). */
export const PHONE = "+7 915 371 44 86";

/** tel: needs the number stripped of spaces. */
export const PHONE_HREF = `tel:${PHONE.replace(/\s/g, "")}`;

/** wa.me takes digits only, no plus. */
export const WHATSAPP_HREF = "https://wa.me/79153714486";

export const INSTAGRAM_HREF = "https://www.instagram.com/wepresentproject";

/** Showcase page, added alongside Instagram rather than replacing it. The
 *  ?viewAsMember=true parameter the client supplied is stripped: it is a preview
 *  parameter and does nothing useful for a public visitor. */
export const LINKEDIN_HREF = "https://www.linkedin.com/showcase/we-present-project/";

/** Flip to a real address to switch the email back on everywhere at once. */
export const EMAIL: string | null = null;
