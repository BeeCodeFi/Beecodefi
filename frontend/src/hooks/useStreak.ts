"use client";

// React/Next
import { useState, useEffect, useCallback } from "react";

// Local imports
import { useAuth } from "@/context/AuthContext";
import { getUserStorageKey } from "@/lib/userStorage";

interface StreakData {
  current: number;
  longest: number;
  lastActiveDate: string; // ISO date string YYYY-MM-DD
}

const EMPTY: StreakData = { current: 0, longest: 0, lastActiveDate: "" };
function today() {
  // Use local date to avoid timezone issues
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function daysBetween(a: string, b: string) {
  // Parse dates in local timezone to avoid UTC midnight issues
  const dateA = new Date(a + 'T00:00:00');
  const dateB = new Date(b + 'T00:00:00');
  return Math.round((dateB.getTime() - dateA.getTime()) / 86_400_000);
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
 */
export function useStreak() {
  const [streak, setStreak] = useState<StreakData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const userId = user?.id;

  const syncStreak = useCallback(() => {
    try {
      setError(null);
      
      // Do nothing if the user is not logged in
      if (userId == null) {
        setStreak(EMPTY);
        setLoading(false);
        return;
      }

      const data = load(userId);
      const t = today();
      
      console.log('[STREAK] Syncing streak:', {
        userId,
        today: t,
        lastActiveDate: data.lastActiveDate,
        currentStreak: data.current,
        longestStreak: data.longest
      });

      if (!data.lastActiveDate) {
        const next = { current: 1, longest: 1, lastActiveDate: t };
        console.log('[STREAK] First time user, initializing:', next);
        save(userId, next);
        setStreak(next);
        setLoading(false);
        return;
      }

      const diff = daysBetween(data.lastActiveDate, t);
      console.log('[STREAK] Days between last active and today:', diff);

      if (diff === 0) {
        console.log('[STREAK] Already logged in today, keeping current streak');
        setStreak(data);
        setLoading(false);
        return;
      }

      if (diff === 1) {
        const next = {
          current: data.current + 1,
          longest: Math.max(data.longest, data.current + 1),
          lastActiveDate: t,
        };
        console.log('[STREAK] Consecutive day! Incrementing streak:', next);
        save(userId, next);
        setStreak(next);
        setLoading(false);
        return;
      }

      // Streak broken
      const next = { current: 1, longest: data.longest, lastActiveDate: t };
      console.log('[STREAK] Streak broken (missed days). Resetting to 1:', next);
      save(userId, next);
      setStreak(next);
      setLoading(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to sync streak";
      console.error('[STREAK ERROR]', err);
      setError(errorMessage);
      setStreak(EMPTY);
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    queueMicrotask(syncStreak);
  }, [syncStreak]);

  return {
    data: streak,
    loading,
    error,
    refetch: syncStreak,
  };
}
