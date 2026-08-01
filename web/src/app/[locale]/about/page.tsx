import { Kicker } from "@/components/Kicker";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { AlternatingBlock } from "@/components/about/AlternatingBlock";
import { AudiencePanel } from "@/components/about/AudiencePanel";
import { DifferenceTable } from "@/components/about/DifferenceTable";
import { ValueJourney } from "@/components/about/ValueJourney";
import { Button } from "@/components/Button";
import { Sparkle } from "@/components/Sparkle";
import { href, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageBanner
        kicker={dict.about.banner.kicker}
        title={dict.about.banner.title}
      />

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <AlternatingBlock
          kicker={dict.about.concept.kicker}
          title={dict.about.concept.title}
          paragraphs={dict.about.concept.paragraphs}
          image="/images/resorts/fushifaru/island.jpg"
          imageAlt={dict.about.concept.imageAlt}
        />
      </section>

      {/* v2.1 section 1: the differentiator leads, then the two audiences get a panel
          each. Previously both audiences were mixed into one value block, which is the
          client's central objection this round. */}
      <section className="bg-lavender-mist px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <Kicker>{dict.about.difference.kicker}</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              {dict.about.difference.title}
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-ink/70">
              {dict.about.difference.lead}
            </p>
          </Reveal>

          <DifferenceTable
            columns={dict.about.difference.columns}
            rows={dict.about.difference.rows}
          />
        </div>
      </section>

      <AudiencePanel
        id="for-participants"
        tone="ivory"
        label={dict.about.audiences.participants.label}
        message={dict.about.audiences.participants.message}
        items={dict.about.audiences.participants.items}
        keyMessage={dict.about.audiences.participants.keyMessage}
      />

      <AudiencePanel
        id="for-partners"
        tone="lilac"
        label={dict.about.audiences.partners.label}
        message={dict.about.audiences.partners.message}
        items={dict.about.audiences.partners.items}
        keyMessage={dict.about.audiences.partners.keyMessage}
      >
        {/* The six value items describe what a partner receives, not what the platform
            offers both audiences, so the journey belongs inside this panel rather than
            standing alone above the split. */}
        <div className="mt-16 text-center">
          <Reveal>
            <Kicker>{dict.about.valueGrid.kicker}</Kicker>
            <h3 className="font-display mt-5 text-2xl text-aubergine sm:text-3xl">
              {dict.about.valueGrid.title}
            </h3>
          </Reveal>

          <ValueJourney stages={dict.about.valueGrid.stages} items={dict.about.valueGrid.items} />
        </div>
      </AudiencePanel>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <AlternatingBlock
          kicker={dict.about.howItWorks.kicker}
          title={dict.about.howItWorks.title}
          paragraphs={dict.about.howItWorks.paragraphs}
          image="/images/resorts/fushifaru/sandbank.jpg"
          imageAlt={dict.about.howItWorks.imageAlt}
          reverse
        />
      </section>

      <section className="bg-lavender-mist px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <Kicker>{dict.about.selectionModel.kicker}</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              {dict.about.selectionModel.title}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {dict.about.selectionModel.steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.1}>
                <div className="rounded-2xl bg-ivory p-8 text-left shadow-card">
                  <p className="font-display text-3xl text-amethyst">{step.number}</p>
                  <h3 className="font-display mt-4 text-xl text-aubergine">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Kicker>{dict.about.cases.kicker}</Kicker>
            <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
              {dict.about.cases.title}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 rounded-3xl border border-dashed border-amethyst/20 bg-soft-lilac/40 px-8 py-14">
              <Sparkle className="mx-auto h-4 w-4 text-gold" />
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{dict.about.cases.body}</p>
            </div>
          </Reveal>
          <Reveal delay={0.25} className="mt-10">
            <Button href={href(locale, "/how-it-was")} variant="ghost">
              {dict.about.cases.cta}
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-aubergine px-6 py-24 lg:px-10">
        <Sparkle className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 text-ivory/[0.04]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <Kicker tone="ivory">{dict.about.benefits.kicker}</Kicker>
            <p className="font-display mt-6 text-2xl italic text-ivory/90 sm:text-3xl">
              {dict.about.benefits.quote}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 text-left sm:grid-cols-2">
            {dict.about.benefits.items.map((benefit, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-xl border border-ivory/10 p-6">
                  <Sparkle className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
                  <p className="text-sm leading-relaxed text-ivory/75">{benefit}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-14">
            <Button href={href(locale, "/register")} variant="primary">
              {dict.about.benefits.cta}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
