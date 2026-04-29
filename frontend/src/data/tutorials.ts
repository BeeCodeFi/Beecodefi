import { TutorialCategory } from "@/types";
import { htmlLessons } from "./html-tutorials";
import { cssLessons } from "./css-tutorials";
import { jsLessons } from "./js-tutorials";

export const tutorials: TutorialCategory[] = [
  {
    slug: "html",
    title: "HTML Fundamentals",
    description: "Learn the building blocks of every website. Master HTML elements, forms, tables, and semantic markup with interactive examples referenced from MDN Web Docs.",
    icon: "FileCode2",
    color: "from-orange-500 to-red-500",
    totalLessons: htmlLessons.length,
    estimatedHours: Math.ceil(htmlLessons.reduce((acc, l) => acc + (l.estimatedMinutes || 15), 0) / 60),
    lessons: htmlLessons,
  },
  {
    slug: "css",
    title: "CSS Mastery",
    description: "Style your websites beautifully. Master selectors, flexbox, grid, animations, and responsive design.",
    icon: "Palette",
    color: "from-blue-500 to-indigo-500",
    totalLessons: cssLessons.length,
    estimatedHours: Math.ceil(cssLessons.reduce((acc, l) => acc + (l.estimatedMinutes || 15), 0) / 60),
    lessons: cssLessons,
  },
  {
    slug: "javascript",
    title: "JavaScript Essentials",
    description: "Add interactivity to your sites. Learn variables, functions, DOM manipulation, async/await, and ES6+.",
    icon: "Braces",
    color: "from-yellow-500 to-amber-500",
    totalLessons: jsLessons.length,
    estimatedHours: Math.ceil(jsLessons.reduce((acc, l) => acc + (l.estimatedMinutes || 15), 0) / 60),
    lessons: jsLessons,
  }
];
