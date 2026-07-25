import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "ghost-light";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm tracking-wide transition-all duration-300 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

  const styles = {
    primary:
      "bg-gold text-aubergine hover:bg-soft-gold hover:shadow-lg hover:shadow-gold/20 focus-visible:ring-aubergine/70",
    ghost:
      "border border-amethyst/40 text-amethyst hover:border-amethyst hover:bg-amethyst/5 focus-visible:ring-amethyst/70",
    "ghost-light":
      "border border-ivory/50 text-ivory hover:border-ivory hover:bg-ivory/10 focus-visible:ring-ivory/70",
  } as const;

  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
