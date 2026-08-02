import { TutorialCategory } from "@/types";
import { allHtmlLessons } from "./html-tutorials";
import { cssLessons } from "./css-tutorials";
import { jsLessons } from "./js-tutorials";

export const tutorials: TutorialCategory[] = [
  {
    slug: "html",
    title: "HTML Fundamentals",
    description: "Learn the building blocks of every website. Master HTML elements, forms, tables, and semantic markup with interactive examples referenced from MDN Web Docs.",
    icon: "FileCode2",
    color: "from-orange-500 to-red-500",
    totalLessons: allHtmlLessons.length,
    estimatedHours: Math.ceil(allHtmlLessons.reduce((acc, l) => acc + (l.estimatedMinutes || 15), 0) / 60),
    lessons: allHtmlLessons,
  },
  {
    slug: "css",
    title: "CSS Mastery",
    description: "Make things beautiful. Flexbox, Grid, animations, responsive design, and modern CSS features. Transform raw HTML into stunning, polished interfaces that users love.",
    icon: "Palette",
    color: "from-blue-500 to-indigo-500",
    totalLessons: cssLessons.length,
    estimatedHours: Math.ceil(cssLessons.reduce((acc, l) => acc + (l.estimatedMinutes || 15), 0) / 60),
    lessons: cssLessons,
  },
  {
    slug: "javascript",
    title: "JavaScript Essentials",
    description: "Bring pages to life. Functions, DOM, async/await, APIs, classes, and modern ES6+ features. Turn static websites into dynamic, interactive web applications.",
    icon: "Braces",
    color: "from-yellow-500 to-amber-500",
    totalLessons: jsLessons.length,
    estimatedHours: Math.ceil(jsLessons.reduce((acc, l) => acc + (l.estimatedMinutes || 15), 0) / 60),
    lessons: jsLessons,
  }
];
