"use client";

import { use, useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
  BookOpen,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
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
import LessonNavHeader from "@/components/tutorial/LessonNavHeader";
import TableOfContents from "@/components/tutorial/TableOfContents";
import LessonFeedback from "@/components/tutorial/LessonFeedback";
import Certificate from "@/components/tutorial/Certificate";
import { getQuizCategoryForTutorial } from "@/data/quiz-categories";
import { lessonQuizzes } from "@/data/lesson-quizzes";
import StructuredData from "@/components/seo/StructuredData";
import { generateLearningResourceSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { useBookmarks } from "@/hooks/useBookmarks";
import { getUserStorageKey } from "@/lib/userStorage";
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
        `<code class="inline-code-element px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/50 rounded text-[0.82em] font-mono border border-indigo-100 dark:border-indigo-800">${code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</code>`,
    )
    .replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="inline-strong-element font-semibold">$1</strong>',
    )
    .replace(
      /\*([^*]+)\*/g,
      '<em class="inline-em-element italic">$1</em>',
    );
}

// Renders the full lesson body: ## headings get anchor IDs, lists, paragraphs
function LessonContent({ content }: { content: string }) {
  const blocks = content.split("\n\n");

  return (
    <div className="lesson-content-wrapper space-y-0 text-gray-700 dark:text-gray-300">
      {blocks.map((block, i) => {
        // ── H2 heading with scroll anchor ──
        if (block.startsWith("## ")) {
          const text = block.replace(/^## /, "").trim();
          const id = slugify(text);
          return (
            <h2
              key={i}
              id={id}
              className="group flex items-center gap-2 text-xl sm:text-2xl font-bold mt-10 mb-3 pt-2 !text-gray-900 dark:!text-white scroll-mt-28"
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
                    className="text-base !text-gray-600 dark:!text-gray-300 leading-relaxed"
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
            <ol
              key={i}
              className="my-4 space-y-2.5 pl-1 list-none counter-reset-none"
            >
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="mt-0.5 w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {j + 1}
                  </span>
                  <span
                    className="text-base !text-gray-600 dark:!text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: renderInlineMarkdown(
                        item.replace(/^\d+\.\s/, ""),
                      ),
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
              className="text-base sm:text-[1.05rem] leading-[1.85] mb-4 !text-gray-600 dark:!text-gray-300"
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
  const [hydrated, setHydrated] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(
    new Set(),
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courseComplete, setCourseComplete] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { user } = useAuth();
  const { success, info } = useToast();

  const tutorial = tutorials.find((t) => t.slug === slug);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Track scroll progress for the reading bar in LessonNavHeader
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      
      // Save scroll position to sessionStorage for page reloads
      sessionStorage.setItem(
        `scroll-${slug}-${currentLessonIndex}`,
        String(scrollTop)
      );
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [slug, currentLessonIndex]);

  // Restore scroll position on lesson load (only for page reloads, not navigation)
  useEffect(() => {
    // Only restore scroll if we're hydrating the same lesson (page reload scenario)
    // Not when navigating between lessons
    if (!hydrated) return;
    
    const savedScroll = sessionStorage.getItem(
      `scroll-${slug}-${currentLessonIndex}`
    );
    if (savedScroll) {
      const scrollPos = parseInt(savedScroll, 10);
      // Use setTimeout to ensure content is rendered
      setTimeout(() => {
        window.scrollTo({ top: scrollPos, behavior: 'instant' as ScrollBehavior });
      }, 0);
    } else {
      // No saved scroll = this is a fresh navigation, start at top
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [slug, currentLessonIndex, hydrated]);

  // Reset scroll progress when lesson changes
  useEffect(() => {
    // When navigating to a new lesson, clear its saved scroll position
    // and scroll to top
    if (hydrated) {
      // Clear the saved scroll position for the NEW lesson we're navigating to
      sessionStorage.removeItem(`scroll-${slug}-${currentLessonIndex}`);
      
      queueMicrotask(() => {
        setScrollProgress(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, [currentLessonIndex, hydrated, slug]);

  // Save current lesson to localStorage whenever it changes
  useEffect(() => {
    if (!hydrated || !tutorial) return;
    localStorage.setItem(
      getUserStorageKey(user?.id, `tutorial-lesson-${slug}`),
      String(currentLessonIndex),
    );
  }, [currentLessonIndex, hydrated, tutorial, slug, user?.id]);

  // ── Load + sync progress ─────────────────────────────────────────────────
  useEffect(() => {
    if (!tutorial || !hydrated) return;

    const stored = localStorage.getItem(
      getUserStorageKey(user?.id, `tutorial-progress-${slug}`),
    );
    let localIndices = new Set<number>();
    if (stored) {
      try {
        localIndices = new Set(JSON.parse(stored));
        queueMicrotask(() => setCompletedLessons(localIndices));
      } catch {
        /* ignore */
      }
    }

    // Prefer ?lesson= URL param (from search or bookmark deep-link)
    if (lessonParam) {
      const paramIdx = tutorial.lessons.findIndex(
        (l) => l.slug === lessonParam,
      );
      if (paramIdx !== -1) {
        queueMicrotask(() => {
          setCurrentLessonIndex(paramIdx);
          // Save this lesson to localStorage so refresh keeps you here
          localStorage.setItem(
            getUserStorageKey(user?.id, `tutorial-lesson-${slug}`),
            String(paramIdx),
          );
        });
        // Don't load from localStorage or sync with backend yet
        // The saved lesson state will handle that
        return;
      }
    }

    // If no URL param, determine which lesson to show
    const savedIndex = localStorage.getItem(
      getUserStorageKey(user?.id, `tutorial-lesson-${slug}`),
    );
    
    let targetIndex = 0;
    
    if (savedIndex !== null) {
      // User has a saved lesson - use that
      const idx = parseInt(savedIndex, 10);
      if (!isNaN(idx) && idx >= 0 && idx < tutorial.lessons.length) {
        targetIndex = idx;
      }
    } else {
      // No saved lesson - find the first incomplete lesson
      const firstIncomplete = tutorial.lessons.findIndex((_, i) => !localIndices.has(i));
      if (firstIncomplete !== -1) {
        targetIndex = firstIncomplete;
      }
    }
    
    const lessonSlug = tutorial.lessons[targetIndex]?.slug;
    queueMicrotask(() => {
      setCurrentLessonIndex(targetIndex);
      // Update URL to match the selected lesson
      if (lessonSlug) {
        router.replace(`/tutorials/${slug}?lesson=${lessonSlug}`, {
          scroll: false,
        });
      }
    });

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
            getUserStorageKey(user?.id, `tutorial-progress-${slug}`),
            JSON.stringify([...merged]),
          );
        }
      })
      .catch(() => {});
  }, [slug, tutorial, hydrated, user?.id, lessonParam, router]);

  // ── Keyboard shortcuts ─── moved below lesson/hasNext/hasPrev declarations

  const markCompleted = (index: number) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      next.add(index);
      localStorage.setItem(
        getUserStorageKey(user?.id, `tutorial-progress-${slug}`),
        JSON.stringify([...next]),
      );
      return next;
    });
    
    if (tutorial) {
      const lessonSlug = tutorial.lessons[index]?.slug;
      const lessonTitle = tutorial.lessons[index]?.title;
      
      if (lessonSlug) {
        // Save to backend (which will automatically update streak and recent activity)
        api
          .post("/progress/mark", { 
            tutorialSlug: slug, 
            lessonSlug,
            tutorialTitle: tutorial.title,
            lessonTitle: lessonTitle
          })
          .catch(() => {});
        
        // No need for localStorage recent activity anymore - it's in the database
      }
      
      // Toast: lesson completed
      if (lessonTitle) success("Lesson completed! ✓", lessonTitle);
    }
  };

  const markIncomplete = (index: number) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      next.delete(index);
      localStorage.setItem(
        getUserStorageKey(user?.id, `tutorial-progress-${slug}`),
        JSON.stringify([...next]),
      );
      return next;
    });
    if (tutorial) {
      const lessonSlug = tutorial.lessons[index]?.slug;
      if (lessonSlug) {
        api
          .delete(
            `/progress/unmark?tutorialSlug=${slug}&lessonSlug=${lessonSlug}`,
          )
          .catch(() => {});
      }
      const lessonTitle = tutorial.lessons[index]?.title;
      if (lessonTitle) info("Lesson marked incomplete", lessonTitle);
    }
  };

  const lesson = tutorial?.lessons[currentLessonIndex];
  const hasPrev = currentLessonIndex > 0;
  const hasNext = tutorial
    ? currentLessonIndex < tutorial.lessons.length - 1
    : false;

  const goToLesson = (index: number) => {
    // Clear saved scroll for the target lesson before navigating
    sessionStorage.removeItem(`scroll-${slug}-${index}`);
    
    setCurrentLessonIndex(index);
    localStorage.setItem(
      getUserStorageKey(user?.id, `tutorial-lesson-${slug}`),
      String(index),
    );
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Update URL so the lesson is shareable / bookmarkable
    const lessonSlug = tutorial?.lessons[index]?.slug;
    if (lessonSlug) {
      router.replace(`/tutorials/${slug}?lesson=${lessonSlug}`, {
        scroll: false,
      });
    }
  };

  const goNext = () => {
    markCompleted(currentLessonIndex);
    if (hasNext) {
      goToLesson(currentLessonIndex + 1);
    } else if (tutorial) {
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
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "j" || e.key === "ArrowRight") {
        if (hasNext) goNext();
      }
      if (e.key === "k" || e.key === "ArrowLeft") {
        if (hasPrev) goPrev();
      }
      if (e.key === "b") {
        if (tutorial && user && lesson) {
          toggleBookmark({
            tutorialSlug: slug,
            lessonSlug: lesson.slug,
            lessonTitle: lesson.title,
            trackTitle: tutorial.title,
          });
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    currentLessonIndex,
    goNext,
    goPrev,
    hasNext,
    hasPrev,
    lesson?.slug,
    lesson?.title,
    slug,
    toggleBookmark,
    tutorial,
    user,
  ]);

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

  const quizKey = lesson ? `${slug}/${lesson.slug}` : `${slug}/undefined`;
  const quizQuestions = lesson ? lessonQuizzes[quizKey] : undefined;
  const quizCategory = getQuizCategoryForTutorial(slug);

  return (
    <>
      {/* SEO: LearningResource Schema */}
      {tutorial && lesson && (
        <StructuredData
          data={generateLearningResourceSchema({
            title: lesson.title,
            description: `Learn ${lesson.title} in this interactive tutorial from ${tutorial.title} track`,
            tutorialSlug: slug,
            lessonSlug: lesson.slug,
            difficulty: lesson.difficulty,
            category: tutorial.title,
          })}
        />
      )}

      {/* SEO: Breadcrumb Schema */}
      {tutorial && lesson && (
        <StructuredData
          data={generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Tutorials", url: "/tutorials" },
            { name: tutorial.title, url: `/tutorials/${slug}` },
            { name: lesson.title, url: `/tutorials/${slug}?lesson=${lesson.slug}` },
          ])}
        />
      )}

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

      {/* Scroll-driven reading progress line — embedded in LessonNavHeader */}

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
        lessonTitle={lesson?.title ?? "Lesson"}
        lessonIndex={currentLessonIndex}
        totalLessons={tutorial.lessons.length}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={goPrev}
        onNext={goNext}
        onMenuToggle={() => setSidebarOpen((o) => !o)}
        scrollProgress={scrollProgress}
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

            {/* Lesson title + Bookmark + Completion Status */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-3xl sm:text-[2.25rem] font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                  {lesson?.title ?? "Lesson"}
                </h1>
                {/* Completion status badge */}
                {completedLessons.has(currentLessonIndex) && (
                  <div className="flex items-center gap-2 mt-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-xs font-medium border border-green-200 dark:border-green-800/60">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Completed
                    </span>
                    <button
                      onClick={() => markIncomplete(currentLessonIndex)}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:underline transition-colors"
                      title="Mark as incomplete"
                    >
                      Mark incomplete
                    </button>
                  </div>
                )}
              </div>
              {/* Bookmark — logged-in only */}
              {user && lesson && (
                <button
                  onClick={() =>
                    toggleBookmark({
                      tutorialSlug: slug,
                      lessonSlug: lesson.slug,
                      lessonTitle: lesson.title,
                      trackTitle: tutorial.title,
                    })
                  }
                  title={
                    isBookmarked(slug, lesson.slug)
                      ? "Remove bookmark (B)"
                      : "Bookmark this lesson (B)"
                  }
                  className={`shrink-0 mt-1 p-2 rounded-xl border transition-all ${
                    isBookmarked(slug, lesson.slug)
                      ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400"
                      : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400 hover:text-indigo-500 hover:border-indigo-300"
                  }`}
                >
                  {isBookmarked(slug, lesson.slug) ? (
                    <BookmarkCheck className="w-5 h-5" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>

            {/* Meta badges */}
            <LessonMeta
              difficulty={lesson?.difficulty ?? "beginner"}
              estimatedMinutes={lesson?.estimatedMinutes ?? 0}
              mdnReference={lesson?.mdnReference}
            />

            {/* ── Lesson body ── */}
            <div className="mt-6 text-gray-700 dark:text-gray-300">
              <LessonContent content={lesson?.content ?? ""} />
            </div>

            {/* ── Code examples ── */}
            {lesson?.codeExamples && lesson.codeExamples.length > 0 && (
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
            {lesson?.keyTakeaways && lesson.keyTakeaways.length > 0 && (
              <KeyTakeaways takeaways={lesson.keyTakeaways} />
            )}

            {/* ── Practice exercises ── */}
            {lesson?.interactiveExercises &&
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

            {/* ── Quick Quiz (for advanced lessons with quickQuiz property) ── */}
            {lesson?.quickQuiz && lesson.quickQuiz.length > 0 && (
              <LessonQuiz
                key={`quick-quiz-${lesson.slug}`}
                questions={lesson.quickQuiz.map((q, idx) => ({
                  id: `${lesson.slug}-quick-${idx}`,
                  question: q.question,
                  options: q.options,
                  correctIndex: q.correctAnswer,
                  explanation: q.explanation,
                }))}
                lessonTitle={lesson.title}
                storageKey={`quick-quiz-${slug}-${lesson.slug}`}
                quizTopic={`${slug}/${lesson.slug}`}
              />
            )}

            {/* ── Inline lesson quiz (only if no quickQuiz property exists) ── */}
            {!lesson?.quickQuiz && quizQuestions && quizQuestions.length > 0 && lesson && (
              <LessonQuiz
                key={quizKey}
                questions={quizQuestions}
                lessonTitle={lesson.title}
                storageKey={quizKey}
                quizTopic={quizKey}
              />
            )}

            {/* ── Lesson Feedback ── */}
            {lesson && (
              <LessonFeedback tutorialSlug={slug} lessonSlug={lesson.slug} />
            )}

            {/* ── End-of-course quiz CTA ── */}
            {quizCategory && !hasNext && <QuizCTA category={quizCategory} />}

            {/* ── Bottom prev/next navigation ── */}
            <div className="flex items-center justify-between mt-14 pt-8 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={goPrev}
                disabled={!hasPrev}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all",
                  hasPrev
                    ? "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                    : "text-gray-300 dark:text-gray-700 cursor-not-allowed",
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
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-500/25",
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
          <TableOfContents content={lesson?.content ?? ""} />
        </div>
      </div>
    </div>
    </>
  );
}
