import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About Us",
  description: "BEECODEFI provides world-class web development education completely free. Our mission is to make quality tech education accessible to everyone, anywhere.",
  path: "/about",
  keywords: ["about BEECODEFI", "free coding education", "learn to code free", "web development education"],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
