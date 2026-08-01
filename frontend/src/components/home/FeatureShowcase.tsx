"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Award, Map, Trophy, Target, ArrowRight, Sparkles, TrendingUp } from "lucide-react";

const showcaseFeatures = [
  {
    title: "Interactive Roadmap",
    description: "Your personalized learning journey with visual progress tracking",
    icon: Map,
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    bgGradient: "from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30",
    features: [
      "See your exact position on the learning path",
      "Track completion across all tutorials",
      "Stage-by-stage progress indicators",
      "Personalized Continue Learning CTA",
    ],
    href: "/roadmap",
    preview: "🗺️",
    stats: { label: "Learning Stages", value: "9+" },
  },
  {
    title: "Achievement Badges",
    description: "Unlock badges as you master new skills and reach milestones",
    icon: Award,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    bgGradient: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
    features: [
      "Tutorial completion badges (HTML Master, CSS Wizard, JS Pro)",
      "Quiz mastery and perfect score achievements",
      "Streak badges for daily learning",
      "Lesson milestone rewards (10, 25, 50, 100+)",
    ],
    href: "/badges",
    preview: "🏆",
    stats: { label: "Total Badges", value: "15+" },
  },
  {
    title: "Leaderboard & Rankings",
    description: "Compete with learners worldwide and track your progress",
    icon: Trophy,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
    features: [
      "Global leaderboard rankings",
      "Points for lessons and quizzes",
      "Current streak tracking",
      "Personal stats and achievements",
    ],
    href: "/leaderboard",
    preview: "👑",
    stats: { label: "Active Learners", value: "1000+" },
  },
  {
    title: "Unified Dashboard",
    description: "All your learning activity in one powerful, beautiful view",
    icon: Target,
    gradient: "from-blue-500 via-cyan-500 to-sky-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    features: [
      "Tutorial progress overview",
      "Recent quiz attempts and scores",
      "Current streak and stats",
      "Bookmarked lessons quick access",
    ],
    href: "/dashboard",
    preview: "📊",
    stats: { label: "Data Points", value: "Real-time" },
  },
];

export default function FeatureShowcase() {
  return (
    <section className="py-28 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{ 
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(99,102,241,0.4) 1px, transparent 0)",
          backgroundSize: "48px 48px" 
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            New Features
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 tracking-tight">
            Your Complete Learning{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Track progress, earn badges, compete on leaderboards, and visualize your journey — all in one place.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {showcaseFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <Link href={feature.href}>
                <div className={`relative h-full p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br ${feature.bgGradient} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}>
                  {/* Preview emoji */}
                  <div className="absolute top-6 right-6 text-6xl opacity-10 dark:opacity-5 select-none pointer-events-none">
                    {feature.preview}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2.5 mb-6">
                    {feature.features.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <span className={`mt-0.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient} flex-shrink-0`} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Stats & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-2xl font-black bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                        {feature.stats.value}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 font-medium uppercase tracking-wider">
                        {feature.stats.label}
                      </div>
                    </div>
                    <motion.div
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r ${feature.gradient} text-white text-sm font-bold group-hover:gap-2.5 transition-all`}
                    >
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Hover gradient border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 group"
          >
            <TrendingUp className="w-5 h-5" />
            Create Free Account to Track Progress
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            No credit card required · Start learning in seconds
          </p>
        </motion.div>
      </div>
    </section>
  );
}
