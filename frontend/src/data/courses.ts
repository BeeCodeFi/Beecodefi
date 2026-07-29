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
];
