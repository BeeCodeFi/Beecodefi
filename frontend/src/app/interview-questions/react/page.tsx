"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search, Filter, FileCode2, Star, StarOff, RotateCcw, X, Clock, Layers, StickyNote, StickyNoteIcon, PenLine } from "lucide-react";
import Link from "next/link";
import { reactInterviewQuestions } from "@/data/interview-questions/react-questions";
import { useRevisions } from "@/hooks/useRevisions";
import { useInterviewProgress } from "@/hooks/useInterviewProgress";
import { useStudySession } from "@/hooks/useStudySession";
import { useInterviewNotes } from "@/hooks/useInterviewNotes";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import FlashcardMode from "@/components/interview/FlashcardMode";

export default function ReactInterviewQuestionsPage() {
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
  const { loading, toggleRevision, clearAllRevisions, isMarked, count } = useRevisions('react');
  const { isRead, markAsRead, readCount } = useInterviewProgress('react');
  const { sessionFormatted, totalFormatted } = useStudySession('react');
  const { getNote, saveNote, hasNote, noteCount, isAuthenticated } = useInterviewNotes('react');

  const filteredQuestions = reactInterviewQuestions.filter((q) => {
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

    formatted = formatted.replace(/`([^`]+)`/g, '<code class="!bg-blue-100 dark:!bg-blue-900/30 !text-blue-700 dark:!text-blue-400 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>');
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-700 dark:text-blue-300 font-bold">$1</strong>');

    const paragraphs = formatted.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map(p => {
      if (p.trim().startsWith('<pre')) {
        return p;
      }
      return `<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">${p.replace(/\n/g, '<br>')}</p>`;
    }).join('');
  };

  // Calculate stats
  const beginnerQs = reactInterviewQuestions.filter(q => q.difficulty === 'beginner');
  const intermediateQs = reactInterviewQuestions.filter(q => q.difficulty === 'intermediate');
  const advancedQs = reactInterviewQuestions.filter(q => q.difficulty === 'advanced');

  const stats = {
    total: reactInterviewQuestions.length,
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
            questions={reactInterviewQuestions}
            onClose={() => setShowFlashcards(false)}
            accentColor="from-blue-500 to-cyan-500"
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-16">
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
              <h1 className="text-4xl font-extrabold">React Interview Questions</h1>
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
            
            {/* Second row: progress bar + revision + session */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(stats.totalRead / stats.total) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-yellow-300" />
                <span>{stats.markedForRevision}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>{sessionFormatted}</span>
              </div>
              {user && (
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-1 text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar - Sticky */}
      <div className="sticky top-16 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions, answers, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white appearance-none cursor-pointer"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                {user && <option value="revisions">Revisions Only ⭐</option>}
              </select>
            </div>

            {/* Revisions Toggle */}
            {user && (
              <button
                onClick={() => setShowRevisionsOnly(!showRevisionsOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showRevisionsOnly 
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-700' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                }`}
              >
                <Star className="w-5 h-5" />
                <span>Revisions</span>
              </button>
            )}

            {/* Flashcard Mode */}
            <button
              onClick={() => setShowFlashcards(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Layers className="w-5 h-5" />
              <span>Flashcards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <FileCode2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No questions found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((question, index) => {
              const isExpanded = expandedId === question.id;
              const hasNote = openNoteId === question.id || noteCount > 0;
              
              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border rounded-lg overflow-hidden transition-all ${
                    isExpanded 
                      ? 'border-blue-500 dark:border-blue-400 shadow-lg' 
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  {/* Question Header */}
                  <div
                    onClick={() => toggleQuestion(question.id)}
                    className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Question Number */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        question.difficulty === 'beginner' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : question.difficulty === 'intermediate'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {index + 1}
                      </div>

                      {/* Question Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-8">
                            {question.question}
                          </h3>
                          
                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {/* Note Button */}
                            <button
                              onClick={(e) => openNote(question.id, e)}
                              className={`p-2 rounded-lg transition-colors ${
                                hasNote 
                                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' 
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                              }`}
                              title="Add note"
                            >
                              <StickyNoteIcon className="w-4 h-4" />
                            </button>

                            {/* Revision Mark Button */}
                            {user && (
                              <button
                                onClick={(e) => handleToggleRevision(question.id, e)}
                                className={`p-2 rounded-lg transition-colors ${
                                  isMarked(question.id)
                                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                                title={isMarked(question.id) ? "Remove from revisions" : "Mark for revision"}
                              >
                                {isMarked(question.id) ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                              </button>
                            )}

                            {/* Expand/Collapse */}
                            <div className="p-2">
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Tags and Difficulty */}
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            question.difficulty === 'beginner'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : question.difficulty === 'intermediate'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          }`}>
                            {question.difficulty}
                          </span>
                          <span className="text-gray-400 dark:text-gray-600">•</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{question.category}</span>
                          {question.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                          {isRead(question.id) && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                              ✓ Read
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Note Panel */}
                  <AnimatePresence>
                    {openNoteId === question.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-200 dark:border-gray-800 bg-purple-50 dark:bg-purple-900/20"
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-purple-700 dark:text-purple-400 flex items-center gap-2">
                              <PenLine className="w-4 h-4" />
                              Your Notes
                            </span>
                            <button
                              onClick={() => setOpenNoteId(null)}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <textarea
                            ref={noteRef}
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Add your personal notes here..."
                            className="w-full h-24 p-3 border border-purple-200 dark:border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-purple-900/10 dark:text-white resize-none"
                          />
                          <div className="flex justify-end mt-2">
                            <button
                              onClick={() => handleSaveNote(question.id)}
                              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm transition-colors"
                            >
                              Save Note
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Answer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-200 dark:border-gray-800"
                      >
                        <div 
                          className="p-4 prose prose-sm dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: formatAnswer(question.answer) }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}