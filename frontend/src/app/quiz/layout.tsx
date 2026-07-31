import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quizzes — Test Your HTML, CSS & JavaScript Skills | BEECODEFI",
  description:
    "Test your web development knowledge with free quizzes on HTML, CSS, and JavaScript. Instant feedback, progress tracking, and detailed explanations.",
  keywords: ["HTML quiz", "CSS quiz", "JavaScript quiz", "web development quiz", "coding test", "programming quiz"],
  openGraph: {
    title: "Web Dev Quizzes — BEECODEFI",
    description: "Test your HTML, CSS, and JavaScript skills with free interactive quizzes.",
    type: "website",
    url: "https://beecodefi.com/quiz",
  },
  alternates: {
    canonical: "https://beecodefi.com/quiz",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
