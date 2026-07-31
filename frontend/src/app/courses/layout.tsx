import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Courses — Learn Web Dev by Watching | BEECODEFI",
  description:
    "Free video courses on HTML and CSS. Watch structured lessons, follow along with code examples, and build real projects. More tracks coming soon.",
  keywords: ["HTML video course", "CSS video course", "web development course", "free coding videos", "learn HTML CSS"],
  openGraph: {
    title: "Free Video Courses — BEECODEFI",
    description: "Free HTML and CSS video courses. Learn web development by watching and doing.",
    type: "website",
    url: "https://beecodefi.com/courses",
  },
  alternates: {
    canonical: "https://beecodefi.com/courses",
  },
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
