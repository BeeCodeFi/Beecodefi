import type { MetadataRoute } from "next";
import { tutorials } from "@/data/tutorials";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://beecodefi-edu.vercel.app";

  // Static pages
  const staticPages = [
    "",
    "/roadmap",
    "/tutorials",
    "/quiz",
    "/about",
    "/contact",
    "/bookmarks",
    "/account",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // Tutorial pages
  const tutorialPages = tutorials.map((tutorial) => ({
    url: `${baseUrl}/tutorials/${tutorial.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Lesson pages (all lessons from all tutorials)
  const lessonPages = tutorials.flatMap((tutorial) =>
    tutorial.lessons.map((lesson) => ({
      url: `${baseUrl}/tutorials/${tutorial.slug}/${lesson.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...tutorialPages, ...lessonPages];
}
