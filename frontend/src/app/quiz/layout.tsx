import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Interactive Quizzes",
  description: "Test your web development knowledge with interactive quizzes covering HTML, CSS, and JavaScript. Get instant feedback, track your progress, and identify areas to improve.",
  path: "/quiz",
  keywords: ["web development quiz", "HTML quiz", "CSS quiz", "JavaScript quiz", "coding quiz", "programming test"],
});

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
