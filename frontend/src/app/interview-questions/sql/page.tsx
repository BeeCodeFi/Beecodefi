"use client";

import { sqlInterviewQuestions } from "@/data/interview-questions/sql-questions";
import InterviewQuestionsTemplate from "@/components/interview/InterviewQuestionsTemplate";

const sqlTheme = {
  primaryFrom: "from-slate-500",
  primaryTo: "to-slate-700",
  primaryBg: "bg-slate-200 dark:bg-slate-800",
  primaryText: "text-slate-700 dark:text-slate-300",
  primaryBorder: "border-slate-300 dark:border-slate-700",
  hoverText: "group-hover:text-slate-600 dark:group-hover:text-slate-400",
  answerBg: "from-slate-50/50 via-white to-slate-100/30 dark:from-slate-900/10 dark:via-gray-900 dark:to-slate-900/10",
  codeBg: "!bg-slate-200 dark:!bg-slate-800/50",
  codeText: "!text-slate-700 dark:!text-slate-300",
  boldText: "text-slate-700 dark:text-slate-300",
  focusRing: "focus:ring-slate-500",
  hoverBgRow: "hover:from-slate-50 hover:to-slate-100 dark:hover:from-slate-900/20 dark:hover:to-slate-900/20"
};

export default function SqlInterviewQuestionsPage() {
  return (
    <InterviewQuestionsTemplate
      title="SQL Interview Questions"
      topic="sql"
      questions={sqlInterviewQuestions}
      theme={sqlTheme}
    />
  );
}