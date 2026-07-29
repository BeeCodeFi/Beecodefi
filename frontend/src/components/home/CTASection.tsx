"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, BookOpen, Brain, Play } from "lucide-react";

const floatingItems = [
  { icon: "📚", x: "8%",  y: "20%", delay: 0,    dur: 6  },
  { icon: "🎯", x: "88%", y: "15%", delay: 1,    dur: 7  },
  { icon: "⚡", x: "5%",  y: "70%", delay: 0.5,  dur: 5  },
  { icon: "🚀", x: "85%", y: "65%", delay: 1.5,  dur: 8  },
  { icon: "💡", x: "45%", y: "85%", delay: 0.8,  dur: 6  },
  { icon: "🐝", x: "50%", y: "10%", delay: 0.3,  dur: 9  },
];

export default function CTASection() {
  return (
    <section className="py-28 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 via-slate-950 to-purple-950/40" />

      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating emojis */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none pointer-events-none hidden md:block"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [-12, 12, -12], rotate: [-8, 8, -8] }}
          transition={{ duration: item.dur, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        {/* Rocket icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30"
        >
          <Rocket className="w-10 h-10 text-white" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6"
        >
          Your dev journey{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            starts here
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          No account required to start. Dive into tutorials, watch video courses, and test your knowledge with quizzes — completely free.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link
            href="/tutorials"
            className="group flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
          >
            <BookOpen className="w-5 h-5" />
            Start with Tutorials
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/courses"
            className="group flex items-center gap-2.5 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            <Play className="w-4 h-4 text-red-400" />
            Watch Courses
          </Link>
          <Link
            href="/quiz"
            className="group flex items-center gap-2.5 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            <Brain className="w-4 h-4 text-purple-400" />
            Take a Quiz
          </Link>
        </motion.div>

        {/* Sign up nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-white/[0.04] border border-white/10 rounded-2xl text-sm text-slate-400"
        >
          <span className="text-emerald-400 font-semibold">✓ Free account</span>
          saves your progress, quiz scores, and completed lessons.
          <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-2 transition-colors">
            Sign up free →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
