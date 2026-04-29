export interface QuizCategoryMeta {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradientBg: string;
  order: number;
  tutorialSlug: string;
  categoryName: string; // matches backend Category field (HTML, CSS, JavaScript)
}

export const quizCategories: QuizCategoryMeta[] = [
  {
    id: "html",
    title: "HTML Fundamentals",
    description:
      "Test your understanding of HTML elements, attributes, forms, tables, and semantic markup.",
    icon: "FileCode2",
    color: "from-orange-500 to-red-500",
    gradientBg: "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20",
    order: 1,
    tutorialSlug: "html",
    categoryName: "HTML",
  },
  {
    id: "css",
    title: "CSS Mastery",
    description:
      "Challenge yourself on selectors, flexbox, grid, responsive design, and CSS specificity.",
    icon: "Palette",
    color: "from-blue-500 to-indigo-500",
    gradientBg: "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
    order: 2,
    tutorialSlug: "css",
    categoryName: "CSS",
  },
  {
    id: "javascript",
    title: "JavaScript Essentials",
    description:
      "Put your JS skills to the test with questions on closures, async/await, DOM, and ES6+.",
    icon: "Braces",
    color: "from-yellow-500 to-amber-500",
    gradientBg: "from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20",
    order: 3,
    tutorialSlug: "javascript",
    categoryName: "JavaScript",
  },
];

/** Map a quiz category name to its metadata */
export function getCategoryMeta(
  categoryName: string
): QuizCategoryMeta | undefined {
  return quizCategories.find(
    (c) => c.categoryName.toLowerCase() === categoryName.toLowerCase()
  );
}

/** Map a tutorial slug to its quiz category */
export function getQuizCategoryForTutorial(
  tutorialSlug: string
): QuizCategoryMeta | undefined {
  return quizCategories.find((c) => c.tutorialSlug === tutorialSlug);
}
