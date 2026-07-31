"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Lock, CheckCircle, Trophy } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  color: string;
  isUnlocked: boolean;
  unlockedAt: string | null;
  progress: number;
  requiredCount: number;
}

export default function BadgesPage() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const { user } = useAuth();

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const { data } = await api.get<Badge[]>("/badge");
        setBadges(data);
      } catch (error) {
        console.error("Failed to fetch badges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  const categories = [
    { id: "all", label: "All Badges" },
    { id: "quiz", label: "Quiz" },
    { id: "lesson", label: "Lessons" },
    { id: "streak", label: "Streaks" },
  ];

  const filteredBadges = filter === "all" 
    ? badges 
    : badges.filter(b => b.category === filter);

  const unlockedCount = badges.filter(b => b.isUnlocked).length;
  const totalBadges = badges.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Achievement Badges
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-gradient">Your Achievements</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Unlock badges by completing quizzes, lessons, and maintaining streaks!
          </p>
        </motion.div>

        {/* Progress Overview */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl border border-indigo-200 dark:border-indigo-900/30 p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Collection Progress</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {unlockedCount} of {totalBadges} badges unlocked
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-8 h-8 text-amber-500" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {Math.round((unlockedCount / totalBadges) * 100)}%
                </span>
              </div>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedCount / totalBadges) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
              />
            </div>
          </motion.div>
        )}

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-medium transition-all border",
                filter === cat.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"
              )}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Badges Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 animate-pulse">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-4" />
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mx-auto mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredBadges.length === 0 ? (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No badges found in this category.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "relative bg-white dark:bg-gray-900 rounded-2xl border p-6 transition-all duration-300",
                  badge.isUnlocked
                    ? "border-amber-200 dark:border-amber-900/60 shadow-md hover:shadow-lg"
                    : "border-gray-200 dark:border-gray-800 opacity-75"
                )}
              >
                {/* Badge Icon */}
                <div className="relative mb-4">
                  <div
                    className={cn(
                      "w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl transition-all duration-300",
                      badge.isUnlocked
                        ? `bg-gradient-to-br ${badge.color}`
                        : "bg-gray-200 dark:bg-gray-800 grayscale"
                    )}
                  >
                    {badge.icon}
                  </div>
                  {badge.isUnlocked && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {!badge.isUnlocked && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 dark:bg-gray-700 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Badge Info */}
                <h3 className={cn(
                  "text-lg font-bold text-center mb-2",
                  badge.isUnlocked ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-600"
                )}>
                  {badge.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                  {badge.description}
                </p>

                {/* Progress Bar (for locked badges) */}
                {!badge.isUnlocked && user && (
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{badge.progress}/{badge.requiredCount}</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((badge.progress / badge.requiredCount) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Unlocked Date */}
                {badge.isUnlocked && badge.unlockedAt && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-2">
                    Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA for non-logged in users */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900 rounded-2xl p-8"
          >
            <Award className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Start Your Journey!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Sign up to unlock badges, track your progress, and celebrate your achievements!
            </p>
            <a
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/25"
            >
              Get Started Free
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
