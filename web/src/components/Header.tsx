"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function Header({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const dict = getDictionary(locale);

  // Kept to the 3 highest-traffic destinations. Partners/How It Was/Contact,
  // plus Become a Partner, are grouped under "More": the nav shouldn't present
  // 9 simultaneous top-level choices (working-memory limits), and Become a
  // Partner specifically shouldn't sit at parity with the primary IA links -
  // PRODUCT.md is explicit that hotels are a secondary, lighter-funnel
  // audience, not equal to agent registration.
  const PRIMARY_LINKS = [
    { label: dict.nav.about, href: href(locale, "/about") },
    { label: dict.nav.tours, href: href(locale, "/tours") },
    { label: dict.nav.destinations, href: href(locale, "/destinations") },
  ];
  const MORE_LINKS = [
    { label: dict.nav.partners, href: href(locale, "/partners") },
    { label: dict.nav.howItWas, href: href(locale, "/how-it-was") },
    { label: dict.nav.contact, href: href(locale, "/contact") },
    { label: dict.nav.becomePartner, href: href(locale, "/become-a-partner") },
  ];
  const NAV_LINKS = [...PRIMARY_LINKS, ...MORE_LINKS];

  // Swap the locale segment of the current path, preserving the rest of the route.
  const otherLocale: Locale = locale === "ru" ? "en" : "ru";
  const pathWithoutLocale = pathname?.replace(new RegExp(`^/${locale}`), "") || "";
  const switchHref = href(otherLocale, pathWithoutLocale || "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  const solid = scrolled || menuOpen;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-ivory/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(62,44,85,0.08)]"
          : "bg-aubergine/75 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-[100rem] items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href={href(locale, "/")}
          className={`flex items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
            solid ? "focus-visible:ring-amethyst/70" : "focus-visible:ring-ivory/70"
          }`}
        >
          <Image
            src={
              solid
                ? "/images/logos/wp-monogram-black.png"
                : "/images/logos/wp-monogram-white.png"
            }
            alt="We Present monogram"
            width={34}
            height={34}
            className="h-8 w-8 object-contain"
            priority
          />
          <span
            className={`font-sans text-sm font-semibold tracking-[0.12em] ${
              solid ? "text-aubergine" : "text-ivory"
            }`}
          >
            WE PRESENT
            <span className="ml-2 hidden whitespace-nowrap text-[0.65rem] tracking-[0.15em] opacity-70 sm:inline">
              {dict.nav.byCoati}
            </span>
          </span>
        </Link>

        <nav
          className={`hidden items-center gap-5 whitespace-nowrap min-[1400px]:flex min-[1400px]:gap-6 ${
            solid ? "text-ink" : "text-ivory"
          }`}
        >
          {PRIMARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`kicker relative rounded-sm text-[0.65rem] outline-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-[1400px]:text-[0.7rem] ${
                solid ? "focus-visible:ring-amethyst/70" : "focus-visible:ring-ivory/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-controls="nav-more-menu"
              className={`kicker relative flex items-center gap-1 rounded-sm text-[0.65rem] outline-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-[1400px]:text-[0.7rem] ${
                solid ? "focus-visible:ring-amethyst/70" : "focus-visible:ring-ivory/70"
              }`}
            >
              {dict.nav.more}
              <svg
                viewBox="0 0 12 12"
                className={`h-2.5 w-2.5 shrink-0 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {moreOpen && (
              <div
                id="nav-more-menu"
                className="absolute left-1/2 top-full z-10 mt-3 flex w-40 -translate-x-1/2 flex-col gap-1 rounded-xl border border-amethyst/10 bg-ivory p-2 text-ink shadow-card"
              >
                {MORE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    className="kicker rounded-lg px-3 py-2 text-[0.65rem] outline-none hover:bg-amethyst/5 hover:text-amethyst focus-visible:ring-2 focus-visible:ring-amethyst/70"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href={href(locale, "/register")}
            className="rounded-full bg-gold px-4 py-2 text-[0.65rem] font-semibold tracking-wide text-aubergine outline-none transition-all hover:bg-soft-gold focus-visible:ring-2 focus-visible:ring-aubergine/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-[1400px]:px-5 min-[1400px]:py-2.5 min-[1400px]:text-xs"
          >
            {dict.nav.register}
          </Link>
          <Link
            href={switchHref}
            className={`kicker rounded-sm text-[0.65rem] opacity-70 outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-[1400px]:text-[0.7rem] ${
              solid ? "focus-visible:ring-amethyst/70" : "focus-visible:ring-ivory/70"
            }`}
          >
            {otherLocale.toUpperCase()}
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
          className={`flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-[1400px]:hidden ${solid ? "text-aubergine focus-visible:ring-amethyst/70" : "text-ivory focus-visible:ring-ivory/70"}`}
        >
          <span
            className={`h-px w-7 bg-current transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-px w-7 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-7 bg-current transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>
    </header>

    <AnimatePresence>
      {menuOpen && (
        <motion.nav
          id="mobile-nav"
          aria-label="Mobile menu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 top-[64px] z-40 bg-lavender-mist min-[1400px]:hidden"
        >
          <div className="flex h-full flex-col items-center justify-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-sm font-display text-2xl text-aubergine outline-none focus-visible:ring-2 focus-visible:ring-amethyst/70 focus-visible:ring-offset-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={href(locale, "/register")}
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-gold px-8 py-3 text-sm font-semibold tracking-wide text-aubergine outline-none focus-visible:ring-2 focus-visible:ring-aubergine/70 focus-visible:ring-offset-2"
            >
              {dict.nav.register}
            </Link>
            <Link
              href={switchHref}
              onClick={() => setMenuOpen(false)}
              className="kicker rounded-sm text-sm text-amethyst/70 outline-none focus-visible:ring-2 focus-visible:ring-amethyst/70 focus-visible:ring-offset-2"
            >
              {otherLocale.toUpperCase()}
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
    </>
  );
}
