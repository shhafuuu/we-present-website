import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function RegisterBand({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    // Amethyst stop at 20% rather than the default 50% (WO-52). This band has less
    // top padding than PageBanner, so its ivory kicker sat higher in the gradient
    // and measured 2.54:1, the worst pairing on the site and the round-1 "white on
    // lilac reads as too similar" report. Now 6.19:1.
    <section
      id="register"
      className="bg-gradient-to-b from-soft-lilac via-amethyst via-20% to-aubergine px-6 py-28 lg:px-10"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Kicker tone="ivory">{dict.home.register.kicker}</Kicker>
          <h2 className="font-display mt-5 text-4xl text-ivory sm:text-5xl">
            {dict.home.register.title}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-ivory/85">{dict.home.register.body}</p>
        </Reveal>
        <Reveal delay={0.25} className="mt-10">
          <Button href={href(locale, "/register")} variant="primary">
            {dict.home.register.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
