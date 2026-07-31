"use client";

import { use, useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Zap, BookOpen, Bookmark, BookmarkCheck } from "lucide-react";
import { tutorials } from "@/data/tutorials";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import LiveCodeEditor from "@/components/tutorial/LiveCodeEditor";
import ExerciseBlock from "@/components/tutorial/ExerciseBlock";
import KeyTakeaways from "@/components/tutorial/KeyTakeaways";
import LessonMeta from "@/components/tutorial/LessonMeta";
import QuizCTA from "@/components/tutorial/QuizCTA";
import LessonQuiz from "@/components/tutorial/LessonQuiz";
import TutorialSidebar from "@/components/tutorial/TutorialSidebar";
import ReadingProgressBar from "@/components/tutorial/ReadingProgressBar";
import TableOfContents from "@/components/tutorial/TableOfContents";
import LessonNavHeader from "@/components/tutorial/LessonNavHeader";
import Certificate from "@/components/tutorial/Certificate";
import { getQuizCategoryForTutorial } from "@/data/quiz-categories";
import { lessonQuizzes } from "@/data/lesson-quizzes";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useStreak } from "@/hooks/useStreak";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

// ─── Inline markdown helpers ────────────────────────────────────────────────

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function renderInlineMarkdown(text: string): string {
  return text
    .replace(
      /`([^`]+)`/g,
      (_, code) =>
        `<code class="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 rounded text-[0.82em] font-mono border border-indigo-100 dark:border-indigo-800">${code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</code>`
    )
    .replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>'
    )
    .replace(
      /\*([^*]+)\*/g,
      '<em class="italic text-gray-700 dark:text-gray-300">$1</em>'
    );
}

// Renders the full lesson body: ## headings get anchor IDs, lists, paragraphs
function LessonContent({ content }: { content: string }) {
  const blocks = content.split("\n\n");

  return (
    <div className="space-y-0">
      {blocks.map((block, i) => {
        // ── H2 heading with scroll anchor ──
        if (block.startsWith("## ")) {
          const text = block.replace(/^## /, "").trim();
          const id = slugify(text);
          return (
            <h2
              key={i}
              id={id}
              className="group flex items-center gap-2 text-xl sm:text-2xl font-bold mt-10 mb-3 pt-2 text-gray-900 dark:text-white scroll-mt-28"
            >
              <a
                href={`#${id}`}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 hover:text-indigo-600 text-lg"
                aria-hidden="true"
              >
                #
              </a>
              {text}
            </h2>
          );
        }

        // ── Bullet list ──
        if (block.startsWith("- ")) {
          const items = block.split("\n").filter((l) => l.trim());
          return (
            <ul key={i} className="my-4 space-y-2.5 pl-1">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span
                    className="text-base text-gray-600 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: renderInlineMarkdown(item.replace(/^- /, "")),
                    }}
                  />
                </li>
              ))}
            </ul>
          );
        }

        // ── Numbered list ──
        if (/^\d+\.\s/.test(block)) {
          const items = block.split("\n").filter((l) => l.trim());
          return (
            <ol key={i} className="my-4 space-y-2.5 pl-1 list-none counter-reset-none">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="mt-0.5 w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {j + 1}
                  </span>
                  <span
                    className="text-base text-gray-600 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: renderInlineMarkdown(item.replace(/^\d+\.\s/, "")),
                    }}
                  />
                </li>
              ))}
            </ol>
          );
        }

        // ── Bold lines used as sub-headings (e.g. "**Best Practices:**") ──
        if (/^\*\*[^*]+\*\*[:\s]/.test(block) && !block.includes("\n")) {
          return (
            <p
              key={i}
              className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-1"
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(block) }}
            />
          );
        }

        // ── Regular paragraph ──
        if (block.trim()) {
          return (
            <p
              key={i}
              className="text-base sm:text-[1.05rem] text-gray-600 dark:text-gray-300 leading-[1.85] mb-4"
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(block) }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense>
      <TutorialPageContent params={params} />
    </Suspense>
  );
}

function TutorialPageContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const lessonParam = searchParams.get("lesson");
  const router = useRouter();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(
    new Set()
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courseComplete, setCourseComplete] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { user } = useAuth();
  const { success, info } = useToast();
  useStreak(!!user); // ping streak only when logged in

  const tutorial = tutorials.find((t) => t.slug === slug);

  // ── Load + sync progress ─────────────────────────────────────────────────
  useEffect(() => {
    if (!tutorial) return;

    const stored = localStorage.getItem(`tutorial-progress-${slug}`);
    let localIndices = new Set<number>();
    if (stored) {
      try {
        localIndices = new Set(JSON.parse(stored));
        setCompletedLessons(localIndices);
      } catch { /* ignore */ }
    }

    // Prefer ?lesson= URL param (from search or bookmark deep-link)
    if (lessonParam) {
      const paramIdx = tutorial.lessons.findIndex((l) => l.slug === lessonParam);
      if (paramIdx !== -1) {
        setCurrentLessonIndex(paramIdx);
        return;
      }
    }

    const savedIndex = localStorage.getItem(`tutorial-lesson-${slug}`);
    if (savedIndex !== null) {
      const idx = parseInt(savedIndex, 10);
      if (!isNaN(idx) && idx >= 0 && idx < tutorial.lessons.length) {
        setCurrentLessonIndex(idx);
      }
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    api
      .get<{ tutorialSlug: string; lessonSlug: string }[]>("/progress")
      .then(({ data }) => {
        const backendSlugs = data
          .filter((p) => p.tutorialSlug === slug)
          .map((p) => p.lessonSlug);

        const merged = new Set(localIndices);
        backendSlugs.forEach((ls) => {
          const idx = tutorial.lessons.findIndex((l) => l.slug === ls);
          if (idx !== -1) merged.add(idx);
        });

        localIndices.forEach((idx) => {
          const lessonSlug = tutorial.lessons[idx]?.slug;
          if (lessonSlug && !backendSlugs.includes(lessonSlug)) {
            api
              .post("/progress/mark", { tutorialSlug: slug, lessonSlug })
              .catch(() => {});
          }
        });

        if (merged.size !== localIndices.size) {
          setCompletedLessons(merged);
          localStorage.setItem(
            `tutorial-progress-${slug}`,
            JSON.stringify([...merged])
          );
        }
      })
      .catch(() => {});
  }, [slug, tutorial]);

  // ── Keyboard shortcuts ─── moved below lesson/hasNext/hasPrev declarations

  const markCompleted = (index: number) => {    setCompletedLessons((prev) => {
      const next = new Set(prev);
      next.add(index);
      localStorage.setItem(
        `tutorial-progress-${slug}`,
        JSON.stringify([...next])
      );
      return next;
    });
    if (tutorial) {
      const lessonSlug = tutorial.lessons[index]?.slug;
      if (lessonSlug) {
        api
          .post("/progress/mark", { tutorialSlug: slug, lessonSlug })
          .catch(() => {});
      }
      // Toast: lesson completed
      const lessonTitle = tutorial.lessons[index]?.title;
      if (lessonTitle) success("Lesson completed! ✓", lessonTitle);
    }
  };

  // ── Not found ────────────────────────────────────────────────────────────
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
    // Update URL so the lesson is shareable / bookmarkable
    const lessonSlug = tutorial.lessons[index]?.slug;
    if (lessonSlug) {
      router.replace(`/tutorials/${slug}?lesson=${lessonSlug}`, { scroll: false });
    }
  };

  const goNext = () => {
    markCompleted(currentLessonIndex);
    if (hasNext) {
      goToLesson(currentLessonIndex + 1);
    } else {
      setCourseComplete(true);
      setShowCertificate(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      info("🎉 Course complete!", `You finished the ${tutorial.title} track`);
    }
  };

  const goPrev = () => {
    if (hasPrev) goToLesson(currentLessonIndex - 1);
  };

  // ── Keyboard shortcuts: J/K = next/prev, B = bookmark ────────────────
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "j" || e.key === "ArrowRight") { if (hasNext) goNext(); }
      if (e.key === "k" || e.key === "ArrowLeft")  { if (hasPrev) goPrev(); }
      if (e.key === "b") {
        if (tutorial && user) toggleBookmark({ tutorialSlug: slug, lessonSlug: lesson.slug, lessonTitle: lesson.title, trackTitle: tutorial.title });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentLessonIndex]);

  const quizKey = `${slug}/${lesson.slug}`;
  const quizQuestions = lessonQuizzes[quizKey];
  const quizCategory = getQuizCategoryForTutorial(slug);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Certificate modal */}
      <AnimatePresence>
        {showCertificate && tutorial && (
          <Certificate
            name="Learner"
            trackTitle={tutorial.title}
            lessonsCount={tutorial.lessons.length}
            completedAt={new Date().toISOString()}
            onClose={() => setShowCertificate(false)}
          />
        )}
      </AnimatePresence>

      {/* Scroll-driven reading progress line at very top of viewport */}
      <ReadingProgressBar />

      {/* ── Course complete banner ── */}
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
                <p className="text-sm text-emerald-100">
                  You finished all lessons in {tutorial.title}. Great work!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {quizCategory && (
                <Link
                  href={`/quiz?category=${quizCategory.id}`}
                  className="px-4 py-2 bg-white text-emerald-700 hover:bg-emerald-50 rounded-lg text-sm font-medium transition-colors"
                >
                  Take the Quiz →
                </Link>
              )}
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

      {/* ── Sticky lesson nav header (below main site nav) ── */}
      <LessonNavHeader
        lessonTitle={lesson.title}
        lessonIndex={currentLessonIndex}
        totalLessons={tutorial.lessons.length}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={goPrev}
        onNext={goNext}
        onMenuToggle={() => setSidebarOpen((o) => !o)}
      />

      {/* ── Mobile sidebar overlay backdrop ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-20 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Three-column layout: sidebar | content | toc ── */}
      <div className="max-w-[1440px] mx-auto flex">

        {/* LEFT: fixed sidebar */}
        <TutorialSidebar
          tutorial={tutorial}
          slug={slug}
          currentLessonIndex={currentLessonIndex}
          completedLessons={completedLessons}
          onSelectLesson={goToLesson}
          isOpen={sidebarOpen}
        />

        {/* CENTER: lesson content */}
        <AnimatePresence mode="wait">
          <motion.main
            key={currentLessonIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="flex-1 min-w-0 px-5 sm:px-8 lg:px-12 py-8 lg:py-10 max-w-3xl mx-auto xl:mx-0 xl:max-w-none"
          >
            {/* Lesson eyebrow */}
            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-3">
              <BookOpen className="w-4 h-4" />
              <span>
                Lesson {currentLessonIndex + 1} of {tutorial.lessons.length}
              </span>
            </div>

            {/* Lesson title + Bookmark */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl sm:text-[2.25rem] font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                {lesson.title}
              </h1>
              {/* Bookmark — logged-in only */}
              {user && (
              <button
                onClick={() => toggleBookmark({ tutorialSlug: slug, lessonSlug: lesson.slug, lessonTitle: lesson.title, trackTitle: tutorial.title })}
                title={isBookmarked(slug, lesson.slug) ? "Remove bookmark (B)" : "Bookmark this lesson (B)"}
                className={`shrink-0 mt-1 p-2 rounded-xl border transition-all ${
                  isBookmarked(slug, lesson.slug)
                    ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400 hover:text-indigo-500 hover:border-indigo-300"
                }`}
              >
                {isBookmarked(slug, lesson.slug)
                  ? <BookmarkCheck className="w-5 h-5" />
                  : <Bookmark className="w-5 h-5" />}
              </button>
              )}
            </div>

            {/* Meta badges */}
            <LessonMeta
              difficulty={lesson.difficulty}
              estimatedMinutes={lesson.estimatedMinutes}
              mdnReference={lesson.mdnReference}
            />

            {/* ── Lesson body ── */}
            <div className="mt-6">
              <LessonContent content={lesson.content} />
            </div>

            {/* ── Code examples ── */}
            {lesson.codeExamples.length > 0 && (
              <div className="mt-8 space-y-2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Code Examples
                  </span>
                  <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                </div>
                {lesson.codeExamples.map((example, i) => (
                  <LiveCodeEditor
                    key={i}
                    initialCode={example.code}
                    language={example.language}
                    title={example.title}
                    description={example.description}
                  />
                ))}
              </div>
            )}

            {/* ── Key takeaways ── */}
            {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
              <KeyTakeaways takeaways={lesson.keyTakeaways} />
            )}

            {/* ── Practice exercises ── */}
            {lesson.interactiveExercises &&
              lesson.interactiveExercises.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center gap-2.5 mb-5">
                    <Zap className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Practice Exercises
                    </h3>
                    <span className="ml-auto text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                      {lesson.interactiveExercises.length} exercise
                      {lesson.interactiveExercises.length !== 1 ? "s" : ""}
                    </span>
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

            {/* ── Inline lesson quiz ── */}
            {quizQuestions && quizQuestions.length > 0 && (
              <LessonQuiz
                key={quizKey}
                questions={quizQuestions}
                lessonTitle={lesson.title}
              />
            )}

            {/* ── End-of-course quiz CTA ── */}
            {quizCategory && !hasNext && (
              <QuizCTA category={quizCategory} />
            )}

            {/* ── Up Next + other tracks ── */}
            {hasNext && (
              <div className="mt-10 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900/60 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Up Next</span>
                </div>
                <button
                  onClick={() => goToLesson(currentLessonIndex + 1)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/20 transition-colors text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center shrink-0">
                    <ChevronRight className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                      {tutorial.lessons[currentLessonIndex + 1].title}
                    </p>
                    {tutorial.lessons[currentLessonIndex + 1].estimatedMinutes && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        ⏱ {tutorial.lessons[currentLessonIndex + 1].estimatedMinutes} min · {tutorial.lessons[currentLessonIndex + 1].difficulty ?? "beginner"}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-colors shrink-0" />
                </button>
              </div>
            )}

            {/* ── Bottom prev/next navigation ── */}
            <div className="flex items-center justify-between mt-14 pt-8 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={goPrev}
                disabled={!hasPrev}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all",
                  hasPrev
                    ? "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                    : "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <span className="truncate max-w-[180px]">
                  {hasPrev
                    ? tutorial.lessons[currentLessonIndex - 1].title
                    : "Previous"}
                </span>
              </button>

              <button
                onClick={goNext}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all shadow-md",
                  hasNext
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-500/25"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-500/25"
                )}
              >
                <span className="truncate max-w-[180px]">
                  {hasNext
                    ? tutorial.lessons[currentLessonIndex + 1].title
                    : "Mark Complete ✓"}
                </span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </motion.main>
        </AnimatePresence>

        {/* RIGHT: table of contents — sticky column that stays fixed while content scrolls */}
        <div className="hidden xl:flex xl:flex-col w-56 shrink-0 sticky top-[108px] h-[calc(100vh-108px)] px-4 py-8 overflow-y-auto scrollbar-thin">
          <TableOfContents content={lesson.content} />
        </div>
      </div>
    </div>
  );
}
