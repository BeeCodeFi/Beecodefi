"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, TrendingUp, Zap } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Tutorials",
    description: "Learn HTML, CSS, and JavaScript with step-by-step tutorials featuring real code examples you can study and practice.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Brain,
    title: "Topic-Based Quizzes",
    description: "Test your knowledge with carefully crafted quizzes. Track your scores and see detailed explanations for every answer.",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "Create a free account to save your progress, track completed lessons, and monitor your quiz performance over time.",
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    icon: Zap,
    title: "Free Forever",
    description: "No paywalls, no premium tiers. BEECODEFI is completely free because quality education should be accessible to all.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose{" "}
            <span className="text-gradient">BEECODEFI</span>?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to start your web development journey, completely free.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={`group relative p-6 rounded-2xl ${feature.bg} border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
