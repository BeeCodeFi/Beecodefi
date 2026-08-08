"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Shuffle,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FlashcardQuestion {
  id: string;
  question: string;
  answer: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  tags: string[];
}

interface Props {
  questions: FlashcardQuestion[];
  onClose: () => void;
  accentColor?: string;
}

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  intermediate: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  advanced: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Strip markdown — renders the FULL answer as readable plain text (no truncation)
function stripMarkdown(text: string): string {
  return text
    .replace(/```[\w]*\n?/g, "")         // remove code fence openers (```js, ``` etc.)
    .replace(/```/g, "")                 // remove remaining code fence closers
    .replace(/`([^`]+)`/g, "$1")         // inline code → plain text
    .replace(/\*\*(.*?)\*\*/g, "$1")     // bold
    .replace(/\*(.*?)\*/g, "$1")         // italic
    .replace(/^#{1,6}\s+/gm, "")         // headings
    .replace(/^[-*]\s+/gm, "• ")         // bullet lists
    .replace(/\n{3,}/g, "\n\n")          // collapse triple+ blank lines
    .trim();
}

export default function FlashcardMode({ questions, onClose, accentColor = "from-indigo-500 to-purple-500" }: Props) {
  const [deck, setDeck] = useState<FlashcardQuestion[]>(questions);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [unknown, setUnknown] = useState<Set<string>>(new Set());
  const [completed, setCompleted] = useState(false);
  const [direction, setDirection] = useState(1);

  const card = deck[index];
  const progress = ((index) / deck.length) * 100;

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const goNext = useCallback(() => {
    if (index >= deck.length - 1) { setCompleted(true); return; }
    setDirection(1);
    setIndex(i => i + 1);
    setFlipped(false);
  }, [index, deck.length]);

  const goPrev = useCallback(() => {
    if (index <= 0) return;
    setDirection(-1);
    setIndex(i => i - 1);
    setFlipped(false);
  }, [index]);

  const markKnown = () => {
    setKnown(prev => new Set([...prev, card.id]));
    setUnknown(prev => { const n = new Set(prev); n.delete(card.id); return n; });
    goNext();
  };

  const markUnknown = () => {
    setUnknown(prev => new Set([...prev, card.id]));
    setKnown(prev => { const n = new Set(prev); n.delete(card.id); return n; });
    goNext();
  };

  const handleShuffle = () => {
    setDeck(shuffleArray(questions));
    setIndex(0); setFlipped(false); setCompleted(false);
    setKnown(new Set()); setUnknown(new Set());
  };

  const handleRestart = () => {
    setDeck(questions);
    setIndex(0); setFlipped(false); setCompleted(false);
    setKnown(new Set()); setUnknown(new Set());
  };

  const handleRetryUnknown = () => {
    const unknownCards = questions.filter(q => unknown.has(q.id));
    if (unknownCards.length === 0) return;
    setDeck(unknownCards);
    setIndex(0); setFlipped(false); setCompleted(false);
    setKnown(new Set()); setUnknown(new Set());
  };

  return (
    // Backdrop — fixed to viewport, always centered regardless of page scroll
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* ── Fixed Header ── */}
        <div className={`shrink-0 bg-gradient-to-r ${accentColor} p-5 text-white`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5" />
              <span className="font-bold text-lg">Flashcard Mode</span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {!completed && (
            <>
              <div className="flex justify-between text-xs text-white/80 mb-1">
                <span>{index + 1} / {deck.length}</span>
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-300" /> {known.size}
                  </span>
                  <span className="flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-red-300" /> {unknown.size}
                  </span>
                </span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </>
          )}
        </div>

        {/* ── Scrollable Content ── */}
        <div className="flex-1 overflow-y-auto p-6">
          {completed ? (
            /* Completion screen */
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Deck Complete!</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">{deck.length} cards reviewed</p>

              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-500">{known.size}</div>
                  <div className="text-sm text-gray-500">Known ✓</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">{unknown.size}</div>
                  <div className="text-sm text-gray-500">Review Again ✗</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {unknown.size > 0 && (
                  <button onClick={handleRetryUnknown} className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors">
                    <RotateCcw className="w-4 h-4" /> Retry {unknown.size} Unknown
                  </button>
                )}
                <button onClick={handleRestart} className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  <RotateCcw className="w-4 h-4" /> Restart All
                </button>
                <button onClick={onClose} className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Exit
                </button>
              </div>
            </div>
          ) : (
            /* Card face */
            <AnimatePresence mode="wait">
              <motion.div
                key={`${card.id}-${flipped}`}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.22 }}
              >
                {/* Badge row */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border", difficultyColors[card.difficulty])}>
                    {card.difficulty}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    {card.category}
                  </span>
                  <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
                    {flipped ? "Answer" : "Question"} — tap to flip
                  </span>
                </div>

                {/* Clickable card */}
                <button
                  onClick={() => setFlipped(f => !f)}
                  className={cn(
                    "w-full text-left p-6 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md",
                    flipped
                      ? "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800"
                      : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "shrink-0 mt-0.5 p-1.5 rounded-lg",
                      flipped ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    )}>
                      {flipped ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </div>
                    {/* Full answer, no truncation, wraps naturally */}
                    <p className={cn(
                      "text-base leading-relaxed whitespace-pre-wrap break-words",
                      flipped
                        ? "text-gray-700 dark:text-gray-300"
                        : "font-semibold text-gray-900 dark:text-white"
                    )}>
                      {flipped ? stripMarkdown(card.answer) : card.question}
                    </p>
                  </div>
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* ── Sticky Bottom Navigation (hidden on completion screen) ── */}
        {!completed && (
          <div className="shrink-0 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between gap-3">
              {/* Prev */}
              <button
                onClick={goPrev}
                disabled={index === 0}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Centre action: Reveal / Still Learning + Got It */}
              {flipped ? (
                <div className="flex gap-3 flex-1 justify-center">
                  <button onClick={markUnknown} className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors">
                    <XCircle className="w-4 h-4" /> Still Learning
                  </button>
                  <button onClick={markKnown} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors">
                    <CheckCircle2 className="w-4 h-4" /> Got It!
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 flex-1 justify-center">
                  <button onClick={() => setFlipped(true)} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                    <Eye className="w-4 h-4" /> Reveal Answer
                  </button>
                  <button onClick={handleShuffle} title="Shuffle deck" className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Shuffle className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Next */}
              <button
                onClick={goNext}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
