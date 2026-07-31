"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import {
  FileCode2, Palette, Braces, Rocket, BookOpen, Brain,
  ArrowRight, CheckCircle2, Clock, ChevronDown,
} from "lucide-react";
import { tutorials } from "@/data/tutorials";

// ── Data ─────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 1, emoji: "🏗️", title: "HTML", fullTitle: "HTML Fundamentals",
    subtitle: "The skeleton of the web",
    desc: "Every website starts here. Learn how browsers read markup, structure content with semantic elements, build forms, and make pages accessible to everyone.",
    gradient: "from-orange-400 to-red-500",
    glow: "rgba(249,115,22,0.35)",
    bg: "bg-orange-50/80 dark:bg-orange-950/20",
    border: "border-orange-200 dark:border-orange-800/40",
    accent: "#f97316",
    icon: FileCode2,
    tutorialSlug: "html",
    time: "1–2 weeks",
    skills: ["Elements & Tags", "Semantic HTML5", "Forms & Inputs", "Tables", "Accessibility", "Document Structure"],
  },
  {
    id: 2, emoji: "🎨", title: "CSS", fullTitle: "CSS Mastery",
    subtitle: "Make it beautiful",
    desc: "Turn raw HTML into stunning interfaces. Master Flexbox, Grid, animations, responsive design, and modern CSS features that power today's best websites.",
    gradient: "from-blue-500 to-indigo-600",
    glow: "rgba(59,130,246,0.35)",
    bg: "bg-blue-50/80 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800/40",
    accent: "#3b82f6",
    icon: Palette,
    tutorialSlug: "css",
    time: "2–4 weeks",
    skills: ["Selectors & Specificity", "Box Model", "Flexbox & Grid", "Responsive Design", "Animations", "CSS Variables"],
  },
  {
    id: 3, emoji: "⚡", title: "JS", fullTitle: "JavaScript Essentials",
    subtitle: "Bring it to life",
    desc: "Add interactivity, logic, and real-world features. From DOM manipulation to async APIs — JavaScript turns your pages into full applications.",
    gradient: "from-yellow-400 to-amber-500",
    glow: "rgba(234,179,8,0.35)",
    bg: "bg-yellow-50/80 dark:bg-yellow-950/20",
    border: "border-yellow-200 dark:border-yellow-800/40",
    accent: "#eab308",
    icon: Braces,
    tutorialSlug: "javascript",
    time: "4–6 weeks",
    skills: ["Variables & Functions", "DOM Manipulation", "Events", "Async / Await", "APIs & Fetch", "ES6+ Features"],
  },
  {
    id: 4, emoji: "🚀", title: "React", fullTitle: "React & Next.js",
    subtitle: "Build real applications",
    desc: "Level up to the most in-demand frontend stack. Components, hooks, routing, server-side rendering, and deploying production apps to the world.",
    gradient: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.35)",
    bg: "bg-violet-50/80 dark:bg-violet-950/20",
    border: "border-violet-200 dark:border-violet-800/40",
    accent: "#8b5cf6",
    icon: Rocket,
    tutorialSlug: null,
    time: "6–8 weeks",
    skills: ["Components & Props", "State & Hooks", "React Router", "Next.js", "API Routes", "Deployment"],
    comingSoon: true,
  },
] as const;

// ── Walking Bee ──────────────────────────────────────────────────────────────
function WalkingBee() {
  return (
    <motion.div
      className="text-5xl select-none filter drop-shadow-xl"
      animate={{ y: [0, -8, 0, -5, 0], rotate: [-4, 4, -4], scale: [1, 1.06, 1] }}
      transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
    >
      🐝
    </motion.div>
  );
}

// ── Road Wrapper (tracks scroll progress + theme) ────────────────────────────
function RoadWrapper({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const [prog, setProg] = useState(0);
  // Read dark mode from document class (avoids next-themes import cycle)
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", setProg);
    // Watch for theme class changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    setIsDark(document.documentElement.classList.contains("dark"));
    return () => { unsub(); observer.disconnect(); };
  }, [scrollYProgress]);

  return <RoadSVG progress={prog} isDark={isDark} />;
}

// ── Road SVG ─────────────────────────────────────────────────────────────────
function RoadSVG({ progress, isDark }: { progress: number; isDark: boolean }) {
  // This is the exact same bezier path — we measure its length via a hidden ref
  const PATH = "M 100 30 C 55 130, 155 210, 100 320 C 45 420, 155 490, 100 600 C 55 680, 145 750, 100 880";
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(900);

  useEffect(() => {
    if (pathRef.current) {
      setPathLen(pathRef.current.getTotalLength());
    }
  }, []);

  const drawn = progress * pathLen;
  const roadBase = isDark ? "#374151" : "#e5e7eb";
  const roadShadow = isDark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)";

  return (
    <svg viewBox="0 0 200 920" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#f97316" />
          <stop offset="33%"  stopColor="#3b82f6" />
          <stop offset="66%"  stopColor="#eab308" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="roadGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Measure path (invisible) */}
      <path ref={pathRef} d={PATH} fill="none" stroke="none" strokeWidth="0" />

      {/* Road shadow */}
      <path d={PATH} fill="none" stroke={roadShadow} strokeWidth="32" strokeLinecap="round" />
      {/* Road base (full length, uncoloured) */}
      <path d={PATH} fill="none" stroke={roadBase} strokeWidth="28" strokeLinecap="round" />

      {/* Coloured progress fill — starts at 0, fills as you scroll */}
      {pathLen > 0 && (
        <path
          d={PATH}
          fill="none"
          stroke="url(#rg)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeDasharray={`${pathLen}`}
          strokeDashoffset={`${pathLen - drawn}`}
          style={{ transition: "stroke-dashoffset 0.06s linear" }}
          filter="url(#roadGlow)"
        />
      )}

      {/* White centre dashes — always full length */}
      <path
        d={PATH}
        fill="none"
        stroke={isDark ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.7)"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="14 18"
      />
    </svg>
  );
}

// ── Step Card (desktop) ───────────────────────────────────────────────────────
type Step = typeof STEPS[number];

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-start gap-0 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
      {/* Card side */}
      <div className={`w-[calc(50%-3.5rem)] ${isLeft ? "pr-6" : "pl-6"}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -70 : 70, rotateY: isLeft ? -12 : 12 }}
          animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.21, 1.02, 0.73, 1], delay: 0.15 }}
          style={{ perspective: 1200 }}
        >
          <motion.div
            whileHover={{ y: -8, scale: 1.02, rotateX: 3 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            onClick={() => setExpanded(!expanded)}
            className={`cursor-pointer rounded-2xl border ${step.border} bg-white dark:bg-gray-900
              shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden`}
            style={{ transformStyle: "preserve-3d", boxShadow: inView ? `0 8px 40px ${step.glow}` : undefined }}
          >
            <div className={`h-1.5 bg-gradient-to-r ${step.gradient}`} />
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <motion.div whileHover={{ rotate: 15, scale: 1.15 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg shrink-0`}
                  style={{ boxShadow: `0 8px 24px ${step.glow}` }}>
                  <step.icon className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: step.accent }}>
                      Step {step.id}
                    </span>
                    {"comingSoon" in step && step.comingSoon && (
                      <span className="text-[10px] font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight">{step.fullTitle}</h3>
                  <p className="text-sm font-semibold" style={{ color: step.accent }}>{step.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{step.desc}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5" /> ~{step.time}
                </span>
                <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: step.accent }}>
                  {expanded ? "Hide" : "Show"} skills{" "}
                  <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.span>
                </button>
              </div>
              <AnimatePresence>
                {expanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {step.skills.map((s, i) => (
                        <motion.span key={s} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="flex items-center gap-1 text-xs px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="w-3 h-3" style={{ color: step.accent }} />{s}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex gap-2">
                {step.tutorialSlug ? (
                  <Link href={`/tutorials/${step.tutorialSlug}`} onClick={(e) => e.stopPropagation()}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r ${step.gradient} text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all`}
                    style={{ boxShadow: `0 4px 16px ${step.glow}` }}>
                    <BookOpen className="w-4 h-4" /> Start Learning <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <div className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 text-sm font-bold cursor-default">
                    <Rocket className="w-4 h-4" /> Coming Soon
                  </div>
                )}
                {step.tutorialSlug && (
                  <Link href={`/quiz?category=${step.tutorialSlug}`} onClick={(e) => e.stopPropagation()}
                    title="Take Quiz"
                    className="px-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-400 transition-colors flex items-center justify-center">
                    <Brain className="w-4 h-4 text-gray-500" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Centre milestone */}
      <div className="w-28 flex flex-col items-center pt-6 shrink-0">
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.3, type: "spring", stiffness: 400, damping: 18 }}
          className="relative z-20">
          <motion.div
            animate={{ boxShadow: [`0 0 0 0px ${step.glow}`, `0 0 0 14px ${step.glow}00`] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-14 h-14 rounded-full bg-white dark:bg-gray-900 border-4 flex items-center justify-center text-2xl shadow-xl"
            style={{ borderColor: step.accent }}>
            {step.emoji}
          </motion.div>
        </motion.div>
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          className="mt-2 text-[11px] font-black uppercase tracking-wider text-center" style={{ color: step.accent }}>
          {step.title}
        </motion.span>
      </div>

      {/* Spacer */}
      <div className="w-[calc(50%-3.5rem)]" />
    </div>
  );
}

// ── Mobile Step Card ──────────────────────────────────────────────────────────
function MobileStepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.21, 1.02, 0.73, 1] }}
      className="relative pl-10 mb-8">
      {/* Dot */}
      <motion.div animate={{ boxShadow: [`0 0 0 0px ${step.glow}`, `0 0 0 8px ${step.glow}00`] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute left-0 top-4 w-8 h-8 rounded-full border-4 bg-white dark:bg-gray-900 flex items-center justify-center text-sm z-10"
        style={{ borderColor: step.accent }}>
        {step.emoji}
      </motion.div>
      <div onClick={() => setExpanded(!expanded)}
        className={`cursor-pointer rounded-2xl border ${step.border} bg-white dark:bg-gray-900 shadow-md p-5 overflow-hidden`}>
        <div className={`h-1 bg-gradient-to-r ${step.gradient} rounded-full mb-4`} />
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md shrink-0`}>
            <step.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: step.accent }}>
              Step {step.id} · ~{step.time}
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
  const roadRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: roadRef, offset: ["start start", "end end"] });

  // Bee Y position mapped to scroll — follows the winding road
  const beeTop = useTransform(scrollYProgress, [0, 1], ["2%", "95%"]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-indigo-50 via-white to-white dark:from-gray-900 dark:to-gray-950 pt-20 pb-12 overflow-hidden">
        {/* Animated blobs */}
        {[
          { size: 400, color: "bg-orange-200/30 dark:bg-orange-900/15", left: "5%",  top: "10%" },
          { size: 350, color: "bg-blue-200/30   dark:bg-blue-900/15",   left: "70%", top: "20%" },
          { size: 300, color: "bg-purple-200/25 dark:bg-purple-900/10", left: "40%", top: "60%" },
        ].map((b, i) => (
          <motion.div key={i} className={`absolute rounded-full ${b.color} blur-3xl pointer-events-none`}
            style={{ width: b.size, height: b.size, left: b.left, top: b.top }}
            animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], scale: [1, 1.08, 0.96, 1] }}
            transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-6">
            🗺️ Interactive Learning Roadmap
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.21, 1.02, 0.73, 1] }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-5">
            Your path to{" "}
            <span className="bg-gradient-to-r from-orange-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              developer
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Scroll down to follow the 🐝 as it guides you from zero to full-stack web developer.
            Click any milestone to explore what you'll learn.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {STEPS.map((s) => (
              <div key={s.id} className={`flex items-center gap-2 px-4 py-2 rounded-full border ${s.border} ${s.bg} text-sm font-semibold`}
                style={{ color: s.accent }}>
                <span>{s.emoji}</span>{s.title}
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/60 px-5 py-2.5 rounded-full">
            📚 {totalLessons}+ free lessons available right now
          </motion.div>

          {/* Scroll hint */}
          <motion.div className="mt-10 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600"
            animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
            <div className="w-5 h-8 border-2 border-gray-300 dark:border-gray-700 rounded-full flex items-start justify-center pt-1.5">
              <motion.div className="w-1 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full"
                animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Desktop road ─────────────────────────────────────── */}
      <section ref={roadRef} className="relative hidden md:block py-16 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 relative" style={{ minHeight: `${STEPS.length * 340}px` }}>

          {/* SVG road — centred */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-56 h-full pointer-events-none">
            <RoadWrapper scrollYProgress={scrollYProgress} />
          </div>

          {/* Walking bee on the path */}
          <motion.div className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            style={{ top: beeTop }}>
            <WalkingBee />
          </motion.div>

          {/* Step cards — alternate left/right */}
          <div className="relative z-10 pt-8 space-y-8">
            {STEPS.map((step, i) => (
              <div key={step.id} style={{ minHeight: 280 }}>
                <StepCard step={step} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mobile road ──────────────────────────────────────── */}
      <section className="md:hidden py-10 px-4 relative bg-white dark:bg-gray-950">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 via-blue-400 via-yellow-400 to-purple-500 opacity-30" />
        <div className="space-y-0">
          {STEPS.map((step, i) => (
            <MobileStepCard key={step.id} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* ── Tips ─────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
            Tips for the journey 🐝
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "🎯", text: "Don't skip steps. HTML → CSS → JS is the order for a reason." },
              { icon: "🔁", text: "Build something after each topic before moving on. Practice beats reading." },
              { icon: "🧪", text: "Take the quiz after each tutorial to confirm you've understood it." },
              { icon: "📅", text: "30 minutes a day beats 4-hour sessions once a week. Consistency wins." },
              { icon: "💡", text: "When stuck, check the MDN reference link on every lesson — it's invaluable." },
              { icon: "🚀", text: "All tutorials on BEECODEFI are completely free. Start right now." },
            ].map((tip, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-3">{tip.icon}</div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{tip.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto px-4">
          <motion.div className="text-6xl mb-6" animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>🐝</motion.div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Ready to begin?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Step 1 is HTML — and your first lesson is free and ready right now.
            No signup needed to start.
          </p>
          <Link href="/tutorials/html"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all text-base">
            <FileCode2 className="w-5 h-5" />
            Start with HTML
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
