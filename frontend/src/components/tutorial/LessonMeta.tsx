"use client";

import { Clock, Signal, ExternalLink } from "lucide-react";
import React, { useState } from "react";

interface LessonMetaProps {
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes?: number;
  mdnReference?: string;
  aiQuestionId?: string;
}

const difficultyConfig = {
  beginner: { label: "Beginner", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", dots: 1 },
  intermediate: { label: "Intermediate", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", dots: 2 },
  advanced: { label: "Advanced", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", dots: 3 },
};

export default function LessonMeta({ difficulty, estimatedMinutes, mdnReference, aiQuestionId }: LessonMetaProps) {
   const diff = difficulty ? difficultyConfig[difficulty as keyof typeof difficultyConfig] : null;

   const [alertMessage, setAlertMessage] = useState<string | null>(null);

   const handleAskAI = async (questionId: string) => {
      try {
         const res = await fetch(`/api/lesson/${questionId}/explain`, { method: "POST" });
         if (!res.ok) throw new Error("Network error");
         const data = await res.json();
         setAlertMessage(data.explanation);
      } catch (e) {
         console.error(e);
         setAlertMessage("Sorry, AI explanation failed.");
      }
   };

   return (
        <div className="flex flex-wrap items-center gap-3 mb-6">
            {diff && (
                <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${diff.color}`}>
                    <Signal className="w-3 h-3" />
                    {diff.label}
                </span>
            )}
            {estimatedMinutes && (
                <span 
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    <Clock className="w-3 h-3" />
                    {estimatedMinutes} min
                </span>
            )}
            {mdnReference && (
                <a 
                    href={mdnReference}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                >
                    <ExternalLink className="w-3 h-3" />
                    MDN Reference
                </a>
            )}
            {/* AI Explanation Button */}
            {aiQuestionId && (
                <button 
                    onClick={() => handleAskAI(aiQuestionId)} 
                    className="ml-3 inline-flex items-center gap-1 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-2 py-1 transition-colors">
                    Explain with AI
                </button>
            )}
            {/* AI Result */}
            {alertMessage && (
               <p className="text-xs text-red-600 mt-1">{alertMessage}</p>
            )}
        </div>
   );
}