import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Developer Roadmap",
  description: "Your complete path from beginner to professional web developer. Master HTML, CSS, JavaScript, and React with our structured learning roadmap. 47+ free lessons across 4 progressive stages.",
  path: "/roadmap",
  keywords: ["web development roadmap", "learn to code", "frontend roadmap", "HTML CSS JavaScript", "React learning path", "programming tutorial"],
});

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
