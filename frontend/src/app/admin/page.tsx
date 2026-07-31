"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Loader2,
  Mail,
  ShieldAlert,
  Target,
  Trophy,
  ThumbsDown,
  ThumbsUp,
  Users,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

interface ActivityPoint {
  date: string;
  lessonsCompleted: number;
  quizAttempts: number;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  lastActivityDate: string | null;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  quizAttempts: number;
  averageQuizScore: number;
}

interface Feedback {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface LessonFeedbackInsight {
  tutorialSlug: string;
  lessonSlug: string;
  helpful: number;
  notHelpful: number;
}

interface AdminAnalytics {
  totalUsers: number;
  activeUsersLast30Days: number;
  totalLessonsCompleted: number;
  totalQuizAttempts: number;
  averageQuizScore: number;
  unreadFeedback: number;
  activity: ActivityPoint[];
  users: AdminUser[];
  feedback: Feedback[];
  lessonFeedback: LessonFeedbackInsight[];
}

function formatDate(value: string | null) {
  if (!value) return "No activity yet";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: typeof Users;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
            {detail}
          </p>
        </div>
        <div className={`p-2.5 rounded-xl ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }

    api
      .get<AdminAnalytics>("/admin/analytics")
      .then(({ data }) => setAnalytics(data))
      .catch((requestError) => {
        if (requestError.response?.status === 403) setForbidden(true);
        else setError("Unable to load analytics right now.");
      })
      .finally(() => setLoading(false));
  }, [authLoading, user, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <ShieldAlert className="w-12 h-12 mx-auto mb-4 text-amber-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin access required
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This account is not authorized to view platform analytics.
          </p>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-400">
        {error || "No analytics available."}
      </div>
    );
  }

  const maxActivity = Math.max(
    1,
    ...analytics.activity.map(
      (point) => point.lessonsCompleted + point.quizAttempts,
    ),
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Private workspace
            </p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
              Admin analytics
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Track learning activity, engagement, and user feedback.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Activity className="w-4 h-4 text-emerald-500" /> Updated just now
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          <StatCard
            label="Total users"
            value={analytics.totalUsers}
            detail="Registered accounts"
            icon={Users}
            color="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
          />
          <StatCard
            label="Active users"
            value={analytics.activeUsersLast30Days}
            detail="Activity in 30 days"
            icon={Activity}
            color="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
          />
          <StatCard
            label="Lessons completed"
            value={analytics.totalLessonsCompleted}
            detail="All-time completions"
            icon={BookOpen}
            color="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
          />
          <StatCard
            label="Quiz attempts"
            value={analytics.totalQuizAttempts}
            detail="All-time submissions"
            icon={Trophy}
            color="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
          />
          <StatCard
            label="Average score"
            value={`${analytics.averageQuizScore.toFixed(1)}%`}
            detail={`${analytics.unreadFeedback} unread feedback messages`}
            icon={Target}
            color="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <section className="min-w-0 h-[390px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Activity overview
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Lessons and quizzes over the last 30 days
                </p>
              </div>
              <BarChart3 className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="h-64 flex items-end gap-1.5 border-b border-gray-200 dark:border-gray-800">
              {analytics.activity.map((point) => {
                const total = point.lessonsCompleted + point.quizAttempts;
                return (
                  <div
                    key={point.date}
                    className="group flex-1 h-full flex items-end"
                    title={`${formatDate(point.date)}: ${point.lessonsCompleted} lessons, ${point.quizAttempts} quizzes`}
                  >
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-indigo-600 to-cyan-400 min-h-1 transition-all group-hover:from-indigo-500"
                      style={{
                        height: `${Math.max(2, (total / maxActivity) * 100)}%`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-3 text-xs text-gray-500">
              <span>{formatDate(analytics.activity[0]?.date)}</span>
              <span>Today</span>
            </div>
          </section>

          <section className="min-w-0 h-[390px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Recent feedback
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Latest contact messages
                </p>
              </div>
              <Mail className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="space-y-4 min-h-0 overflow-y-auto pr-1">
              {analytics.feedback.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No feedback messages yet.
                </p>
              ) : (
                analytics.feedback.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0"
                  >
                    <div className="flex justify-between gap-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.subject || "General feedback"}
                      </p>
                      <span className="text-xs text-gray-500 shrink-0">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 break-words line-clamp-3">
                      <span className="font-medium">{item.name}</span> ·{" "}
                      {item.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <section className="mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Lesson helpfulness
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                What learners say about individual lessons
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" /> Helpful
              </span>
              <span className="inline-flex items-center gap-1">
                <ThumbsDown className="w-3.5 h-3.5 text-rose-500" /> Needs work
              </span>
            </div>
          </div>
          {analytics.lessonFeedback.length === 0 ? (
            <p className="text-sm text-gray-500">
              No lesson feedback has been submitted yet.
            </p>
          ) : (
            <div className="space-y-4">
              {analytics.lessonFeedback.slice(0, 8).map((item) => {
                const total = item.helpful + item.notHelpful;
                const helpfulPercent = total ? (item.helpful / total) * 100 : 0;
                return (
                  <div
                    key={`${item.tutorialSlug}-${item.lessonSlug}`}
                    className="min-w-0"
                  >
                    <div className="flex items-center justify-between gap-4 text-sm mb-1">
                      <span className="truncate text-gray-700 dark:text-gray-300">
                        {item.lessonSlug}
                      </span>
                      <span className="shrink-0 text-xs text-gray-500">
                        {item.helpful} / {item.notHelpful}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-rose-100 dark:bg-rose-950/40 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${helpfulPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              User engagement
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Progress, quiz participation, and streak health per account
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-950/60 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Last active</th>
                  <th className="px-6 py-3">Lessons</th>
                  <th className="px-6 py-3">Quizzes</th>
                  <th className="px-6 py-3">Avg. score</th>
                  <th className="px-6 py-3">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {analytics.users.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-950/40"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">{item.email}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {formatDate(item.lastActivityDate)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {item.lessonsCompleted}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {item.quizAttempts}
                    </td>
                    <td className="px-6 py-4">
                      {item.quizAttempts ? (
                        <span
                          className={
                            item.averageQuizScore >= 70
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }
                        >
                          {item.averageQuizScore.toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-orange-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.currentStreak}d
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
