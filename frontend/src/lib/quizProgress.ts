import { getUserStorageKey } from "@/lib/userStorage";

export interface SharedQuizProgress {
  score: number;
  total: number;
  source: "lesson" | "quiz";
  completedAt: string;
}

export function getQuizProgressStorageKey(
  userId: number | null | undefined,
  topic: string,
) {
  return getUserStorageKey(userId, `quiz-progress:${topic}`);
}

export function readQuizProgress(
  userId: number | null | undefined,
  topic: string,
): SharedQuizProgress | null {
  if (!topic) return null;

  try {
    const raw = localStorage.getItem(getQuizProgressStorageKey(userId, topic));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SharedQuizProgress;
    return parsed && typeof parsed.score === "number" ? parsed : null;
  } catch {
    return null;
  }
}

export function saveQuizProgress(
  userId: number | null | undefined,
  topic: string,
  progress: { score: number; total: number },
  source: SharedQuizProgress["source"] = "quiz",
) {
  if (!topic) return;

  const nextProgress: SharedQuizProgress = {
    score: progress.score,
    total: progress.total,
    source,
    completedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(
      getQuizProgressStorageKey(userId, topic),
      JSON.stringify(nextProgress),
    );
  } catch {
    // Ignore storage failures gracefully.
  }
}

export function mergeQuizBestScore(
  backendBestScore: number | null,
  localProgress: SharedQuizProgress | number | null,
): number | null {
  const localScore =
    typeof localProgress === "number"
      ? localProgress
      : localProgress && typeof localProgress.score === "number"
        ? localProgress.score
        : null;

  if (localScore == null) return backendBestScore;
  if (backendBestScore == null) return localScore;

  return Math.max(backendBestScore, localScore);
}
