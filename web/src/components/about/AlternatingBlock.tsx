import Image from "next/image";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";

export function AlternatingBlock({
  kicker,
  title,
  paragraphs,
  image,
  imageAlt,
  reverse = false,
}: {
  kicker: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Reveal>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src={image} alt={imageAlt} fill className="object-cover" />
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <Kicker>{kicker}</Kicker>
        <h2 className="font-display mt-5 text-3xl text-aubergine sm:text-4xl">
          {title}
        </h2>
        {paragraphs.map((p, i) => (
          <p key={i} className={`text-base leading-relaxed text-ink/70 ${i === 0 ? "mt-6" : "mt-4"}`}>
            {p}
          </p>
        ))}
      </Reveal>
    </div>
  );
}
