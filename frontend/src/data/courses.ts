export interface CourseVideo {
  id: string; // YouTube video ID
  title: string;
  description?: string;
  duration?: string;
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
        duration: "",
      },
      // Add more videos here as the series grows:
      // { id: "VIDEO_ID", title: "Part 2 Title", description: "...", duration: "" },
    ],
  },
];
