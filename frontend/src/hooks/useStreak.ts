"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserStorageKey } from "@/lib/userStorage";

interface StreakData {
  current: number;
  longest: number;
  lastActiveDate: string; // ISO date string YYYY-MM-DD
}

const EMPTY: StreakData = { current: 0, longest: 0, lastActiveDate: "" };
function today() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / 86_400_000,
  );
}

function load(userId: number | null | undefined): StreakData {
  if (typeof window === "undefined") return EMPTY;
  try {
    return (
      JSON.parse(
        localStorage.getItem(getUserStorageKey(userId, "streak")) ?? "null",
      ) ?? EMPTY
    );
  } catch {
    return EMPTY;
  }
}

function save(userId: number | null | undefined, data: StreakData) {
  localStorage.setItem(
    getUserStorageKey(userId, "streak"),
    JSON.stringify(data),
  );
}

/**
 * Tracks daily learning streak. Only activates when the user is logged in.
 * @param isLoggedIn pass !!user from useAuth()
 */
export function useStreak(_legacyIsLoggedIn?: boolean) {
  const [streak, setStreak] = useState<StreakData>(EMPTY);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    const syncStreak = () => {
      // Do nothing if the user is not logged in
      if (userId == null) {
        setStreak(EMPTY);
        return;
      }

      const data = load(userId);
      const t = today();

      if (!data.lastActiveDate) {
        const next = { current: 1, longest: 1, lastActiveDate: t };
        save(userId, next);
        setStreak(next);
        return;
      }

      const diff = daysBetween(data.lastActiveDate, t);

      if (diff === 0) {
        setStreak(data);
        return;
      }

      if (diff === 1) {
        const next = {
          current: data.current + 1,
          longest: Math.max(data.longest, data.current + 1),
          lastActiveDate: t,
        };
        save(userId, next);
        setStreak(next);
        return;
      }

      // Streak broken
      const next = { current: 1, longest: data.longest, lastActiveDate: t };
      save(userId, next);
      setStreak(next);
    };

    queueMicrotask(syncStreak);
  }, [userId]);

  return streak;
}
