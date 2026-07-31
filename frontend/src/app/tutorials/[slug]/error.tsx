"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, BookOpen } from "lucide-react";

export default function TutorialError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[TutorialError]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-500 dark:text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Failed to load lesson
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">
          We couldn&apos;t load this lesson. The tutorial might not exist or
          there was a loading error.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Try again
          </button>
          <Link
            href="/tutorials"
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl transition-colors"
          >
            <BookOpen className="w-4 h-4" /> All tutorials
          </Link>
        </div>
      </div>
    </div>
  );
}
