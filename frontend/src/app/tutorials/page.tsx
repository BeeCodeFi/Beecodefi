"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileCode2,
  Palette,
  Braces,
  ArrowRight,
  BookOpen,
  Clock,
  Layers,
  Signal,
  Sparkles,
  Brain,
} from "lucide-react";
import { tutorials } from "@/data/tutorials";
import { getQuizCategoryForTutorial } from "@/data/quiz-categories";

const iconMap: Record<string, React.ElementType> = {
  FileCode2,
  Palette,
  Braces,
};

const difficultyColors: Record<string, string> = {
  beginner: "text-green-600 dark:text-green-400",
  intermediate: "text-amber-600 dark:text-amber-400",
  advanced: "text-red-600 dark:text-red-400",
};

export default function TutorialsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <section className="relative bg-gradient-to-b from-indigo-50/80 to-white dark:from-gray-900 dark:to-gray-950 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6 border border-indigo-200/50 dark:border-indigo-700/30"
          >
            <Sparkles className="w-4 h-4" />
            Structured Learning Paths
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold mb-5 tracking-tight"
          >
            Master Web{" "}
            <span className="text-gradient">Development</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Learn step-by-step with interactive code editors, live previews, exercises, and MDN-referenced content.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10"
          >
            {[
              {
                icon: Layers,
                value: tutorials.reduce((sum, t) => sum + t.lessons.length, 0),
                label: "Lessons",
              },
              { icon: BookOpen, value: tutorials.length, label: "Courses" },
              { icon: Clock, value: "Free", label: "Forever" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tutorial Cards */}
      <section className="relative py-16 -mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => {
              const Icon = iconMap[tutorial.icon] || FileCode2;
              const totalMinutes = tutorial.lessons.reduce((sum, l) => sum + (l.estimatedMinutes || 0), 0);
              const difficulties = [...new Set(tutorial.lessons.map((l) => l.difficulty).filter(Boolean))];

              return (
                <motion.div
                  key={tutorial.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Link
                    href={`/tutorials/${tutorial.slug}`}
                    className="group relative block rounded-2xl p-[1px] h-full glow-card"
                  >
                    {/* Gradient border */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tutorial.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tutorial.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

                    <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-7 sm:p-8 h-full flex flex-col">
                      {/* Icon & Badge Row */}
                      <div className="flex items-start justify-between mb-5">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tutorial.color} flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                            {tutorial.lessons.length} lessons
                          </span>
                          {totalMinutes > 0 && (
                            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                              <Clock className="w-3 h-3" />
                              {totalMinutes} min
                            </span>
                          )}
                        </div>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {tutorial.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed flex-grow">
                        {tutorial.description}
                      </p>

                      {/* Difficulty pills */}
                      {difficulties.length > 0 && (
                        <div className="flex items-center gap-2 mb-5">
                          <Signal className="w-3.5 h-3.5 text-gray-400" />
                          {difficulties.map((d) => (
                            <span
                              key={d}
                              className={`text-[11px] font-semibold ${difficultyColors[d!]}`}
                            >
                              {d!.charAt(0).toUpperCase() + d!.slice(1)}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Lessons list */}
                      <div className="space-y-1.5 mb-6 max-h-48 overflow-y-auto scrollbar-thin">
                        {tutorial.lessons.map((lesson, i) => (
                          <div
                            key={lesson.slug}
                            className="flex items-center gap-2.5 text-sm text-gray-500 dark:text-gray-500 py-1"
                          >
                            <span className="w-5 h-5 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400 shrink-0">
                              {i + 1}
                            </span>
                            <span className="truncate">{lesson.title}</span>
                            {lesson.difficulty && (
                              <span className={`ml-auto text-[10px] font-semibold ${difficultyColors[lesson.difficulty]} shrink-0`}>
                                {lesson.difficulty.slice(0, 3).toUpperCase()}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className={`flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${tutorial.color} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                          Start Learning <ArrowRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                        {(() => {
                          const quizCat = getQuizCategoryForTutorial(tutorial.slug);
                          if (quizCat) {
                            return (
                              <Link
                                href={`/quiz/${quizCat.topics[0].toLowerCase()}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800/50 transition-colors"
                              >
                                <Brain className="w-3 h-3" />
                                Quiz
                              </Link>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
