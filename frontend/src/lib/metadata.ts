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
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  image = `${SITE_URL}/og-default.png`,
  type = "website",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
}: PageMetadata): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  const openGraphBase: any = {
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
    type,
  };

  // Add article-specific metadata
  if (type === "article" && (publishedTime || modifiedTime || section || tags.length > 0)) {
    openGraphBase.publishedTime = publishedTime;
    openGraphBase.modifiedTime = modifiedTime;
    openGraphBase.section = section;
    openGraphBase.tags = tags;
    openGraphBase.authors = ["Ayush Kumar"];
  }

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
      "coding bootcamp",
      "learn to code",
      "interactive learning",
      ...keywords,
    ],
    authors: [{ name: "Ayush Kumar", url: "https://www.linkedin.com/in/ayushku" }],
    creator: "BEECODEFI",
    publisher: "BEECODEFI",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: openGraphBase,
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@BeeCodeFi",
      site: "@BeeCodeFi",
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
    applicationName: SITE_NAME,
    category: "education",
  };
}

// Enhanced metadata for specific pages
export const homeMetadata = createMetadata({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  path: "/",
  keywords: ["frontend development", "web design", "programming courses", "online learning"],
});

export const coursesMetadata = createMetadata({
  title: "Video Courses",
  description: "Comprehensive video courses covering HTML, CSS, JavaScript, React and modern web development. Learn at your own pace with hands-on projects.",
  path: "/courses",
  keywords: ["video courses", "web development courses", "learn frontend", "coding tutorials"],
});

export const tutorialsMetadata = createMetadata({
  title: "Interactive Tutorials",
  description: "Free interactive tutorials with live code editors. Master HTML, CSS, JavaScript and React through hands-on practice and real examples.",
  path: "/tutorials",
  keywords: ["interactive tutorials", "coding practice", "learn by doing", "web development tutorials"],
});

export const quizMetadata = createMetadata({
  title: "Practice Quizzes",
  description: "Test your web development knowledge with interactive quizzes. Track your progress and earn badges as you master HTML, CSS, JavaScript and React.",
  path: "/quiz",
  keywords: ["coding quiz", "web development test", "programming practice", "skill assessment"],
});

export const dashboardMetadata = createMetadata({
  title: "Dashboard",
  description: "Track your learning progress, view completed courses, manage bookmarks and see your achievements on your personal learning dashboard.",
  path: "/dashboard",
  keywords: ["learning progress", "course tracking", "achievements", "bookmarks"],
});

export const leaderboardMetadata = createMetadata({
  title: "Leaderboard",
  description: "See top learners and compete with the community. Track rankings, points, and achievements across all BeeCodeFi courses and quizzes.",
  path: "/leaderboard",
  keywords: ["leaderboard", "rankings", "top learners", "competition", "gamification"],
});

export const faqMetadata = createMetadata({
  title: "FAQ",
  description: "Frequently asked questions about BeeCodeFi platform, courses, certificates, pricing and more. Find answers to common questions.",
  path: "/faq",
  keywords: ["help", "support", "questions", "answers", "how to"],
});

export const contactMetadata = createMetadata({
  title: "Contact Us",
  description: "Get in touch with the BeeCodeFi team. We're here to help with questions, feedback, or partnership inquiries.",
  path: "/contact",
  keywords: ["contact", "support", "help", "feedback", "email"],
});

// Helper to create dynamic course/tutorial metadata
export function createCourseMetadata(course: {
  title: string;
  description: string;
  slug: string;
  difficulty?: string;
  tags?: string[];
}) {
  return createMetadata({
    title: course.title,
    description: course.description,
    path: `/courses/${course.slug}`,
    keywords: [course.difficulty || "beginner", "video course", ...(course.tags || [])],
    type: "article",
    section: "Courses",
    tags: course.tags,
  });
}

export function createTutorialMetadata(tutorial: {
  title: string;
  description: string;
  slug: string;
  difficulty?: string;
  tags?: string[];
}) {
  return createMetadata({
    title: tutorial.title,
    description: tutorial.description,
    path: `/tutorials/${tutorial.slug}`,
    keywords: [tutorial.difficulty || "beginner", "tutorial", "interactive", ...(tutorial.tags || [])],
    type: "article",
    section: "Tutorials",
    tags: tutorial.tags,
  });
}
