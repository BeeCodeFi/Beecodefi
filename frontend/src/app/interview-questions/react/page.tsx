"use client";

import { reactInterviewQuestions } from "@/data/interview-questions/react-questions";
import InterviewQuestionsTemplate from "@/components/interview/InterviewQuestionsTemplate";

const reactTheme = {
  primaryFrom: "from-cyan-500",
  primaryTo: "to-blue-500",
  primaryBg: "bg-cyan-100 dark:bg-cyan-900/40",
  primaryText: "text-cyan-700 dark:text-cyan-300",
  primaryBorder: "border-cyan-200 dark:border-cyan-800",
  hoverText: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
  answerBg: "from-cyan-50/50 via-white to-blue-50/30 dark:from-cyan-950/10 dark:via-gray-900 dark:to-blue-950/10",
  codeBg: "!bg-cyan-100 dark:!bg-cyan-900/30",
  codeText: "!text-cyan-700 dark:!text-cyan-400",
  boldText: "text-cyan-700 dark:text-cyan-300",
  focusRing: "focus:ring-cyan-500",
  hoverBgRow: "hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-950/20 dark:hover:to-blue-950/20"
};

export default function ReactInterviewQuestionsPage() {
  return (
    <InterviewQuestionsTemplate
      title="React Interview Questions"
      topic="react"
      questions={reactInterviewQuestions}
      theme={reactTheme}
    />
  );
}