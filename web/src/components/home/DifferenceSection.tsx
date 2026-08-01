import Link from "next/link";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { DifferenceTable } from "@/components/about/DifferenceTable";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

/**
 * The homepage carries an abbreviated version of the About audience split
 * (WO-22): the comparison table and the two key messages only. The full benefit
 * lists stay on About so the homepage stays premium rather than dense, and each
 * key message links straight to its own panel there.
 *
 * Copy is read from the About dictionary rather than duplicated, so the two
 * pages cannot drift apart.
 */
export function DifferenceSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { difference, audiences } = dict.about;

  const messages = [
    {
      label: audiences.participants.label,
      message: audiences.participants.keyMessage,
      cta: dict.home.difference.participantsCta,
      anchor: "/about#for-participants",
    },
    {
      label: audiences.partners.label,
      message: audiences.partners.keyMessage,
      cta: dict.home.difference.partnersCta,
      anchor: "/about#for-partners",
    },
  ];

  return (
    <section className="border-t border-amethyst/10 bg-lavender-mist px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <Kicker>{dict.home.difference.kicker}</Kicker>
          <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
            {dict.home.difference.title}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-ink/70">
            {difference.lead}
          </p>
        </Reveal>

        <DifferenceTable columns={difference.columns} rows={difference.rows} />

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {messages.map((m, i) => (
            <Reveal key={m.anchor} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-amethyst/10 bg-ivory p-8">
                <p className="kicker text-amethyst">{m.label}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/70">
                  {m.message}
                </p>
                <Link
                  href={href(locale, m.anchor)}
                  className="kicker mt-6 inline-flex items-center gap-2 text-amethyst underline-offset-4 transition-colors hover:text-aubergine hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amethyst"
                >
                  {m.cta}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
