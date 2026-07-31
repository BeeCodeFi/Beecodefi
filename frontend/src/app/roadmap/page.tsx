"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileCode2, Palette, Braces, Rocket,
  BookOpen, Brain, ArrowRight, CheckCircle2,
} from "lucide-react";
import { tutorials } from "@/data/tutorials";
import SplitText from "@/components/ui/SplitText";
import FluidOrbs from "@/components/ui/FluidOrbs";

// ── Step data ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 1, number: "01", emoji: "🏗️",
    title: "HTML", fullTitle: "HTML Fundamentals",
    tagline: "The skeleton of the web",
    desc: "Every website on the planet starts here. Learn how browsers read markup, give your content structure and meaning, build accessible forms, and write semantic code that search engines love.",
    accent: "#f97316", darkBg: "#1c0a00", lightBg: "#fff7ed",
    gradient: "from-orange-500 to-red-500",
    border: "border-orange-300 dark:border-orange-800",
    tutorialSlug: "html", time: "1–2 wks",
    icon: FileCode2,
    skills: ["Elements & Tags", "Semantic HTML5", "Forms & Inputs", "Tables", "Accessibility"],
    stat: "11", statUnit: "lessons",
  },
  {
    id: 2, number: "02", emoji: "🎨",
    title: "CSS", fullTitle: "CSS Mastery",
    tagline: "Make it beautiful",
    desc: "Turn raw HTML into stunning, responsive interfaces. Flex, Grid, animations, custom properties, dark mode — this is where your pages start looking like real products people actually want to use.",
    accent: "#3b82f6", darkBg: "#00071c", lightBg: "#eff6ff",
    gradient: "from-blue-500 to-indigo-600",
    border: "border-blue-300 dark:border-blue-800",
    tutorialSlug: "css", time: "2–4 wks",
    icon: Palette,
    skills: ["Selectors & Specificity", "Box Model", "Flexbox & Grid", "Responsive Design", "Animations"],
    stat: "18", statUnit: "lessons",
  },
  {
    id: 3, number: "03", emoji: "⚡",
    title: "JavaScript", fullTitle: "JavaScript Essentials",
    tagline: "Bring it to life",
    desc: "Pages become applications. Handle events, fetch real data from APIs, manipulate the DOM dynamically, write async code with confidence, and master the ES6+ features every modern dev uses daily.",
    accent: "#eab308", darkBg: "#1a1400", lightBg: "#fefce8",
    gradient: "from-yellow-500 to-amber-500",
    border: "border-yellow-300 dark:border-yellow-800",
    tutorialSlug: "javascript", time: "4–6 wks",
    icon: Braces,
    skills: ["Functions & Scope", "DOM Manipulation", "Events", "Async / Await", "ES6+ Features"],
    stat: "18", statUnit: "lessons",
  },
  {
    id: 4, number: "04", emoji: "🚀",
    title: "React", fullTitle: "React & Next.js",
    tagline: "Build production apps",
    desc: "With the fundamentals locked in, you're ready for the world's most in-demand frontend stack. Component-driven UIs, powerful hooks, server-side rendering, and deploying real apps to production.",
    accent: "#8b5cf6", darkBg: "#0d0014", lightBg: "#f5f3ff",
    gradient: "from-violet-500 to-purple-600",
    border: "border-violet-300 dark:border-violet-800",
    tutorialSlug: null, time: "6–8 wks",
    icon: Rocket,
    skills: ["Components & Props", "State & Hooks", "React Router", "Next.js", "Deployment"],
    stat: "Soon", statUnit: "coming",
    comingSoon: true,
  },
] as const;

type Step = typeof STEPS[number];

// ── Single sticky stage panel ─────────────────────────────────────────────────
function StagePanel({ step, index }: { step: Step; index: number }) {
  const container = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  // Track dark mode
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // Scroll progress within this tall container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // All transforms driven by scroll within the section
  const bgScale   = useTransform(scrollYProgress, [0, 0.15], [1.08, 1]);
  const numO      = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const numY      = useTransform(scrollYProgress, [0, 0.12], [40, 0]);
  const titleO    = useTransform(scrollYProgress, [0.05, 0.22], [0, 1]);
  const titleY    = useTransform(scrollYProgress, [0.05, 0.22], [60, 0]);
  const descO     = useTransform(scrollYProgress, [0.12, 0.3], [0, 1]);
  const descY     = useTransform(scrollYProgress, [0.12, 0.3], [40, 0]);
  const cardO     = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const cardX     = useTransform(scrollYProgress, [0.2, 0.4], [80, 0]);
  const lineScale = useTransform(scrollYProgress, [0.05, 0.5], [0, 1]);
  const exitO     = useTransform(scrollYProgress, [0.85, 1], [1, 0]);
  const exitY     = useTransform(scrollYProgress, [0.85, 1], [0, -40]);

  const bg = isDark ? step.darkBg : step.lightBg;

  return (
    // 350vh tall container — gives room for GSAP-style pin
    <div ref={container} style={{ height: "350vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Full-bleed background */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: bg, scale: bgScale }}
        />

        {/* Noise grain */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />

        {/* Giant watermark number */}
        <motion.div
          style={{ opacity: numO, y: numY }}
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden"
        >
          <span className="text-[28vw] font-black leading-none"
            style={{ color: step.accent, opacity: 0.07 }}>
            {step.number}
          </span>
        </motion.div>

        {/* Accent horizontal rule */}
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(to right, transparent, ${step.accent}, transparent)`, opacity: 0.6 }} />

        {/* All content wrapped for exit fade */}
        <motion.div style={{ opacity: exitO, y: exitY }} className="relative h-full">
          <div className="h-full flex items-center">
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* LEFT — heading side */}
                <div>
                  {/* Step label + line */}
                  <motion.div style={{ opacity: numO }} className="flex items-center gap-4 mb-6">
                    <span className="text-xs font-black uppercase tracking-[0.3em]"
                      style={{ color: step.accent }}>
                      Stage {step.number}
                    </span>
                    <motion.div
                      className="h-px"
                      style={{
                        width: "6rem",
                        background: step.accent,
                        scaleX: lineScale,
                        transformOrigin: "left",
                      }}
                    />
                  </motion.div>

                  {/* Icon + emoji */}
                  <motion.div style={{ opacity: titleO, y: titleY }} className="flex items-center gap-4 mb-5">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl shrink-0`}
                      style={{ boxShadow: `0 16px 40px ${step.accent}50` }}>
                      <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <span className="text-4xl sm:text-5xl">{step.emoji}</span>
                  </motion.div>

                  {/* Big title */}
                  <motion.h2
                    style={{ opacity: titleO, y: titleY, color: isDark ? "#ffffff" : "#111827" }}
                    className="text-[13vw] sm:text-[10vw] lg:text-[7vw] xl:text-[6vw] font-black tracking-tight leading-none mb-3"
                  >
                    {step.title}
                  </motion.h2>

                  {/* Tagline */}
                  <motion.p style={{ opacity: titleO, y: titleY, color: step.accent }}
                    className="text-base sm:text-xl font-semibold mb-4">
                    {step.tagline}
                  </motion.p>

                  {/* Description */}
                  <motion.p style={{ opacity: descO, y: descY, color: isDark ? "#d1d5db" : "#374151" }}
                    className="text-sm sm:text-base leading-relaxed max-w-md">
                    {step.desc}
                  </motion.p>

                  {/* Stats */}
                  <motion.div style={{ opacity: descO, y: descY }}
                    className="flex items-center gap-6 mt-6">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black" style={{ color: isDark ? "#ffffff" : "#111827" }}>
                        {step.stat}
                      </div>
                      <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: step.accent }}>
                        {step.statUnit}
                      </div>
                    </div>
                    <div className="w-px h-10" style={{ background: isDark ? "#374151" : "#d1d5db" }} />
                    <div>
                      <div className="text-3xl sm:text-4xl font-black" style={{ color: isDark ? "#ffffff" : "#111827" }}>
                        {step.time}
                      </div>
                      <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: step.accent }}>
                        timeline
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* RIGHT — skills card */}
                <motion.div style={{ opacity: cardO, x: cardX }}>
                  <div
                    className="rounded-3xl border p-7 sm:p-8 shadow-2xl"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)",
                      backdropFilter: "blur(24px)",
                      borderColor: isDark ? `${step.accent}30` : `${step.accent}40`,
                      boxShadow: `0 32px 80px ${step.accent}25`,
                    }}
                  >
                    <p className="text-xs font-black uppercase tracking-[0.2em] mb-5"
                      style={{ color: step.accent }}>
                      What you'll learn
                    </p>

                    <ul className="space-y-3.5 mb-7">
                      {step.skills.map((skill, i) => (
                        <motion.li key={skill}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: step.accent }} />
                          <span className="text-sm font-medium" style={{ color: isDark ? "#e5e7eb" : "#1f2937" }}>
                            {skill}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="flex gap-3">
                      {step.tutorialSlug ? (
                        <Link href={`/tutorials/${step.tutorialSlug}`}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r ${step.gradient} text-white text-sm font-bold shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all`}
                          style={{ boxShadow: `0 8px 24px ${step.accent}50` }}>
                          <BookOpen className="w-4 h-4" /> Start Learning
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold cursor-not-allowed"
                          style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", color: isDark ? "#6b7280" : "#9ca3af" }}>
                          <Rocket className="w-4 h-4" /> Coming Soon
                        </div>
                      )}
                      {step.tutorialSlug && (
                        <Link href={`/quiz?category=${step.tutorialSlug}`}
                          title="Take Quiz"
                          className="px-4 py-3 rounded-2xl flex items-center justify-center hover:-translate-y-0.5 transition-all"
                          style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", color: isDark ? "#e5e7eb" : "#374151" }}>
                          <Brain className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress dot at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {STEPS.map((s) => (
            <div key={s.id}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: s.id === step.id ? "2rem" : "0.375rem",
                background: s.id === step.id ? step.accent : (isDark ? "#374151" : "#d1d5db"),
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
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

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY  = useTransform(heroScroll, [0, 1], [0, 140]);
  const heroO  = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <div style={{ background: isDark ? "#030712" : "#ffffff" }}>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: "#030712" }}>

        {/* Fluid canvas orbs */}
        <FluidOrbs count={5} />

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, #030712 100%)" }} />

        <motion.div style={{ y: heroY, opacity: heroO }} className="relative text-center px-4 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-sm font-medium mb-10 backdrop-blur-sm">
            🗺️ Interactive Roadmap · {totalLessons}+ free lessons
          </motion.div>

          {/* Character-split title — lusion.co style */}
          <div className="mb-4 overflow-hidden">
            <SplitText
              text="Dev"
              delay={0.2}
              stagger={0.04}
              className="text-[18vw] sm:text-[14vw] md:text-[12vw] font-black tracking-tight leading-none text-white block"
            />
          </div>
          <div className="overflow-hidden mb-10">
            <SplitText
              text="Roadmap"
              delay={0.35}
              stagger={0.03}
              className="text-[18vw] sm:text-[14vw] md:text-[12vw] font-black tracking-tight leading-none block bg-gradient-to-r from-orange-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            />
          </div>

          {/* Stage pills */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {STEPS.map((s, i) => (
              <motion.div key={s.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.75 + i * 0.08 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold cursor-default"
                style={{ border: `1px solid ${s.accent}35`, color: s.accent, background: `${s.accent}12` }}
                data-cursor-hover>
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
        </motion.div>
      </section>

      {/* ── STAGE PANELS ───────────────────────────────────────── */}
      {STEPS.map((step, i) => (
        <StagePanel key={step.id} step={step} index={i} />
      ))}

      {/* ── TIPS ───────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: isDark ? "#030712" : "#f9fafb" }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-16">
            <h2 className="text-5xl sm:text-7xl font-black tracking-tight leading-none"
              style={{ color: isDark ? "#ffffff" : "#111827" }}>
              Tips for
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                the journey
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { n: "01", text: "Don't skip steps. HTML → CSS → JS is the order for a reason. Each one builds directly on the last." },
              { n: "02", text: "Build something after each topic. A real mini-project beats watching 10 extra tutorial videos." },
              { n: "03", text: "Take the quiz after each track. It surfaces the gaps you didn't know you had." },
              { n: "04", text: "30 minutes every day beats 4-hour sessions on weekends. Consistency compounds." },
              { n: "05", text: "When stuck, MDN is your bible. Every lesson has a direct MDN reference link in the header." },
              { n: "06", text: "Everything here is completely free. No paywalls, no upsells, no credit card. Just start." },
            ].map((tip, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border p-6 cursor-default transition-all hover:shadow-lg"
                style={{
                  background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)",
                  borderColor: isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb",
                }}>
                <div className="text-5xl font-black mb-4 leading-none"
                  style={{ color: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                  {tip.n}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: isDark ? "#9ca3af" : "#374151" }}>
                  {tip.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden" style={{ background: "#030712" }}>
        <motion.div className="absolute inset-0 pointer-events-none"
          animate={{ background: [
            "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.1) 0%, transparent 65%)",
            "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.1) 0%, transparent 65%)",
            "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.1) 0%, transparent 65%)",
          ]}}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="relative text-center max-w-3xl mx-auto px-6">
          <motion.div className="text-7xl mb-6 block"
            animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}>🐝</motion.div>

          <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tight leading-tight mb-6">
            Stage 01
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              starts now
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            HTML is free and waiting. No account needed to start. Your first lesson is one click away.
          </p>
          <Link href="/tutorials/html"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-2xl text-base shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all">
            <FileCode2 className="w-5 h-5" />
            Begin Stage 01
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
