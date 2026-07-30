"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bookmark, BookmarkX, ArrowRight, BookOpen } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark, clearBookmarks } = useBookmarks();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
              <Bookmark className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              Saved Lessons
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              {bookmarks.length} lesson{bookmarks.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          {bookmarks.length > 0 && (
            <button onClick={clearBookmarks}
              className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors flex items-center gap-1.5">
              <BookmarkX className="w-4 h-4" /> Clear all
            </button>
          )}
        </motion.div>

        {bookmarks.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-24">
            <Bookmark className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">No bookmarks yet</h2>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">
              Press <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">B</kbd> on any lesson to save it here.
            </p>
            <Link href="/tutorials"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
              <BookOpen className="w-4 h-4" /> Browse Tutorials
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((bm, i) => (
              <motion.div key={`${bm.tutorialSlug}-${bm.lessonSlug}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{bm.lessonTitle}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{bm.trackTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/tutorials/${bm.tutorialSlug}`}
                    className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                    Open <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => toggleBookmark(bm)}
                    className="p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                    title="Remove bookmark"
                  >
                    <BookmarkX className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
