"use client";

import { useState, useEffect } from "react";

interface StreakData {
  current: number;
  longest: number;
  lastActiveDate: string; // ISO date string YYYY-MM-DD
}

const KEY = "beecodefi_streak";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000);
}

function load(): StreakData {
  if (typeof window === "undefined") return { current: 0, longest: 0, lastActiveDate: "" };
  try { return JSON.parse(localStorage.getItem(KEY) ?? "null") ?? { current: 0, longest: 0, lastActiveDate: "" }; }
  catch { return { current: 0, longest: 0, lastActiveDate: "" }; }
}

function save(data: StreakData) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

/** Call ping() whenever the user does anything (view a lesson, take a quiz, etc.) */
export function useStreak() {
  const [streak, setStreak] = useState<StreakData>({ current: 0, longest: 0, lastActiveDate: "" });

  useEffect(() => {
    const data = load();
    const t = today();

    if (!data.lastActiveDate) {
      // First ever visit
      const next = { current: 1, longest: 1, lastActiveDate: t };
      save(next); setStreak(next); return;
    }

    const diff = daysBetween(data.lastActiveDate, t);

    if (diff === 0) {
      // Already logged today — just load
      setStreak(data); return;
    }

    if (diff === 1) {
      // Consecutive day — extend streak
      const next = { current: data.current + 1, longest: Math.max(data.longest, data.current + 1), lastActiveDate: t };
      save(next); setStreak(next); return;
    }

    // Streak broken
    const next = { current: 1, longest: data.longest, lastActiveDate: t };
    save(next); setStreak(next);
  }, []);

  return streak;
}
