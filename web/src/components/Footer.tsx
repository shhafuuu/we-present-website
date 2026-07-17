import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="bg-aubergine text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/logos/wp-monogram-white.png"
              alt="We Present monogram"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <p className="mt-4 max-w-[220px] text-sm text-soft-lilac">
              A curated tour programme bringing agency partners face-to-face
              with the Maldives&rsquo; finest resorts.
            </p>
          </div>

          <div>
            <p className="kicker text-gold">Explore</p>
            <ul className="mt-5 space-y-3 text-sm text-soft-lilac">
              <li><Link href="/#concept" className="hover:text-ivory">About</Link></li>
              <li><Link href="/#tours" className="hover:text-ivory">Tours</Link></li>
              <li><Link href="/#resorts" className="hover:text-ivory">Resorts</Link></li>
              <li><Link href="/#partners" className="hover:text-ivory">Partners</Link></li>
              <li><Link href="/#how-it-was" className="hover:text-ivory">How It Was</Link></li>
            </ul>
          </div>

          <div>
            <p className="kicker text-gold">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-soft-lilac">
              <li>hello@wepresent.org</li>
              <li className="text-soft-lilac/60">Phone &mdash; to be confirmed</li>
              <li className="text-soft-lilac/60">Office address &mdash; to be confirmed</li>
            </ul>
          </div>

          <div>
            <p className="kicker text-gold">Follow</p>
            <ul className="mt-5 space-y-3 text-sm text-soft-lilac">
              <li className="text-soft-lilac/60">Instagram &mdash; handle to be confirmed</li>
            </ul>
            <p className="kicker mt-8 text-gold">Parent Brand</p>
            <a
              href="https://coatitravel.ru"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-soft-lilac hover:text-ivory"
            >
              A project by Coati Travel &rarr;
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-soft-lilac/70 sm:flex-row">
          <p>&copy; 2026 We Present by Coati Travel. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/legal" className="hover:text-ivory">Privacy Policy</Link>
            <span>EN / RU</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
