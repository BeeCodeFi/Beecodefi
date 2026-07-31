"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import api from "@/lib/api";
import type { QuizAttempt } from "@/types";

export default function QuizHistoryTab() {
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    const loadQuizHistory = async () => {
      setHistoryLoading(true);
      try {
        const { data } = await api.get<QuizAttempt[]>("/quiz/history");
        setQuizHistory(data);
      } catch {
        // silently fail
      } finally {
        setHistoryLoading(false);
      }
    };
    loadQuizHistory();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" /> Quiz History
      </h2>
      {historyLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
        </div>
      ) : quizHistory.length === 0 ? (
        <div className="text-center py-12">
          <Trophy className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-2">No quiz attempts yet</h3>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Take a quiz to see your history here!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 pr-4 text-gray-500 dark:text-gray-400 font-medium">Quiz</th>
                <th className="text-left py-3 pr-4 text-gray-500 dark:text-gray-400 font-medium">Category</th>
                <th className="text-center py-3 pr-4 text-gray-500 dark:text-gray-400 font-medium">Score</th>
                <th className="text-center py-3 pr-4 text-gray-500 dark:text-gray-400 font-medium">%</th>
                <th className="text-right py-3 text-gray-500 dark:text-gray-400 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {quizHistory.map((attempt) => (
                <tr key={attempt.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{attempt.quizTitle}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400 capitalize">{attempt.category}</td>
                  <td className="py-3 pr-4 text-center text-gray-700 dark:text-gray-300">
                    {attempt.score}/{attempt.totalQuestions}
                  </td>
                  <td className="py-3 pr-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                      attempt.percentage >= 80
                        ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"
                        : attempt.percentage >= 50
                        ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400"
                        : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400"
                    }`}>
                      {attempt.percentage}%
                    </span>
                  </td>
                  <td className="py-3 text-right text-gray-400 dark:text-gray-500 text-xs">
                    {new Date(attempt.completedAt).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
