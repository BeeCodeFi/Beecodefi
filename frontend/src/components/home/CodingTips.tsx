"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
import { codingTips } from "@/data/coding-tips";

export default function CodingTips() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % codingTips.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + codingTips.length) % codingTips.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const tip = codingTips[currentIndex];

  const languageColors: Record<string, string> = {
    javascript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    css: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    html: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
            <Lightbulb className="w-4 h-4" />
            Daily Coding Tips
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Quick <span className="text-gradient">Coding Tips</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {tip.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${languageColors[tip.language] || ""}`}>
                    {tip.language.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{tip.tip}</p>
                <div className="bg-gray-950 rounded-xl p-4 sm:p-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono leading-relaxed">
                    <code>{tip.code}</code>
                  </pre>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={prev}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {codingTips.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentIndex
                          ? "bg-indigo-600 w-6"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
