"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, ArrowLeft, Calendar, BarChart3, RotateCcw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import type { QuizAttempt } from "@/types";

export default function QuizHistoryPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      api
        .get<QuizAttempt[]>("/quiz/history")
        .then(({ data }) => setHistory(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (isLoading || (!user && !isLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
      </div>
    );
  }

  const avgScore =
    history.length > 0
      ? Math.round(history.reduce((sum, a) => sum + a.percentage, 0) / history.length)
      : 0;

  const best = history.length > 0 ? Math.max(...history.map((a) => a.percentage)) : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Quizzes
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" /> Quiz History
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            All your quiz attempts across every topic
          </p>
        </motion.div>

        {/* Stats row */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            {[
              { icon: Trophy, label: "Total Attempts", value: history.length, color: "text-yellow-500" },
              { icon: BarChart3, label: "Average Score", value: `${avgScore}%`, color: "text-blue-500" },
              { icon: Trophy, label: "Best Score", value: `${best}%`, color: "text-green-500" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center"
              >
                <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* History table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
        >
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Trophy className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No quiz attempts yet
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Take your first quiz to see your history here.
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Start a Quiz
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Quiz</th>
                    <th className="text-left px-4 py-3 text-gray-500 dark:text-gray-400 font-medium">Category</th>
                    <th className="text-center px-4 py-3 text-gray-500 dark:text-gray-400 font-medium">Score</th>
                    <th className="text-center px-4 py-3 text-gray-500 dark:text-gray-400 font-medium">Result</th>
                    <th className="text-right px-6 py-3 text-gray-500 dark:text-gray-400 font-medium flex items-center justify-end gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {history.map((attempt, i) => (
                    <motion.tr
                      key={attempt.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                        {attempt.quizTitle}
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 capitalize">
                        {attempt.category}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">
                        {attempt.score}/{attempt.totalQuestions}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            attempt.percentage >= 80
                              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                              : attempt.percentage >= 50
                              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                              : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {attempt.percentage}%
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right text-gray-400 dark:text-gray-500 text-xs">
                        {new Date(attempt.completedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
