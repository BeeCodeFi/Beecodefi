export interface CourseVideo {
  id: string; // YouTube video ID
  title: string;
  description?: string;
}

export interface Course {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  playlistId: string;
  firstVideoId: string; // used for thumbnail and starting the embed
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  icon: string; // lucide icon name key
  color: string; // tailwind gradient classes
  videos: CourseVideo[];
}

export const courses: Course[] = [
  {
    slug: "html-made-easy",
    title: "HTML Made Easy",
    tagline: "Start from zero and build real web pages",
    description:
      "A beginner-friendly series that walks you through HTML from the ground up. Learn what HTML is, how browsers render pages, how to structure content with tags, and how to build real-world web pages step by step.",
    playlistId: "PLaJsz10osD4b55wOP_cWHVAVFOBE4e0uh",
    firstVideoId: "3zxuczMA-2o",
    difficulty: "beginner",
    category: "HTML",
    icon: "FileCode2",
    color: "from-orange-500 to-red-500",
    videos: [
      {
        id: "3zxuczMA-2o",
        title: "HTML Made Easy – Part 1 🚀 | What Is HTML?",
        description: "Introduction to HTML — what it is, why it matters, and how browsers interpret markup.",
      },
      {
        id: "2zCsMX5YOBM",
        title: "HTML Made Easy – Part 2 🚀 | VS Code & Browser Setup",
        description: "Set up your development environment with VS Code and configure your browser for web development.",
      },
      {
        id: "Q7L7Yo9MJpk",
        title: "HTML Made Easy – Part 3 🚀 | Tags, Elements & Basic Structure Explained",
        description: "Understand what HTML tags and elements are, and how they form the basic structure of a web page.",
      },
      {
        id: "YDq8Sp6B9Pg",
        title: "HTML Made Easy – Part 4 🚀 | Boilerplate, Comments, Headings & Paragraphs",
        description: "Learn the HTML boilerplate structure, how to write comments, and use headings and paragraphs.",
      },
      {
        id: "ajWM_pDCcOs",
        title: "HTML Made Easy – Part 5 🚀 | Attributes, Formatting & Tags",
        description: "Dive into HTML attributes and text formatting tags to control how content looks and behaves.",
      },
      {
        id: "PzxpKF1aUxQ",
        title: "HTML Made Easy – Part 6 🚀 | Links, Images & Common Mistakes",
        description: "Add hyperlinks and images to your pages, and learn the most common beginner mistakes to avoid.",
      },
      {
        id: "l47CufZCHPU",
        title: "HTML Made Easy – Part 7 🚀 | Lists, Div & Website Structure",
        description: "Use ordered and unordered lists, div containers, and start thinking about page layout structure.",
      },
      {
        id: "bd3fYgngJI8",
        title: "HTML Made Easy – Part 8 🚀 | Tables, Semantic Tags & Website Structure",
        description: "Build data tables and use semantic HTML5 tags to give your pages meaningful structure.",
      },
      {
        id: "QeoxAMhcZTY",
        title: "HTML Made Easy – Part 9 🚀 | Forms, Input Types & User Interaction",
        description: "Create interactive forms with various input types to collect data from users.",
      },
      {
        id: "3ejZ4THnwB8",
        title: "HTML Made Easy – Part 10 🚀 | Real Projects, Revision & Practical Learning",
        description: "Apply everything you have learned by building real projects and revising key HTML concepts.",
      },
    ],
  },

  // ─── CSS Made Easy ───────────────────────────────────────────────────────
  {
    slug: "css-made-easy",
    title: "CSS Made Easy",
    tagline: "Style websites from scratch with confidence",
    description:
      "A beginner-friendly CSS series that takes you from zero to styling complete web pages. Learn selectors, the box model, colors, flexbox, grid, responsive design, and how to build real-world layouts — step by step.",
    playlistId: "PLaJsz10osD4YdfrOJNCLGCploY2aAQXf5",
    firstVideoId: "aWI2s3zxvGE",
    difficulty: "beginner",
    category: "CSS",
    icon: "Palette",
    color: "from-blue-500 to-indigo-500",
    videos: [
      {
        id: "aWI2s3zxvGE",
        title: "CSS Made Easy With AI 🤖 | Part 1 - What is CSS?",
        description: "Introduction to CSS — what it is, why it matters, and how it brings HTML pages to life with style.",
      },
      {
        id: "9JwFtjQxNlQ",
        title: "CSS Made Easy With AI 🤖 | Part 2 - Getting Started & First Styling",
        description: "Set up your workflow and write your first CSS rules — linking stylesheets and seeing instant results.",
      },
      {
        id: "VZlW0drfvSw",
        title: "CSS Made Easy With AI 🤖 | Part 3 - Types & Selectors",
        description: "Learn the different ways to write CSS and how to target HTML elements precisely using selectors.",
      },
      {
        id: "FUD-ZJ9cK9c",
        title: "CSS Made Easy With AI 🤖 | Part 4 - Syntax, Comments & Colors Explained",
        description: "Master CSS syntax, write clean comments, and explore the full range of color formats — hex, RGB, and HSL.",
      },
      {
        id: "90WPgZV_8Qw",
        title: "CSS Made Easy With AI 🤖 | Part 5 – Text Styling & Box Model 📦",
        description: "Style text with fonts, size, spacing, and weight — then understand the box model to control every element's spacing.",
      },
      {
        id: "AXeK5KnFBos",
        title: "CSS Made Easy With AI 🤖 | Part 6 – Display, Block vs Inline & Flexbox",
        description: "Understand display types, the difference between block and inline elements, and how to build layouts with flexbox.",
      },
      {
        id: "Wi4wzCWp5qg",
        title: "CSS Made Easy With AI 🤖 | Part 7 - Position Property & Visual Design",
        description: "Learn CSS positioning — static, relative, absolute, fixed, and sticky — to place elements exactly where you want them.",
      },
      {
        id: "UaosyOomJVo",
        title: "CSS Made Easy With AI 🤖 | Part 8 - Responsive Design & Media Queries 📱",
        description: "Make your websites look great on phones, tablets, and desktops using media queries and mobile-first design.",
      },
      {
        id: "9Tr2uUjO-aI",
        title: "CSS Made Easy With AI 🤖 | Part 9 - CSS Grid",
        description: "Build powerful two-dimensional layouts with CSS Grid — rows, columns, template areas, and responsive grids.",
      },
      {
        id: "IeGbHJ0cRzs",
        title: "CSS Made Easy With AI 🤖 | Part 10 - CSS Animations & Effects",
        description: "Bring your pages to life with CSS transitions, keyframe animations, transforms, and visual effects.",
      },
    ],
  },
];
