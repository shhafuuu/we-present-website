import { Button } from "@/components/Button";
import { Sparkle } from "@/components/Sparkle";
import { EMAIL, PHONE, PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function ContactEnBlock({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { enContact } = dict.contactPage;
  return (
    <div className="rounded-2xl bg-soft-lilac/40 p-8 text-center">
      <Sparkle className="mx-auto h-5 w-5 text-gold" />
      <h2 className="font-display mt-3 text-xl text-aubergine">{enContact.title}</h2>
      <p className="mt-2 text-sm text-ink/70">{enContact.body}</p>
      {/* WhatsApp, not mail. The English locale deliberately has no form, so this
          block is its only route to a person, and the placeholder email it used to
          point at is not shown anywhere until the production address exists. The
          mail CTA returns automatically once EMAIL is set in lib/contact.ts. */}
      <Button href={WHATSAPP_HREF} variant="primary" className="mt-6">
        {dict.footer.whatsapp}
      </Button>
      {EMAIL ? (
        <Button href={`mailto:${EMAIL}`} variant="ghost" className="mt-3">
          {enContact.emailCta}
        </Button>
      ) : null}
      <p className="mt-6 text-sm text-ink/70">
        <a
          href={PHONE_HREF}
          className="underline-offset-4 hover:text-amethyst hover:underline"
        >
          {PHONE}
        </a>
      </p>
    </div>
  );
}
