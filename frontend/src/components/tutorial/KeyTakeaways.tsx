"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface KeyTakeawaysProps {
  takeaways: string[];
}

export default function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 p-5 sm:p-6 my-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-100">
          Key Takeaways
        </h3>
      </div>
      <ul className="space-y-2.5">
        {takeaways.map((takeaway, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
            className="flex items-start gap-2.5"
          >
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
            <span className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
              {takeaway}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
