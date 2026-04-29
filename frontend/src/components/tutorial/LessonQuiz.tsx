"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface LessonQuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Props {
  questions: LessonQuizQuestion[];
  lessonTitle: string;
}

export default function LessonQuiz({ questions, lessonTitle }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<Set<number>>(
    new Set()
  );

  const q = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelectedIndex(idx);
  };

  const handleCheck = () => {
    if (selectedIndex === null) return;
    setRevealed(true);
    if (selectedIndex === q.correctIndex) {
      setScore((s) => s + 1);
      setAnsweredCorrectly((prev) => new Set(prev).add(currentIndex));
    }
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedIndex(null);
    setRevealed(false);
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
    setAnsweredCorrectly(new Set());
  };

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="mt-10 mb-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8">
          <div className="text-center">
            <div
              className={cn(
                "inline-flex items-center justify-center w-16 h-16 rounded-full mb-4",
                percentage >= 80
                  ? "bg-emerald-100 dark:bg-emerald-950/40"
                  : percentage >= 50
                    ? "bg-amber-100 dark:bg-amber-950/40"
                    : "bg-red-100 dark:bg-red-950/40"
              )}
            >
              <Trophy
                className={cn(
                  "w-8 h-8",
                  percentage >= 80
                    ? "text-emerald-500"
                    : percentage >= 50
                      ? "text-amber-500"
                      : "text-red-500"
                )}
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Lesson Quiz Results
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {lessonTitle}
            </p>
            <p
              className={cn(
                "text-4xl font-bold mb-2",
                percentage >= 80
                  ? "text-emerald-500"
                  : percentage >= 50
                    ? "text-amber-500"
                    : "text-red-500"
              )}
            >
              {score}/{questions.length}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              {percentage >= 80
                ? "Excellent! You nailed this lesson."
                : percentage >= 50
                  ? "Good effort! Review the parts you missed."
                  : "Keep studying! Re-read the lesson and try again."}
            </p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-4">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <Brain className="w-5 h-5 text-purple-500" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Quick Quiz
        </h3>
        <span className="ml-auto text-xs text-gray-400 font-medium">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mb-5">
        {questions.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i < currentIndex
                ? answeredCorrectly.has(i)
                  ? "bg-emerald-500"
                  : "bg-red-400"
                : i === currentIndex
                  ? "bg-indigo-500"
                  : "bg-gray-200 dark:bg-gray-800"
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6"
        >
          {/* Question */}
          <p className="text-base font-semibold text-gray-900 dark:text-white mb-4 leading-relaxed">
            {q.question}
          </p>

          {q.codeSnippet && (
            <div className="bg-gray-950 rounded-xl p-4 mb-4 overflow-x-auto">
              <pre className="text-sm text-gray-300 font-mono">
                <code>{q.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Options */}
          <div className="space-y-2.5">
            {q.options.map((option, idx) => {
              const isSelected = selectedIndex === idx;
              const isCorrect = idx === q.correctIndex;
              let optionStyle =
                "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300";

              if (revealed) {
                if (isCorrect) {
                  optionStyle =
                    "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300";
                } else if (isSelected && !isCorrect) {
                  optionStyle =
                    "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300";
                }
              } else if (isSelected) {
                optionStyle =
                  "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={revealed}
                  className={cn(
                    "w-full text-left p-3.5 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-3",
                    optionStyle
                  )}
                >
                  <span className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {revealed && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {revealed && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">
                    Explanation:
                  </strong>{" "}
                  {q.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-5">
            {!revealed ? (
              <button
                onClick={handleCheck}
                disabled={selectedIndex === null}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
                  selectedIndex !== null
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                )}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                {isLast ? "See Results" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
