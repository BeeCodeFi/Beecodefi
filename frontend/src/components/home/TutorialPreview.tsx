"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, FileCode2, Palette, Braces, CheckCircle2, Clock, Zap } from "lucide-react";
import { useRef } from "react";
import { tutorials as tutorialData } from "@/data/tutorials";

const tutorialMeta = [
  {
    slug: "html",
    title: "HTML",
    subtitle: "Structure & Semantics",
    description: "The backbone of every webpage. Learn elements, forms, tables, semantic markup, and accessibility.",
    icon: FileCode2,
    gradient: "from-orange-500 to-red-500",
    glow: "rgba(249,115,22,0.3)",
    border: "border-orange-500/20",
    bg: "bg-orange-500/5",
    textColor: "text-orange-400",
    topics: ["Elements & Tags", "Semantic HTML", "Forms & Inputs", "Tables", "Accessibility"],
  },
  {
    slug: "css",
    title: "CSS",
    subtitle: "Style & Layout",
    description: "Make things beautiful. Master Flexbox, Grid, animations, responsive design, and modern CSS.",
    icon: Palette,
    gradient: "from-blue-500 to-indigo-500",
    glow: "rgba(59,130,246,0.3)",
    border: "border-blue-500/20",
    bg: "bg-blue-500/5",
    textColor: "text-blue-400",
    topics: ["Flexbox & Grid", "Animations", "Responsive Design", "CSS Variables", "Modern CSS"],
  },
  {
    slug: "javascript",
    title: "JavaScript",
    subtitle: "Logic & Interactivity",
    description: "Bring pages to life. Variables, functions, DOM, async/await, APIs, and modern ES6+ features.",
    icon: Braces,
    gradient: "from-yellow-500 to-amber-500",
    glow: "rgba(234,179,8,0.3)",
    border: "border-yellow-500/20",
    bg: "bg-yellow-500/5",
    textColor: "text-yellow-400",
    topics: ["Functions & Scope", "DOM Manipulation", "Async / Await", "APIs & Fetch", "ES6+ Features"],
  },
];

function TutorialCard({ meta, index }: { meta: typeof tutorialMeta[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const lessonCount = tutorialData.find((t) => t.slug === meta.slug)?.lessons.length ?? 0;
  const estHours = Math.ceil((lessonCount * 20) / 60);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.21, 1.02, 0.73, 1] }}
    >
      <Link href={`/tutorials/${meta.slug}`} className="group block h-full">
        <motion.div
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ duration: 0.25 }}
          className={`relative h-full rounded-2xl ${meta.bg} border ${meta.border} p-7 overflow-hidden`}
          style={{ boxShadow: `0 0 0 0 ${meta.glow}` }}
        >
          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ boxShadow: `inset 0 0 60px ${meta.glow}` }}
          />

          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center mb-6 shadow-lg`}
            style={{ boxShadow: `0 8px 24px ${meta.glow}` }}
          >
            <meta.icon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Title */}
          <div className="mb-4">
            <h3 className="text-2xl font-extrabold text-white mb-0.5">{meta.title}</h3>
            <p className={`text-sm font-semibold ${meta.textColor}`}>{meta.subtitle}</p>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed mb-6">{meta.description}</p>

          {/* Topics */}
          <ul className="space-y-2 mb-6">
            {meta.topics.map((topic) => (
              <li key={topic} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className={`w-3.5 h-3.5 ${meta.textColor} shrink-0`} />
                {topic}
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                {lessonCount} lessons
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                ~{estHours}h
              </span>
            </div>
            <span className={`flex items-center gap-1 text-sm font-semibold ${meta.textColor} group-hover:gap-2 transition-all`}>
              Start <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Bottom accent bar */}
          <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${meta.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function TutorialPreview() {
  return (
    <section className="py-28 bg-gradient-to-b from-slate-950 to-gray-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-6">
            Structured Learning
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Three tracks.{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              One goal.
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            HTML → CSS → JavaScript. Each track builds on the last with interactive lessons, live code editors, exercises, and quizzes.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {tutorialMeta.map((meta, i) => (
            <TutorialCard key={meta.slug} meta={meta} index={i} />
          ))}
        </div>

        {/* Browse all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-xl"
          >
            Browse all tutorials <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
