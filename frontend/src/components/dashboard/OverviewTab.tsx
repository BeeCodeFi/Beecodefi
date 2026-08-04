"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Flame,
  TrendingUp,
  Clock,
  Target,
  Bookmark,
  ArrowRight,
  Trophy,
} from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface TutorialProgressItem {
  slug: string;
  title: string;
  completed: number;
  total: number;
  percent: number;
}

interface RecentActivityItem {
  tutorialSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  tutorialTitle: string;
  timestamp: string;
}

export default function OverviewTab({
  streak,
  bookmarksCount,
  tutorialProgress,
  recentActivity,
  onRefresh,
}: {
  streak: { current: number; longest: number };
  bookmarksCount: number;
  tutorialProgress: TutorialProgressItem[];
  recentActivity: RecentActivityItem[];
  onRefresh?: () => void;
}) {
  const { user } = useAuth();
  const [quizCount, setQuizCount] = useState(0);
  const [loadingQuizCount, setLoadingQuizCount] = useState(true);

  const fetchQuizCount = async () => {
    if (!user) {
      setLoadingQuizCount(false);
      return;
    }

    try {
      console.log('[DASHBOARD] Fetching quiz count...');
      const { data } = await api.get('/quiz/history?page=1&pageSize=1');
      console.log('[DASHBOARD] Quiz history response:', data);
      setQuizCount(data.totalCount || 0);
    } catch (error) {
      console.error('[DASHBOARD] Failed to fetch quiz count:', error);
      // Try to get more details
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as any;
        console.error('[DASHBOARD] Error response:', err.response?.data);
        console.error('[DASHBOARD] Error status:', err.response?.status);
      }
      setQuizCount(0);
    } finally {
      setLoadingQuizCount(false);
    }
  };

  useEffect(() => {
    fetchQuizCount();
  }, [user]);

  // Expose refetch function globally for when quizzes are completed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__refetchDashboard = () => {
        fetchQuizCount();
        onRefresh?.();
      };
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).__refetchDashboard;
      }
    };
  }, [onRefresh]);

  const totalLessonsCompleted = tutorialProgress.reduce(
    (sum, t) => sum + t.completed,
    0,
  );
  const totalLessons = tutorialProgress.reduce((sum, t) => sum + t.total, 0);
  const overallProgress =
    totalLessons > 0
      ? Math.round((totalLessonsCompleted / totalLessons) * 100)
      : 0;

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
              <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Overall Progress
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {overallProgress}%
              </p>
            </div>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {totalLessonsCompleted} of {totalLessons} lessons completed
          </p>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Current Streak
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {streak.current} days
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Longest streak: {streak.longest} days
          </p>
        </motion.div>

        {/* Bookmarks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Saved Lessons
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {bookmarksCount}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quizzes Completed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Quizzes Completed
              </p>
              {loadingQuizCount ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {quizCount}
                </p>
              )}
            </div>
          </div>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 hover:underline"
          >
            Test your skills <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tutorial Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Tutorial Progress
            </h2>
            <Link
              href="/tutorials"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {tutorialProgress.map((tutorial, _i) => (
              <Link
                key={tutorial.slug}
                href={`/tutorials/${tutorial.slug}`}
                className="block group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tutorial.title}
                  </span>
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                    {tutorial.percent}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${tutorial.percent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {tutorial.completed} of {tutorial.total} lessons
                </p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, i) => {
                // Check if it's a quiz activity
                const isQuiz = activity.tutorialSlug === 'quiz' || activity.tutorialSlug === 'lesson-quiz';
                const icon = isQuiz ? Trophy : BookOpen;
                const iconColor = isQuiz ? 'text-yellow-600 dark:text-yellow-400' : 'text-purple-600 dark:text-purple-400';
                const bgColor = isQuiz ? 'bg-yellow-100 dark:bg-yellow-900/40' : 'bg-purple-100 dark:bg-purple-900/40';
                const hoverColor = isQuiz ? 'group-hover:text-yellow-600 dark:group-hover:text-yellow-400' : 'group-hover:text-purple-600 dark:group-hover:text-purple-400';
                
                const Icon = icon;
                
                // For quizzes, link to quiz page; for lessons, link to lesson
                const href = isQuiz 
                  ? `/quiz/${activity.lessonSlug}`
                  : `/tutorials/${activity.tutorialSlug}?lesson=${activity.lessonSlug}`;
                
                return (
                  <Link
                    key={i}
                    href={href}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                  >
                    <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold text-gray-900 dark:text-white ${hoverColor} transition-colors truncate`}>
                        {activity.lessonTitle}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.tutorialTitle}
                      </p>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-gray-400 ${hoverColor} group-hover:translate-x-1 transition-all shrink-0`} />
                  </Link>
                );
              })
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">No recent activity</p>
                <Link
                  href="/tutorials"
                  className="inline-flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-3"
                >
                  Start learning <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/tutorials"
                className="flex items-center gap-2 px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors text-sm font-medium"
              >
                <BookOpen className="w-4 h-4" />
                Browse Tutorials
              </Link>
              <Link
                href="/quiz"
                className="flex items-center gap-2 px-4 py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-sm font-medium"
              >
                <Brain className="w-4 h-4" />
                Take Quiz
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
