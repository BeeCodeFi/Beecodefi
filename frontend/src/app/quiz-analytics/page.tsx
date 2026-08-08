"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Clock, Target, AlertTriangle, BookOpen, Award } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface TopicPerformance {
  topic: string;
  attempts: number;
  averageScore: number;
  masteryLevel: number;
  totalQuestions: number;
  correctAnswers: number;
}

interface WeeklyPerformance {
  weekStart: string;
  attempts: number;
  averageScore: number;
  totalTimeMinutes: number;
}

interface WeakArea {
  topic: string;
  category: string;
  averageScore: number;
  attempts: number;
  recommendation: string;
}

interface QuizAnalytics {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  averageTimeTaken: string;
  firstAttemptDate: string;
  lastAttemptDate: string;
  topicPerformance: TopicPerformance[];
  weeklyPerformance: WeeklyPerformance[];
  weakAreas: WeakArea[];
}

export default function QuizAnalyticsPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<QuizAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get("/quiz-analytics/overview");
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMasteryColor = (level: number) => {
    if (level >= 80) return "#10b981"; // green
    if (level >= 60) return "#3b82f6"; // blue
    if (level >= 40) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "N/A";
    const match = timeString.match(/(\d+):(\d+):(\d+)/);
    if (match) {
      const [, hours, minutes, seconds] = match;
      if (parseInt(hours) > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m ${seconds}s`;
    }
    return timeString;
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-gray-600 dark:text-gray-400">No quiz data available yet. Take some quizzes to see your analytics!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Quiz Analytics
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-gradient">Performance Insights</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Track your quiz performance, identify weak areas, and monitor your progress over time
          </p>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Attempts</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.totalAttempts}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.averageScore.toFixed(1)}%</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Time</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatTime(analytics.averageTimeTaken)}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Best Score</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.bestScore}%</p>
          </div>
        </motion.div>

        {/* Topic Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" />
            Topic Mastery
          </h2>
          {analytics.topicPerformance.length > 0 ? (
            <div className="space-y-4">
              {analytics.topicPerformance.map((topic, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{topic.topic}</h3>
                    <span className="text-sm font-medium" style={{ color: getMasteryColor(topic.masteryLevel) }}>
                      {topic.masteryLevel.toFixed(0)}% Mastery
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${topic.masteryLevel}%`,
                        backgroundColor: getMasteryColor(topic.masteryLevel)
                      }}
                    />
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{topic.attempts} attempts</span>
                    <span>{topic.correctAnswers}/{topic.totalQuestions} correct</span>
                    <span>Avg: {topic.averageScore.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No topic performance data available yet.</p>
          )}
        </motion.div>

        {/* Weekly Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            Weekly Performance
          </h2>
          {analytics.weeklyPerformance.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.weeklyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="weekStart" 
                    stroke="#9ca3af"
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    itemStyle={{ color: '#f3f4f6' }}
                    labelStyle={{ color: '#9ca3af' }}
                  />
                  <Line 
                    dataKey="averageScore" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Avg Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No weekly performance data available yet.</p>
          )}
        </motion.div>

        {/* Weak Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Areas for Improvement
          </h2>
          {analytics.weakAreas.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {analytics.weakAreas.map((area, idx) => (
                <div key={idx} className="border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 bg-amber-50 dark:bg-amber-950/20">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{area.topic}</h3>
                    <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                      {area.averageScore.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{area.category}</p>
                  <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Recommendation:</span> {area.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Great job! No weak areas identified yet.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}