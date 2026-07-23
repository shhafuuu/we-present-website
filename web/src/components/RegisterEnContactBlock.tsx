import { Button } from "@/components/Button";
import { Sparkle } from "@/components/Sparkle";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function RegisterEnContactBlock({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { enContact } = dict.registerPage;
  const email = dict.footer.email;

  return (
    <div className="rounded-2xl bg-soft-lilac/40 p-8 text-center">
      <Sparkle className="mx-auto h-5 w-5 text-gold" />
      <h2 className="font-display mt-3 text-xl text-aubergine">{enContact.title}</h2>
      <p className="mt-2 text-sm text-ink/70">{enContact.body}</p>
      <Button href={`mailto:${email}`} variant="primary" className="mt-6">
        {enContact.emailCta}
      </Button>
    </div>
  );
}
