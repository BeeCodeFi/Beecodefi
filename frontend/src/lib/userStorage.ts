export function getUserStorageKey(userId: number | null | undefined, key: string) {
  const scope = userId == null ? "anonymous" : `user-${userId}`;
  return `beecodefi:${scope}:${key}`;
}
