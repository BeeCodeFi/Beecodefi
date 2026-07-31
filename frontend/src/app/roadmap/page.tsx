"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FileCode2, Palette, Braces, Rocket,
  BookOpen, Brain, ArrowRight, CheckCircle2, ChevronDown,
} from "lucide-react";
import { tutorials } from "@/data/tutorials";
import SplitText from "@/components/ui/SplitText";

// ── Data ──────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 1, number: "01", emoji: "🏗️",
    title: "HTML", fullTitle: "HTML Fundamentals",
    tagline: "The skeleton of the web",
    desc: "Every website on the planet starts here. Learn how browsers read markup, give your content structure and meaning, build accessible forms, and write semantic code that search engines love.",
    accent: "#f97316",
    darkBg: "#110700",
    lightBg: "#fff7ed",
    gradient: "from-orange-500 to-red-500",
    shadow: "0 20px 60px rgba(249,115,22,0.25)",
    border: "border-orange-200 dark:border-orange-900/50",
    tutorialSlug: "html", time: "1–2 wks",
    icon: FileCode2,
    skills: ["Elements & Tags", "Semantic HTML5", "Forms & Inputs", "Tables", "Accessibility"],
    stat: "11", statUnit: "lessons",
  },
  {
    id: 2, number: "02", emoji: "🎨",
    title: "CSS", fullTitle: "CSS Mastery",
    tagline: "Make it beautiful",
    desc: "Turn raw HTML into stunning, responsive interfaces. Flexbox, Grid, animations, custom properties, dark mode — this is where your pages start looking like real products.",
    accent: "#3b82f6",
    darkBg: "#00050f",
    lightBg: "#eff6ff",
    gradient: "from-blue-500 to-indigo-600",
    shadow: "0 20px 60px rgba(59,130,246,0.25)",
    border: "border-blue-200 dark:border-blue-900/50",
    tutorialSlug: "css", time: "2–4 wks",
    icon: Palette,
    skills: ["Selectors & Specificity", "Box Model", "Flexbox & Grid", "Responsive Design", "Animations"],
    stat: "18", statUnit: "lessons",
  },
  {
    id: 3, number: "03", emoji: "⚡",
    title: "JavaScript", fullTitle: "JavaScript Essentials",
    tagline: "Bring it to life",
    desc: "Pages become applications. Handle events, fetch real data from APIs, manipulate the DOM dynamically, and master the ES6+ features every modern developer uses every single day.",
    accent: "#eab308",
    darkBg: "#0f0d00",
    lightBg: "#fefce8",
    gradient: "from-yellow-500 to-amber-500",
    shadow: "0 20px 60px rgba(234,179,8,0.2)",
    border: "border-yellow-200 dark:border-yellow-900/50",
    tutorialSlug: "javascript", time: "4–6 wks",
    icon: Braces,
    skills: ["Functions & Scope", "DOM Manipulation", "Events", "Async / Await", "ES6+ Features"],
    stat: "18", statUnit: "lessons",
  },
  {
    id: 4, number: "04", emoji: "🚀",
    title: "React", fullTitle: "React & Next.js",
    tagline: "Build production apps",
    desc: "With the fundamentals solid, you're ready for React — the world's most in-demand frontend library. Components, hooks, routing, and deploying real apps with Next.js.",
    accent: "#8b5cf6",
    darkBg: "#07000f",
    lightBg: "#f5f3ff",
    gradient: "from-violet-500 to-purple-600",
    shadow: "0 20px 60px rgba(139,92,246,0.25)",
    border: "border-violet-200 dark:border-violet-900/50",
    tutorialSlug: null, time: "6–8 wks",
    icon: Rocket,
    skills: ["Components & Props", "State & Hooks", "React Router", "Next.js", "Deployment"],
    stat: "Soon", statUnit: "coming",
    comingSoon: true,
  },
] as const;

type Step = typeof STEPS[number];

// ── Step Card ─────────────────────────────────────────────────────────────────
function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-0 mb-24 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* ── Card ── */}
      <div className={`w-[calc(50%-3rem)] ${isLeft ? "pr-8" : "pl-8"}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.21, 1.02, 0.73, 1], delay: 0.1 }}
        >
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer rounded-3xl border bg-white dark:bg-gray-900 overflow-hidden"
            style={{
              borderColor: inView ? `${step.accent}30` : undefined,
              boxShadow: inView ? step.shadow : "none",
              transition: "box-shadow 0.4s ease",
            }}
          >
            {/* Top accent bar */}
            <div className={`h-1.5 bg-gradient-to-r ${step.gradient}`} />

            <div className="p-7">
              {/* Icon + emoji */}
              <div className="flex items-center gap-4 mb-5">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg shrink-0`}
                  style={{ boxShadow: step.shadow }}
                >
                  <step.icon className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-black uppercase tracking-[0.25em]"
                      style={{ color: step.accent }}>
                      Stage {step.number}
                    </span>
                    {"comingSoon" in step && step.comingSoon && (
                      <span className="text-[10px] font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
                    {step.fullTitle}
                  </h3>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: step.accent }}>
                    {step.tagline}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                {step.desc}
              </p>

              {/* Stats + expand toggle */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-5">
                  <div>
                    <div className="text-2xl font-black text-gray-900 dark:text-white leading-none">
                      {step.stat}
                    </div>
                    <div className="text-[11px] uppercase tracking-widest font-semibold mt-0.5"
                      style={{ color: step.accent }}>
                      {step.statUnit}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
                  <div>
                    <div className="text-2xl font-black text-gray-900 dark:text-white leading-none">
                      {step.time}
                    </div>
                    <div className="text-[11px] uppercase tracking-widest font-semibold mt-0.5"
                      style={{ color: step.accent }}>
                      timeline
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: `${step.accent}15`, color: step.accent }}>
                  Skills
                  <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.span>
                </button>
              </div>

              {/* Expandable skills */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {step.skills.map((s, i) => (
                        <motion.span key={s}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: step.accent }} />
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <div className="flex gap-2.5">
                {step.tutorialSlug ? (
                  <Link href={`/tutorials/${step.tutorialSlug}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r ${step.gradient} text-white text-sm font-bold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-transform`}
                    style={{ boxShadow: `0 6px 20px ${step.accent}40` }}>
                    <BookOpen className="w-4 h-4" /> Start Learning
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-400 text-sm font-bold cursor-not-allowed">
                    <Rocket className="w-4 h-4" /> Coming Soon
                  </div>
                )}
                {step.tutorialSlug && (
                  <Link href={`/quiz?category=${step.tutorialSlug}`}
                    onClick={(e) => e.stopPropagation()}
                    title="Take Quiz"
                    className="px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center">
                    <Brain className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Centre milestone dot ── */}
      <div className="w-24 flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.25 }}
        >
          <motion.div
            animate={{
              boxShadow: [
                `0 0 0 0px ${step.accent}00`,
                `0 0 0 12px ${step.accent}00`,
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-14 h-14 rounded-full bg-white dark:bg-gray-900 border-4 flex items-center justify-center text-2xl shadow-xl"
            style={{ borderColor: step.accent }}
          >
            {step.emoji}
          </motion.div>
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-2 text-[11px] font-black uppercase tracking-wider text-center"
          style={{ color: step.accent }}
        >
          {step.title}
        </motion.span>
      </div>

      {/* ── Spacer ── */}
      <div className="w-[calc(50%-3rem)]" />
    </div>
  );
}

// ── Mobile Step Card ──────────────────────────────────────────────────────────
function MobileStepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.21, 1.02, 0.73, 1] }}
      className="relative pl-10 mb-8">
      {/* Left dot */}
      <motion.div
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
        className="absolute left-0 top-4 w-8 h-8 rounded-full border-4 bg-white dark:bg-gray-900 flex items-center justify-center text-sm z-10 shadow-md"
        style={{ borderColor: step.accent }}>
        {step.emoji}
      </motion.div>
      <div onClick={() => setExpanded(!expanded)}
        className="cursor-pointer rounded-2xl border bg-white dark:bg-gray-900 shadow-md p-5 overflow-hidden"
        style={{ borderColor: `${step.accent}25`, boxShadow: `0 4px 20px ${step.accent}15` }}>
        <div className={`h-1 bg-gradient-to-r ${step.gradient} rounded-full mb-4`} />
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md shrink-0`}>
            <step.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: step.accent }}>
              Stage {step.number} · {step.time}
            </span>
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">{step.fullTitle}</h3>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{step.desc}</p>
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
              <div className="flex flex-wrap gap-1.5">
                {step.skills.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" style={{ color: step.accent }} />{s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-2">
          {step.tutorialSlug ? (
            <Link href={`/tutorials/${step.tutorialSlug}`} onClick={(e) => e.stopPropagation()}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r ${step.gradient} text-white text-xs font-bold`}>
              <BookOpen className="w-3.5 h-3.5" /> Start <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <div className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 text-xs font-bold">
              <Rocket className="w-3.5 h-3.5" /> Coming Soon
            </div>
          )}
          <button onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="px-3.5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-medium">
            {expanded ? "Less ↑" : "Skills ↓"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function RoadmapPage() {
  const totalLessons = tutorials.reduce((s, t) => s + t.lessons.length, 0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "#030712" }}>

        {/* Soft ambient glow — no canvas, no lag */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { color: "rgba(249,115,22,0.12)", left: "10%",  top: "20%", size: 500 },
            { color: "rgba(59,130,246,0.10)", left: "70%",  top: "10%", size: 450 },
            { color: "rgba(139,92,246,0.09)", left: "40%",  top: "60%", size: 400 },
          ].map((o, i) => (
            <motion.div key={i}
              className="absolute rounded-full blur-3xl"
              style={{ width: o.size, height: o.size, left: o.left, top: o.top, background: o.color }}
              animate={{ x: [0, 25, -15, 0], y: [0, -18, 12, 0] }}
              transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 35%, #030712 100%)" }} />

        <div className="relative text-center px-4 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-sm font-medium mb-10 backdrop-blur-sm">
            🗺️ Interactive Roadmap · {totalLessons}+ free lessons
          </motion.div>

          {/* Split text headline */}
          <div className="mb-3">
            <SplitText text="Dev" delay={0.15} stagger={0.06}
              className="text-[18vw] sm:text-[14vw] md:text-[11vw] font-black tracking-tight leading-none text-white" />
          </div>
          <div className="mb-10">
            <SplitText text="Roadmap" delay={0.3} stagger={0.04}
              className="text-[18vw] sm:text-[14vw] md:text-[11vw] font-black tracking-tight leading-none bg-gradient-to-r from-orange-400 via-blue-400 to-purple-400 bg-clip-text text-transparent" />
          </div>

          {/* Step pills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {STEPS.map((s, i) => (
              <motion.div key={s.id}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                style={{ border: `1px solid ${s.accent}35`, color: s.accent, background: `${s.accent}12` }}>
                {s.emoji} {s.title}
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll cue */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="flex flex-col items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/25 font-medium">Scroll to explore</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/15 rounded-full flex items-start justify-center pt-2">
              <motion.div className="w-1.5 h-2 bg-white/25 rounded-full"
                animate={{ y: [0, 14, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── DESKTOP TIMELINE ─────────────────────────────────── */}
      <section className="relative hidden md:block py-24 bg-white dark:bg-gray-950 overflow-hidden">
        {/* Vertical gradient line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5"
          style={{ background: "linear-gradient(to bottom, transparent, #f97316 10%, #3b82f6 35%, #eab308 65%, #8b5cf6 90%, transparent)" }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {STEPS.map((step, i) => (
            <StepCard key={step.id} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* ── MOBILE TIMELINE ──────────────────────────────────── */}
      <section className="md:hidden py-12 px-5 relative bg-white dark:bg-gray-950">
        <div className="absolute left-4 top-0 bottom-0 w-0.5"
          style={{ background: "linear-gradient(to bottom, transparent, #f97316 10%, #3b82f6 35%, #eab308 65%, #8b5cf6 90%, transparent)" }} />
        {STEPS.map((step, i) => (
          <MobileStepCard key={step.id} step={step} index={i} />
        ))}
      </section>

      {/* ── TIPS ─────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-14 text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Tips for the journey
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { n: "01", text: "Don't skip steps. HTML → CSS → JS is the order for a reason. Each one builds on the last." },
              { n: "02", text: "Build something after each topic. A real mini-project beats watching 10 more tutorials." },
              { n: "03", text: "Take the quiz after each track. It surfaces the gaps you didn't know you had." },
              { n: "04", text: "30 minutes every day beats 4-hour sessions on weekends. Consistency compounds." },
              { n: "05", text: "When stuck, MDN is your bible. Every lesson has a direct MDN reference link." },
              { n: "06", text: "Everything here is completely free. No paywalls. No upsells. Just start." },
            ].map((tip, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-black text-gray-100 dark:text-gray-800 mb-3 leading-none">{tip.n}</div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{tip.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-950 text-center relative overflow-hidden">
        <motion.div className="absolute inset-0 pointer-events-none"
          animate={{ background: [
            "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.08) 0%, transparent 65%)",
            "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 65%)",
            "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.08) 0%, transparent 65%)",
          ]}}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="relative max-w-2xl mx-auto px-6">
          <motion.div className="text-6xl mb-6"
            animate={{ y: [-8, 8, -8], rotate: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity }}>🐝</motion.div>
          <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-5">
            Stage 01<br />
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              starts now
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
            HTML is free and waiting. No account needed to begin your first lesson.
          </p>
          <Link href="/tutorials/html"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-2xl text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all">
            <FileCode2 className="w-5 h-5" /> Begin Stage 01 <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
