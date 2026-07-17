import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <section className="bg-aubergine px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Kicker tone="ivory">Contact</Kicker>
            <h1 className="font-display mt-5 text-4xl text-ivory sm:text-5xl">
              Get in touch
            </h1>
            <p className="mt-6 text-ivory/70">
              Whether you&rsquo;re part of a scheduled tour, a hotel partner,
              or simply curious about a private trip — we&rsquo;d like to
              hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <Kicker>Coati Travel</Kicker>
            <dl className="mt-6 space-y-6 text-sm">
              <div>
                <dt className="kicker text-amethyst/70">Email</dt>
                <dd className="mt-1 text-ink/70">hello@wepresent.org</dd>
              </div>
              <div>
                <dt className="kicker text-amethyst/70">Phone</dt>
                <dd className="mt-1 text-ink/40">To be confirmed</dd>
              </div>
              <div>
                <dt className="kicker text-amethyst/70">Office</dt>
                <dd className="mt-1 text-ink/40">Address to be confirmed</dd>
              </div>
              <div>
                <dt className="kicker text-amethyst/70">Instagram</dt>
                <dd className="mt-1 text-ink/40">Handle to be confirmed</dd>
              </div>
              <div>
                <dt className="kicker text-amethyst/70">Parent Brand</dt>
                <dd className="mt-1">
                  <a
                    href="https://coatitravel.ru"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amethyst underline"
                  >
                    coatitravel.ru
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
