import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Dev Learning Roadmap — From Beginner to Pro | BEECODEFI",
  description:
    "Follow a structured web development roadmap. Learn HTML, CSS, JavaScript and beyond in the right order — with free tutorials and quizzes at every step.",
  keywords: ["web development roadmap", "learn to code", "HTML CSS JavaScript", "coding path", "beginner developer roadmap"],
  openGraph: {
    title: "Web Dev Roadmap — BEECODEFI",
    description: "Structured path from beginner to pro. HTML → CSS → JavaScript and beyond.",
    type: "website",
    url: "https://beecodefi.com/roadmap",
  },
  alternates: {
    canonical: "https://beecodefi.com/roadmap",
  },
};

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
