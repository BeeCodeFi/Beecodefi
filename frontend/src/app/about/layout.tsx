import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — BEECODEFI | Free Web Dev Education for Everyone",
  description:
    "BEECODEFI is a free web development education platform built to make quality coding education accessible to everyone. Learn about the mission, the team, and the projects behind it.",
  keywords: ["about BEECODEFI", "free coding education", "web development platform", "Ayush", "BeeCodeFi mission"],
  openGraph: {
    title: "About BEECODEFI",
    description: "Free web development education for everyone. Learn our mission and story.",
    type: "website",
    url: "https://beecodefi.com/about",
  },
  alternates: {
    canonical: "https://beecodefi.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
