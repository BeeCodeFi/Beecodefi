"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileCode2, Palette, Braces, CheckCircle2, BookOpen,
  Brain, ArrowRight, Play, Rocket, Star, Lock
} from "lucide-react";
import { tutorials } from "@/data/tutorials";

const roadmap = [
  {
    step: 1,
    title: "HTML Fundamentals",
    subtitle: "Start here — no exceptions",
    description: "HTML is the skeleton of every web page. Before you can style anything or make it interactive, you need to understand how to structure content. This is where every developer begins.",
    icon: FileCode2,
    gradient: "from-orange-500 to-red-500",
    border: "border-orange-200 dark:border-orange-900/40",
    bg: "bg-orange-50 dark:bg-orange-950/20",
    accent: "text-orange-600 dark:text-orange-400",
    tutorialSlug: "html",
    skills: ["Elements & Tags", "Semantic HTML5", "Forms & Inputs", "Tables", "Accessibility", "Document Structure"],
    timeEstimate: "1–2 weeks",
    status: "start",
  },
  {
    step: 2,
    title: "CSS Mastery",
    subtitle: "Make it beautiful",
    description: "Once your HTML structure is solid, CSS brings it to life. Learn how to style elements, control layouts with Flexbox and Grid, make pages responsive, and add animations.",
    icon: Palette,
    gradient: "from-blue-500 to-indigo-500",
    border: "border-blue-200 dark:border-blue-900/40",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    accent: "text-blue-600 dark:text-blue-400",
    tutorialSlug: "css",
    skills: ["Selectors & Specificity", "Box Model", "Flexbox & Grid", "Responsive Design", "Animations", "CSS Variables"],
    timeEstimate: "2–4 weeks",
    status: "after-html",
  },
  {
    step: 3,
    title: "JavaScript Essentials",
    subtitle: "Bring it to life",
    description: "JavaScript makes your pages interactive. Learn programming fundamentals, DOM manipulation, async operations, and modern ES6+ features that every web developer needs.",
    icon: Braces,
    gradient: "from-yellow-500 to-amber-500",
    border: "border-yellow-200 dark:border-yellow-900/40",
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
    accent: "text-amber-600 dark:text-amber-400",
    tutorialSlug: "javascript",
    skills: ["Variables & Functions", "DOM Manipulation", "Events", "Async / Await", "APIs & Fetch", "ES6+ Features"],
    timeEstimate: "4–6 weeks",
    status: "after-css",
  },
  {
    step: 4,
    title: "React & Next.js",
    subtitle: "Build real apps",
    description: "With the fundamentals solid, you're ready for React — the most popular frontend library. Then Next.js takes you to production-ready full-stack applications.",
    icon: Rocket,
    gradient: "from-cyan-500 to-blue-500",
    border: "border-cyan-200 dark:border-cyan-900/40",
    bg: "bg-cyan-50 dark:bg-cyan-950/20",
    accent: "text-cyan-600 dark:text-cyan-400",
    tutorialSlug: null,
    skills: ["Components & Props", "State & Hooks", "Routing", "API Routes", "Deployment", "Performance"],
    timeEstimate: "6–8 weeks",
    status: "coming-soon",
  },
];

const tips = [
  { icon: "🎯", text: "Don't skip steps. HTML → CSS → JS is the order for a reason." },
  { icon: "🔁", text: "Build something with each topic before moving on. Practice beats reading." },
  { icon: "🧪", text: "Take the quiz after each tutorial track to test your understanding." },
  { icon: "📅", text: "30 minutes a day beats 4-hour sessions once a week. Consistency wins." },
  { icon: "🐝", text: "All tutorials on BEECODEFI are free. No reason to wait — start now." },
];

export default function RoadmapPage() {
  const totalLessons = tutorials.reduce((s, t) => s + t.lessons.length, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-b from-indigo-50/80 to-white dark:from-gray-900 dark:to-gray-950 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" /> Learning Roadmap
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold mb-5 tracking-tight text-gray-900 dark:text-white">
            Your path to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              web developer
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            A clear, structured path from zero to job-ready. Follow the steps in order — each one builds on the last.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
            <BookOpen className="w-4 h-4" />
            {totalLessons}+ free lessons available right now
          </motion.div>
        </div>
      </section>

      {/* Roadmap steps */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-orange-400 via-blue-400 via-yellow-400 to-cyan-400 opacity-20 hidden sm:block" />

          <div className="space-y-8">
            {roadmap.map((item, i) => (
              <motion.div key={item.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className={`relative rounded-2xl border ${item.border} ${item.bg} p-6 sm:p-8 overflow-hidden`}>
                  {/* Coming soon overlay */}
                  {item.status === "coming-soon" && (
                    <div className="absolute inset-0 bg-white/60 dark:bg-gray-950/60 backdrop-blur-[1px] rounded-2xl flex items-center justify-center z-10">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 shadow text-sm font-medium text-gray-600 dark:text-gray-400">
                        <Lock className="w-4 h-4" /> Coming Soon — Complete HTML, CSS & JS first
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-5">
                    {/* Step number + icon */}
                    <div className="shrink-0">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md`}>
                        <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-widest ${item.accent}`}>
                          Step {item.step}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-full">
                          ~{item.timeEstimate}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className={`text-sm font-semibold ${item.accent} mb-3`}>{item.subtitle}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                        {item.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {item.skills.map((skill) => (
                          <span key={skill} className="flex items-center gap-1 text-xs px-2.5 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
                            <CheckCircle2 className={`w-3 h-3 ${item.accent}`} />
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-3">
                        {item.tutorialSlug ? (
                          <Link href={`/tutorials/${item.tutorialSlug}`}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${item.gradient} text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5`}>
                            <BookOpen className="w-4 h-4" />
                            Start Tutorial
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : null}
                        {item.tutorialSlug ? (
                          <Link href={`/quiz?category=${item.tutorialSlug}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:border-gray-400 dark:hover:border-gray-500 transition-all">
                            <Brain className="w-4 h-4" />
                            Take Quiz
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Tips for success
            </h2>
            <p className="text-gray-500 dark:text-gray-400">From someone who's been through this path</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                <div className="text-2xl mb-3">{tip.icon}</div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{tip.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-4xl mb-4">🐝</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to start?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Step 1 is HTML — and your first lesson is waiting right now. Free, no signup required.
            </p>
            <Link href="/tutorials/html"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all">
              <FileCode2 className="w-5 h-5" />
              Start with HTML
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
