"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search, Filter, FileCode2 } from "lucide-react";
import Link from "next/link";
import { htmlInterviewQuestions } from "@/data/interview-questions/html-questions";

export default function HTMLInterviewQuestionsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  const filteredQuestions = htmlInterviewQuestions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || q.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const toggleQuestion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/interview-questions"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm"
          >
            ← Back to Categories
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <FileCode2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold">HTML Interview Questions</h1>
              <p className="text-white/90 mt-2">
                {htmlInterviewQuestions.length} questions covering fundamentals to advanced concepts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleQuestion(question.id)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-950/20 dark:hover:to-red-950/20 transition-all text-left group"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      question.difficulty === 'beginner' 
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                        : question.difficulty === 'intermediate'
                        ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800'
                        : 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/40 dark:to-pink-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                    }`}>
                      {question.difficulty}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                      {question.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {question.question}
                  </h3>
                </div>
                <div className={`shrink-0 p-2 rounded-lg transition-all ${
                  expandedId === question.id 
                    ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                }`}>
                  {expandedId === question.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Answer (Expandable) */}
              <AnimatePresence>
                {expandedId === question.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-6 border-t-2 border-orange-200 dark:border-orange-900/50 bg-gradient-to-br from-orange-50/50 via-white to-red-50/30 dark:from-orange-950/10 dark:via-gray-900 dark:to-red-950/10">
                      <div 
                        className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-orange-900 dark:prose-headings:text-orange-100 prose-strong:text-orange-700 dark:prose-strong:text-orange-300 prose-code:text-orange-600 dark:prose-code:text-orange-400 prose-code:bg-orange-100/50 dark:prose-code:bg-orange-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-gray-900 dark:prose-pre:bg-black prose-pre:border prose-pre:border-gray-700 dark:prose-pre:border-gray-800"
                        dangerouslySetInnerHTML={{ 
                          __html: question.answer
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-700 dark:text-orange-300">$1</strong>')
                            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="!bg-gray-900 dark:!bg-black !border !border-gray-700 dark:!border-gray-800 rounded-lg p-4 overflow-x-auto"><code class="language-$1 !text-gray-100 text-sm">$2</code></pre>')
                            .replace(/`([^`]+)`/g, '<code class="!bg-orange-100 dark:!bg-orange-900/30 !text-orange-700 dark:!text-orange-400 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>')
                            .replace(/\n\n/g, '</p><p class="text-gray-700 dark:text-gray-300">')
                            .replace(/^(.+)$/gm, '<p class="text-gray-700 dark:text-gray-300 leading-relaxed">$1</p>')
                        }}
                      />
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-orange-200 dark:border-orange-900/50">
                        {question.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium border border-orange-200 dark:border-orange-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>No questions found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
