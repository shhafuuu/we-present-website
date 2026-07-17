"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function Header({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const dict = getDictionary(locale);

  const NAV_LINKS = [
    { label: dict.nav.about, href: href(locale, "/about") },
    { label: dict.nav.tours, href: href(locale, "/tours") },
    { label: dict.nav.resorts, href: href(locale, "/#resorts") },
    { label: dict.nav.partners, href: href(locale, "/partners") },
    { label: dict.nav.howItWas, href: href(locale, "/how-it-was") },
    { label: dict.nav.contact, href: href(locale, "/contact") },
  ];

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

  const solid = scrolled || menuOpen;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-ivory/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(62,44,85,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href={href(locale, "/")} className="flex items-center gap-3">
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
            className={`font-display text-sm tracking-[0.2em] ${
              solid ? "text-aubergine" : "text-ivory"
            }`}
          >
            WE PRESENT
            <span className="ml-2 hidden text-[0.65rem] tracking-[0.15em] opacity-70 sm:inline">
              {dict.nav.byCoatiTravel}
            </span>
          </span>
        </Link>

        <nav
          className={`hidden items-center gap-8 lg:flex ${
            solid ? "text-ink" : "text-ivory"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="kicker relative text-[0.7rem] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={href(locale, "/#register")}
            className="rounded-full bg-gold px-6 py-2.5 text-xs font-semibold tracking-wide text-aubergine transition-all hover:bg-soft-gold"
          >
            {dict.nav.register}
          </Link>
          <Link
            href={switchHref}
            className="kicker text-[0.7rem] opacity-70 hover:opacity-100"
          >
            {otherLocale.toUpperCase()}
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className={`flex flex-col gap-1.5 lg:hidden ${solid ? "text-aubergine" : "text-ivory"}`}
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
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 top-[64px] z-40 bg-lavender-mist lg:hidden"
        >
          <div className="flex h-full flex-col items-center justify-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-2xl text-aubergine"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={href(locale, "/#register")}
              onClick={() => setMenuOpen(false)}
              className="mt-4 rounded-full bg-gold px-8 py-3 text-sm font-semibold tracking-wide text-aubergine"
            >
              {dict.nav.register}
            </Link>
            <Link
              href={switchHref}
              onClick={() => setMenuOpen(false)}
              className="kicker text-sm text-amethyst/70"
            >
              {otherLocale.toUpperCase()}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
