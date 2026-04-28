"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, FileCode2, Palette, Braces, ArrowRight, Trophy } from "lucide-react";
import api from "@/lib/api";
import { QuizTopic } from "@/types";

const topicIcons: Record<string, React.ElementType> = {
  HTML: FileCode2,
  CSS: Palette,
  JavaScript: Braces,
};

const topicColors: Record<string, string> = {
  HTML: "from-orange-500 to-red-500",
  CSS: "from-blue-500 to-indigo-500",
  JavaScript: "from-yellow-500 to-amber-500",
};

export default function QuizPage() {
  const [topics, setTopics] = useState<QuizTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const { data } = await api.get<QuizTopic[]>("/quiz/topics");
        setTopics(data);
      } catch {
        // Fallback if backend isn't running
        setTopics([
          { id: 1, title: "HTML Fundamentals", topic: "HTML", description: "Test your HTML knowledge", difficulty: "Beginner", questionCount: 10, bestScore: null },
          { id: 2, title: "CSS Mastery", topic: "CSS", description: "Test your CSS knowledge", difficulty: "Intermediate", questionCount: 10, bestScore: null },
          { id: 3, title: "JavaScript Essentials", topic: "JavaScript", description: "Test your JS knowledge", difficulty: "Intermediate", questionCount: 10, bestScore: null },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6"
          >
            <Brain className="w-4 h-4" />
            Test Your Knowledge
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Choose Your <span className="text-gradient">Quiz</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Select a topic and test your web development knowledge with our interactive quizzes.
          </motion.p>
        </div>
      </section>

      {/* Quiz Cards */}
      <section className="py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 animate-pulse">
                  <div className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-gray-800 mb-6" />
                  <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-3" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded mb-6" />
                  <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topics.map((topic, index) => {
                const Icon = topicIcons[topic.topic] || Brain;
                const color = topicColors[topic.topic] || "from-gray-500 to-gray-600";
                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <Link
                      href={`/quiz/${topic.topic.toLowerCase()}`}
                      className="group block bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full"
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {topic.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{topic.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        <span>{topic.questionCount} Questions</span>
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                          {topic.difficulty}
                        </span>
                      </div>
                      {topic.bestScore !== null && (
                        <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 mb-4">
                          <Trophy className="w-4 h-4" />
                          Best Score: {topic.bestScore}/{topic.questionCount}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium group-hover:gap-3 transition-all">
                        Start Quiz <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
