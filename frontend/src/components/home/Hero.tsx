"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowRight, BookOpen, Brain, Sparkles, Play, Zap } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { courses } from "@/data/courses";
import { tutorials } from "@/data/tutorials";

const totalVideos  = courses.reduce((s, c) => s + c.videos.length, 0);

// ── Hook to check for in-progress tutorials ──────────────────────────────
function useContinueLearning() {
  const [resume, setResume] = useState<{
    slug: string;
    lessonSlug: string;
    trackTitle: string;
    lessonTitle: string;
    progress: number;
  } | null>(null);

  useEffect(() => {
    // Find the most recently viewed tutorial that isn't fully complete
    let best: typeof resume = null;
    for (const track of tutorials) {
      const savedIdx = localStorage.getItem(`tutorial-lesson-${track.slug}`);
      const progressRaw = localStorage.getItem(`tutorial-progress-${track.slug}`);
      if (savedIdx === null) continue;
      const idx = parseInt(savedIdx, 10);
      if (isNaN(idx) || idx < 0) continue;
      const lesson = track.lessons[idx];
      if (!lesson) continue;
      const completed: number[] = progressRaw ? JSON.parse(progressRaw) : [];
      const progress = Math.round((completed.length / track.lessons.length) * 100);
      // Only show if not 100% done
      if (progress < 100) {
        best = {
          slug: track.slug,
          lessonSlug: lesson.slug,
          trackTitle: track.title,
          lessonTitle: lesson.title,
          progress,
        };
        break;
      }
    }
    setResume(best);
  }, []);

  return resume;
}

// ── Animated counter ──────────────────────────────────────────────────────
function Counter({ to, duration = 2 }: { to: number; duration?: number }) {
  const count   = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const c = animate(count, to, { duration, ease: "easeOut" });
    const u = rounded.on("change", setVal);
    return () => { c.stop(); u(); };
  }, [to, duration, count, rounded]);
  return <>{val}</>;
}

// ── Word-by-word reveal (Awwwards signature) ──────────────────────────────
function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap justify-center gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: "110%", rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            delay: delay + i * 0.08,
            duration: 0.65,
            ease: [0.21, 1.02, 0.73, 1],
          }}
          className="inline-block overflow-hidden"
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ── Typing word cycle ─────────────────────────────────────────────────────
const WORDS  = ["HTML", "CSS", "JavaScript"];
const COLORS = [
  "text-orange-500 dark:text-orange-400",
  "text-blue-600  dark:text-blue-400",
  "text-yellow-500 dark:text-yellow-400",
];

function TypingWord() {
  const [wi, setWi]           = useState(0);
  const [displayed, setDisp]  = useState("");
  const [deleting, setDel]    = useState(false);

  useEffect(() => {
    const word = WORDS[wi];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length)
      t = setTimeout(() => setDisp(word.slice(0, displayed.length + 1)), 100);
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDel(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisp(displayed.slice(0, -1)), 55);
    else { setDel(false); setWi((i) => (i + 1) % WORDS.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, wi]);

  return (
    <span className={`${COLORS[wi]} inline-block min-w-[190px] sm:min-w-[260px]`}>
      {displayed}<span className="animate-pulse">|</span>
    </span>
  );
}

// ── Magnetic button ───────────────────────────────────────────────────────
function MagneticLink({ href, children, className }: { href: string; children: React.ReactNode; className: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x   = useSpring(0, { stiffness: 200, damping: 20 });
  const y   = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el   = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }, [x, y]);

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}



// ── Floating code snippet ─────────────────────────────────────────────────
const snippets = [
  { code: "<h1>Hello World</h1>",         color: "text-orange-500 dark:text-orange-400", left: "4%",  top: "18%" },
  { code: "display: flex; gap: 1rem;",     color: "text-blue-600 dark:text-blue-400",    left: "72%", top: "12%" },
  { code: "const learn = () => 🐝",        color: "text-yellow-600 dark:text-yellow-400",left: "78%", top: "55%" },
  { code: ".card { border-radius: 12px }", color: "text-green-600 dark:text-green-400",  left: "2%",  top: "68%" },
  { code: "await fetch('/api/data')",       color: "text-purple-600 dark:text-purple-400",left: "68%", top: "80%" },
  { code: "for (const item of list)",       color: "text-pink-600 dark:text-pink-400",    left: "6%",  top: "84%" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const resumeLesson = useContinueLearning();

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden
        bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50/30
        dark:from-slate-950 dark:via-indigo-950/60 dark:to-slate-950"
    >
      {/* ── Parallax blobs ─────────────────────────────────────── */}
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 pointer-events-none">
        {[
          { size: 600, color: "bg-indigo-200/40 dark:bg-indigo-600/15", left: "-5%",  top: "-10%" },
          { size: 500, color: "bg-purple-200/30 dark:bg-purple-600/10", left: "65%",  top: "25%"  },
          { size: 400, color: "bg-pink-200/25   dark:bg-pink-600/10",   left: "20%",  top: "55%"  },
          { size: 350, color: "bg-cyan-200/20   dark:bg-cyan-600/8",    left: "78%",  top: "65%"  },
        ].map((o, i) => (
          <motion.div key={i}
            className={`absolute rounded-full ${o.color} blur-3xl`}
            style={{ width: o.size, height: o.size, left: o.left, top: o.top }}
            animate={{ x: [0, 25, -15, 0], y: [0, -20, 15, 0], scale: [1, 1.08, 0.96, 1] }}
            transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      {/* ── Dot grid ───────────────────────────────────────────── */}
      <div className="absolute inset-0 opacity-20 dark:opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.35) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
      />

      {/* ── Floating code snippets ─────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden xl:block">
        {snippets.map((s, i) => (
          <motion.div key={i} className="absolute" style={{ left: s.left, top: s.top }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: [0, 0.85, 0.85, 0], y: [16, 0, 0, -16] }}
            transition={{ delay: i * 1.2 + 1.5, duration: 9, repeat: Infinity, repeatDelay: 3 }}
          >
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/50 rounded-lg px-3 py-1.5 font-mono text-xs shadow-sm">
              <span className={s.color}>{s.code}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Bee ────────────────────────────────────────────────── */}
      <motion.div className="absolute top-24 right-[13%] text-5xl hidden xl:block select-none"
        animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >🐝</motion.div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
              bg-indigo-100/80 dark:bg-indigo-500/10
              border border-indigo-200 dark:border-indigo-500/30
              text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-4 h-4" />
            </motion.div>
            100% Free · No Credit Card · No Paywall
          </motion.div>

          {/* ── Word-by-word headline reveal ── */}
          <div className="text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-tight leading-tight mb-6 text-gray-900 dark:text-white overflow-hidden">
            <div className="flex flex-wrap justify-center gap-x-4">
              <WordReveal text="Learn" delay={0.1} />
              {/* Typing word */}
              <motion.span
                initial={{ opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.65, ease: [0.21, 1.02, 0.73, 1] }}
                className="inline-block"
              >
                <TypingWord />
              </motion.span>
            </div>
            <div className="mt-2">
              <motion.span
                initial={{ opacity: 0, y: "110%", rotate: 3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.21, 1.02, 0.73, 1] }}
                className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
              >
                for Free
              </motion.span>
            </div>
          </div>

          {/* Subtitle — staggered word reveal */}
          <div className="text-lg sm:text-xl text-gray-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed overflow-hidden">
            <WordReveal
              text="Interactive tutorials, video courses, and quizzes for web development."
              delay={0.55}
              className="text-gray-600 dark:text-slate-400"
            />
          </div>

          {/* Continue Learning CTA — only for returning users */}
          {resumeLesson && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
              className="mb-6"
            >
              <Link
                href={`/tutorials/${resumeLesson.slug}?lesson=${resumeLesson.lessonSlug}`}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl
                  bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-950/30 dark:to-cyan-950/30
                  border-2 border-emerald-200 dark:border-emerald-500/30
                  hover:border-emerald-400 dark:hover:border-emerald-400/50
                  shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Continue {resumeLesson.trackTitle}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[260px]">{resumeLesson.lessonTitle}</p>
                </div>
                {/* Progress pill */}
                <div className="flex items-center gap-2 ml-2">
                  <div className="w-20 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                      style={{ width: `${resumeLesson.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{resumeLesson.progress}%</span>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-500 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            </motion.div>
          )}

          {/* ── Magnetic CTA buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <MagneticLink href="/tutorials"
              className="group flex items-center gap-2.5 px-8 py-4
                bg-gradient-to-r from-indigo-600 to-purple-600
                hover:from-indigo-500 hover:to-purple-500
                text-white font-semibold rounded-xl cursor-pointer
                shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
            >
              <BookOpen className="w-5 h-5" />
              Start Learning
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </MagneticLink>

            <MagneticLink href="/courses"
              className="group flex items-center gap-2.5 px-8 py-4 cursor-pointer
                bg-white dark:bg-white/5 text-gray-800 dark:text-white font-semibold rounded-xl
                border border-gray-200 dark:border-white/10
                hover:bg-gray-50 dark:hover:bg-white/10
                hover:border-red-300 dark:hover:border-white/20 transition-all duration-300 shadow-sm"
            >
              <Play className="w-4 h-4 text-red-500" />
              Watch Courses
            </MagneticLink>

            <MagneticLink href="/quiz"
              className="group flex items-center gap-2.5 px-8 py-4 cursor-pointer
                bg-white dark:bg-white/5 text-gray-800 dark:text-white font-semibold rounded-xl
                border border-gray-200 dark:border-white/10
                hover:bg-gray-50 dark:hover:bg-white/10
                hover:border-purple-300 dark:hover:border-white/20 transition-all duration-300 shadow-sm"
            >
              <Brain className="w-4 h-4 text-purple-500" />
              Take a Quiz
            </MagneticLink>
          </motion.div>

          {/* ── Staggered stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px
              bg-gray-200/60 dark:bg-white/5 rounded-2xl overflow-hidden
              border border-gray-200/60 dark:border-white/10 shadow-sm"
          >
            {[
              { value: 50, suffix: "+", label: "Lessons",    icon: BookOpen, color: "text-indigo-600 dark:text-indigo-400" },
              { value: totalVideos,  suffix: "",  label: "Videos",     icon: Play,     color: "text-red-500   dark:text-red-400"     },
              { value: 3,            suffix: "",  label: "Quiz Topics", icon: Brain,    color: "text-purple-600 dark:text-purple-400" },
              { value: 100,          suffix: "%", label: "Free",        icon: Sparkles, color: "text-green-600 dark:text-green-400"  },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
                className="bg-white/70 dark:bg-white/[0.03] px-6 py-6 flex flex-col items-center gap-2"
              >
                <s.icon className={`w-5 h-5 ${s.color} mb-1`} />
                <div className={`text-3xl font-extrabold ${s.color}`}>
                  <Counter to={s.value} duration={2 + i * 0.3} />{s.suffix}
                </div>
                <div className="text-xs text-gray-500 dark:text-slate-500 font-medium uppercase tracking-wider">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Staggered pill tags ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 1.4 } } }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { label: "HTML",          color: "border-orange-400/40 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/5"   },
              { label: "CSS",           color: "border-blue-400/40   text-blue-600   dark:text-blue-400   bg-blue-50   dark:bg-blue-500/5"     },
              { label: "JavaScript",    color: "border-yellow-400/40 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/5"   },
              { label: "Tutorials",     color: "border-indigo-400/40 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/5"   },
              { label: "Video Courses", color: "border-red-400/40    text-red-600    dark:text-red-400    bg-red-50    dark:bg-red-500/5"       },
              { label: "Quizzes",       color: "border-purple-400/40 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/5"   },
            ].map((p) => (
              <motion.span key={p.label}
                variants={{ hidden: { opacity: 0, scale: 0.7, y: 10 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300 } } }}
                whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${p.color} backdrop-blur-sm cursor-default`}
              >
                {p.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400 dark:text-slate-600"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-5 h-8 border-2 border-gray-300 dark:border-slate-700 rounded-full flex items-start justify-center pt-1.5">
          <motion.div className="w-1 h-1.5 bg-gray-400 dark:bg-slate-500 rounded-full"
            animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
}
