"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, Users, Zap, Target, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";

// ── Total quiz count: 45 standalone quizzes + 52 quick quizzes in tutorials = 97 ──
// Breakdown: Standalone (15 HTML + 14 CSS + 16 JS) + Quick (13 HTML + 19 CSS + 20 JS)
const totalQuizCount = 97;

export default function PlatformStats() {
  const [userCount, setUserCount] = useState(1000); // Default fallback

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const { data } = await api.get<{ totalUsers: number }>("/stats/platform");
        setUserCount(data.totalUsers);
      } catch (error) {
        console.error("Failed to fetch user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  const stats = [
    {
      icon: BookOpen,
      value: "52",
      label: "Interactive Lessons",
      description: "Hands-on coding in HTML, CSS & JavaScript",
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-100 dark:bg-blue-900/40",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Target,
      value: totalQuizCount.toString(),
      label: "Quiz Topics",
      description: "Test your knowledge with detailed feedback",
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-100 dark:bg-purple-900/40",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Award,
      value: "15+",
      label: "Achievement Badges",
      description: "Unlock rewards as you learn and progress",
      gradient: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-100 dark:bg-amber-900/40",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Zap,
      value: "100%",
      label: "Free Forever",
      description: "No paywalls, no limits, no credit card",
      gradient: "from-green-500 to-emerald-500",
      iconBg: "bg-green-100 dark:bg-green-900/40",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      icon: Users,
      value: userCount.toLocaleString(),
      label: "Active Learners",
      description: "Join a growing community of developers",
      gradient: "from-indigo-500 to-purple-500",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: TrendingUp,
      value: "Real-time",
      label: "Progress Tracking",
      description: "See your journey visualized on the roadmap",
      gradient: "from-rose-500 to-red-500",
      iconBg: "bg-rose-100 dark:bg-rose-900/40",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 dark:from-slate-950 dark:via-indigo-950/20 dark:to-purple-950/20 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Master Web Development
            </span>
          </h2>
          <p className="text-base text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            From complete beginner to confident developer — all the tools, content, and motivation you need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="h-full p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center mb-4`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </motion.div>

                {/* Value */}
                <div className={`text-3xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>

                {/* Label */}
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {stat.description}
                </p>

                {/* Gradient bar on hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
