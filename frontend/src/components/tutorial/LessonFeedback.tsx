"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import api from "@/lib/api";

export default function LessonFeedback({ tutorialSlug, lessonSlug }: { tutorialSlug: string; lessonSlug: string }) {
  const [feedbackState, setFeedbackState] = useState<"idle" | "yes" | "no">("idle");
  const { success } = useToast();

  const handleFeedback = async (type: "yes" | "no") => {
    setFeedbackState(type);
    try {
      await api.post("/lesson-feedback", {
        tutorialSlug,
        lessonSlug,
        isHelpful: type === "yes",
      });
    } catch {
      // Keep the interaction responsive if analytics is temporarily unavailable.
    }
    success("Thanks for your feedback!", "This helps us improve BeeCodeFi.");
  };

  return (
    <div className="mt-12 py-8 border-y border-gray-100 dark:border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        Was this lesson helpful?
      </h4>
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleFeedback("yes")}
          disabled={feedbackState !== "idle"}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            feedbackState === "yes"
              ? "bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800/60"
              : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700/60 hover:text-green-600 dark:hover:text-green-400 disabled:opacity-50"
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          Yes
        </button>
        <button
          onClick={() => handleFeedback("no")}
          disabled={feedbackState !== "idle"}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            feedbackState === "no"
              ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/60"
              : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700/60 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-50"
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          No
        </button>
      </div>
    </div>
  );
}
