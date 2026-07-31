import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Free Web Development Tutorials",
  description: "Learn web development from scratch with our comprehensive tutorials covering HTML, CSS, and JavaScript. Step-by-step lessons with examples, exercises, and quizzes. 100% free, no signup required.",
  path: "/tutorials",
  keywords: ["web development tutorials", "HTML tutorial", "CSS tutorial", "JavaScript tutorial", "learn web development", "coding tutorials free"],
});

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
