"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  PlayCircle,
  Signal,
  ChevronRight,
  FileCode2,
  Palette,
  Braces,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { courses } from "@/data/courses";
import { cn } from "@/lib/utils";
import type { CompletedCourse } from "@/types";

const STORAGE_KEY = "beeCodeFi_completedCourses";

function getCompletedCourses(): CompletedCourse[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

const iconMap: Record<string, React.ElementType> = {
  FileCode2,
  Palette,
  Braces,
};

const difficultyConfig: Record<string, { label: string; color: string }> = {
  beginner: { label: "Beginner", color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30" },
  intermediate: { label: "Intermediate", color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30" },
  advanced: { label: "Advanced", color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30" },
};

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const course = courses.find((c) => c.slug === slug);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!course) return;
    const completed = getCompletedCourses();
    setIsCompleted(completed.some((c) => c.slug === course.slug));
  }, [course]);

  const handleMarkComplete = () => {
    if (!course) return;
    const completed = getCompletedCourses();
    if (completed.some((c) => c.slug === course.slug)) return;
    const updated: CompletedCourse[] = [
      ...completed,
      {
        slug: course.slug,
        title: course.title,
        category: course.category,
        difficulty: course.difficulty,
        completedAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setIsCompleted(true);
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link href="/courses" className="text-indigo-600 hover:underline">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[course.icon] || FileCode2;
  const diff = difficultyConfig[course.difficulty];
  const currentVideoId = activeVideoId ?? course.firstVideoId;

  // YouTube embed URL — when a specific video is selected play it, otherwise show playlist from beginning
  const embedSrc = activeVideoId
    ? `https://www.youtube.com/embed/${activeVideoId}?list=${course.playlistId}&autoplay=1&rel=0`
    : `https://www.youtube.com/embed/${course.firstVideoId}?list=${course.playlistId}&rel=0`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Video Player + Info */}
          <div className="lg:col-span-2 space-y-6">

            {/* Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video"
            >
              <iframe
                key={currentVideoId}
                src={embedSrc}
                title={course.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>

            {/* Course info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${course.color} text-white`}>
                  <Icon className="w-3.5 h-3.5" />
                  {course.category}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${diff.color}`}>
                  {diff.label}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 ml-auto">
                  <PlayCircle className="w-3.5 h-3.5" />
                  {course.videos.length} {course.videos.length === 1 ? "video" : "videos"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {course.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {course.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={`https://www.youtube.com/playlist?list=${course.playlistId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <PlayCircle className="w-4 h-4" />
                  Open Full Playlist
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.youtube.com/@BeeCodeFi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Signal className="w-4 h-4" />
                  Subscribe to Channel
                </a>
                <button
                  onClick={handleMarkComplete}
                  disabled={isCompleted}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    isCompleted
                      ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 cursor-default"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  )}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isCompleted ? "Course Completed!" : "Mark as Complete"}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right: Video list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden h-fit"
          >
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-white">Course Videos</h2>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {course.videos.length} {course.videos.length === 1 ? "lesson" : "lessons"}
              </span>
            </div>

            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {course.videos.map((video, i) => {
                const isActive = currentVideoId === video.id;
                return (
                  <li key={video.id}>
                    <button
                      onClick={() => setActiveVideoId(video.id)}
                      className={cn(
                        "w-full flex items-start gap-3 px-5 py-4 text-left transition-colors",
                        isActive
                          ? "bg-orange-50 dark:bg-orange-950/30"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      )}
                    >
                      {/* Thumbnail */}
                      <div className="relative shrink-0 w-20 rounded-lg overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800">
                        <img
                          src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-orange-600/60 flex items-center justify-center">
                            <PlayCircle className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-gray-400 dark:text-gray-500 mb-0.5 block">
                          Part {i + 1}
                        </span>
                        <p className={cn(
                          "text-sm font-medium leading-snug line-clamp-2",
                          isActive
                            ? "text-orange-600 dark:text-orange-400"
                            : "text-gray-800 dark:text-gray-200"
                        )}>
                          {video.title}
                        </p>
                      </div>

                      <ChevronRight className={cn(
                        "w-4 h-4 shrink-0 mt-1 transition-colors",
                        isActive ? "text-orange-500" : "text-gray-300 dark:text-gray-600"
                      )} />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* More coming soon */}
            <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                More videos being added •{" "}
                <a
                  href={`https://www.youtube.com/playlist?list=${course.playlistId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:underline"
                >
                  Watch on YouTube
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
