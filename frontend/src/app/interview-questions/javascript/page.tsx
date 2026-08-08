"use client";

import { jsInterviewQuestions } from "@/data/interview-questions/js-questions";
import InterviewQuestionsTemplate from "@/components/interview/InterviewQuestionsTemplate";

const jsTheme = {
  primaryFrom: "from-yellow-400",
  primaryTo: "to-amber-500",
  primaryBg: "bg-yellow-100 dark:bg-yellow-900/40",
  primaryText: "text-yellow-700 dark:text-yellow-300",
  primaryBorder: "border-yellow-200 dark:border-yellow-800",
  hoverText: "group-hover:text-yellow-600 dark:group-hover:text-yellow-400",
  answerBg: "from-yellow-50/50 via-white to-amber-50/30 dark:from-yellow-950/10 dark:via-gray-900 dark:to-amber-950/10",
  codeBg: "!bg-yellow-100 dark:!bg-yellow-900/30",
  codeText: "!text-yellow-700 dark:!text-yellow-400",
  boldText: "text-yellow-700 dark:text-yellow-300",
  focusRing: "focus:ring-yellow-500",
  hoverBgRow: "hover:from-yellow-50 hover:to-amber-50 dark:hover:from-yellow-950/20 dark:hover:to-amber-950/20"
};

export default function JavaScriptInterviewQuestionsPage() {
  return (
    <InterviewQuestionsTemplate
      title="JavaScript Interview Questions"
      topic="javascript"
      questions={jsInterviewQuestions}
      theme={jsTheme}
    />
  );
}
