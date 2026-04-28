"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, RotateCcw, Trophy, Home } from "lucide-react";
import api from "@/lib/api";
import { QuizQuestion, QuizResult } from "@/types";
import { cn } from "@/lib/utils";

type QuizState = "loading" | "playing" | "results";

export default function QuizSessionPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = use(params);
  const [state, setState] = useState<QuizState>("loading");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [quizId, setQuizId] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const topicsRes = await api.get("/quiz/topics");
        const quizTopic = topicsRes.data.find(
          (t: { topic: string }) => t.topic.toLowerCase() === topic.toLowerCase()
        );
        if (quizTopic) setQuizId(quizTopic.id);

        const { data } = await api.get<QuizQuestion[]>(`/quiz/${topic}`);
        setQuestions(data);
        setState("playing");
      } catch {
        setState("playing");
        setQuestions([]);
      }
    };
    fetchQuestions();
  }, [topic]);

  const handleAnswer = (questionId: number, answerId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await api.post<QuizResult>("/quiz/submit", {
        quizId,
        answers,
      });
      setResult(data);
      setState("results");
    } catch {
      // Fallback: calculate locally
      setState("results");
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setState("playing");
  };

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (state === "results" && result) {
    const percentage = result.percentage;
    const strokeDasharray = 2 * Math.PI * 60;
    const strokeDashoffset = strokeDasharray * (1 - percentage / 100);

    return (
      <div className="min-h-screen py-20">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 sm:p-12 text-center"
          >
            <h1 className="text-3xl font-bold mb-8">Quiz Results</h1>

            {/* Score Ring */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="60" fill="none" stroke="currentColor" strokeWidth="8" className="text-gray-200 dark:text-gray-800" />
                <motion.circle
                  cx="80" cy="80" r="60" fill="none" strokeWidth="8" strokeLinecap="round"
                  className={percentage >= 70 ? "text-green-500" : percentage >= 40 ? "text-amber-500" : "text-red-500"}
                  stroke="currentColor"
                  strokeDasharray={strokeDasharray}
                  initial={{ strokeDashoffset: strokeDasharray }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{percentage}%</span>
              </div>
            </div>

            <p className="text-xl font-semibold mb-2">
              {result.score} / {result.totalQuestions} Correct
            </p>
            <p className="text-gray-500 mb-8">
              {percentage >= 80 ? "Excellent! You really know your stuff!" :
               percentage >= 60 ? "Good job! Keep practicing!" :
               percentage >= 40 ? "Not bad! Review the topics and try again." :
               "Keep learning! Review the tutorials and try again."}
            </p>

            {/* Results Breakdown */}
            <div className="text-left space-y-3 mb-8">
              {result.results.map((r, i) => (
                <div key={i} className={cn(
                  "flex items-start gap-3 p-4 rounded-xl border",
                  r.isCorrect ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900" : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                )}>
                  {r.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{r.questionText}</p>
                    {!r.isCorrect && (
                      <p className="text-xs text-gray-500 mt-1">
                        Correct answer: <span className="text-green-600 dark:text-green-400 font-medium">{r.correctAnswer}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
              <Link
                href="/quiz"
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Home className="w-4 h-4" /> All Quizzes
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No questions available</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Make sure the backend is running or try again later.
          </p>
          <Link href="/quiz" className="text-indigo-600 hover:underline">
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-500 capitalize">{topic} Quiz</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {question.text}
            </h2>

            {question.codeSnippet && (
              <div className="bg-gray-950 rounded-xl p-4 mb-6 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono">
                  <code>{question.codeSnippet}</code>
                </pre>
              </div>
            )}

            <div className="space-y-3">
              {question.answers.map((answer) => (
                <button
                  key={answer.id}
                  onClick={() => handleAnswer(question.id, answer.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium",
                    answers[question.id] === answer.id
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300"
                  )}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            disabled={currentIndex === 0}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all",
              currentIndex > 0
                ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                : "text-gray-300 dark:text-gray-700 cursor-not-allowed"
            )}
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              disabled={!answers[question.id]}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all",
                answers[question.id]
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              )}
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                allAnswered
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              )}
            >
              <Trophy className="w-4 h-4" /> Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
