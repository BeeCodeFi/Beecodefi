"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search, Filter, FileCode2, Star, StarOff, RotateCcw, X, Clock, Layers, StickyNote, StickyNoteIcon, PenLine } from "lucide-react";
import Link from "next/link";
import { htmlInterviewQuestions } from "@/data/interview-questions/html-questions";
import { useRevisions } from "@/hooks/useRevisions";
import { useInterviewProgress } from "@/hooks/useInterviewProgress";
import { useStudySession } from "@/hooks/useStudySession";
import { useInterviewNotes } from "@/hooks/useInterviewNotes";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import FlashcardMode from "@/components/interview/FlashcardMode";

export default function HTMLInterviewQuestionsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [showRevisionsOnly, setShowRevisionsOnly] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const noteRef = useRef<HTMLTextAreaElement>(null);
  
  const { user } = useAuth();
  const { success, error: toastError, info } = useToast();
  const { loading, toggleRevision, clearAllRevisions, isMarked, count } = useRevisions('html');
  const { isRead, markAsRead, readCount } = useInterviewProgress('html');
  const { sessionFormatted, totalFormatted } = useStudySession('html');
  const { getNote, saveNote, hasNote, noteCount, isAuthenticated } = useInterviewNotes('html');

  const filteredQuestions = htmlInterviewQuestions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === "all" || q.difficulty === selectedDifficulty;
    const matchesRevision = !showRevisionsOnly || isMarked(q.id);
    return matchesSearch && matchesDifficulty && matchesRevision;
  });

  const toggleQuestion = (id: string) => {
    const isOpening = expandedId !== id;
    setExpandedId(expandedId === id ? null : id);
    if (isOpening && user) markAsRead(id);
    if (openNoteId && openNoteId !== id) setOpenNoteId(null);
  };

  const openNote = (questionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (openNoteId === questionId) {
      setOpenNoteId(null);
    } else {
      setOpenNoteId(questionId);
      setNoteText(getNote(questionId));
      setTimeout(() => noteRef.current?.focus(), 50);
    }
  };

  const handleSaveNote = (questionId: string) => {
    saveNote(questionId, noteText);
    setOpenNoteId(null);
    success("Note saved!", "Your note has been saved locally.");
  };

  const handleToggleRevision = async (questionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      info("Please log in", "You need to be logged in to mark questions for revision");
      return;
    }

    const wasMarked = isMarked(questionId);
    const result = await toggleRevision(questionId);
    
    if (result) {
      if (wasMarked) {
        info("Unmarked", "Question removed from revision list");
      } else {
        success("Marked for revision! ⭐", "Question added to your revision list");
      }
    } else {
      toastError("Failed to update", "Please try again");
    }
  };

  const handleClearAll = async () => {
    if (!user) return;
    
    if (confirm(`Clear all ${count} revision marks? This cannot be undone.`)) {
      const result = await clearAllRevisions();
      if (result) {
        success("Cleared!", "All revision marks removed");
        setShowRevisionsOnly(false);
      } else {
        toastError("Failed to clear", "Please try again");
      }
    }
  };

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const formatAnswer = (answer: string) => {
    let formatted = answer.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const escapedCode = escapeHtml(code.trim());
      return `<pre class="!bg-gray-900 dark:!bg-black !border !border-gray-700 dark:!border-gray-800 rounded-lg p-4 overflow-x-auto my-4"><code class="language-${lang || 'text'} !text-gray-100 text-sm block whitespace-pre">${escapedCode}</code></pre>`;
    });

    formatted = formatted.replace(/`([^`]+)`/g, '<code class="!bg-orange-100 dark:!bg-orange-900/30 !text-orange-700 dark:!text-orange-400 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>');
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-700 dark:text-orange-300 font-bold">$1</strong>');

    const paragraphs = formatted.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map(p => {
      if (p.trim().startsWith('<pre')) {
        return p;
      }
      return `<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">${p.replace(/\n/g, '<br>')}</p>`;
    }).join('');
  };

  // Calculate stats
  const beginnerQs = htmlInterviewQuestions.filter(q => q.difficulty === 'beginner');
  const intermediateQs = htmlInterviewQuestions.filter(q => q.difficulty === 'intermediate');
  const advancedQs = htmlInterviewQuestions.filter(q => q.difficulty === 'advanced');

  const stats = {
    total: htmlInterviewQuestions.length,
    beginner: beginnerQs.length,
    intermediate: intermediateQs.length,
    advanced: advancedQs.length,
    beginnerRead: beginnerQs.filter(q => isRead(q.id)).length,
    intermediateRead: intermediateQs.filter(q => isRead(q.id)).length,
    advancedRead: advancedQs.filter(q => isRead(q.id)).length,
    markedForRevision: count,
    totalRead: readCount,
    filtered: filteredQuestions.length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Flashcard Modal */}
      <AnimatePresence>
        {showFlashcards && (
          <FlashcardMode
            questions={htmlInterviewQuestions}
            onClose={() => setShowFlashcards(false)}
            accentColor="from-orange-500 to-red-500"
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/interview-questions"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm"
          >
            ← Back to Categories
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <FileCode2 className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold">HTML Interview Questions</h1>
              <p className="text-white/90 mt-2">
                {stats.total} questions covering fundamentals to advanced concepts
              </p>
            </div>
          </div>

          {/* Stats Panel - always visible */}
          <div className="mt-2 p-4 bg-white/10 rounded-lg backdrop-blur-sm space-y-3">
            {/* Top row: counts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.totalRead}/{stats.total}</div>
                <div className="text-xs text-white/70">Read</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-300">{stats.beginnerRead}/{stats.beginner}</div>
                <div className="text-xs text-white/70">Beginner</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">{stats.intermediateRead}/{stats.intermediate}</div>
                <div className="text-xs text-white/70">Intermediate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-300">{stats.advancedRead}/{stats.advanced}</div>
                <div className="text-xs text-white/70">Advanced</div>
              </div>
            </div>
            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>Overall Progress</span>
                <span>{stats.total > 0 ? Math.round((stats.totalRead / stats.total) * 100) : 0}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (stats.totalRead / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
            {/* Study session + flashcard button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-4 text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Session: <span className="font-semibold text-white">{sessionFormatted}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Total: <span className="font-semibold text-white">{totalFormatted}</span>
                </span>
                {noteCount > 0 && (
                  <span className="flex items-center gap-1.5">
                    <StickyNote className="w-3.5 h-3.5" />
                    <span className="font-semibold text-white">{noteCount}</span> notes
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowFlashcards(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Layers className="w-4 h-4" />
                Flashcard Mode
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Filters */}
      <div className="sticky top-16 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4">
            {/* First Row: Search and Difficulty */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions, answers, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Difficulty + Revisions Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={showRevisionsOnly ? 'revisions' : selectedDifficulty}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'revisions') {
                      setShowRevisionsOnly(true);
                      setSelectedDifficulty('all');
                    } else {
                      setShowRevisionsOnly(false);
                      setSelectedDifficulty(val);
                    }
                  }}
                  className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  {user && <option value="revisions">⭐ Revisions Only{count > 0 ? ` (${count})` : ''}</option>}
                </select>
              </div>
            </div>

            {/* Second Row: Results Count and Actions */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Showing {stats.filtered} of {stats.total} questions
              </span>

              {/* Clear All Revisions */}
              {user && count > 0 && (
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear All ({count})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              💡 <Link href="/login" className="font-semibold underline">Log in</Link> to mark questions for revision and track your progress!
            </p>
          </div>
        )}

        <div className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
            >
              {/* Question Header */}
              <div className="w-full px-6 py-5 flex items-start justify-between gap-4">
                <button
                  onClick={() => toggleQuestion(question.id)}
                  className="flex-1 flex items-center gap-4 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-950/20 dark:hover:to-red-950/20 transition-all text-left group -m-5 p-5 rounded-xl"
                >
                  {/* Question Number / Read indicator */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md transition-all ${
                    isRead(question.id)
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                      : 'bg-gradient-to-br from-orange-500 to-red-500'
                  }`}>
                    {htmlInterviewQuestions.findIndex(q => q.id === question.id) + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        question.difficulty === 'beginner' 
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                          : question.difficulty === 'intermediate'
                          ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800'
                          : 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/40 dark:to-pink-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                      }`}>
                        {question.difficulty}
                      </span>
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                        {question.category}
                      </span>
                      {hasNote(question.id) && (
                        <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                          <StickyNote className="w-3 h-3" /> Note
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {question.question}
                    </h3>
                  </div>

                  <div className={`shrink-0 p-2 rounded-lg transition-all ${
                    expandedId === question.id 
                      ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                  }`}>
                    {expandedId === question.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Action buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* Note button */}
                  <button
                    onClick={(e) => openNote(question.id, e)}
                    className={`p-2.5 rounded-lg transition-all ${
                      openNoteId === question.id || hasNote(question.id)
                        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/60'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-500'
                    }`}
                    title="Add/view note"
                  >
                    <PenLine className="w-5 h-5" />
                  </button>

                  {/* Revision Star Button */}
                  {user && (
                    <button
                      onClick={(e) => handleToggleRevision(question.id, e)}
                      disabled={loading}
                      className={`shrink-0 p-2.5 rounded-lg transition-all ${
                        isMarked(question.id)
                          ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/60'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-500'
                      } disabled:opacity-50`}
                      title={isMarked(question.id) ? "Remove from revision list" : "Mark for revision"}
                    >
                      {isMarked(question.id) ? (
                        <Star className="w-5 h-5 fill-current" />
                      ) : (
                        <StarOff className="w-5 h-5" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Note Editor */}
              <AnimatePresence>
                {openNoteId === question.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 border-t border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/10">
                      <div className="flex items-center gap-2 mb-2">
                        <StickyNoteIcon className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">My Note</span>
                        <span className="text-xs text-gray-400 ml-1">
                          {isAuthenticated ? "(synced to account)" : "(saved locally — log in to sync)"}
                        </span>
                      </div>
                      <textarea
                        ref={noteRef}
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Write your personal notes here..."
                        rows={3}
                        className="w-full px-3 py-2.5 text-sm border border-amber-200 dark:border-amber-800 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none transition-all"
                      />
                      <div className="flex items-center justify-end gap-2 mt-2">
                        <button
                          onClick={() => setOpenNoteId(null)}
                          className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNote(question.id)}
                          className="px-4 py-1.5 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors"
                        >
                          Save Note
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Answer (Expandable) */}
              <AnimatePresence>
                {expandedId === question.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-6 border-t-2 border-orange-200 dark:border-orange-900/50 bg-gradient-to-br from-orange-50/50 via-white to-red-50/30 dark:from-orange-950/10 dark:via-gray-900 dark:to-red-950/10">
                      <div 
                        className="prose prose-sm dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: formatAnswer(question.answer) }}
                      />
                      {/* Saved note display inside answer */}
                      {hasNote(question.id) && openNoteId !== question.id && (
                        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                              <StickyNote className="w-3.5 h-3.5" /> My Note
                            </span>
                            <button
                              onClick={(e) => openNote(question.id, e)}
                              className="text-xs text-amber-600 hover:underline"
                            >
                              Edit
                            </button>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {getNote(question.id)}
                          </p>
                        </div>
                      )}
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-orange-200 dark:border-orange-900/50">
                        {question.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium border border-orange-200 dark:border-orange-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
                No questions found
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Try adjusting your filters or search term
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
