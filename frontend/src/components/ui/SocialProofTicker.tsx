"use client";

import { motion } from "framer-motion";

const ITEMS = [
  { icon: "🐝", text: "2,400+ learners enrolled" },
  { icon: "📘", text: "HTML — 11 lessons" },
  { icon: "🎨", text: "CSS — 18 lessons" },
  { icon: "⚡", text: "JavaScript — 18 lessons" },
  { icon: "🧠", text: "Quiz after every track" },
  { icon: "✅", text: "100% free — no paywall" },
  { icon: "🚀", text: "React & Next.js coming soon" },
  { icon: "📱", text: "Works on any device" },
  { icon: "🔖", text: "Bookmark lessons" },
  { icon: "🔥", text: "Daily streak tracking" },
];

// Duplicate for seamless infinite loop
const TICKER_ITEMS = [...ITEMS, ...ITEMS];

export default function SocialProofTicker() {
  return (
    <div
      className="relative overflow-hidden py-3.5 border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/60"
      aria-hidden="true"
    >
      {/* Left + right fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--ticker-fade-from), transparent)" }}
      />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--ticker-fade-from), transparent)" }}
      />

      {/* Ticker track — CSS animation for GPU acceleration */}
      <motion.div
        className="flex gap-0 whitespace-nowrap ticker-track"
        style={{
          // Pause on hover, respect reduced motion via CSS
          animation: "ticker 35s linear infinite",
        }}
        // Also pause on focus for accessibility
        whileFocus={{ animationPlayState: "paused" } as never}
      >
        {TICKER_ITEMS.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 shrink-0"
          >
            <span className="text-base leading-none">{item.icon}</span>
            {item.text}
            <span className="ml-6 text-gray-300 dark:text-gray-700 select-none">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
