"use client";

import { useState, useEffect } from "react";
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/lib/api";
import type { QuizAttempt } from "@/types";

interface PaginatedQuizHistory {
  items: QuizAttempt[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function QuizHistoryTab() {
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const pageSize = 10;

  const loadQuizHistory = async () => {
    setHistoryLoading(true);
    try {
      console.log('[QUIZ HISTORY] Fetching page', page);
      const { data } = await api.get<PaginatedQuizHistory>(
        `/quiz/history?page=${page}&pageSize=${pageSize}`
      );
      console.log('[QUIZ HISTORY] Response:', data);
      setQuizHistory(data.items);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
      setHasNextPage(data.hasNextPage);
      setHasPreviousPage(data.hasPreviousPage);
    } catch (error) {
      console.error('[QUIZ HISTORY] Failed to load:', error);
      // silently fail
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    loadQuizHistory();
  }, [page]);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" /> Quiz History
        </h2>
        <div className="flex items-center gap-3">
          {totalCount > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {totalCount} total attempt{totalCount !== 1 ? 's' : ''}
            </span>
          )}
          <button
            onClick={() => loadQuizHistory()}
            disabled={historyLoading}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50"
          >
            {historyLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

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
        <>
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page {page} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={!hasPreviousPage}
                  className={`p-2 rounded-lg border transition-colors ${
                    hasPreviousPage
                      ? "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      : "border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-700 cursor-not-allowed"
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`min-w-[2rem] px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          page === pageNum
                            ? "bg-indigo-600 text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={!hasNextPage}
                  className={`p-2 rounded-lg border transition-colors ${
                    hasNextPage
                      ? "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      : "border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-700 cursor-not-allowed"
                  }`}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
