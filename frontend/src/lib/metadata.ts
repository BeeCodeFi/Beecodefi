import type { Metadata } from "next";

const SITE_NAME = "BEECODEFI";
const SITE_URL = "https://beecodefi-edu.vercel.app";
const SITE_DESCRIPTION = "Learn HTML, CSS, JavaScript and React with free interactive tutorials, video courses and quizzes. World-class web development education — completely free.";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  image = `${SITE_URL}/og-default.png`,
}: PageMetadata): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "web development",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "tutorials",
      "quizzes",
      "free education",
      ...keywords,
    ],
    authors: [{ name: "Ayush Kumar", url: "https://www.linkedin.com/in/ayushku" }],
    creator: "BEECODEFI",
    publisher: "BEECODEFI",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@BeeCodeFi",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
