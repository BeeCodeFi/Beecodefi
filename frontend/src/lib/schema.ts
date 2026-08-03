/**
 * Schema.org markup generators for SEO
 * Helps search engines understand content and display rich results
 */

const SITE_URL = "https://beecodefi-edu.vercel.app";
const SITE_NAME = "BEECODEFI";

/**
 * Organization schema for the main website
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "description": "Free web development education platform offering interactive tutorials, video courses, and quizzes for HTML, CSS, JavaScript, and React.",
    "sameAs": [
      "https://github.com/BeeCodeFi",
      "https://www.linkedin.com/company/beecodefi",
      "https://www.youtube.com/@beecodefi"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@beecodefi.com"
    }
  };
}

/**
 * Course schema for course pages
 */
export function generateCourseSchema({
  title,
  description,
  slug,
  difficulty,
  videoCount,
  instructor = "BeeCodeFi Team",
}: {
  title: string;
  description: string;
  slug: string;
  difficulty?: string;
  videoCount?: number;
  instructor?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": title,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL
    },
    "url": `${SITE_URL}/courses/${slug}`,
    "courseCode": slug.toUpperCase(),
    "educationalLevel": difficulty || "Beginner",
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "instructor": {
        "@type": "Person",
        "name": instructor
      }
    },
    ...(videoCount && {
      "numberOfItems": videoCount,
      "learningResourceType": "Video Tutorial"
    })
  };
}

/**
 * LearningResource schema for tutorial pages
 */
export function generateLearningResourceSchema({
  title,
  description,
  tutorialSlug,
  lessonSlug,
  difficulty,
  category,
}: {
  title: string;
  description: string;
  tutorialSlug: string;
  lessonSlug?: string;
  difficulty?: string;
  category?: string;
}) {
  const url = lessonSlug 
    ? `${SITE_URL}/tutorials/${tutorialSlug}?lesson=${lessonSlug}`
    : `${SITE_URL}/tutorials/${tutorialSlug}`;

  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": title,
    "description": description,
    "url": url,
    "author": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL
    },
    "educationalLevel": difficulty || "Beginner",
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "learningResourceType": "Interactive Tutorial",
    ...(category && {
      "about": {
        "@type": "Thing",
        "name": category
      }
    })
  };
}

/**
 * FAQPage schema for FAQ pages
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.url}`
    }))
  };
}

/**
 * WebPage schema for general pages
 */
export function generateWebPageSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `${SITE_URL}${url}`,
    "inLanguage": "en",
    "isPartOf": {
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": SITE_URL
    },
    ...(datePublished && { "datePublished": datePublished }),
    ...(dateModified && { "dateModified": dateModified })
  };
}
