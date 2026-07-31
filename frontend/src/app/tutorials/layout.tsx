import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Dev Tutorials — HTML, CSS & JavaScript | BEECODEFI",
  description:
    "Free interactive tutorials for HTML, CSS, and JavaScript. Step-by-step lessons with live code editors, exercises, and quizzes. Learn web development from scratch.",
  keywords: ["HTML tutorial", "CSS tutorial", "JavaScript tutorial", "web development", "free coding course", "interactive lessons"],
  openGraph: {
    title: "Web Dev Tutorials — BEECODEFI",
    description: "Free interactive tutorials for HTML, CSS, and JavaScript with live code editors.",
    type: "website",
    url: "https://beecodefi.com/tutorials",
  },
  alternates: {
    canonical: "https://beecodefi.com/tutorials",
  },
};

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
