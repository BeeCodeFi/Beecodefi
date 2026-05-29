"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileCode2,
  Palette,
  Braces,
  PlayCircle,
  Youtube,
  BookOpen,
  Signal,
  Sparkles,
} from "lucide-react";
import { courses } from "@/data/courses";

const iconMap: Record<string, React.ElementType> = {
  FileCode2,
  Palette,
  Braces,
};

const difficultyConfig: Record<string, { label: string; color: string }> = {
  beginner: { label: "Beginner", color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30" },
  intermediate: { label: "Intermediate", color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30" },
  advanced: { label: "Advanced", color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30" },
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <section className="relative bg-gradient-to-b from-orange-50/80 to-white dark:from-gray-900 dark:to-gray-950 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 border border-red-200/50 dark:border-red-700/30 text-red-700 dark:text-red-300 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <Youtube className="w-4 h-4" />
            Video Courses on YouTube
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold mb-5 tracking-tight"
          >
            Learn by{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Watching
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Step-by-step video courses created by BeeCodeFi. Watch directly on the site or on YouTube — completely free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10"
          >
            {[
              { icon: BookOpen, value: courses.length, label: "Courses" },
              {
                icon: PlayCircle,
                value: courses.reduce((s, c) => s + c.videos.length, 0),
                label: "Videos",
              },
              { icon: Signal, value: "Free", label: "Forever" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
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

      {/* Course Cards */}
      <section className="relative py-16 -mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const Icon = iconMap[course.icon] || FileCode2;
              const diff = difficultyConfig[course.difficulty];
              const thumb = `https://i.ytimg.com/vi/${course.firstVideoId}/hqdefault.jpg`;

              return (
                <motion.div
                  key={course.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Link
                    href={`/courses/${course.slug}`}
                    className="group block rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-700 shadow-sm hover:shadow-lg transition-all duration-300 h-full"
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800">
                      <img
                        src={thumb}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${course.firstVideoId}/mqdefault.jpg`;
                        }}
                      />
                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                          <PlayCircle className="w-9 h-9 text-red-600" />
                        </div>
                      </div>
                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${course.color} text-white shadow`}>
                          <Icon className="w-3 h-3" />
                          {course.category}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${diff.color}`}>
                          {diff.label}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <PlayCircle className="w-3.5 h-3.5" />
                          {course.videos.length} {course.videos.length === 1 ? "video" : "videos"}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                        {course.tagline}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-orange-600 dark:text-orange-400 group-hover:gap-3 transition-all">
                        <PlayCircle className="w-4 h-4" />
                        Watch Course
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* YouTube channel CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-500 dark:text-gray-400 mb-4">More courses coming soon. Subscribe to stay updated.</p>
            <a
              href="https://www.youtube.com/@BeeCodeFi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg"
            >
              <Youtube className="w-5 h-5" />
              Subscribe on YouTube
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
