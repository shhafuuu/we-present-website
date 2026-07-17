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
    <span className={`kicker inline-flex items-center gap-3 ${color}`}>
      <span
        className={`h-px w-8 ${tone === "gold" ? "bg-gold" : tone === "ivory" ? "bg-ivory/60" : "bg-amethyst/50"}`}
      />
      {children}
    </span>
  );
}
