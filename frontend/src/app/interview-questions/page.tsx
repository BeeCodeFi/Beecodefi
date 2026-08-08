"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FileCode2, 
  Palette, 
  Braces,
  ChevronDown,
  ChevronUp,
  Search,
  Filter
} from "lucide-react";

const categories = [
  {
    id: "html",
    name: "HTML",
    icon: FileCode2,
    color: "from-orange-500 to-red-500",
    description: "HTML structure, semantics, and best practices",
    href: "/interview-questions/html"
  },
  {
    id: "css",
    name: "CSS",
    icon: Palette,
    color: "from-blue-500 to-indigo-500",
    description: "Styling, layouts, animations, and responsive design",
    href: "/interview-questions/css",
    comingSoon: true
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: Braces,
    color: "from-yellow-500 to-amber-500",
    description: "Core concepts, async, DOM manipulation, and ES6+",
    href: "/interview-questions/javascript",
    comingSoon: true
  }
];

export default function InterviewQuestionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-transparent dark:from-gray-900 dark:via-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              Interview Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Ace your next technical interview with our curated collection of real-world questions and detailed answers
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {category.comingSoon ? (
                  <div className="relative group block p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all cursor-not-allowed opacity-60">
                    <div className="absolute top-4 right-4 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-medium">
                      Coming Soon
                    </div>
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${category.color} mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {category.description}
                    </p>
                  </div>
                ) : (
                  <Link
                    href={category.href}
                    className="relative group block p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${category.color} mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {category.description}
                    </p>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
