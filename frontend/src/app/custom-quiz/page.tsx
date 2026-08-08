"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Share2, Clock, BookOpen, Sparkles, ChevronRight } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface QuizTopic {
  id: string;
  topic: string;
  category: string;
  questionCount: number;
}

interface CustomQuiz {
  id: number;
  title: string;
  description: string;
  topic: string;
  difficulty: string;
  questionCount: number;
  shareCode: string;
  createdAt: string;
  isPublic: boolean;
}

export default function CustomQuizPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [topics, setTopics] = useState<QuizTopic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [myQuizzes, setMyQuizzes] = useState<CustomQuiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const availableTopics = [
    { id: "html", topic: "HTML", category: "Frontend" },
    { id: "css", topic: "CSS", category: "Frontend" },
    { id: "javascript", topic: "JavaScript", category: "Frontend" },
    { id: "react", topic: "React", category: "Frontend" },
    { id: "typescript", topic: "TypeScript", category: "Frontend" },
    { id: "nodejs", topic: "Node.js", category: "Backend" },
    { id: "sql", topic: "SQL", category: "Database" },
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(t => t !== topicId)
        : [...prev, topicId]
    );
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const handleCreateQuiz = async () => {
    if (selectedTopics.length === 0) {
      alert("Please select at least one topic");
      return;
    }

    setCreating(true);
    try {
      const { data } = await api.post("/custom-quiz/create", {
        topics: selectedTopics,
        difficulties: selectedDifficulties,
        questionCount,
        title: title || undefined,
        description: description || undefined,
      });

      // Refresh user's quizzes
      fetchMyQuizzes();
      
      // Reset form
      setSelectedTopics([]);
      setSelectedDifficulties([]);
      setQuestionCount(10);
      setTitle("");
      setDescription("");
      
      alert("Custom quiz created successfully!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create custom quiz");
    } finally {
      setCreating(false);
    }
  };

  const handleTakeQuiz = (shareCode: string) => {
    router.push(`/quiz/custom/${shareCode}`);
  };

  const handleDeleteQuiz = async (id: number) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await api.delete(`/custom-quiz/${id}`);
      setMyQuizzes(prev => prev.filter(q => q.id !== id));
    } catch (error) {
      alert("Failed to delete quiz");
    }
  };

  const fetchMyQuizzes = async () => {
    try {
      const { data } = await api.get("/custom-quiz/my");
      setMyQuizzes(data);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    }
  };

  // Fetch user's quizzes on mount
  useEffect(() => {
    if (user) fetchMyQuizzes();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Custom Quiz Builder
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-gradient">Create Your Perfect Quiz</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Mix and match topics and difficulty levels to create personalized quizzes
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quiz Builder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-500" />
              Create New Quiz
            </h2>

            {/* Topics Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Topics
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => toggleTopic(topic.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all ${
                      selectedTopics.includes(topic.id)
                        ? "bg-purple-500 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {topic.topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Difficulty Level (Optional)
              </label>
              <div className="flex gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => toggleDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDifficulties.includes(difficulty)
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Number of Questions: {questionCount}
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Custom Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Custom Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Awesome Quiz"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Custom Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your quiz..."
                rows={3}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
              />
            </div>

            <button
              onClick={handleCreateQuiz}
              disabled={creating || selectedTopics.length === 0}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {creating ? "Creating..." : "Create Custom Quiz"}
              <Sparkles className="w-4 h-4" />
            </button>
          </motion.div>

          {/* My Quizzes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              My Custom Quizzes
            </h2>

            {myQuizzes.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No custom quizzes yet. Create your first one!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{quiz.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{quiz.topic}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                        {quiz.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {quiz.questionCount} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(quiz.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleTakeQuiz(quiz.shareCode)}
                        className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        Take Quiz
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/quiz/custom/${quiz.shareCode}`);
                          alert("Share link copied!");
                        }}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuiz(quiz.id)}
                        className="px-3 py-2 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}