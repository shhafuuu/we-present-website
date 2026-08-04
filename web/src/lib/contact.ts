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

/** Confirmed working number (v2.1 section 6). The mobile, and the WhatsApp contact. */
export const PHONE = "+7 915 371 44 86";

/** tel: needs the number stripped of spaces. */
export const PHONE_HREF = `tel:${PHONE.replace(/\s/g, "")}`;

/** wa.me takes digits only, no plus. */
export const WHATSAPP_HREF = "https://wa.me/79153714486";

/** Office landline, added round 5 *alongside* the mobile rather than replacing it.
 *  Telephone link only: it is a landline, so there is no WhatsApp on it. */
export const OFFICE_PHONE = "+7 (495) 150-11-03";

/** Strips spaces, brackets and dashes. tel: takes digits and a leading plus. */
export const OFFICE_PHONE_HREF = `tel:${OFFICE_PHONE.replace(/[^\d+]/g, "")}`;

export type Office = {
  id: string;
  city: { en: string; ru: string };
  address: { en: string; ru: string };
  /** Search string for the Yandex Maps embed. Held in Russian because that is what
   *  Yandex resolves most reliably for a Russian address, regardless of page locale. */
  mapQuery: string;
};

/**
 * Both offices, structured rather than free text, so the maps render from the same
 * source as the addresses and the two cannot drift apart.
 */
export const OFFICES: Office[] = [
  {
    id: "moscow",
    city: { en: "Moscow", ru: "Москва" },
    address: {
      en: "White Stone, 4th Lesnoy Pereulok, 4",
      ru: "БЦ White Stone, 4-й Лесной переулок, 4",
    },
    mapQuery: "Москва, 4-й Лесной переулок, 4",
  },
  {
    id: "spb",
    city: { en: "St Petersburg", ru: "Санкт-Петербург" },
    address: {
      en: "Regus Nevsky Plaza, Nevsky Prospect, 55",
      ru: "Regus Невский Плаза, Невский проспект, 55",
    },
    mapQuery: "Санкт-Петербург, Невский проспект, 55",
  },
];

export const INSTAGRAM_HREF = "https://www.instagram.com/wepresentproject";

/** Showcase page, added alongside Instagram rather than replacing it. The
 *  ?viewAsMember=true parameter the client supplied is stripped: it is a preview
 *  parameter and does nothing useful for a public visitor. */
export const LINKEDIN_HREF = "https://www.linkedin.com/showcase/we-present-project/";

/** Flip to a real address to switch the email back on everywhere at once. */
export const EMAIL: string | null = null;
