import { Hero } from "@/components/home/Hero";
import { ConceptSection } from "@/components/home/ConceptSection";
import { ToursTimeline } from "@/components/home/ToursTimeline";
import { ResortsGrid } from "@/components/home/ResortsGrid";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { HowItWas } from "@/components/home/HowItWas";
import { RegisterBand } from "@/components/home/RegisterBand";

export default function Home() {
  return (
    <>
      <Hero />
      <ConceptSection />
      <ToursTimeline />
      <ResortsGrid />
      <PartnersStrip />
      <HowItWas />
      <RegisterBand />
    </>
  );
}
