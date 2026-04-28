import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CodingTips from "@/components/home/CodingTips";
import TutorialPreview from "@/components/home/TutorialPreview";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <TutorialPreview />
      <CodingTips />
      <CTASection />
    </>
  );
}
