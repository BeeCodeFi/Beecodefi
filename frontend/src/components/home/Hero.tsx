"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, animate, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, BookOpen, Brain, Sparkles, Play, Code2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { tutorials } from "@/data/tutorials";
import { courses } from "@/data/courses";

const totalLessons = tutorials.reduce((sum, t) => sum + t.lessons.length, 0);
const totalVideos = courses.reduce((sum, c) => sum + c.videos.length, 0);

// ── Animated counter ──────────────────────────────────────────────────────
function Counter({ to, duration = 2 }: { to: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const c = animate(count, to, { duration, ease: "easeOut" });
    const u = rounded.on("change", setDisplay);
    return () => { c.stop(); u(); };
  }, [to, duration, count, rounded]);
  return <span>{display}</span>;
}

// ── Typing effect ─────────────────────────────────────────────────────────
const WORDS = ["HTML", "CSS", "JavaScript"];
const WORD_COLORS = [
  "text-orange-500 dark:text-orange-400",
  "text-blue-600 dark:text-blue-400",
  "text-yellow-500 dark:text-yellow-400",
];

function TypingWord() {
  const [wi, setWi] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = WORDS[wi];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length)
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 100);
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 55);
    else { setDeleting(false); setWi((i) => (i + 1) % WORDS.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, wi]);
  return (
    <span className={`${WORD_COLORS[wi]} inline-block min-w-[190px] sm:min-w-[240px]`}>
      {displayed}<span className="animate-pulse opacity-70">|</span>
    </span>
  );
}

// ── Floating code snippet ─────────────────────────────────────────────────
const snippets = [
  { code: "<h1>Hello World</h1>",          color: "text-orange-500 dark:text-orange-400", x: "4%",  y: "18%" },
  { code: "display: flex; gap: 1rem;",      color: "text-blue-600 dark:text-blue-400",    x: "72%", y: "12%" },
  { code: "const learn = () => 🐝",         color: "text-yellow-600 dark:text-yellow-400",x: "78%", y: "55%" },
  { code: ".card { border-radius: 12px }",  color: "text-green-600 dark:text-green-400",  x: "2%",  y: "68%" },
  { code: "await fetch('/api/data')",        color: "text-purple-600 dark:text-purple-400",x: "68%", y: "80%" },
  { code: "for (const item of list)",        color: "text-pink-600 dark:text-pink-400",    x: "6%",  y: "84%" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50/30 dark:from-slate-950 dark:via-indigo-950/60 dark:to-slate-950">

      {/* Light mode: soft radial blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y }} className="absolute inset-0">
          {[
            { size: 600, color: "bg-indigo-200/40 dark:bg-indigo-600/15", left: "-5%",  top: "-10%" },
            { size: 500, color: "bg-purple-200/30 dark:bg-purple-600/10", left: "65%",  top: "25%"  },
            { size: 400, color: "bg-pink-200/25 dark:bg-pink-600/10",     left: "20%",  top: "55%"  },
            { size: 350, color: "bg-cyan-200/20 dark:bg-cyan-600/8",      left: "78%",  top: "65%"  },
          ].map((orb, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${orb.color} blur-3xl`}
              style={{ width: orb.size, height: orb.size, left: orb.left, top: orb.top }}
              animate={{ x: [0, 25, -15, 0], y: [0, -20, 15, 0], scale: [1, 1.08, 0.96, 1] }}
              transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </div>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.3] dark:opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.25) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
      />

      {/* Floating code snippets — desktop only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden xl:block">
        {snippets.map((s, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: s.x, top: s.y }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: [0, 0.9, 0.9, 0], y: [16, 0, 0, -16] }}
            transition={{ delay: i * 1.2 + 1.5, duration: 9, repeat: Infinity, repeatDelay: 3 }}
          >
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/50 rounded-lg px-3 py-1.5 font-mono text-xs shadow-sm">
              <span className={s.color}>{s.code}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bee */}
      <motion.div
        className="absolute top-24 right-[13%] text-5xl hidden xl:block select-none"
        animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🐝
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-100/80 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-4 h-4" />
            </motion.div>
            100% Free · No Credit Card · No Paywall
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-tight text-gray-900 dark:text-white"
          >
            <span>Learn </span>
            <TypingWord />
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              for Free
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Interactive tutorials, video courses, and quizzes for web development.
            Built by a developer, for developers. Zero fluff, pure learning.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link href="/tutorials"
              className="group relative flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
            >
              <BookOpen className="w-5 h-5" />
              Start Learning
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/courses"
              className="group flex items-center gap-2.5 px-8 py-4 bg-white dark:bg-white/5 text-gray-800 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-red-300 dark:hover:border-white/20 transition-all duration-300 shadow-sm"
            >
              <Play className="w-4 h-4 text-red-500" />
              Watch Courses
            </Link>
            <Link href="/quiz"
              className="group flex items-center gap-2.5 px-8 py-4 bg-white dark:bg-white/5 text-gray-800 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-purple-300 dark:hover:border-white/20 transition-all duration-300 shadow-sm"
            >
              <Brain className="w-4 h-4 text-purple-500" />
              Take a Quiz
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200/60 dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-200/60 dark:border-white/10 shadow-sm"
          >
            {[
              { value: totalLessons, suffix: "+", label: "Lessons",     icon: BookOpen, color: "text-indigo-600 dark:text-indigo-400" },
              { value: totalVideos,  suffix: "",  label: "Videos",      icon: Play,     color: "text-red-500 dark:text-red-400"     },
              { value: 3,            suffix: "",  label: "Quiz Topics",  icon: Brain,    color: "text-purple-600 dark:text-purple-400"},
              { value: 100,          suffix: "%", label: "Free Forever", icon: Sparkles, color: "text-green-600 dark:text-green-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/70 dark:bg-white/[0.03] px-6 py-6 flex flex-col items-center gap-2">
                <stat.icon className={`w-5 h-5 ${stat.color} mb-1`} />
                <div className={`text-3xl font-extrabold ${stat.color}`}>
                  <Counter to={stat.value} duration={2 + i * 0.3} />{stat.suffix}
                </div>
                <div className="text-xs text-gray-500 dark:text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Pill tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { label: "HTML",          color: "border-orange-400/40 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/5" },
              { label: "CSS",           color: "border-blue-400/40 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/5"   },
              { label: "JavaScript",    color: "border-yellow-400/40 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/5" },
              { label: "Tutorials",     color: "border-indigo-400/40 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/5"},
              { label: "Video Courses", color: "border-red-400/40 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/5"        },
              { label: "Quizzes",       color: "border-purple-400/40 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/5"},
            ].map((pill, i) => (
              <motion.span
                key={pill.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + i * 0.08 }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${pill.color} backdrop-blur-sm`}
              >
                {pill.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400 dark:text-slate-600"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-5 h-8 border-2 border-gray-300 dark:border-slate-700 rounded-full flex items-start justify-center pt-1.5">
          <motion.div className="w-1 h-1.5 bg-gray-400 dark:bg-slate-500 rounded-full" animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
}
