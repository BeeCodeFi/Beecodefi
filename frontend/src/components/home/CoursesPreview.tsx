"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, PlayCircle, ArrowRight } from "lucide-react";
import { courses } from "@/data/courses";

export default function CoursesPreview() {
  return (
    <section className="py-28 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-red-500/5 dark:bg-red-500/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Video Courses
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Watch &{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
                Learn
              </span>
            </h2>
            <p className="text-gray-600 dark:text-slate-400 mt-3 max-w-lg">
              Full series on YouTube — watch right here on the site or open the playlist. All free, all yours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a
              href="https://www.youtube.com/@BeeCodeFi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-red-500/20"
            >
              <Play className="w-4 h-4" />
              Subscribe on YouTube
            </a>
          </motion.div>
        </div>

        {/* Course cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, i) => {
            const thumb = `https://i.ytimg.com/vi/${course.firstVideoId}/maxresdefault.jpg`;
            return (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <Link href={`/courses/${course.slug}`} className="group block">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-slate-800">
                      <img
                        src={thumb}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://i.ytimg.com/vi/${course.firstVideoId}/hqdefault.jpg`;
                        }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <PlayCircle className="w-9 h-9 text-red-600" />
                        </motion.div>
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${course.color} text-white shadow`}>
                          <Play className="w-2.5 h-2.5" />
                          {course.category}
                        </span>
                      </div>

                      {/* Video count */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 rounded-lg text-xs text-white font-medium backdrop-blur-sm">
                        {course.videos.length} videos
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-300 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-slate-400 mb-4 leading-relaxed">{course.tagline}</p>

                      {/* Video strip preview */}
                      <div className="flex gap-2 overflow-hidden mb-4">
                        {course.videos.slice(0, 5).map((v) => (
                          <div
                            key={v.id}
                            className="w-12 h-8 rounded overflow-hidden bg-slate-800 shrink-0 ring-1 ring-slate-700"
                          >
                            <img
                              src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`}
                              alt={v.title}
                              className="w-full h-full object-cover opacity-80"
                            />
                          </div>
                        ))}
                        {course.videos.length > 5 && (
                          <div className="w-12 h-8 rounded bg-slate-800 flex items-center justify-center text-xs text-slate-400 font-bold ring-1 ring-slate-700 shrink-0">
                            +{course.videos.length - 5}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 capitalize">{course.difficulty}</span>
                        <span className="flex items-center gap-1 text-sm font-semibold text-orange-400 group-hover:gap-2 transition-all">
                          Watch now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-xl"
          >
            View all courses <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
