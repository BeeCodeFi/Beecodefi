"use client";

import { htmlInterviewQuestions } from "@/data/interview-questions/html-questions";
import InterviewQuestionsTemplate from "@/components/interview/InterviewQuestionsTemplate";

const htmlTheme = {
  primaryFrom: "from-orange-500",
  primaryTo: "to-red-500",
  primaryBg: "bg-orange-100 dark:bg-orange-900/40",
  primaryText: "text-orange-700 dark:text-orange-300",
  primaryBorder: "border-orange-200 dark:border-orange-800",
  hoverText: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
  answerBg: "from-orange-50/50 via-white to-red-50/30 dark:from-orange-950/10 dark:via-gray-900 dark:to-red-950/10",
  codeBg: "!bg-orange-100 dark:!bg-orange-900/30",
  codeText: "!text-orange-700 dark:!text-orange-400",
  boldText: "text-orange-700 dark:text-orange-300",
  focusRing: "focus:ring-orange-500",
  hoverBgRow: "hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-950/20 dark:hover:to-red-950/20"
};

export default function HTMLInterviewQuestionsPage() {
  return (
    <InterviewQuestionsTemplate
      title="HTML Interview Questions"
      topic="html"
      questions={htmlInterviewQuestions}
      theme={htmlTheme}
    />
  );
}
