"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, ArrowRight, FileCode2, Palette, Braces } from "lucide-react";
import { type QuizCategoryMeta } from "@/data/quiz-categories";

const topicIcons: Record<string, React.ElementType> = {
  HTML: FileCode2,
  CSS: Palette,
  JavaScript: Braces,
};

export default function QuizCTA({ category }: { category: QuizCategoryMeta }) {
  const Icon = topicIcons[category.categoryName] || Brain;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 mb-4"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br ${category.gradientBg} p-6 sm:p-8`}
      >
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shrink-0`}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Ready to test your {category.title} knowledge?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Take the quiz to see how well you&apos;ve understood the concepts from this section.
            </p>
          </div>

          <Link
            href={`/quiz?category=${category.id}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/25 shrink-0"
          >
            <Brain className="w-4 h-4" />
            Take Quiz
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
