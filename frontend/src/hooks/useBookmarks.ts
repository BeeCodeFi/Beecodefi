"use client";

import { useState, useEffect, useCallback } from "react";
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
  const { success, info } = useToast();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    queueMicrotask(() => setBookmarks(loadBookmarks(user?.id)));
  }, [isLoading, user?.id]);

  const isBookmarked = useCallback(
    (tutorialSlug: string, lessonSlug: string) =>
      bookmarks.some(
        (b) => b.tutorialSlug === tutorialSlug && b.lessonSlug === lessonSlug,
      ),
    [bookmarks],
  );

  const toggleBookmark = useCallback(
    (bm: Omit<Bookmark, "savedAt">) => {
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
    },
    [info, success, user?.id],
  );

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
    saveBookmarks(user?.id, []);
    info("All bookmarks cleared");
  }, [info, user?.id]);

  return { bookmarks, isBookmarked, toggleBookmark, clearBookmarks };
}
