"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, TrendingUp, Zap, BookOpen, Target, Crown, ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  userName: string;
  totalPoints: number;
  quizzesCompleted: number;
  lessonsCompleted: number;
  averageScore: number;
  currentStreak: number;
  profileImageUrl?: string | null;
}

interface PaginatedLeaderboard {
  items: LeaderboardEntry[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface UserStats {
  totalPoints: number;
  quizzesCompleted: number;
  lessonsCompleted: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
  globalRank: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [timeframe, setTimeframe] = useState<"all" | "monthly">("all");
  const [track, setTrack] = useState<"all" | "html" | "css" | "javascript">("all");
  const [leaderboardType, setLeaderboardType] = useState<"points" | "xp">("points");
  const { user } = useAuth();
  const pageSize = 20;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint = leaderboardType === "xp" 
          ? `/leaderboard/xp?page=${page}&pageSize=${pageSize}`
          : `/leaderboard?page=${page}&pageSize=${pageSize}&timeframe=${timeframe}&track=${track}`;
        
        const { data: leaderboardData } = await api.get<PaginatedLeaderboard>(endpoint);
        setLeaderboard(leaderboardData.items);
        setTotalPages(leaderboardData.totalPages);
        setTotalCount(leaderboardData.totalCount);
        setHasNextPage(leaderboardData.hasNextPage);
        setHasPreviousPage(leaderboardData.hasPreviousPage);

        if (user) {
          const { data: statsData } = await api.get<UserStats>("/leaderboard/me");
          setUserStats(statsData);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, page, timeframe, track, leaderboardType]);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-400 to-yellow-600";
    if (rank === 2) return "from-gray-300 to-gray-500";
    if (rank === 3) return "from-amber-500 to-amber-700";
    return "from-indigo-500 to-purple-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            Top Learners
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-gradient">{leaderboardType === "xp" ? "XP Leaderboard" : "Leaderboard"}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {leaderboardType === "xp" 
              ? "See how you rank based on total XP earned. Complete lessons, quizzes, and maintain streaks to earn more XP!"
              : "See how you rank against other learners. Earn points by completing quizzes and lessons!"
            }
          </p>
        </motion.div>

        {/* User Stats (if logged in) */}
        {user && userStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl border border-indigo-200 dark:border-indigo-900/30 p-6 mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                #{userStats.globalRank}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Stats</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Keep learning to climb the ranks!</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                  <Target className="w-4 h-4" />
                  <span className="text-xs font-semibold">{leaderboardType === "xp" ? "Total XP" : "Points"}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.totalPoints}</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                  <Trophy className="w-4 h-4" />
                  <span className="text-xs font-semibold">Quizzes</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.quizzesCompleted}</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-semibold">Lessons</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.lessonsCompleted}</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-semibold">Streak</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.currentStreak} 🔥</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Points System Info */}
        {leaderboardType === "points" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            How Points Work
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Quiz Questions</p>
                <p className="text-gray-600 dark:text-gray-400">10 points per correct answer</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Complete Lessons</p>
                <p className="text-gray-600 dark:text-gray-400">5 points per lesson</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Keep Streaks</p>
                <p className="text-gray-600 dark:text-gray-400">Learn daily to maintain streaks</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
        >
          {/* Leaderboard Type Tabs */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setLeaderboardType("points")}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                leaderboardType === "points"
                  ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              Points
            </button>
            <button
              onClick={() => setLeaderboardType("xp")}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                leaderboardType === "xp"
                  ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              XP
            </button>
          )}

          {/* Track Filters - Only show for Points leaderboard */}
          {leaderboardType === "points" && (
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl overflow-x-auto w-full sm:w-auto">
              {(["all", "html", "css", "javascript"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTrack(t)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize whitespace-nowrap",
                    track === t
                      ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  {t === "all" ? "Global" : t}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading leaderboard...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="p-12 text-center">
              <Trophy className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No leaderboard data yet. Be the first to compete!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">{leaderboardType === "xp" ? "XP" : "Points"}</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Quizzes</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Lessons</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Avg Score</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Streak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {leaderboard.map((entry, index) => (
                    <motion.tr
                      key={entry.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                        user && entry.userName === user.name && "bg-indigo-50 dark:bg-indigo-950/20"
                      )}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {getRankIcon(entry.rank) || (
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm",
                              entry.rank <= 10 ? `bg-gradient-to-br ${getRankColor(entry.rank)}` : "bg-gray-400"
                            )}>
                              {entry.rank}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                            {entry.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {entry.userName}
                              {user && entry.userName === user.name && (
                                <span className="ml-2 text-xs text-indigo-600 dark:text-indigo-400">(You)</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">{leaderboardType === "xp" ? `${entry.totalPoints} XP` : entry.totalPoints}</span>
                      </td>
                      <td className="px-6 py-4 text-center hidden sm:table-cell">
                        <span className="text-gray-600 dark:text-gray-400">{entry.quizzesCompleted}</span>
                      </td>
                      <td className="px-6 py-4 text-center hidden sm:table-cell">
                        <span className="text-gray-600 dark:text-gray-400">{entry.lessonsCompleted}</span>
                      </td>
                      <td className="px-6 py-4 text-center hidden md:table-cell">
                        <span className="text-gray-600 dark:text-gray-400">{entry.averageScore}%</span>
                      </td>
                      <td className="px-6 py-4 text-center hidden lg:table-cell">
                        <span className="text-gray-600 dark:text-gray-400">{entry.currentStreak} 🔥</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Pagination Controls */}
          {!loading && leaderboard.length > 0 && totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page {page} of {totalPages} · {totalCount} learners
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
        </motion.div>

        {/* CTA for non-logged in users */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900 rounded-2xl p-8"
          >
            <Trophy className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Join the Competition!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Sign up to track your progress, earn points, and compete with other learners on the leaderboard.
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
