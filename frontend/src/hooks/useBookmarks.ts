"use client";

import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/context/ToastContext";

interface Bookmark {
  tutorialSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  trackTitle: string;
  savedAt: string;
}

const STORAGE_KEY = "beecodefi_bookmarks";

function loadBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"); }
  catch { return []; }
}

function saveBookmarks(bm: Bookmark[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bm));
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const { success, info } = useToast();

  useEffect(() => { setBookmarks(loadBookmarks()); }, []);

  const isBookmarked = useCallback(
    (tutorialSlug: string, lessonSlug: string) =>
      bookmarks.some((b) => b.tutorialSlug === tutorialSlug && b.lessonSlug === lessonSlug),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (bm: Omit<Bookmark, "savedAt">) => {
      setBookmarks((prev) => {
        const exists = prev.some(
          (b) => b.tutorialSlug === bm.tutorialSlug && b.lessonSlug === bm.lessonSlug
        );
        const next = exists
          ? prev.filter((b) => !(b.tutorialSlug === bm.tutorialSlug && b.lessonSlug === bm.lessonSlug))
          : [...prev, { ...bm, savedAt: new Date().toISOString() }];
        saveBookmarks(next);

        // Toast feedback
        if (exists) {
          info("Bookmark removed", bm.lessonTitle);
        } else {
          success("Lesson bookmarked!", `${bm.lessonTitle} saved · press B to toggle`);
        }

        return next;
      });
    },
    [success, info]
  );

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
    saveBookmarks([]);
    info("All bookmarks cleared");
  }, [info]);

  return { bookmarks, isBookmarked, toggleBookmark, clearBookmarks };
}
