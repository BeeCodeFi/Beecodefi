import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useStudySession — tracks elapsed time since the page was opened.
 * Stores cumulative session times in localStorage per category.
 * Returns the current session elapsed seconds, total cumulative seconds, and a formatted string.
 */
export function useStudySession(category: string) {
  const startTimeRef = useRef<number>(Date.now());
  const [elapsed, setElapsed] = useState(0); // seconds in current session

  // Load stored cumulative total from localStorage
  const storageKey = `study-session:${category}`;
  const storedTotal = (): number => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? parseInt(raw, 10) : 0;
    } catch {
      return 0;
    }
  };

  const [totalSeconds, setTotalSeconds] = useState<number>(0);

  useEffect(() => {
    setTotalSeconds(storedTotal());
    startTimeRef.current = Date.now();

    const interval = setInterval(() => {
      const sessionSecs = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsed(sessionSecs);
    }, 1000);

    // Save elapsed time when user leaves
    const handleUnload = () => {
      const sessionSecs = Math.floor((Date.now() - startTimeRef.current) / 1000);
      try {
        const prev = storedTotal();
        localStorage.setItem(storageKey, String(prev + sessionSecs));
      } catch { /* ignore */ }
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') handleUnload();
    });

    return () => {
      clearInterval(interval);
      handleUnload();
      window.removeEventListener('beforeunload', handleUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const formatTime = useCallback((seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }, []);

  const resetTotal = useCallback(() => {
    try {
      localStorage.setItem(storageKey, '0');
      setTotalSeconds(0);
    } catch { /* ignore */ }
  }, [storageKey]);

  return {
    /** Seconds elapsed in the current browser session */
    sessionSeconds: elapsed,
    /** Total cumulative seconds (all sessions) */
    totalSeconds: totalSeconds + elapsed,
    formatTime,
    resetTotal,
    /** Formatted current session string e.g. "5m 30s" */
    sessionFormatted: formatTime(elapsed),
    /** Formatted total string e.g. "1h 12m" */
    totalFormatted: formatTime(totalSeconds + elapsed),
  };
}
