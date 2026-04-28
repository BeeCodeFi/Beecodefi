import { CodingTip } from "@/types";

export const codingTips: CodingTip[] = [
  {
    id: 1,
    title: "Destructuring Assignment",
    tip: "Use destructuring to extract values from objects and arrays cleanly.",
    language: "javascript",
    code: `const { name, age, ...rest } = user;
const [first, second] = items;`,
  },
  {
    id: 2,
    title: "CSS Grid Quick Layout",
    tip: "Create responsive grids with minimal CSS using auto-fit.",
    language: "css",
    code: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}`,
  },
  {
    id: 3,
    title: "Semantic HTML",
    tip: "Use semantic elements to improve accessibility and SEO.",
    language: "html",
    code: `<header>
  <nav>...</nav>
</header>
<main>
  <article>
    <section>...</section>
  </article>
</main>
<footer>...</footer>`,
  },
  {
    id: 4,
    title: "Optional Chaining",
    tip: "Safely access nested properties without checking each level.",
    language: "javascript",
    code: `const city = user?.address?.city ?? "Unknown";
const first = arr?.[0];
const result = obj?.method?.();`,
  },
  {
    id: 5,
    title: "Flexbox Centering",
    tip: "Center any element perfectly with just 3 properties.",
    language: "css",
    code: `.center {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
  },
  {
    id: 6,
    title: "Array Methods Chain",
    tip: "Chain array methods for clean data transformations.",
    language: "javascript",
    code: `const result = users
  .filter(u => u.active)
  .map(u => u.name)
  .sort()
  .join(", ");`,
  },
  {
    id: 7,
    title: "CSS Custom Properties",
    tip: "Use CSS variables for consistent theming across your site.",
    language: "css",
    code: `:root {
  --primary: #6366f1;
  --radius: 0.5rem;
}
.btn {
  background: var(--primary);
  border-radius: var(--radius);
}`,
  },
  {
    id: 8,
    title: "Template Literals",
    tip: "Use backticks for string interpolation and multi-line strings.",
    language: "javascript",
    code: `const greeting = \`Hello, \${user.name}!
Welcome to \${site}.
You have \${count} notifications.\`;`,
  },
];
