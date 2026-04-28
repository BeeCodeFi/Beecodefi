"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileCode2, Palette, Braces } from "lucide-react";

const tutorials = [
  {
    slug: "html",
    title: "HTML",
    subtitle: "Structure & Semantics",
    description: "Learn the building blocks of the web. Master HTML elements, forms, tables, and semantic markup.",
    icon: FileCode2,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    lessons: 10,
  },
  {
    slug: "css",
    title: "CSS",
    subtitle: "Style & Layout",
    description: "Style your websites with CSS. Master flexbox, grid, animations, and responsive design.",
    icon: Palette,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    lessons: 10,
  },
  {
    slug: "javascript",
    title: "JavaScript",
    subtitle: "Logic & Interactivity",
    description: "Add interactivity to your sites. Learn variables, functions, DOM manipulation, and ES6+.",
    icon: Braces,
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    lessons: 10,
  },
];

export default function TutorialPreview() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Learn by <span className="text-gradient">Doing</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Dive into our structured tutorials with real code examples and hands-on exercises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link
                href={`/tutorials/${tutorial.slug}`}
                className={`group block p-8 rounded-2xl ${tutorial.bgColor} border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tutorial.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <tutorial.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {tutorial.title}
                </h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-500 mb-3">
                  {tutorial.subtitle}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {tutorial.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-500">{tutorial.lessons} Lessons</span>
                  <span className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all">
                    Start Learning <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
