import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import TutorialPreview from "@/components/home/TutorialPreview";
import CoursesPreview from "@/components/home/CoursesPreview";
import CodingTips from "@/components/home/CodingTips";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <TutorialPreview />
      <CoursesPreview />
      <CodingTips />
      <CTASection />
    </>
  );
}
