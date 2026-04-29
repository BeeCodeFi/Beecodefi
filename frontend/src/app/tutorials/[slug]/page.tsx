"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Menu,
  X,
  CheckCircle2,
  Circle,
  Zap,
  Brain,
} from "lucide-react";
import { tutorials } from "@/data/tutorials";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import LiveCodeEditor from "@/components/tutorial/LiveCodeEditor";
import ExerciseBlock from "@/components/tutorial/ExerciseBlock";
import KeyTakeaways from "@/components/tutorial/KeyTakeaways";
import LessonMeta from "@/components/tutorial/LessonMeta";
import ProgressBar from "@/components/tutorial/ProgressBar";
import QuizCTA from "@/components/tutorial/QuizCTA";
import LessonQuiz from "@/components/tutorial/LessonQuiz";
import { getQuizCategoryForTutorial } from "@/data/quiz-categories";
import { lessonQuizzes } from "@/data/lesson-quizzes";

function renderInlineMarkdown(text: string): string {
  return text
    .replace(
      /`([^`]+)`/g,
      (_, code) =>
        `<code class="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 rounded text-sm font-mono border border-indigo-100 dark:border-indigo-800">${code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`
    )
    .replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="text-gray-900 dark:text-white font-semibold">$1</strong>'
    );
}

export default function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courseComplete, setCourseComplete] = useState(false);

  const tutorial = tutorials.find((t) => t.slug === slug);

  // Load completed lessons from localStorage + sync with backend
  useEffect(() => {
    if (!tutorial) return;

    // Load from localStorage first (instant)
    const stored = localStorage.getItem(`tutorial-progress-${slug}`);
    let localIndices = new Set<number>();
    if (stored) {
      try {
        localIndices = new Set(JSON.parse(stored));
        setCompletedLessons(localIndices);
      } catch {
        // ignore parse errors
      }
    }

    const savedIndex = localStorage.getItem(`tutorial-lesson-${slug}`);
    if (savedIndex !== null) {
      const idx = parseInt(savedIndex, 10);
      if (!isNaN(idx) && idx >= 0 && idx < tutorial.lessons.length) {
        setCurrentLessonIndex(idx);
      }
    }

    // Sync with backend for logged-in users
    const token = localStorage.getItem("token");
    if (!token) return;

    api.get<{ tutorialSlug: string; lessonSlug: string }[]>("/progress")
      .then(({ data }) => {
        const backendSlugs = data
          .filter((p) => p.tutorialSlug === slug)
          .map((p) => p.lessonSlug);

        // Merge backend progress into local set
        const merged = new Set(localIndices);
        backendSlugs.forEach((ls) => {
          const idx = tutorial.lessons.findIndex((l) => l.slug === ls);
          if (idx !== -1) merged.add(idx);
        });

        // Sync any local-only completions to backend
        localIndices.forEach((idx) => {
          const lessonSlug = tutorial.lessons[idx]?.slug;
          if (lessonSlug && !backendSlugs.includes(lessonSlug)) {
            api.post("/progress/mark", { tutorialSlug: slug, lessonSlug }).catch(() => {});
          }
        });

        if (merged.size !== localIndices.size) {
          setCompletedLessons(merged);
          localStorage.setItem(`tutorial-progress-${slug}`, JSON.stringify([...merged]));
        }
      })
      .catch(() => {});
  }, [slug, tutorial]);

  // Save completed lessons to localStorage and sync to backend
  const markCompleted = (index: number) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      next.add(index);
      localStorage.setItem(`tutorial-progress-${slug}`, JSON.stringify([...next]));
      return next;
    });
    // Sync to backend (fire-and-forget)
    if (tutorial) {
      const lessonSlug = tutorial.lessons[index]?.slug;
      if (lessonSlug) {
        api.post("/progress/mark", { tutorialSlug: slug, lessonSlug }).catch(() => {});
      }
    }
  };

  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tutorial not found</h1>
          <Link href="/tutorials" className="text-indigo-600 hover:underline">
            Back to Tutorials
          </Link>
        </div>
      </div>
    );
  }

  const lesson = tutorial.lessons[currentLessonIndex];
  const hasPrev = currentLessonIndex > 0;
  const hasNext = currentLessonIndex < tutorial.lessons.length - 1;

  const goToLesson = (index: number) => {
    setCurrentLessonIndex(index);
    localStorage.setItem(`tutorial-lesson-${slug}`, String(index));
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    markCompleted(currentLessonIndex);
    if (hasNext) {
      goToLesson(currentLessonIndex + 1);
    } else {
      setCourseComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 relative">
      {/* Course complete banner */}
      <AnimatePresence>
        {courseComplete && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            className="fixed top-0 inset-x-0 z-50 flex items-center justify-between gap-4 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎉</span>
              <div>
                <p className="font-bold text-base">Course Complete!</p>
                <p className="text-sm text-emerald-100">You finished all lessons in {tutorial.title}. Great work!</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {(() => {
                const quizCat = getQuizCategoryForTutorial(slug);
                if (quizCat) {
                  return (
                    <Link
                      href={`/quiz/${quizCat.topics[0].toLowerCase()}`}
                      className="px-4 py-2 bg-white text-emerald-700 hover:bg-emerald-50 rounded-lg text-sm font-medium transition-colors"
                    >
                      Take the Quiz →
                    </Link>
                  );
                }
                return null;
              })()}
              <Link
                href="/tutorials"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                Browse More
              </Link>
              <button
                onClick={() => setCourseComplete(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-40 w-10 h-10 rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside
            className={cn(
              "lg:w-80 shrink-0 fixed lg:relative inset-y-0 left-0 z-30 lg:z-auto w-80 bg-white dark:bg-gray-950 lg:bg-transparent p-6 lg:p-0 overflow-y-auto transition-transform duration-300 lg:transform-none border-r lg:border-r-0 border-gray-200 dark:border-gray-800",
              sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}
          >
            <div className="sticky top-24">
              <Link
                href="/tutorials"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> All Tutorials
              </Link>

              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {tutorial.title}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                {tutorial.lessons.length} lessons · {tutorial.lessons.reduce((s, l) => s + (l.estimatedMinutes || 0), 0)} min total
              </p>

              {/* Progress */}
              <ProgressBar
                current={completedLessons.size}
                total={tutorial.lessons.length}
                label="Your Progress"
              />

              {/* Lessons nav */}
              <nav className="space-y-0.5 mt-5">
                {tutorial.lessons.map((l, i) => {
                  const isCompleted = completedLessons.has(i);
                  const isCurrent = i === currentLessonIndex;
                  return (
                    <button
                      key={l.slug}
                      onClick={() => goToLesson(i)}
                      className={cn(
                        "w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2.5 group",
                        isCurrent
                          ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : isCurrent ? (
                        <Zap className="w-4 h-4 text-indigo-500 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0" />
                      )}
                      <span className="truncate">{l.title}</span>
                      {l.estimatedMinutes && (
                        <span className="ml-auto text-[10px] text-gray-400 shrink-0">
                          {l.estimatedMinutes}m
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar Quiz Link */}
              {(() => {
                const quizCat = getQuizCategoryForTutorial(slug);
                if (quizCat) {
                  return (
                    <Link
                      href={`/quiz/${quizCat.topics[0].toLowerCase()}`}
                      className={cn(
                        "flex items-center gap-2.5 mt-4 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                        "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30",
                        "text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-950/50 dark:hover:to-indigo-950/50",
                        "border border-purple-200 dark:border-purple-800/50"
                      )}
                    >
                      <Brain className="w-4 h-4 shrink-0" />
                      <span className="truncate">Take the Quiz</span>
                    </Link>
                  );
                }
                return null;
              })()}
            </div>
          </aside>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.main
              key={currentLessonIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="flex-1 min-w-0 lg:pl-4"
            >
              {/* Breadcrumb / Lesson indicator */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3 ml-12 lg:ml-0">
                <BookOpen className="w-4 h-4" />
                Lesson {currentLessonIndex + 1} of {tutorial.lessons.length}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 ml-12 lg:ml-0 tracking-tight">
                {lesson.title}
              </h1>

              {/* Meta badges */}
              <div className="ml-12 lg:ml-0">
                <LessonMeta
                  difficulty={lesson.difficulty}
                  estimatedMinutes={lesson.estimatedMinutes}
                  mdnReference={lesson.mdnReference}
                />
              </div>

              {/* Lesson Content */}
              <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
                {lesson.content.split("\n\n").map((paragraph, i) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={i}
                        className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    const items = paragraph.split("\n").filter(Boolean);
                    return (
                      <ul
                        key={i}
                        className="space-y-2 text-gray-600 dark:text-gray-400 my-4"
                      >
                        {items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                            <span
                              dangerouslySetInnerHTML={{
                                __html: renderInlineMarkdown(item.replace("- ", "")),
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{
                        __html: renderInlineMarkdown(paragraph),
                      }}
                    />
                  );
                })}
              </div>

              {/* Code Examples */}
              {lesson.codeExamples.map((example, i) => (
                <div key={i}>
                  {example.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 italic">
                      {example.description}
                    </p>
                  )}
                  <LiveCodeEditor
                    initialCode={example.code}
                    language={example.language}
                    title={example.title}
                    description={example.description}
                  />
                </div>
              ))}

              {/* Key Takeaways */}
              {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
                <KeyTakeaways takeaways={lesson.keyTakeaways} />
              )}

              {/* Interactive Exercises */}
              {lesson.interactiveExercises && lesson.interactiveExercises.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center gap-2.5 mb-5">
                    <Zap className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Practice Exercises
                    </h3>
                  </div>
                  {lesson.interactiveExercises.map((exercise, i) => (
                    <ExerciseBlock
                      key={exercise.id}
                      exercise={exercise}
                      exerciseNumber={i + 1}
                    />
                  ))}
                </div>
              )}

              {/* Inline Lesson Quiz */}
              {(() => {
                const quizKey = `${slug}/${lesson.slug}`;
                const quizQuestions = lessonQuizzes[quizKey];
                if (quizQuestions && quizQuestions.length > 0) {
                  return (
                    <LessonQuiz
                      key={quizKey}
                      questions={quizQuestions}
                      lessonTitle={lesson.title}
                    />
                  );
                }
                return null;
              })()}

              {/* Quiz CTA — shown on the last lesson of each course */}
              {(() => {
                const quizCategory = getQuizCategoryForTutorial(slug);
                if (quizCategory && !hasNext) {
                  return <QuizCTA category={quizCategory} />;
                }
                return null;
              })()}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => goToLesson(currentLessonIndex - 1)}
                  disabled={!hasPrev}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all text-sm",
                    hasPrev
                      ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                      : "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                  )}
                >
                  <ChevronLeft className="w-4 h-4" />
                  {hasPrev && tutorial.lessons[currentLessonIndex - 1].title}
                  {!hasPrev && "Previous"}
                </button>
                <button
                  onClick={goNext}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all text-sm",
                    hasNext
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/25"
                      : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-md shadow-emerald-500/25"
                  )}
                >
                  {hasNext ? tutorial.lessons[currentLessonIndex + 1].title : "Mark Complete ✓"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
