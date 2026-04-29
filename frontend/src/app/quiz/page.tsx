"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  FileCode2,
  Palette,
  Braces,
  ArrowRight,
  Trophy,
  BookOpen,
  ChevronRight,
  Layers,
  GraduationCap,
} from "lucide-react";
import api from "@/lib/api";
import { QuizTopic } from "@/types";
import { quizCategories, type QuizCategoryMeta } from "@/data/quiz-categories";
import { cn } from "@/lib/utils";

const topicIcons: Record<string, React.ElementType> = {
  HTML: FileCode2,
  CSS: Palette,
  JavaScript: Braces,
};

const difficultyColor: Record<string, string> = {
  Beginner: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
  Intermediate: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800",
  Advanced: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800",
};

export default function QuizPage() {
  const [topics, setTopics] = useState<QuizTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const { data } = await api.get<QuizTopic[]>("/quiz/topics");
        setTopics(data);
      } catch {
        setTopics([
          { id: 1, title: "HTML Fundamentals", topic: "HTML", description: "Test your knowledge of HTML elements, attributes, forms, tables, and semantic markup.", difficulty: "Beginner", questionCount: 30, bestScore: null },
          { id: 2, title: "CSS Mastery", topic: "CSS", description: "Challenge yourself on selectors, flexbox, grid, responsive design, and CSS specificity.", difficulty: "Intermediate", questionCount: 30, bestScore: null },
          { id: 3, title: "JavaScript Essentials", topic: "JavaScript", description: "Put your JS skills to the test with closures, async/await, DOM, and ES6+.", difficulty: "Intermediate", questionCount: 30, bestScore: null },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  // Group topics by category in order
  const categorized = quizCategories
    .sort((a, b) => a.order - b.order)
    .map((cat) => ({
      ...cat,
      quizzes: topics.filter((t) =>
        cat.topics.some((ct) => ct.toLowerCase() === t.topic.toLowerCase())
      ),
    }));

  const filteredCategories =
    activeCategory === "all"
      ? categorized
      : categorized.filter((c) => c.id === activeCategory);

  const totalQuizzes = topics.length;
  const totalQuestions = topics.reduce((s, t) => s + t.questionCount, 0);
  const completedQuizzes = topics.filter((t) => t.bestScore !== null).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 pt-20 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6"
          >
            <Brain className="w-4 h-4" />
            Test Your Knowledge
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Quiz <span className="text-gradient">Categories</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Follow the learning path from HTML to JavaScript. Take quizzes after
            each tutorial section to reinforce your skills.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-8 sm:gap-12 text-sm"
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalQuizzes}</p>
              <p className="text-gray-500">Quizzes</p>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalQuestions}</p>
              <p className="text-gray-500">Questions</p>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedQuizzes}/{totalQuizzes}</p>
              <p className="text-gray-500">Completed</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs + Content */}
      <section className="py-16 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-medium transition-all border",
                activeCategory === "all"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"
              )}
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4" /> All Categories
              </span>
            </button>
            {quizCategories
              .sort((a, b) => a.order - b.order)
              .map((cat) => {
                const Icon = topicIcons[cat.topics[0]] || Brain;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-5 py-2.5 rounded-xl text-sm font-medium transition-all border",
                      activeCategory === cat.id
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25"
                        : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" /> {cat.title}
                    </span>
                  </button>
                );
              })}
          </motion.div>

          {loading ? (
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
                  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                    <div className="flex gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-gray-800" />
                      <div className="flex-1 space-y-3">
                        <div className="h-5 w-60 bg-gray-200 dark:bg-gray-800 rounded" />
                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {filteredCategories.map((category, catIndex) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  quizzes={category.quizzes}
                  catIndex={catIndex}
                />
              ))}
            </div>
          )}

          {/* Learning Path CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900 rounded-2xl p-8 sm:p-12">
              <GraduationCap className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Learn Before You Quiz
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
                Each quiz is designed to complement our tutorials. Study the material first,
                then test your knowledge to see how well you&apos;ve learned.
              </p>
              <Link
                href="/tutorials"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/25"
              >
                <BookOpen className="w-4 h-4" /> Browse Tutorials
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ─── Category Section Component ─── */

function CategorySection({
  category,
  quizzes,
  catIndex,
}: {
  category: QuizCategoryMeta & { quizzes: QuizTopic[] };
  quizzes: QuizTopic[];
  catIndex: number;
}) {
  const Icon = topicIcons[category.topics[0]] || Brain;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: catIndex * 0.1 }}
    >
      {/* Category header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold text-sm">
          {category.order}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            {category.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {category.description}
          </p>
        </div>
      </div>

      {/* Timeline connector */}
      <div className="ml-5 border-l-2 border-gray-200 dark:border-gray-800 pl-9 space-y-4 pb-2">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} category={category} />
          ))
        ) : (
          <div className="bg-gray-50 dark:bg-gray-900/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            No quizzes available for this category yet. Check back soon!
          </div>
        )}

        {/* Study link */}
        <Link
          href={`/tutorials/${category.tutorialSlug}`}
          className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium ml-1 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Study {category.title} tutorials first
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Quiz Card Component ─── */

function QuizCard({
  quiz,
  category,
}: {
  quiz: QuizTopic;
  category: QuizCategoryMeta;
}) {
  const Icon = topicIcons[quiz.topic] || Brain;
  const completed = quiz.bestScore !== null;
  const percentage = completed && quiz.questionCount > 0
    ? Math.round((quiz.bestScore! / quiz.questionCount) * 100)
    : 0;

  return (
    <Link
      href={`/quiz/${quiz.topic.toLowerCase()}`}
      className={cn(
        "group block bg-white dark:bg-gray-900 rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        completed
          ? "border-emerald-200 dark:border-emerald-900/60"
          : "border-gray-200 dark:border-gray-800"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {quiz.title}
            </h3>
            <span
              className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                difficultyColor[quiz.difficulty] || "text-gray-500 bg-gray-50 border-gray-200"
              )}
            >
              {quiz.difficulty}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {quiz.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span>{quiz.questionCount} Questions</span>
            <span>~{Math.ceil(quiz.questionCount * 1.5)} min</span>
          </div>
        </div>

        {/* Score / CTA */}
        <div className="flex items-center gap-4 shrink-0">
          {completed ? (
            <div className="text-center">
              <div
                className={cn(
                  "text-2xl font-bold",
                  percentage >= 80
                    ? "text-emerald-500"
                    : percentage >= 60
                      ? "text-amber-500"
                      : "text-red-500"
                )}
              >
                {percentage}%
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Trophy className="w-3 h-3 text-amber-500" />
                Best: {quiz.bestScore}/{quiz.questionCount}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm group-hover:gap-3 transition-all">
              Start Quiz <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
