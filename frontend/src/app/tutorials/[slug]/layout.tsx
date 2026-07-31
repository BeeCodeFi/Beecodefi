import type { Metadata } from "next";
import { tutorials } from "@/data/tutorials";

const trackMeta: Record<string, { title: string; description: string }> = {
  html: {
    title: "HTML Tutorial — Structure & Semantics | BEECODEFI",
    description:
      "Learn HTML from scratch with free interactive lessons. Elements, forms, tables, semantic HTML5, accessibility, and more. Live code editor included.",
  },
  css: {
    title: "CSS Tutorial — Styling & Layouts | BEECODEFI",
    description:
      "Master CSS with free step-by-step lessons. Flexbox, Grid, animations, responsive design, CSS variables, and modern CSS features with a live editor.",
  },
  javascript: {
    title: "JavaScript Tutorial — Logic & Interactivity | BEECODEFI",
    description:
      "Learn JavaScript with free interactive lessons. Functions, DOM manipulation, async/await, APIs, ES6+ features, and hands-on exercises.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const track = tutorials.find((t) => t.slug === slug);
  const meta = trackMeta[slug];

  const title = meta?.title ?? `${track?.title ?? slug} Tutorial | BEECODEFI`;
  const description =
    meta?.description ??
    `Learn ${track?.title ?? slug} for free with interactive lessons, exercises, and quizzes.`;

  return {
    title,
    description,
    keywords: [
      `${slug} tutorial`,
      `learn ${slug}`,
      "web development",
      "free coding",
      "interactive lesson",
      "BEECODEFI",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://beecodefi.com/tutorials/${slug}`,
    },
    alternates: {
      canonical: `https://beecodefi.com/tutorials/${slug}`,
    },
  };
}

import Script from "next/script";

export default async function TutorialSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const track = tutorials.find((t) => t.slug === slug);
  const meta = trackMeta[slug];

  const jsonLd = track
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: track.title,
        description: meta?.description || track.description,
        provider: {
          "@type": "Organization",
          name: "BeeCodeFi",
          sameAs: "https://beecodefi.com",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: "PT10H", // roughly 10 hours depending on the course
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <Script
          id={`json-ld-course-${slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
