"use client";

// React
import { useState, useEffect, useCallback } from "react";

// Local imports
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { getUserStorageKey } from "@/lib/userStorage";

interface Bookmark {
  tutorialSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  trackTitle: string;
  savedAt: string;
}

function loadBookmarks(userId: number | null | undefined): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(
      localStorage.getItem(getUserStorageKey(userId, "bookmarks")) ?? "[]",
    );
  } catch {
    return [];
  }
}

function saveBookmarks(userId: number | null | undefined, bm: Bookmark[]) {
  localStorage.setItem(
    getUserStorageKey(userId, "bookmarks"),
    JSON.stringify(bm),
  );
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { success, info } = useToast();
  const { user, isLoading: authLoading } = useAuth();

  const loadData = useCallback(() => {
    try {
      setError(null);
      if (authLoading) return;
      
      const data = loadBookmarks(user?.id);
      setBookmarks(data);
      setLoading(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load bookmarks";
      setError(errorMessage);
      setBookmarks([]);
      setLoading(false);
    }
  }, [authLoading, user?.id]);

  useEffect(() => {
    queueMicrotask(loadData);
  }, [loadData]);

  const isBookmarked = useCallback(
    (tutorialSlug: string, lessonSlug: string) =>
      bookmarks.some(
        (b) => b.tutorialSlug === tutorialSlug && b.lessonSlug === lessonSlug,
      ),
    [bookmarks],
  );

  const toggleBookmark = useCallback(
    (bm: Omit<Bookmark, "savedAt">) => {
      try {
        setBookmarks((prev) => {
          const exists = prev.some(
            (b) =>
              b.tutorialSlug === bm.tutorialSlug &&
              b.lessonSlug === bm.lessonSlug,
          );
          const next = exists
            ? prev.filter(
                (b) =>
                  !(
                    b.tutorialSlug === bm.tutorialSlug &&
                    b.lessonSlug === bm.lessonSlug
                  ),
              )
            : [...prev, { ...bm, savedAt: new Date().toISOString() }];
          saveBookmarks(user?.id, next);

          // Toast feedback
          if (exists) {
            info("Bookmark removed", bm.lessonTitle);
          } else {
            success(
              "Lesson bookmarked!",
              `${bm.lessonTitle} saved · press B to toggle`,
            );
          }

          return next;
        });
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Failed to toggle bookmark";
        setError(errorMessage);
      }
    },
    [info, success, user?.id],
  );

  const clearBookmarks = useCallback(() => {
    try {
      setBookmarks([]);
      saveBookmarks(user?.id, []);
      info("All bookmarks cleared");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to clear bookmarks";
      setError(errorMessage);
    }
  }, [info, user?.id]);

  return {
    data: bookmarks,
    loading,
    error,
    refetch: loadData,
    // Legacy aliases for backward compatibility
    bookmarks,
    isBookmarked,
    toggleBookmark,
    clearBookmarks,
  };
}
