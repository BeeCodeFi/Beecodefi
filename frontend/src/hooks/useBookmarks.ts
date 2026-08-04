"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

interface Bookmark {
  id: number;
  tutorialSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  trackTitle: string;
  savedAt: string;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const toastRef = useRef(toast);
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    toastRef.current = toast;
  }, [toast]);

  const loadData = useCallback(async () => {
    if (authLoading) return;
    
    if (!user) {
      setBookmarks([]);
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await api.get<Bookmark[]>("/bookmark");
      setBookmarks(response.data);
      setLoading(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load bookmarks";
      console.error("[BOOKMARKS ERROR]", err);
      setError(errorMessage);
      setBookmarks([]);
      setLoading(false);
    }
  }, [authLoading, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const isBookmarked = useCallback(
    (tutorialSlug: string, lessonSlug: string) =>
      bookmarks.some(
        (b) => b.tutorialSlug === tutorialSlug && b.lessonSlug === lessonSlug,
      ),
    [bookmarks],
  );

  const toggleBookmark = useCallback(
    async (bm: { tutorialSlug: string; lessonSlug: string; lessonTitle: string; trackTitle: string }) => {
      if (!user) {
        toastRef.current.error("Please sign in to bookmark lessons");
        return;
      }

      try {
        const exists = isBookmarked(bm.tutorialSlug, bm.lessonSlug);

        if (exists) {
          // Remove bookmark
          await api.delete(`/bookmark?tutorialSlug=${bm.tutorialSlug}&lessonSlug=${bm.lessonSlug}`);
          setBookmarks((prev) =>
            prev.filter(
              (b) =>
                !(b.tutorialSlug === bm.tutorialSlug && b.lessonSlug === bm.lessonSlug),
            ),
          );
          toastRef.current.info("Bookmark removed", bm.lessonTitle);
        } else {
          // Add bookmark
          const response = await api.post<Bookmark>("/bookmark", {
            tutorialSlug: bm.tutorialSlug,
            lessonSlug: bm.lessonSlug,
            lessonTitle: bm.lessonTitle,
            trackTitle: bm.trackTitle,
          });
          setBookmarks((prev) => [response.data, ...prev]);
          toastRef.current.success(
            "Lesson bookmarked!",
            `${bm.lessonTitle} saved · press B to toggle`,
          );
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Failed to toggle bookmark";
        console.error("[BOOKMARKS ERROR]", err);
        setError(errorMessage);
        toastRef.current.error("Failed to update bookmark", errorMessage);
      }
    },
    [user, isBookmarked],
  );

  const clearBookmarks = useCallback(async () => {
    if (!user) return;

    try {
      // Delete all bookmarks
      await Promise.all(
        bookmarks.map((b) =>
          api.delete(`/bookmark?tutorialSlug=${b.tutorialSlug}&lessonSlug=${b.lessonSlug}`),
        ),
      );
      setBookmarks([]);
      toastRef.current.info("All bookmarks cleared");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to clear bookmarks";
      console.error("[BOOKMARKS ERROR]", err);
      setError(errorMessage);
      toastRef.current.error("Failed to clear bookmarks", errorMessage);
    }
  }, [user, bookmarks]);

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
