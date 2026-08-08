"use client";

import { cssInterviewQuestions } from "@/data/interview-questions/css-questions";
import InterviewQuestionsTemplate from "@/components/interview/InterviewQuestionsTemplate";

const cssTheme = {
  primaryFrom: "from-blue-500",
  primaryTo: "to-indigo-500",
  primaryBg: "bg-blue-100 dark:bg-blue-900/40",
  primaryText: "text-blue-700 dark:text-blue-300",
  primaryBorder: "border-blue-200 dark:border-blue-800",
  hoverText: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
  answerBg: "from-blue-50/50 via-white to-indigo-50/30 dark:from-blue-950/10 dark:via-gray-900 dark:to-indigo-950/10",
  codeBg: "!bg-blue-100 dark:!bg-blue-900/30",
  codeText: "!text-blue-700 dark:!text-blue-400",
  boldText: "text-blue-700 dark:text-blue-300",
  focusRing: "focus:ring-blue-500",
  hoverBgRow: "hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/20 dark:hover:to-indigo-950/20"
};

export default function CSSInterviewQuestionsPage() {
  return (
    <InterviewQuestionsTemplate
      title="CSS Interview Questions"
      topic="css"
      questions={cssInterviewQuestions}
      theme={cssTheme}
    />
  );
}
