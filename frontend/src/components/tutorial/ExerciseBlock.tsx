"use client";

import { useState } from "react";
import { Lightbulb, CheckCircle2, XCircle, RotateCcw, Eye } from "lucide-react";
import { InteractiveExercise } from "@/types";

interface ExerciseBlockProps {
  exercise: InteractiveExercise;
  exerciseNumber: number;
}

export default function ExerciseBlock({ exercise, exerciseNumber }: ExerciseBlockProps) {
  const [userCode, setUserCode] = useState(exercise.startingCode);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleReset = () => {
    setUserCode(exercise.startingCode);
    setSubmitted(false);
    setShowSolution(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const normalizeHtml = (html: string) =>
    html.replace(/\s+/g, " ").replace(/>\s+</g, "><").trim().toLowerCase();

  const isCorrect =
    submitted &&
    exercise.expectedOutput &&
    normalizeHtml(userCode) === normalizeHtml(exercise.expectedOutput);

  return (
    <div className="rounded-2xl border-2 border-dashed border-indigo-300 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-950/20 p-5 sm:p-6 my-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm shrink-0">
          {exerciseNumber}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white text-base">
            {exercise.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {exercise.instruction}
          </p>
        </div>
      </div>

      {/* Code Input */}
      <textarea
        value={userCode}
        onChange={(e) => {
          setUserCode(e.target.value);
          setSubmitted(false);
        }}
        spellCheck={false}
        className="w-full bg-[#0d1117] text-gray-300 font-mono text-sm leading-relaxed p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 min-h-[120px] border border-gray-700"
        rows={Math.max(4, userCode.split("\n").length + 1)}
        style={{ tabSize: 4 }}
      />

      {/* Feedback */}
      {submitted && (
        <div className={`flex items-center gap-2 mt-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
          isCorrect
            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
            : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
        }`}>
          {isCorrect ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Great job! Your solution is correct!
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4" />
              Not quite right. Try again or check the hints!
            </>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Check Answer
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
        {exercise.hints && exercise.hints.length > 0 && (
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHints ? "Hide Hints" : "Show Hints"}
          </button>
        )}
        {exercise.expectedOutput && (
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-1.5 px-4 py-2 text-gray-500 dark:text-gray-400 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-auto"
          >
            <Eye className="w-3.5 h-3.5" />
            {showSolution ? "Hide Solution" : "Show Solution"}
          </button>
        )}
      </div>

      {/* Hints */}
      {showHints && exercise.hints && (
        <div className="mt-3 space-y-1.5">
          {exercise.hints.map((hint, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-3 py-2 rounded-lg"
            >
              <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              {hint}
            </div>
          ))}
        </div>
      )}

      {/* Solution */}
      {showSolution && exercise.expectedOutput && (
        <div className="mt-3">
          <pre className="bg-[#0d1117] text-green-400 font-mono text-sm p-4 rounded-xl overflow-x-auto">
            <code>{exercise.expectedOutput}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
