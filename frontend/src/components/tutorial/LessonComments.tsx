"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ThumbsUp, ThumbsDown, Send, X, Edit2, Trash2, MoreVertical } from "lucide-react";
import { useComments, LessonComment } from "@/hooks/useComments";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

interface LessonCommentsProps {
  tutorialSlug: string;
  lessonSlug: string;
}

export default function LessonComments({ tutorialSlug, lessonSlug }: LessonCommentsProps) {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();
  const { comments, loading, createComment, updateComment, deleteComment, voteComment, removeVote } = useComments(tutorialSlug, lessonSlug);
  
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [showActions, setShowActions] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      await createComment({
        tutorialSlug,
        lessonSlug,
        content: newComment.trim()
      });
      setNewComment("");
      success("Comment posted!", "Your comment has been added");
    } catch (err: any) {
      toastError("Failed to post", err.message);
    }
  };

  const handleEdit = async (commentId: number) => {
    if (!editContent.trim()) return;

    try {
      await updateComment(commentId, { content: editContent.trim() });
      setEditingId(null);
      setEditContent("");
      success("Comment updated!", "Your comment has been updated");
    } catch (err: any) {
      toastError("Failed to update", err.message);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      await deleteComment(commentId);
      success("Comment deleted", "Your comment has been removed");
    } catch (err: any) {
      toastError("Failed to delete", err.message);
    }
  };

  const handleVote = async (commentId: number, isUpvote: boolean) => {
    if (!user) {
      toastError("Authentication required", "Please log in to vote");
      return;
    }

    try {
      const comment = comments.find(c => c.id === commentId);
      if (!comment) return;

      if (comment.userVote === isUpvote) {
        // Remove vote if clicking the same vote
        await removeVote(commentId);
      } else {
        // Change vote or add new vote
        await voteComment(commentId, isUpvote);
      }
    } catch (err: any) {
      toastError("Failed to vote", err.message);
    }
  };

  return (
    <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6 text-indigo-500" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Discussion ({comments.length})
        </h3>
      </div>

      {/* New Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this lesson..."
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Please <a href="/auth/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">log in</a> to join the discussion
          </p>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4"
            >
              <div className="flex gap-4">
                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {comment.userName.charAt(0).toUpperCase()}
                </div>

                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {comment.userName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {editingId === comment.id ? (
                        <div className="mt-2">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                            rows={3}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleEdit(comment.id)}
                              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(null);
                                setEditContent("");
                              }}
                              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      )}
                    </div>

                    {/* Actions Dropdown */}
                    {user && user.id === comment.userId && (
                      <div className="relative">
                        <button
                          onClick={() => setShowActions(showActions === comment.id ? null : comment.id)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                        <AnimatePresence>
                          {showActions === comment.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-10"
                            >
                              <button
                                onClick={() => {
                                  setEditingId(comment.id);
                                  setEditContent(comment.content);
                                  setShowActions(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                              >
                                <Edit2 className="w-3 h-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(comment.id);
                                  setShowActions(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {/* Voting */}
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => handleVote(comment.id, true)}
                      className={`flex items-center gap-1 text-sm transition-colors ${
                        comment.userVote === true
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-500 hover:text-green-600 dark:hover:text-green-400'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{comment.upvotes}</span>
                    </button>
                    <button
                      onClick={() => handleVote(comment.id, false)}
                      className={`flex items-center gap-1 text-sm transition-colors ${
                        comment.userVote === false
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-500 hover:text-red-600 dark:hover:text-red-400'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>{comment.downvotes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
