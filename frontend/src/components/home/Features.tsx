"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, TrendingUp, Zap, Code2, Play } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Tutorials",
    description: "Step-by-step lessons with live code editors. Edit code and see results instantly — no setup needed.",
    gradient: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/30",
    border: "border-blue-500/20",
    bg: "bg-blue-500/5",
    number: "01",
  },
  {
    icon: Play,
    title: "Video Courses",
    description: "Watch the full CSS and HTML video series directly on the site, or open the YouTube playlist.",
    gradient: "from-red-500 to-orange-400",
    glow: "shadow-red-500/30",
    border: "border-red-500/20",
    bg: "bg-red-500/5",
    number: "02",
  },
  {
    icon: Brain,
    title: "Topic-Based Quizzes",
    description: "Test your knowledge after every topic. Detailed explanations with every answer so you actually learn.",
    gradient: "from-purple-500 to-pink-400",
    glow: "shadow-purple-500/30",
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
    number: "03",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "Create a free account. Save lesson progress, track quiz scores, and see how far you've come.",
    gradient: "from-green-500 to-emerald-400",
    glow: "shadow-green-500/30",
    border: "border-green-500/20",
    bg: "bg-green-500/5",
    number: "04",
  },
  {
    icon: Code2,
    title: "Real Code Examples",
    description: "Every concept shown with real, runnable code. Live preview for HTML/CSS so you see it immediately.",
    gradient: "from-amber-500 to-yellow-400",
    glow: "shadow-amber-500/30",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    number: "05",
  },
  {
    icon: Zap,
    title: "Free Forever",
    description: "No paywalls, no premium tiers, no credit card. Quality education should be accessible to everyone.",
    gradient: "from-indigo-500 to-violet-400",
    glow: "shadow-indigo-500/30",
    border: "border-indigo-500/20",
    bg: "bg-indigo-500/5",
    number: "06",
  },
];

export default function Features() {
  return (
    <section className="py-28 bg-slate-950 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(99,102,241,0.8) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            Everything you need
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Why{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              BEECODEFI
            </span>{" "}
            works
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Every feature is designed to make learning faster, more interactive, and more enjoyable.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`group relative p-7 rounded-2xl ${feature.bg} border ${feature.border} backdrop-blur-sm cursor-default overflow-hidden`}
            >
              {/* Number watermark */}
              <div className="absolute top-4 right-5 text-6xl font-black text-white/[0.03] select-none">
                {feature.number}
              </div>

              {/* Glow on hover */}
              <motion.div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_40px_rgba(99,102,241,0.08)]`}
              />

              {/* Icon */}
              <div className="relative mb-5">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg ${feature.glow}`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>

              {/* Bottom gradient line */}
              <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
