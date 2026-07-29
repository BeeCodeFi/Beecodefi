"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, BookOpen, Brain, Sparkles, Play, Code2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { tutorials } from "@/data/tutorials";
import { courses } from "@/data/courses";

const totalLessons = tutorials.reduce((sum, t) => sum + t.lessons.length, 0);
const totalVideos = courses.reduce((sum, c) => sum + c.videos.length, 0);

// Floating code snippets
const floatingSnippets = [
  { code: '<h1>Hello World</h1>', color: "text-orange-400", x: "5%", y: "15%", delay: 0 },
  { code: 'display: flex;', color: "text-blue-400", x: "75%", y: "10%", delay: 0.5 },
  { code: 'const learn = () => 🐝', color: "text-yellow-400", x: "80%", y: "55%", delay: 1 },
  { code: '.card { border-radius: 12px }', color: "text-green-400", x: "2%", y: "65%", delay: 1.5 },
  { code: 'await fetch("/api")', color: "text-purple-400", x: "70%", y: "80%", delay: 2 },
  { code: 'for (const item of list)', color: "text-pink-400", x: "8%", y: "85%", delay: 0.8 },
];

// Animated counter
function Counter({ to, duration = 2 }: { to: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: "easeOut" });
    const unsub = rounded.on("change", setDisplay);
    return () => { controls.stop(); unsub(); };
  }, [to, duration, count, rounded]);

  return <span>{display}</span>;
}

// Typing effect
const words = ["HTML", "CSS", "JavaScript"];
function TypingWord() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 100);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 55);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  const colors = ["text-orange-500", "text-blue-500", "text-yellow-500"];
  return (
    <span className={`${colors[wordIdx]} inline-block min-w-[160px]`}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated orbs */}
      {[
        { size: 500, color: "from-indigo-600/20 to-transparent", x: "-10%", y: "-10%", dur: 12 },
        { size: 400, color: "from-purple-600/20 to-transparent", x: "60%", y: "30%", dur: 15 },
        { size: 300, color: "from-pink-600/15 to-transparent", x: "20%", y: "60%", dur: 10 },
        { size: 350, color: "from-cyan-600/15 to-transparent", x: "75%", y: "70%", dur: 18 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-radial-gradient blur-3xl bg-gradient-to-br ${orb.color}`}
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Floating code snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        {floatingSnippets.map((s, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: s.x, top: s.y }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 0.7, 0.7, 0], y: [20, 0, 0, -20] }}
            transition={{ delay: s.delay + 1, duration: 8, repeat: Infinity, repeatDelay: 4 }}
          >
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg px-3 py-1.5 font-mono text-xs">
              <span className={s.color}>{s.code}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bee emoji floating */}
      <motion.div
        className="absolute top-24 right-[15%] text-5xl hidden xl:block"
        animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🐝
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8"
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
            className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            <span className="text-white">Learn </span>
            <TypingWord />
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              for Free
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Interactive tutorials, video courses, and quizzes for HTML, CSS & JavaScript.
            Built by a developer, for developers. Zero fluff, pure learning.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link
              href="/tutorials"
              className="group relative flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl overflow-hidden shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <BookOpen className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Start Learning</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/courses"
              className="group flex items-center gap-2.5 px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <Play className="w-4 h-4 text-red-400" />
              Watch Courses
            </Link>

            <Link
              href="/quiz"
              className="group flex items-center gap-2.5 px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <Brain className="w-4 h-4 text-purple-400" />
              Take a Quiz
            </Link>
          </motion.div>

          {/* Animated stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10"
          >
            {[
              { value: totalLessons, suffix: "+", label: "Lessons", icon: BookOpen, color: "text-indigo-400" },
              { value: totalVideos, suffix: "", label: "Videos", icon: Play, color: "text-red-400" },
              { value: 3, suffix: "", label: "Quiz Topics", icon: Brain, color: "text-purple-400" },
              { value: 100, suffix: "%", label: "Free Forever", icon: Sparkles, color: "text-green-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.03] px-6 py-6 flex flex-col items-center gap-2">
                <stat.icon className={`w-5 h-5 ${stat.color} mb-1`} />
                <div className={`text-3xl font-extrabold ${stat.color}`}>
                  <Counter to={stat.value} duration={2 + i * 0.3} />
                  {stat.suffix}
                </div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Tech stack pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { label: "HTML", color: "border-orange-500/30 text-orange-400 bg-orange-500/5" },
              { label: "CSS", color: "border-blue-500/30 text-blue-400 bg-blue-500/5" },
              { label: "JavaScript", color: "border-yellow-500/30 text-yellow-400 bg-yellow-500/5" },
              { label: "Tutorials", color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5" },
              { label: "Video Courses", color: "border-red-500/30 text-red-400 bg-red-500/5" },
              { label: "Quizzes", color: "border-purple-500/30 text-purple-400 bg-purple-500/5" },
            ].map((pill, i) => (
              <motion.span
                key={pill.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + i * 0.08 }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border ${pill.color}`}
              >
                {pill.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 border-2 border-slate-700 rounded-full flex items-start justify-center pt-1.5">
          <motion.div
            className="w-1 h-1.5 bg-slate-500 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
