"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  FileCode2,
  Palette,
  Braces,
  BookOpen,
  Brain,
  ArrowRight,
} from "lucide-react";
import { tutorials } from "@/data/tutorials";

interface SearchResult {
  type: "lesson" | "quiz";
  title: string;
  subtitle: string;
  href: string;
  category: string;
  icon: React.ElementType;
  iconColor: string;
}

const categoryIcon: Record<string, React.ElementType> = {
  html: FileCode2,
  css: Palette,
  javascript: Braces,
};
const categoryColor: Record<string, string> = {
  html: "text-orange-500",
  css: "text-blue-500",
  javascript: "text-yellow-500",
};

// Build search index from all tutorials
const buildIndex = (): SearchResult[] => {
  const results: SearchResult[] = [];
  for (const track of tutorials) {
    for (const lesson of track.lessons) {
      results.push({
        type: "lesson",
        title: lesson.title,
        subtitle: `${track.title} · ${lesson.difficulty ?? "beginner"}`,
        href: `/tutorials/${track.slug}?lesson=${lesson.slug}`,
        category: track.slug,
        icon: categoryIcon[track.slug] ?? BookOpen,
        iconColor: categoryColor[track.slug] ?? "text-indigo-500",
      });
    }
    // Add quiz entry per track
    results.push({
      type: "quiz",
      title: `${track.title} Quiz`,
      subtitle: `Test your ${track.title} knowledge`,
      href: `/quiz?category=${track.slug}`,
      category: track.slug,
      icon: Brain,
      iconColor: "text-purple-500",
    });
  }
  return results;
};

const INDEX = buildIndex();

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (!open) return;

    const resetSearch = () => {
      setQuery("");
      setResults([]);
      setSelected(0);
    };

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 50);
    resetSearch();

    return () => window.clearTimeout(focusTimer);
  }, [open]);

  // Search
  useEffect(() => {
    if (!query.trim()) {
      queueMicrotask(() => setResults([]));
      return;
    }

    const q = query.toLowerCase();
    const filtered = INDEX.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q),
    ).slice(0, 8);
    queueMicrotask(() => {
      setResults(filtered);
      setSelected(0);
    });
  }, [query]);

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
    },
    [router, onClose],
  );

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && results[selected])
        navigate(results[selected].href);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, results, selected, navigate, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Search lessons and quizzes"
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.18, ease: [0.21, 1.02, 0.73, 1] }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 dark:border-gray-800">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search lessons, topics, quizzes…"
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <ul className="max-h-80 overflow-y-auto scrollbar-thin py-2">
                  {results.map((r, i) => (
                    <li key={r.href + r.title}>
                      <button
                        onClick={() => navigate(r.href)}
                        onMouseEnter={() => setSelected(i)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          selected === i
                            ? "bg-indigo-50 dark:bg-indigo-950/40"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            selected === i
                              ? "bg-indigo-100 dark:bg-indigo-900/50"
                              : "bg-gray-100 dark:bg-gray-800"
                          }`}
                        >
                          <r.icon className={`w-4 h-4 ${r.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {r.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {r.subtitle}
                          </p>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            selected === i
                              ? "text-indigo-500"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Empty state */}
              {query && results.length === 0 && (
                <div className="py-12 text-center text-gray-400">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">
                    No results for{" "}
                    <strong className="text-gray-600 dark:text-gray-300">
                      &quot;{query}&quot;
                    </strong>
                  </p>
                </div>
              )}

              {/* Hint */}
              {!query && (
                <div className="px-4 py-3 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px]">
                      ↑↓
                    </kbd>{" "}
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px]">
                      ↵
                    </kbd>{" "}
                    Open
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px]">
                      ESC
                    </kbd>{" "}
                    Close
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
