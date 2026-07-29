"use client";

import Link from "next/link";
import { ChevronLeft, CheckCircle2, Circle, Zap, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressBar from "./ProgressBar";
import { getQuizCategoryForTutorial } from "@/data/quiz-categories";
import type { TutorialCategory } from "@/types";

interface TutorialSidebarProps {
  tutorial: TutorialCategory;
  slug: string;
  currentLessonIndex: number;
  completedLessons: Set<number>;
  onSelectLesson: (index: number) => void;
  isOpen: boolean;
}

export default function TutorialSidebar({
  tutorial,
  slug,
  currentLessonIndex,
  completedLessons,
  onSelectLesson,
  isOpen,
}: TutorialSidebarProps) {
  const quizCat = getQuizCategoryForTutorial(slug);

  return (
    <aside
      className={cn(
        // Mobile: slide in/out from left as overlay
        "fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-gray-950",
        "border-r border-gray-200 dark:border-gray-800",
        "transition-transform duration-300 ease-in-out",
        "lg:translate-x-0 lg:static lg:z-auto lg:block",
        "lg:w-72 lg:shrink-0 lg:border-r-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        // On desktop: sticky inside the flex row so it stays while main scrolls
        "lg:sticky lg:top-[72px] lg:h-[calc(100vh-72px)]",
      )}
    >
      {/* Scrollable inner — full height minus the fixed top offset */}
      <div className="flex flex-col h-full overflow-y-auto scrollbar-thin px-5 pt-6 pb-8">
        {/* Back link */}
        <Link
          href="/tutorials"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors w-fit"
        >
          <ChevronLeft className="w-4 h-4" />
          All Tutorials
        </Link>

        {/* Course title + stats */}
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-1">
            {tutorial.title}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {tutorial.lessons.length} lessons ·{" "}
            {tutorial.lessons.reduce((s, l) => s + (l.estimatedMinutes || 0), 0)} min
          </p>
        </div>

        {/* Progress bar */}
        <ProgressBar
          current={completedLessons.size}
          total={tutorial.lessons.length}
          label="Your Progress"
        />

        {/* Lesson list */}
        <nav className="mt-5 space-y-0.5 flex-1">
          {tutorial.lessons.map((l, i) => {
            const isCompleted = completedLessons.has(i);
            const isCurrent = i === currentLessonIndex;
            return (
              <button
                key={l.slug}
                onClick={() => onSelectLesson(i)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  "flex items-center gap-2.5",
                  isCurrent
                    ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : isCurrent ? (
                  <Zap className="w-4 h-4 text-indigo-500 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0" />
                )}
                <span className="flex-1 truncate">{l.title}</span>
                {l.estimatedMinutes && (
                  <span className="text-[10px] text-gray-400 shrink-0">
                    {l.estimatedMinutes}m
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quiz link */}
        {quizCat && (
          <Link
            href={`/quiz?category=${quizCat.id}`}
            className={cn(
              "flex items-center gap-2.5 mt-4 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30",
              "text-purple-700 dark:text-purple-300",
              "hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-950/50 dark:hover:to-indigo-950/50",
              "border border-purple-200 dark:border-purple-800/50"
            )}
          >
            <Brain className="w-4 h-4 shrink-0" />
            <span className="truncate">Take the Quiz</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
