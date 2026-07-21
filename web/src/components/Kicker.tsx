import { Sparkle } from "@/components/Sparkle";

export function Kicker({
  children,
  tone = "amethyst",
}: {
  children: React.ReactNode;
  tone?: "amethyst" | "gold" | "ivory";
}) {
  const color =
    tone === "gold"
      ? "text-gold"
      : tone === "ivory"
        ? "text-ivory"
        : "text-amethyst";

  return (
    <span className={`kicker inline-flex items-center gap-2.5 ${color}`}>
      <span
        className={`h-px w-5 ${tone === "gold" ? "bg-gold" : tone === "ivory" ? "bg-ivory/60" : "bg-amethyst/50"}`}
      />
      <Sparkle className="h-2.5 w-2.5 shrink-0" />
      {children}
    </span>
  );
}
