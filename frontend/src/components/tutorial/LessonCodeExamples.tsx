"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ThumbsUp, ThumbsDown, Send, X, Edit2, Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useLessonCodeExamples, LessonCodeExample } from "@/hooks/useLessonCodeExamples";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

interface LessonCodeExamplesProps {
  tutorialSlug: string;
  lessonSlug: string;
}

export default function LessonCodeExamples({ tutorialSlug, lessonSlug }: LessonCodeExamplesProps) {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();
  const { codeExamples, loading, createCodeExample, updateCodeExample, deleteCodeExample, voteCodeExample, removeVote } = useLessonCodeExamples(tutorialSlug, lessonSlug);
  
  const [showForm, setShowForm] = useState(false);
  const [newExample, setNewExample] = useState({
    title: "",
    description: "",
    code: "",
    language: "javascript"
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState({
    title: "",
    description: "",
    code: "",
    language: "javascript"
  });
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExample.title.trim() || !newExample.code.trim() || !user) return;

    try {
      await createCodeExample({
        tutorialSlug,
        lessonSlug,
        title: newExample.title.trim(),
        description: newExample.description.trim(),
        code: newExample.code.trim(),
        language: newExample.language
      });
      setNewExample({ title: "", description: "", code: "", language: "javascript" });
      setShowForm(false);
      success("Code example submitted!", "Your example will be visible after approval");
    } catch (err: any) {
      toastError("Failed to submit", err.message);
    }
  };

  const handleEdit = async (exampleId: number) => {
    if (!editContent.title.trim() || !editContent.code.trim()) return;

    try {
      await updateCodeExample(exampleId, {
        title: editContent.title.trim(),
        description: editContent.description.trim(),
        code: editContent.code.trim(),
        language: editContent.language
      });
      setEditingId(null);
      setEditContent({ title: "", description: "", code: "", language: "javascript" });
      success("Example updated!", "Your code example has been updated");
    } catch (err: any) {
      toastError("Failed to update", err.message);
    }
  };

  const handleDelete = async (exampleId: number) => {
    if (!confirm("Are you sure you want to delete this code example?")) return;

    try {
      await deleteCodeExample(exampleId);
      success("Example deleted", "Your code example has been removed");
    } catch (err: any) {
      toastError("Failed to delete", err.message);
    }
  };

  const handleVote = async (exampleId: number, isUpvote: boolean) => {
    if (!user) {
      toastError("Authentication required", "Please log in to vote");
      return;
    }

    try {
      const example = codeExamples.find(c => c.id === exampleId);
      if (!example) return;

      if (example.userVote === isUpvote) {
        // Remove vote if clicking the same vote
        await removeVote(exampleId);
      } else {
        // Change vote or add new vote
        await voteCodeExample(exampleId, isUpvote);
      }
    } catch (err: any) {
      toastError("Failed to vote", err.message);
    }
  };

  const startEdit = (example: LessonCodeExample) => {
    setEditingId(example.id);
    setEditContent({
      title: example.title,
      description: example.description,
      code: example.code,
      language: example.language
    });
  };

  return (
    <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Code className="w-6 h-6 text-indigo-500" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Community Code Examples ({codeExamples.length})
          </h3>
        </div>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Submit Example
          </button>
        )}
      </div>

      {/* New Example Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newExample.title}
                    onChange={(e) => setNewExample({ ...newExample, title: e.target.value })}
                    placeholder="e.g., Alternative approach to useState"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newExample.description}
                    onChange={(e) => setNewExample({ ...newExample, description: e.target.value })}
                    placeholder="Explain your code example..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={newExample.language}
                    onChange={(e) => setNewExample({ ...newExample, language: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="csharp">C#</option>
                    <option value="cpp">C++</option>
                    <option value="go">Go</option>
                    <option value="rust">Rust</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Code
                  </label>
                  <textarea
                    value={newExample.code}
                    onChange={(e) => setNewExample({ ...newExample, code: e.target.value })}
                    placeholder="Paste your code here..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white font-mono text-sm resize-none"
                    rows={8}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={!newExample.title.trim() || !newExample.code.trim()}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Submit Example
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Code Examples List */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading code examples...</div>
      ) : codeExamples.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Code className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No code examples yet. Be the first to share your solution!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {codeExamples.map((example) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {example.title}
                      </span>
                      <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full">
                        {example.language}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>by {example.userName}</span>
                      <span>•</span>
                      <span>{new Date(example.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  {user && example.isOwner && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(example)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(example.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {example.description && (
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{example.description}</p>
                </div>
              )}

              {/* Code Block */}
              <div className="relative">
                <button
                  onClick={() => setExpandedId(expandedId === example.id ? null : example.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <pre className="flex-1 overflow-x-auto">
                    <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                      {expandedId === example.id ? example.code : example.code.substring(0, 200) + (example.code.length > 200 ? '...' : '')}
                    </code>
                  </pre>
                  {example.code.length > 200 && (
                    <div className="ml-4 flex-shrink-0">
                      {expandedId === example.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  )}
                </button>
              </div>

              {/* Voting */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center gap-4">
                <button
                  onClick={() => handleVote(example.id, true)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                    example.userVote === true
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{example.upvotes}</span>
                </button>
                <button
                  onClick={() => handleVote(example.id, false)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                    example.userVote === false
                      ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>{example.downvotes}</span>
                </button>
              </div>

              {/* Edit Form */}
              {editingId === example.id && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editContent.title}
                        onChange={(e) => setEditContent({ ...editContent, title: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={editContent.description}
                        onChange={(e) => setEditContent({ ...editContent, description: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Code
                      </label>
                      <textarea
                        value={editContent.code}
                        onChange={(e) => setEditContent({ ...editContent, code: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white font-mono text-sm resize-none"
                        rows={8}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(example.id)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditContent({ title: "", description: "", code: "", language: "javascript" });
                        }}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}