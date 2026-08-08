"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Home,
  Timer,
  Eye,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import api from "@/lib/api";
import { QuizQuestion, QuizResult } from "@/types";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useQuizQuestionBookmarks } from "@/hooks/useQuizQuestionBookmarks";
import { useToast } from "@/context/ToastContext";

type QuizState = "loading" | "ready" | "playing" | "results" | "review";
type QuizMode = "practice" | "timed" | "exam";

export default function QuizSessionPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = use(params);
  const { user } = useAuth();
  const { isBookmarked, createBookmark, deleteBookmark } = useQuizQuestionBookmarks();
  const { success } = useToast();
  const [state, setState] = useState<QuizState>("loading");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [quizId, setQuizId] = useState<number>(0);
  const [quizMode, setQuizMode] = useState<QuizMode>("practice");
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizTitle, setQuizTitle] = useState("");
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const topicsRes = await api.get("/quiz/topics");
        const quizTopic = topicsRes.data.find(
          (t: { topic: string }) =>
            t.topic.toLowerCase() === topic.toLowerCase(),
        );
        if (quizTopic) {
          setQuizId(quizTopic.id);
          setQuizTitle(quizTopic.title);
          // Store the quiz title for display
          document.title = `${quizTopic.title} Quiz`;
        }

        const { data } = await api.get<QuizQuestion[]>(`/quiz/${topic}`);
        setQuestions(data);
        setState("ready");
      } catch {
        setState("ready");
        setQuestions([]);
      }
    };
    fetchQuestions();
  }, [topic]);

  const handleSubmit = async () => {
    try {
      console.log('[QUIZ] Submitting quiz:', { quizId, answers });
      const { data } = await api.post<QuizResult>("/quiz/submit", {
        quizId,
        answers,
      });
      console.log('[QUIZ] Quiz submitted successfully:', data);
      setResult(data);
      setState("results");
      
      // Refresh dashboard data
      console.log('[QUIZ] Refreshing dashboard...');
      if (typeof window !== 'undefined' && (window as any).__refetchDashboard) {
        (window as any).__refetchDashboard();
      }
    } catch (error) {
      console.error('[QUIZ] Failed to submit quiz:', error);
      // Fallback: calculate locally
      setState("results");
    }
  };

  useEffect(() => {
    if (state === "playing" && quizMode === "timed" && timeLeft > 0) {
      const timerId = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            window.clearInterval(timerId);
            void handleSubmit(); // Auto submit when time is up
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => window.clearInterval(timerId);
    }
  }, [state, quizMode, timeLeft, handleSubmit]);

  const handleAnswer = (questionId: number, answerId: number) => {
    if (state === "review") return;
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));

    // Practice mode: allow changing answers (no locking)
    // Feedback will be shown in review mode
  };

  const handleRetry = () => {
    // Exam mode: no retry allowed
    if (quizMode === "exam" && hasAttempted) {
      return;
    }
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setState("ready");
  };

  const startQuiz = () => {
    if (quizMode === "timed") {
      setTimeLeft(questions.length * 30); // 30 seconds per question
    }
    setHasAttempted(true);
    setState("playing");
  };

  const handleBookmarkToggle = async (question: QuizQuestion) => {
    const isCurrentlyBookmarked = isBookmarked(question.id, topic);

    try {
      if (isCurrentlyBookmarked) {
        await deleteBookmark(question.id, topic);
        success("Bookmark removed", "Question removed from your bookmarks");
      } else {
        await createBookmark({
          questionId: question.id,
          quizTopic: topic,
          questionText: question.text,
        });
        success("Question bookmarked", "Question added to your bookmarks");
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
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

  if (state === "ready") {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 sm:p-12 text-center max-w-md w-full"
        >
          <h1 className="text-3xl font-bold mb-4">{quizTitle} Quiz</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {questions.length} Questions
          </p>

          {/* Mode Selector */}
          <div className="space-y-3 mb-8">
            <button
              onClick={() => setQuizMode("practice")}
              className={cn(
                "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left",
                quizMode === "practice"
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Practice Mode
                  </p>
                  <p className="text-xs text-gray-500">
                    Unlimited attempts • Skip questions allowed
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setQuizMode("timed")}
              className={cn(
                "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left",
                quizMode === "timed"
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Timer className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Timed Mode
                  </p>
                  <p className="text-xs text-gray-500">
                    30s per question • Must answer to proceed
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setQuizMode("exam")}
              className={cn(
                "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left",
                quizMode === "exam"
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Exam Mode
                  </p>
                  <p className="text-xs text-gray-500">
                    Single attempt • No hints • Real test
                  </p>
                </div>
              </div>
            </button>
          </div>

          <button
            onClick={startQuiz}
            className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Start Quiz
          </button>
        </motion.div>
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
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-gray-200 dark:text-gray-800"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className={
                    percentage >= 70
                      ? "text-green-500"
                      : percentage >= 40
                        ? "text-amber-500"
                        : "text-red-500"
                  }
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

            <p className="text-xl font-semibold mb-2" aria-live="polite">
              {result.score} / {result.totalQuestions} Correct
            </p>
            <p className="text-gray-500 mb-8">
              {percentage >= 80
                ? "Excellent! You really know your stuff!"
                : percentage >= 60
                  ? "Good job! Keep practicing!"
                  : percentage >= 40
                    ? "Not bad! Review the topics and try again."
                    : "Keep learning! Review the tutorials and try again."}
            </p>

            {/* Results Breakdown */}
            <div className="text-left space-y-3 mb-8">
              {result.results.map((r, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-xl border",
                    r.isCorrect
                      ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900"
                      : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900",
                  )}
                >
                  {r.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {r.questionText}
                    </p>
                    {!r.isCorrect && (
                      <>
                        <p className="text-xs text-gray-500 mt-1">
                          Correct answer:{" "}
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {r.correctAnswer}
                          </span>
                        </p>
                        {r.explanation && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                            💡{" "}
                            <span className="font-semibold">Explanation:</span>{" "}
                            {r.explanation}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setState("review");
                }}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition-colors"
              >
                <Eye className="w-4 h-4" /> Review Answers
              </button>
              {quizMode !== "exam" && (
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Try Again
                </button>
              )}
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
        {/* Mode Badge and Timer */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
                  quizMode === "practice"
                    ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
                    : quizMode === "timed"
                      ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300"
                      : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
                )}
              >
                {quizMode} Mode
              </span>
              {state === "review" && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                  Review
                </span>
              )}
            </div>
            {state === "playing" && quizMode === "timed" && (
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-lg",
                  timeLeft < 30
                    ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 animate-pulse"
                    : "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
                )}
              >
                <Timer className="w-5 h-5" />
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {quizTitle} Quiz
            </span>
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
            {/* Question Header with Bookmark */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    Question {currentIndex + 1}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {question.text}
                </h2>
              </div>
              <button
                onClick={() => handleBookmarkToggle(question)}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                  isBookmarked(question.id, topic)
                    ? "text-amber-500 hover:text-amber-600"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                )}
                aria-label={isBookmarked(question.id, topic) ? "Remove bookmark" : "Add bookmark"}
              >
                {isBookmarked(question.id, topic) ? (
                  <BookmarkCheck className="w-6 h-6" />
                ) : (
                  <Bookmark className="w-6 h-6" />
                )}
              </button>
            </div>

            {question.codeSnippet && (
              <div className="bg-gray-950 rounded-xl p-4 mb-6 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono">
                  <code>{question.codeSnippet}</code>
                </pre>
              </div>
            )}

            <div className="space-y-3">
              {question.answers.map((answer) => {
                const isSelected = answers[question.id] === answer.id;

                return (
                  <button
                    key={answer.id}
                    onClick={() => handleAnswer(question.id, answer.id)}
                    disabled={state === "review"}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium",
                      // Review mode styling
                      state === "review" &&
                        result?.results.find((r) => r.questionId === question.id)
                          ?.correctAnswer === answer.text
                        ? "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : state === "review" &&
                            answers[question.id] === answer.id &&
                            result?.results.find(
                              (r) => r.questionId === question.id,
                            )?.correctAnswer !== answer.text
                          ? "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                          : // Normal selection
                            isSelected
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300",
                    )}
                  >
                    {answer.text}
                  </button>
                );
              })}
            </div>

            {/* Review mode: Show explanation */}
            {state === "review" && result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900"
              >
                <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                  💡 Explanation
                </p>
                <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">
                  {result.results.find((r) => r.questionId === question.id)
                    ?.explanation || "No explanation available for this question."}
                </p>
              </motion.div>
            )}
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
                : "text-gray-300 dark:text-gray-700 cursor-not-allowed",
            )}
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              disabled={!answers[question.id] && state !== "review" && quizMode !== "practice"}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all",
                answers[question.id] || state === "review" || quizMode === "practice"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed",
              )}
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (state === "review") {
                  setState("results");
                } else {
                  handleSubmit();
                }
              }}
              disabled={!allAnswered && state !== "review" && quizMode !== "practice"}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                allAnswered || state === "review" || quizMode === "practice"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed",
              )}
            >
              {state === "review" ? (
                <ArrowLeft className="w-4 h-4" />
              ) : (
                <Trophy className="w-4 h-4" />
              )}{" "}
              {state === "review" ? "Back to Results" : "Submit Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
