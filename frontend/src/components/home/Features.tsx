"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, TrendingUp, Zap, Code2, Play } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Tutorials",
    description: "Live code editors in every lesson. Edit code and see results instantly — no setup needed.",
    gradient: "from-blue-500 to-cyan-500",
    light: "bg-blue-50 border-blue-100",
    dark: "dark:bg-blue-950/20 dark:border-blue-900/40",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
    number: "01",
  },
  {
    icon: Play,
    title: "Video Courses",
    description: "Full CSS and HTML series directly on the site. Watch here or open the YouTube playlist.",
    gradient: "from-red-500 to-orange-400",
    light: "bg-red-50 border-red-100",
    dark: "dark:bg-red-950/20 dark:border-red-900/40",
    iconBg: "bg-red-100 dark:bg-red-900/40",
    iconColor: "text-red-600 dark:text-red-400",
    number: "02",
  },
  {
    icon: Brain,
    title: "Topic-Based Quizzes",
    description: "Test knowledge after every topic. Detailed explanations with every answer so you actually learn.",
    gradient: "from-purple-500 to-pink-500",
    light: "bg-purple-50 border-purple-100",
    dark: "dark:bg-purple-950/20 dark:border-purple-900/40",
    iconBg: "bg-purple-100 dark:bg-purple-900/40",
    iconColor: "text-purple-600 dark:text-purple-400",
    number: "03",
  },
  {
    icon: TrendingUp,
    title: "Smart Progress Tracking",
    description: "Track every lesson, quiz score, and achievement. Visual roadmap shows your exact position in the journey.",
    gradient: "from-green-500 to-emerald-400",
    light: "bg-green-50 border-green-100",
    dark: "dark:bg-green-950/20 dark:border-green-900/40",
    iconBg: "bg-green-100 dark:bg-green-900/40",
    iconColor: "text-green-600 dark:text-green-400",
    number: "04",
  },
  {
    icon: Zap,
    title: "Achievement Badges",
    description: "Earn badges for completing tutorials, maintaining streaks, and quiz mastery. Show off your skills!",
    gradient: "from-amber-500 to-yellow-400",
    light: "bg-amber-50 border-amber-100",
    dark: "dark:bg-amber-950/20 dark:border-amber-900/40",
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    iconColor: "text-amber-600 dark:text-amber-400",
    number: "05",
  },
  {
    icon: Code2,
    title: "Interactive Roadmap",
    description: "Clear learning path from beginner to advanced. See your position, track stage completion, and celebrate wins.",
    gradient: "from-indigo-500 to-violet-500",
    light: "bg-indigo-50 border-indigo-100",
    dark: "dark:bg-indigo-950/20 dark:border-indigo-900/40",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    number: "06",
  },
];

export default function Features() {
  return (
    <section className="py-28 bg-gray-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            Everything you need
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 tracking-tight">
            Why{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              BEECODEFI
            </span>{" "}
            works
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Every feature designed to make learning faster, more interactive, and genuinely enjoyable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
              whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
              className={`group relative p-7 rounded-2xl border ${f.light} ${f.dark} overflow-hidden cursor-default bg-white dark:bg-transparent`}
              data-cursor-grow
            >
              {/* Number watermark */}
              <div className="absolute top-4 right-5 text-6xl font-black text-gray-100 dark:text-white/[0.03] select-none">
                {f.number}
              </div>

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 6 }}
                transition={{ type: "spring", stiffness: 400 }}
                className={`w-13 h-13 w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center mb-5`}
              >
                <f.icon className={`w-6 h-6 ${f.iconColor}`} />
              </motion.div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{f.description}</p>

              {/* Hover bottom bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${f.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
