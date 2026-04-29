"use client";

import { Clock, Signal, ExternalLink } from "lucide-react";

interface LessonMetaProps {
  difficulty?: string;
  estimatedMinutes?: number;
  mdnReference?: string;
}

const difficultyConfig: Record<string, { label: string; color: string; dots: number }> = {
  beginner: { label: "Beginner", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", dots: 1 },
  intermediate: { label: "Intermediate", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", dots: 2 },
  advanced: { label: "Advanced", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", dots: 3 },
};

export default function LessonMeta({ difficulty, estimatedMinutes, mdnReference }: LessonMetaProps) {
  const diff = difficulty ? difficultyConfig[difficulty] : null;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {diff && (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${diff.color}`}>
          <Signal className="w-3 h-3" />
          {diff.label}
        </span>
      )}
      {estimatedMinutes && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
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
    </div>
  );
}
