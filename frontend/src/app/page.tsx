import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import TutorialPreview from "@/components/home/TutorialPreview";
import CoursesPreview from "@/components/home/CoursesPreview";
import CodingTips from "@/components/home/CodingTips";
import CTASection from "@/components/home/CTASection";
import SocialProofTicker from "@/components/ui/SocialProofTicker";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProofTicker />
      <Features />
      <TutorialPreview />
      <CoursesPreview />
      <CodingTips />
      <CTASection />
    </>
  );
}
