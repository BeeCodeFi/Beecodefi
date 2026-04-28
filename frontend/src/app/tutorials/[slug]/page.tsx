"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, Copy, Check } from "lucide-react";
import { tutorials } from "@/data/tutorials";
import { cn } from "@/lib/utils";

function CodeBlock({ code, language, title }: { code: string; language: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            {title || language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors px-2 py-1 rounded"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="bg-gray-950 p-4 sm:p-6 overflow-x-auto">
        <pre className="text-sm text-gray-300 font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export default function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const tutorial = tutorials.find((t) => t.slug === slug);

  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tutorial not found</h1>
          <Link href="/tutorials" className="text-indigo-600 hover:underline">
            Back to Tutorials
          </Link>
        </div>
      </div>
    );
  }

  const lesson = tutorial.lessons[currentLessonIndex];
  const hasPrev = currentLessonIndex > 0;
  const hasNext = currentLessonIndex < tutorial.lessons.length - 1;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24">
              <Link
                href="/tutorials"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> All Tutorials
              </Link>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {tutorial.title}
              </h2>
              <nav className="space-y-1">
                {tutorial.lessons.map((l, i) => (
                  <button
                    key={l.slug}
                    onClick={() => setCurrentLessonIndex(i)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      i === currentLessonIndex
                        ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border-l-4 border-indigo-600"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{i + 1}.</span>
                      {l.title}
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <motion.main
            key={currentLessonIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 min-w-0"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <BookOpen className="w-4 h-4" />
              Lesson {currentLessonIndex + 1} of {tutorial.lessons.length}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              {lesson.title}
            </h1>

            {/* Lesson Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
              {lesson.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-2xl font-bold mt-10 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n").filter(Boolean);
                  return (
                    <ul key={i} className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                      {items.map((item, j) => (
                        <li key={j} dangerouslySetInnerHTML={{
                          __html: item.replace("- ", "").replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                        }} />
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4" dangerouslySetInnerHTML={{
                    __html: paragraph.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>')
                  }} />
                );
              })}
            </div>

            {/* Code Examples */}
            {lesson.codeExamples.map((example, i) => (
              <CodeBlock key={i} code={example.code} language={example.language} title={example.title} />
            ))}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setCurrentLessonIndex((prev) => prev - 1)}
                disabled={!hasPrev}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                  hasPrev
                    ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                onClick={() => setCurrentLessonIndex((prev) => prev + 1)}
                disabled={!hasNext}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                  hasNext
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                )}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}
