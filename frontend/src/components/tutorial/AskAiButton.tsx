"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Copy, Check, Loader2 } from "lucide-react";
import { useAiExplanation } from "@/hooks/useAiExplanation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

interface AskAiButtonProps {
  tutorialSlug: string;
  lessonSlug: string;
  lessonContent: string;
  selectedText?: string;
}

export default function AskAiButton({ tutorialSlug, lessonSlug, lessonContent, selectedText }: AskAiButtonProps) {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();
  const { loading, generateExplanation } = useAiExplanation();
  
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState(selectedText || "");
  const [response, setResponse] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!question.trim() || !user) return;

    const result = await generateExplanation({
      question: question.trim(),
      context: selectedText || lessonContent.substring(0, 500),
      tutorialSlug,
      lessonSlug
    });

    if (result) {
      setResponse(result);
      success("AI Explanation Generated", "Here's your personalized explanation");
    } else {
      toastError("Generation Failed", "Please try again later");
    }
  };

  const handleCopy = async () => {
    if (response?.explanation) {
      await navigator.clipboard.writeText(response.explanation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      success("Copied to clipboard", "Explanation has been copied");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuestion("");
    setResponse(null);
  };

  if (!user) return null;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-lg shadow-indigo-500/30 transition-all hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Ask AI
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Get instant explanations for any concept
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {!response ? (
                  /* Question Form */
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Question
                      </label>
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask anything about this lesson... e.g., 'How does useState work in React?'"
                        className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                        rows={4}
                      />
                    </div>
                    <button
                      onClick={handleGenerate}
                      disabled={!question.trim() || loading}
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Generating Explanation...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Get AI Explanation
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  /* Response Display */
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-xl border border-indigo-200 dark:border-indigo-800">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Explanation</h4>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {response.explanation}
                      </p>
                    </div>

                    {response.codeExample && (
                      <div className="p-4 bg-gray-900 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-400">Code Example</span>
                          <button
                            onClick={handleCopy}
                            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3 h-3" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{response.codeExample}</code>
                        </pre>
                      </div>
                    )}

                    {response.relatedTopics && response.relatedTopics.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Related Topics</h4>
                        <div className="flex flex-wrap gap-2">
                          {response.relatedTopics.map((topic: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setResponse(null)}
                      className="w-full py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors"
                    >
                      Ask Another Question
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}