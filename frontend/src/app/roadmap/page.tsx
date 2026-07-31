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
    accent: "#ea6b1a",
    darkBg: "#110700",
    lightCardBg: "#fff8f2",
    lightBorder: "#f7c9a0",
    lightNumColor: "#f4b07a",
    gradient: "from-orange-500 to-red-500",
    shadow: "0 20px 60px rgba(234,107,26,0.18)",
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
    accent: "#2563eb",
    darkBg: "#00050f",
    lightCardBg: "#f2f6ff",
    lightBorder: "#93c5fd",
    lightNumColor: "#93c5fd",
    gradient: "from-blue-500 to-indigo-600",
    shadow: "0 20px 60px rgba(37,99,235,0.14)",
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
    accent: "#b45309",
    darkBg: "#0f0d00",
    lightCardBg: "#fffcf0",
    lightBorder: "#fcd34d",
    lightNumColor: "#fbbf24",
    gradient: "from-yellow-500 to-amber-500",
    shadow: "0 20px 60px rgba(180,83,9,0.14)",
    tutorialSlug: "javascript", time: "4–6 wks",
    icon: Braces,
    skills: ["Functions & Scope", "DOM Manipulation", "Events", "Async / Await", "ES6+ Features"],
    stat: "18", statUnit: "lessons",
  },
  {
    id: 4, number: "04", emoji: "🚀",
    title: "React", fullTitle: "React & Next.js",
    tagline: "Build production apps",
    desc: "With the fundamentals solid, you are ready for React — the world most in-demand frontend library. Components, hooks, routing, and deploying real apps with Next.js.",
    accent: "#7c3aed",
    darkBg: "#07000f",
    lightCardBg: "#f7f5ff",
    lightBorder: "#c4b5fd",
    lightNumColor: "#a78bfa",
    gradient: "from-violet-500 to-purple-600",
    shadow: "0 20px 60px rgba(124,58,237,0.14)",
    tutorialSlug: null, time: "6–8 wks",
    icon: Rocket,
    skills: ["Components & Props", "State & Hooks", "React Router", "Next.js", "Deployment"],
    stat: "Soon", statUnit: "coming",
    comingSoon: true,
  },
] as const;

type Step = typeof STEPS[number];

function StepCard({ step, index, isDark }: { step: Step; index: number; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  const cardBg  = isDark ? "rgb(17 24 39)"  : step.lightCardBg;
  const cardBdr = isDark ? `${step.accent}28` : step.lightBorder;
  const textPri = isDark ? "#f9fafb" : "#111827";
  const textSec = isDark ? "#9ca3af" : "#4b5563";
  const divider = isDark ? "#374151" : "#e5e7eb";

  return (
    <div ref={ref} className={`relative flex items-center gap-0 mb-24 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
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
            className="cursor-pointer rounded-3xl overflow-hidden"
            style={{ background: cardBg, border: `1.5px solid ${cardBdr}`, boxShadow: inView ? step.shadow : "none", transition: "box-shadow 0.4s ease" }}
          >
            <div className={`h-1.5 bg-gradient-to-r ${step.gradient}`} />
            <div className="p-7 relative overflow-hidden">
              <div className="absolute right-4 bottom-3 text-[9rem] font-black leading-none pointer-events-none select-none"
                style={{ color: isDark ? `${step.accent}10` : step.lightNumColor, opacity: isDark ? 1 : 0.25 }}>
                {step.number}
              </div>
              <div className="flex items-center gap-4 mb-5 relative">
                <motion.div whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shrink-0`}
                  style={{ boxShadow: `0 8px 24px ${step.accent}35` }}>
                  <step.icon className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-black uppercase tracking-[0.25em]" style={{ color: step.accent }}>
                      Stage {step.number}
                    </span>
                    {"comingSoon" in step && step.comingSoon && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: isDark ? "rgba(139,92,246,0.2)" : "#ede9fe", color: isDark ? "#c4b5fd" : "#7c3aed" }}>
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-extrabold leading-tight" style={{ color: textPri }}>{step.fullTitle}</h3>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: step.accent }}>{step.tagline}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-5 relative" style={{ color: textSec }}>{step.desc}</p>
              <div className="flex items-center justify-between mb-4 relative">
                <div className="flex items-center gap-5">
                  <div>
                    <div className="text-2xl font-black leading-none" style={{ color: textPri }}>{step.stat}</div>
                    <div className="text-[11px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: step.accent }}>{step.statUnit}</div>
                  </div>
                  <div className="w-px h-8" style={{ background: divider }} />
                  <div>
                    <div className="text-2xl font-black leading-none" style={{ color: textPri }}>{step.time}</div>
                    <div className="text-[11px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: step.accent }}>timeline</div>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                  style={{ background: `${step.accent}15`, color: step.accent }}>
                  Skills
                  <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.span>
                </button>
              </div>
              <AnimatePresence>
                {expanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                    className="overflow-hidden mb-4 relative">
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {step.skills.map((s, i) => (
                        <motion.span key={s} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg"
                          style={{ background: isDark ? "rgba(255,255,255,0.06)" : `${step.accent}0d`, border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : step.lightBorder}`, color: isDark ? "#d1d5db" : "#374151" }}>
                          <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: step.accent }} />
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex gap-2.5 relative">
                {step.tutorialSlug ? (
                  <Link href={`/tutorials/${step.tutorialSlug}`} onClick={(e) => e.stopPropagation()}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r ${step.gradient} text-white text-sm font-bold hover:-translate-y-0.5 active:translate-y-0 transition-transform`}
                    style={{ boxShadow: `0 6px 20px ${step.accent}40` }}>
                    <BookOpen className="w-4 h-4" /> Start Learning <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold cursor-not-allowed"
                    style={{ background: isDark ? "rgba(255,255,255,0.06)" : "#f3f4f6", color: isDark ? "#6b7280" : "#9ca3af" }}>
                    <Rocket className="w-4 h-4" /> Coming Soon
                  </div>
                )}
                {step.tutorialSlug && (
                  <Link href={`/quiz?category=${step.tutorialSlug}`} onClick={(e) => e.stopPropagation()}
                    title="Take Quiz"
                    className="px-4 py-3 rounded-2xl flex items-center justify-center transition-colors"
                    style={{ background: isDark ? "rgba(255,255,255,0.08)" : `${step.accent}12`, color: isDark ? "#9ca3af" : step.accent }}>
                    <Brain className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="w-24 flex flex-col items-center shrink-0">
        <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.25 }}>
          <motion.div
            animate={{ boxShadow: [`0 0 0 0px ${step.accent}00`, `0 0 0 12px ${step.accent}00`] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-14 h-14 rounded-full border-4 flex items-center justify-center text-2xl"
            style={{ borderColor: step.accent, background: isDark ? "#111827" : step.lightCardBg, boxShadow: `0 4px 20px ${step.accent}30` }}>
            {step.emoji}
          </motion.div>
        </motion.div>
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-2 text-[11px] font-black uppercase tracking-wider text-center"
          style={{ color: step.accent }}>
          {step.title}
        </motion.span>
      </div>
      <div className="w-[calc(50%-3rem)]" />
    </div>
  );
}

function MobileStepCard({ step, index, isDark }: { step: Step; index: number; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);
  const cardBg  = isDark ? "#111827" : step.lightCardBg;
  const textPri = isDark ? "#f9fafb" : "#111827";
  const textSec = isDark ? "#9ca3af" : "#4b5563";

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.21, 1.02, 0.73, 1] }}
      className="relative pl-10 mb-8">
      <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
        className="absolute left-0 top-4 w-8 h-8 rounded-full border-4 flex items-center justify-center text-sm z-10"
        style={{ borderColor: step.accent, background: isDark ? "#111827" : step.lightCardBg, boxShadow: `0 2px 12px ${step.accent}30` }}>
        {step.emoji}
      </motion.div>
      <div onClick={() => setExpanded(!expanded)} className="cursor-pointer rounded-2xl p-5 overflow-hidden"
        style={{ background: cardBg, border: `1.5px solid ${isDark ? `${step.accent}22` : step.lightBorder}`, boxShadow: `0 4px 20px ${step.accent}12` }}>
        <div className={`h-1 bg-gradient-to-r ${step.gradient} rounded-full mb-4`} />
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shrink-0`}>
            <step.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: step.accent }}>
              Stage {step.number} · {step.time}
            </span>
            <h3 className="text-base font-extrabold" style={{ color: textPri }}>{step.fullTitle}</h3>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: textSec }}>{step.desc}</p>
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
              <div className="flex flex-wrap gap-1.5">
                {step.skills.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-lg flex items-center gap-1"
                    style={{ background: isDark ? "rgba(255,255,255,0.06)" : `${step.accent}0d`, border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : step.lightBorder}`, color: textSec }}>
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
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r ${step.gradient} text-white text-xs font-bold`}
              style={{ boxShadow: `0 4px 12px ${step.accent}35` }}>
              <BookOpen className="w-3.5 h-3.5" /> Start <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <div className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold cursor-not-allowed"
              style={{ background: isDark ? "rgba(255,255,255,0.06)" : "#f3f4f6", color: isDark ? "#6b7280" : "#9ca3af" }}>
              <Rocket className="w-3.5 h-3.5" /> Coming Soon
            </div>
          )}
          <button onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors"
            style={{ background: isDark ? "rgba(255,255,255,0.08)" : `${step.accent}12`, color: isDark ? "#9ca3af" : step.accent }}>
            {expanded ? "Less up" : "Skills down"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

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

  const heroBg    = isDark ? "#030712" : "#f9fafb";
  const dotColor  = isDark ? "rgba(255,255,255,0.055)" : "rgba(99,102,241,0.10)";
  const badgeBg   = isDark ? "rgba(255,255,255,0.05)" : "rgba(99,102,241,0.07)";
  const badgeBdr  = isDark ? "rgba(255,255,255,0.10)" : "rgba(99,102,241,0.18)";
  const badgeText = isDark ? "rgba(255,255,255,0.50)" : "#3730a3";
  const headText  = isDark ? "text-white" : "text-gray-900";
  const scrollCue = isDark ? "rgba(255,255,255,0.25)" : "rgba(99,102,241,0.40)";
  const scrollTxt = isDark ? "rgba(255,255,255,0.28)" : "#6366f1";
  const tipsBg    = isDark ? "#0d1117" : "#f1f5f9";
  const tipsCard  = isDark ? "#111827" : "#ffffff";
  const tipsCardB = isDark ? "rgba(255,255,255,0.07)" : "#e2e8f0";
  const tipsNum   = isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0";
  const tipsText  = isDark ? "#d1d5db" : "#374151";
  const tipsHead  = isDark ? "#ffffff" : "#0f172a";

  return (
    <div style={{ background: isDark ? "#030712" : "#ffffff" }} className="min-h-screen">

      <section ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ background: heroBg }}>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { color: isDark ? "rgba(249,115,22,0.12)" : "rgba(234,107,26,0.12)", left: "8%",  top: "18%", size: 520 },
            { color: isDark ? "rgba(59,130,246,0.09)"  : "rgba(37,99,235,0.09)",  left: "72%", top: "8%",  size: 460 },
            { color: isDark ? "rgba(139,92,246,0.08)"  : "rgba(124,58,237,0.08)", left: "42%", top: "62%", size: 400 },
          ].map((o, i) => (
            <motion.div key={i} className="absolute rounded-full blur-3xl"
              style={{ width: o.size, height: o.size, left: o.left, top: o.top, background: o.color }}
              animate={{ x: [0, 25, -15, 0], y: [0, -18, 12, 0] }}
              transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut" }} />
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(${dotColor} 1.2px, transparent 1.2px)`, backgroundSize: "40px 40px" }} />

        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${isDark ? "#030712" : "#ffffff"})` }} />

        <div className="relative text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-10 backdrop-blur-sm"
            style={{ background: badgeBg, border: `1px solid ${badgeBdr}`, color: badgeText }}>
            🗺️ Interactive Roadmap · {totalLessons}+ free lessons
          </motion.div>

          <div className="mb-3">
            <SplitText text="Dev" delay={0.15} stagger={0.06}
              className={`text-[18vw] sm:text-[14vw] md:text-[11vw] font-black tracking-tight leading-none ${headText}`} />
          </div>
          <div className="mb-10">
            <SplitText text="Roadmap" delay={0.3} stagger={0.04}
              className="text-[18vw] sm:text-[14vw] md:text-[11vw] font-black tracking-tight leading-none bg-gradient-to-r from-orange-500 via-blue-500 to-violet-500 bg-clip-text text-transparent" />
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {STEPS.map((s, i) => (
              <motion.div key={s.id}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                style={{ border: `1px solid ${s.accent}30`, color: s.accent, background: `${s.accent}10` }}>
                {s.emoji} {s.title}
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="flex flex-col items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: scrollTxt }}>
              Scroll to explore
            </span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
              style={{ border: `2px solid ${scrollCue}` }}>
              <motion.div className="w-1.5 h-2 rounded-full" style={{ background: scrollCue }}
                animate={{ y: [0, 14, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative hidden md:block py-24 overflow-hidden"
        style={{ background: isDark ? "#030712" : "#ffffff" }}>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5"
          style={{ background: "linear-gradient(to bottom, transparent, #ea6b1a 10%, #2563eb 35%, #b45309 65%, #7c3aed 90%, transparent)" }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {STEPS.map((step, i) => (
            <StepCard key={step.id} step={step} index={i} isDark={isDark} />
          ))}
        </div>
      </section>

      <section className="md:hidden py-12 px-5 relative"
        style={{ background: isDark ? "#030712" : "#ffffff" }}>
        <div className="absolute left-4 top-0 bottom-0 w-0.5"
          style={{ background: "linear-gradient(to bottom, transparent, #ea6b1a 10%, #2563eb 35%, #b45309 65%, #7c3aed 90%, transparent)" }} />
        {STEPS.map((step, i) => (
          <MobileStepCard key={step.id} step={step} index={i} isDark={isDark} />
        ))}
      </section>

      <section className="py-24" style={{ background: tipsBg }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-14 text-center">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: tipsHead }}>
              Tips for the journey
            </h2>
            <p className="mt-3 text-base" style={{ color: isDark ? "#6b7280" : "#64748b" }}>
              Straight talk from everyone who has walked this path before you.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { n: "01", accent: "#ea6b1a", text: "Do not skip steps. HTML, CSS, JS is the order for a reason. Each one builds on the last." },
              { n: "02", accent: "#2563eb", text: "Build something after each topic. A real mini-project beats watching 10 more tutorials." },
              { n: "03", accent: "#b45309", text: "Take the quiz after each track. It surfaces the gaps you did not know you had." },
              { n: "04", accent: "#7c3aed", text: "30 minutes every day beats 4-hour sessions on weekends. Consistency compounds." },
              { n: "05", accent: "#ea6b1a", text: "When stuck, MDN is your bible. Every lesson has a direct MDN reference link." },
              { n: "06", accent: "#2563eb", text: "Everything here is completely free. No paywalls. No upsells. Just start." },
            ].map((tip, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 relative overflow-hidden cursor-default transition-shadow hover:shadow-xl"
                style={{ background: tipsCard, border: `1.5px solid ${tipsCardB}`, boxShadow: `0 2px 12px ${tip.accent}08` }}>
                <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl"
                  style={{ background: `${tip.accent}0e` }} />
                <div className="text-5xl font-black mb-4 leading-none" style={{ color: tipsNum }}>{tip.n}</div>
                <p className="text-sm leading-relaxed" style={{ color: tipsText }}>{tip.text}</p>
                <div className="mt-4 h-0.5 w-8 rounded-full" style={{ background: tip.accent }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 overflow-hidden"
        style={{ background: isDark ? "#030712" : "#0f172a" }}>
        <motion.div className="absolute inset-0 pointer-events-none"
          animate={{ background: [
            "radial-gradient(ellipse at 50% 50%, rgba(234,107,26,0.12) 0%, transparent 65%)",
            "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 65%)",
            "radial-gradient(ellipse at 50% 50%, rgba(234,107,26,0.12) 0%, transparent 65%)",
          ]}}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="relative text-center max-w-2xl mx-auto px-6">
          <motion.div className="text-6xl mb-6 block"
            animate={{ y: [-8, 8, -8], rotate: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity }}>🐝</motion.div>
          <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-5">
            Stage 01<br />
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              starts now
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            HTML is free and waiting. No account needed to begin your first lesson.
          </p>
          <Link href="/tutorials/html"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-2xl text-base hover:-translate-y-1 transition-all"
            style={{ boxShadow: "0 16px 40px rgba(234,107,26,0.40)" }}>
            <FileCode2 className="w-5 h-5" /> Begin Stage 01 <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
