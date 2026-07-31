"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    /*
     * Positioned at top-[64px] (bottom edge of the fixed 64px navbar).
     * z-30 sits above the LessonNavHeader (z-20) so the bar is always visible
     * as a glowing line between the main navbar and the lesson sub-nav.
     */
    <div className="fixed top-[64px] left-0 right-0 z-30 h-[3px] pointer-events-none">
      {/* Faint track so the bar is recognisable even at 0% */}
      <div className="absolute inset-0 bg-gray-200/50 dark:bg-gray-700/40" />
      {/* Filled portion with glow */}
      <div
        className="relative h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-[width] duration-150 ease-linear"
        style={{ width: `${progress}%`, boxShadow: "0 0 8px 1px rgba(139,92,246,0.55)" }}
      />
    </div>
  );
}
