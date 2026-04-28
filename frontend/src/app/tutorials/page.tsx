"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileCode2, Palette, Braces, ArrowRight, BookOpen } from "lucide-react";
import { tutorials } from "@/data/tutorials";

const iconMap: Record<string, React.ElementType> = {
  FileCode2,
  Palette,
  Braces,
};

export default function TutorialsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6"
          >
            <BookOpen className="w-4 h-4" />
            Free Tutorials
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Learn Web <span className="text-gradient">Development</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Choose a topic and start learning with our structured, hands-on tutorials.
          </motion.p>
        </div>
      </section>

      {/* Tutorial Cards */}
      <section className="py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => {
              const Icon = iconMap[tutorial.icon] || FileCode2;
              return (
                <motion.div
                  key={tutorial.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Link
                    href={`/tutorials/${tutorial.slug}`}
                    className="group block bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tutorial.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {tutorial.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {tutorial.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {tutorial.lessons.map((lesson) => (
                        <div
                          key={lesson.slug}
                          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          {lesson.title}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium group-hover:gap-3 transition-all">
                      Start Learning <ArrowRight className="w-4 h-4" />
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
