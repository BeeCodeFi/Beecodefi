import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact Us",
  description: "Get in touch with the BEECODEFI team. Have questions, suggestions, or feedback? We'd love to hear from you.",
  path: "/contact",
  keywords: ["contact BEECODEFI", "support", "feedback", "questions"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
