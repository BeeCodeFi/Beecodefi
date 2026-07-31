"use client";

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

// Quadruple so the loop is perfectly seamless at any screen width
const TICKER_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

export default function SocialProofTicker() {
  return (
    <div
      className="relative overflow-hidden py-3.5 border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
      aria-hidden="true"
      // Isolate this element into its own compositing layer so the
      // noise grain body::after doesn't blur it
      style={{ isolation: "isolate", zIndex: 1 }}
    >
      {/* Fade masks — solid colour, no blur */}
      <div
        className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, var(--ticker-fade-from) 40%, transparent)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, var(--ticker-fade-from) 40%, transparent)",
        }}
      />

      {/* 
        Plain <div> + CSS class — no Framer Motion so there's zero
        transform conflict.  `translateZ(0)` promotes to GPU layer.
        `backface-visibility: hidden` prevents sub-pixel blur.
      */}
      <div
        className="ticker-track flex whitespace-nowrap"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {TICKER_ITEMS.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 shrink-0 select-none"
          >
            <span
              className="text-[15px] leading-none"
              style={{ display: "inline-block", transform: "translateZ(0)" }}
            >
              {item.icon}
            </span>
            {item.text}
            <span className="ml-4 text-gray-300 dark:text-gray-700">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
