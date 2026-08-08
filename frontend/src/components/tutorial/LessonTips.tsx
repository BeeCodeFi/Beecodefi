"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ThumbsUp, ThumbsDown, Send, X, Edit2, Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useLessonTips, LessonTip } from "@/hooks/useLessonTips";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

interface LessonTipsProps {
  tutorialSlug: string;
  lessonSlug: string;
}

export default function LessonTips({ tutorialSlug, lessonSlug }: LessonTipsProps) {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();
  const { tips, loading, createTip, updateTip, deleteTip, voteTip, removeVote } = useLessonTips(tutorialSlug, lessonSlug);
  
  const [showForm, setShowForm] = useState(false);
  const [newTip, setNewTip] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTip.trim() || !user) return;

    try {
      await createTip({
        tutorialSlug,
        lessonSlug,
        tip: newTip.trim()
      });
      setNewTip("");
      setShowForm(false);
      success("Tip submitted!", "Your tip will be visible after approval");
    } catch (err: any) {
      toastError("Failed to submit", err.message);
    }
  };

  const handleEdit = async (tipId: number) => {
    if (!editContent.trim()) return;

    try {
      await updateTip(tipId, { tip: editContent.trim() });
      setEditingId(null);
      setEditContent("");
      success("Tip updated!", "Your tip has been updated");
    } catch (err: any) {
      toastError("Failed to update", err.message);
    }
  };

  const handleDelete = async (tipId: number) => {
    if (!confirm("Are you sure you want to delete this tip?")) return;

    try {
      await deleteTip(tipId);
      success("Tip deleted", "Your tip has been removed");
    } catch (err: any) {
      toastError("Failed to delete", err.message);
    }
  };

  const handleVote = async (tipId: number, isUpvote: boolean) => {
    if (!user) {
      toastError("Authentication required", "Please log in to vote");
      return;
    }

    try {
      const tip = tips.find(t => t.id === tipId);
      if (!tip) return;

      if (tip.userVote === isUpvote) {
        // Remove vote if clicking the same vote
        await removeVote(tipId);
      } else {
        // Change vote or add new vote
        await voteTip(tipId, isUpvote);
      }
    } catch (err: any) {
      toastError("Failed to vote", err.message);
    }
  };

  const startEdit = (tip: LessonTip) => {
    setEditingId(tip.id);
    setEditContent(tip.tip);
  };

  return (
    <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-amber-500" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Community Tips ({tips.length})
          </h3>
        </div>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Share Tip
          </button>
        )}
      </div>

      {/* New Tip Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Tip
                </label>
                <textarea
                  value={newTip}
                  onChange={(e) => setNewTip(e.target.value)}
                  placeholder="Share a helpful tip, trick, or insight about this lesson..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                  rows={3}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{newTip.length}/500 characters</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  disabled={!newTip.trim()}
                  className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Submit Tip
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips List */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
        </div>
      ) : tips.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">
            No tips yet. Be the first to share your insights!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tips.map((tip) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:border-amber-300 dark:hover:border-amber-700 transition-colors"
            >
              {editingId === tip.id ? (
                /* Edit Form */
                <div className="space-y-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                    rows={3}
                    maxLength={500}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(tip.id)}
                      disabled={!editContent.trim()}
                      className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditContent("");
                      }}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Tip Content */
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{tip.tip}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>By {tip.userName}</span>
                        <span>•</span>
                        <span>{new Date(tip.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {tip.isOwner && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(tip)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(tip.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Voting */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={() => handleVote(tip.id, true)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                        tip.userVote === true
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{tip.upvotes}</span>
                    </button>
                    <button
                      onClick={() => handleVote(tip.id, false)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                        tip.userVote === false
                          ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>{tip.downvotes}</span>
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}