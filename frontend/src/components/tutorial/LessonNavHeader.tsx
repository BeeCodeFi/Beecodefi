"use client";

import { ChevronLeft, ChevronRight, Menu, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

interface LessonNavHeaderProps {
  lessonTitle: string;
  lessonIndex: number;
  totalLessons: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onMenuToggle: () => void;
  scrollProgress?: number; // 0–100
}

export default function LessonNavHeader({
  lessonTitle,
  lessonIndex,
  totalLessons,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onMenuToggle,
  scrollProgress = 0,
}: LessonNavHeaderProps) {
  const { success } = useToast();

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      success("Link Copied!", "The lesson URL has been copied to your clipboard.");
    }
  };

  return (
    <div className="sticky top-[64px] z-20 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-2.5 relative overflow-hidden">
      {/* Reading progress bar — lives here to avoid z-index stacking issues */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-200/60 dark:bg-gray-700/40">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-[width] duration-150 ease-linear"
          style={{
            width: `${scrollProgress}%`,
            boxShadow: scrollProgress > 0 ? "0 0 8px 1px rgba(139,92,246,0.7)" : "none",
          }}
        />
      </div>
      <div className="max-w-[1400px] mx-auto flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
          aria-label="Toggle lesson menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Prev */}
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className={cn(
            "p-1.5 rounded-lg transition-colors",
            hasPrev
              ? "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              : "text-gray-300 dark:text-gray-700 cursor-not-allowed"
          )}
          aria-label="Previous lesson"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Title + counter */}
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 shrink-0">
            {lessonIndex + 1}/{totalLessons}
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {lessonTitle}
          </span>
        </div>

        {/* Share */}
        <button
          onClick={handleShare}
          className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Share Lesson"
          aria-label="Share Lesson"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          disabled={!hasNext && lessonIndex < totalLessons - 1}
          className={cn(
            "p-1.5 rounded-lg transition-colors",
            hasNext
              ? "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              : lessonIndex === totalLessons - 1
              ? "text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
              : "text-gray-300 dark:text-gray-700 cursor-not-allowed"
          )}
          aria-label={hasNext ? "Next lesson" : "Complete course"}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
