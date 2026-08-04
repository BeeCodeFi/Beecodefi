"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Bookmark,
  Trophy,
  Settings,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useStreak } from "@/hooks/useStreak";
import { useBookmarks } from "@/hooks/useBookmarks";
import { tutorials } from "@/data/tutorials";
import OverviewTab from "@/components/dashboard/OverviewTab";
import BookmarksTab from "@/components/dashboard/BookmarksTab";
import QuizHistoryTab from "@/components/dashboard/QuizHistoryTab";
import SettingsTab from "@/components/dashboard/SettingsTab";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function UnifiedDashboardPage() {
  const { user, isLoading } = useAuth();
  const { data: streak } = useStreak();
  const { bookmarks } = useBookmarks();
  const router = useRouter();
  const isAdmin =
    user?.email.toLowerCase() === "kumaryursh@gmail.com" ||
    user?.email.toLowerCase() === "kumaryursh@gmal.com";

  const [activeTab, setActiveTab] = useState<
    "overview" | "bookmarks" | "quiz" | "settings"
  >("overview");

  const [tutorialProgress, setTutorialProgress] = useState<
    {
      slug: string;
      title: string;
      completed: number;
      total: number;
      percent: number;
    }[]
  >([]);
  const [recentActivity, setRecentActivity] = useState<
    {
      tutorialSlug: string;
      lessonSlug: string;
      tutorialTitle: string;
      lessonTitle: string;
      timestamp: string;
    }[]
  >([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  const loadProgress = async () => {
    try {
      setLoadingProgress(true);
      
      // Fetch progress from backend
      const { data: progressData } = await api.get<Array<{
        tutorialSlug: string;
        lessonSlug: string;
        completedAt: string;
      }>>("/progress");

      // Calculate progress for each tutorial
      const progress = tutorials.map((tutorial) => {
        const completed = progressData.filter(
          (p) => p.tutorialSlug === tutorial.slug
        ).length;
        const total = tutorial.lessons.length;
        const percent = Math.round((completed / total) * 100);
        return {
          slug: tutorial.slug,
          title: tutorial.title,
          completed,
          total,
          percent,
        };
      });
      setTutorialProgress(progress);

      // Fetch recent activity from backend
      const { data: activityData } = await api.get<Array<{
        tutorialSlug: string;
        lessonSlug: string;
        tutorialTitle: string;
        lessonTitle: string;
        timestamp: string;
      }>>("/recentactivity?limit=5");
      
      setRecentActivity(activityData);
    } catch (error) {
      console.error("Failed to load progress:", error);
      // Fallback to empty state
      setTutorialProgress([]);
      setRecentActivity([]);
    } finally {
      setLoadingProgress(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    } else if (user) {
      loadProgress();
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || loadingProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
    { id: "quiz", label: "Quiz History", icon: Trophy },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            My Learning
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user.name}! Track your progress and manage your
              account.
            </p>
            {isAdmin && (
              <button
                onClick={() => router.push("/admin")}
                className="inline-flex items-center gap-2 self-start px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" /> Admin analytics
              </button>
            )}
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar mb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex gap-8">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="dashboard-tab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && (
              <OverviewTab
                streak={streak}
                bookmarksCount={bookmarks.length}
                tutorialProgress={tutorialProgress}
                recentActivity={recentActivity}
                onRefresh={loadProgress}
              />
            )}
            {activeTab === "bookmarks" && <BookmarksTab />}
            {activeTab === "quiz" && <QuizHistoryTab />}
            {activeTab === "settings" && (
              <SettingsTab reloadStats={loadProgress} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
