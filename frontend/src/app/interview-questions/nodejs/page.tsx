"use client";

import { nodejsInterviewQuestions } from "@/data/interview-questions/nodejs-questions";
import InterviewQuestionsTemplate from "@/components/interview/InterviewQuestionsTemplate";

const nodeTheme = {
  primaryFrom: "from-green-500",
  primaryTo: "to-emerald-500",
  primaryBg: "bg-green-100 dark:bg-green-900/40",
  primaryText: "text-green-700 dark:text-green-300",
  primaryBorder: "border-green-200 dark:border-green-800",
  hoverText: "group-hover:text-green-600 dark:group-hover:text-green-400",
  answerBg: "from-green-50/50 via-white to-emerald-50/30 dark:from-green-950/10 dark:via-gray-900 dark:to-emerald-950/10",
  codeBg: "!bg-green-100 dark:!bg-green-900/30",
  codeText: "!text-green-700 dark:!text-green-400",
  boldText: "text-green-700 dark:text-green-300",
  focusRing: "focus:ring-green-500",
  hoverBgRow: "hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-950/20 dark:hover:to-emerald-950/20"
};

export default function NodejsInterviewQuestionsPage() {
  return (
    <InterviewQuestionsTemplate
      title="Node.js Interview Questions"
      topic="nodejs"
      questions={nodejsInterviewQuestions}
      theme={nodeTheme}
    />
  );
}