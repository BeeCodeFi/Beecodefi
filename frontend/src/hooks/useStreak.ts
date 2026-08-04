"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

interface StreakData {
  current: number;
  longest: number;
  lastActiveDate: string | null;
}

const EMPTY: StreakData = { current: 0, longest: 0, lastActiveDate: null };

/**
 * Tracks daily learning streak from the database.
 * All streak data is stored on the backend and synced across devices.
 */
export function useStreak() {
  const [streak, setStreak] = useState<StreakData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const userId = user?.id;

  const fetchStreak = useCallback(async () => {
    if (!userId) {
      setStreak(EMPTY);
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/streak`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch streak");
      }

      const data = await response.json();
      setStreak({
        current: data.currentStreak ?? 0,
        longest: data.longestStreak ?? 0,
        lastActiveDate: data.lastActiveDate,
      });
      setLoading(false);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch streak";
      console.error("[STREAK ERROR]", err);
      setError(errorMessage);
      setStreak(EMPTY);
      setLoading(false);
    }
  }, [userId]);

  // No need for manual pingStreak - backend updates automatically when activities happen
  // (lessons completed, quizzes submitted)

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  return {
    data: streak,
    loading,
    error,
    refetch: fetchStreak,
  };
}
