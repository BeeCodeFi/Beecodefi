"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileCode2, Palette, Braces, CheckCircle2, Clock, Zap } from "lucide-react";
import { tutorials as tutorialData } from "@/data/tutorials";

const meta = [
  {
    slug: "html",
    title: "HTML",
    subtitle: "Structure & Semantics",
    description: "The backbone of every webpage. Elements, forms, tables, semantic markup, and accessibility.",
    icon: FileCode2,
    gradient: "from-orange-500 to-red-500",
    glow: "group-hover:shadow-orange-100 dark:group-hover:shadow-orange-900/30",
    border: "border-gray-100 dark:border-gray-800/60",
    bg: "bg-white dark:bg-transparent",
    accent: "text-orange-600 dark:text-orange-400",
    checkColor: "text-orange-500 dark:text-orange-400",
    topics: ["Elements & Tags", "Semantic HTML5", "Forms & Inputs", "Tables", "Accessibility"],
  },
  {
    slug: "css",
    title: "CSS",
    subtitle: "Style & Layout",
    description: "Make things beautiful. Flexbox, Grid, animations, responsive design, and modern CSS features.",
    icon: Palette,
    gradient: "from-blue-500 to-indigo-500",
    glow: "group-hover:shadow-blue-100 dark:group-hover:shadow-blue-900/30",
    border: "border-gray-100 dark:border-gray-800/60",
    bg: "bg-white dark:bg-transparent",
    accent: "text-blue-600 dark:text-blue-400",
    checkColor: "text-blue-500 dark:text-blue-400",
    topics: ["Flexbox & Grid", "Transitions & Animations", "Responsive Design", "CSS Variables", "Modern CSS"],
  },
  {
    slug: "javascript",
    title: "JavaScript",
    subtitle: "Logic & Interactivity",
    description: "Bring pages to life. Functions, DOM, async/await, APIs, classes, and modern ES6+ features.",
    icon: Braces,
    gradient: "from-yellow-500 to-amber-500",
    glow: "group-hover:shadow-amber-100 dark:group-hover:shadow-amber-900/30",
    border: "border-gray-100 dark:border-gray-800/60",
    bg: "bg-white dark:bg-transparent",
    accent: "text-amber-600 dark:text-amber-400",
    checkColor: "text-amber-500 dark:text-amber-400",
    topics: ["Functions & Scope", "DOM Manipulation", "Async / Await", "APIs & Fetch", "ES6+ Modern Features"],
  },
];

export default function TutorialPreview() {
  return (
    <section className="py-28 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            Structured Learning
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 tracking-tight">
            Three tracks.{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
              One goal.
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            HTML → CSS → JavaScript. Each track builds on the last — live editors, exercises, and quizzes included.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {meta.map((m, i) => {
            const lessons = tutorialData.find((t) => t.slug === m.slug)?.lessons.length ?? 0;
            const hours = Math.ceil((lessons * 20) / 60);
            return (
              <motion.div
                key={m.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.21, 1.02, 0.73, 1] }}
              >
                <Link href={`/tutorials/${m.slug}`} className="group block h-full">
                  <motion.div
                    whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                    whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
                    className={`relative h-full rounded-2xl border ${m.border} ${m.bg} p-7 overflow-hidden transition-shadow duration-300 ${m.glow} hover:shadow-xl bg-white dark:bg-transparent`}
                    data-cursor-grow
                  >
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-6 shadow-md`}
                    >
                      <m.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-0.5">{m.title}</h3>
                    <p className={`text-sm font-semibold ${m.accent} mb-3`}>{m.subtitle}</p>
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed mb-6">{m.description}</p>

                    <ul className="space-y-2 mb-7">
                      {m.topics.map((t) => (
                        <li key={t} className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${m.checkColor} shrink-0`} />
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" />{lessons} lessons</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />~{hours}h</span>
                      </div>
                      <span className={`flex items-center gap-1 text-sm font-semibold ${m.accent} group-hover:gap-2 transition-all`}>
                        Start <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>

                    {/* Bottom bar */}
                    <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${m.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-center mt-12">
          <Link href="/tutorials" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-200 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-500 px-6 py-3 rounded-xl">
            Browse all tutorials <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
