import { useState, useEffect, useRef, useCallback } from 'react';
import api from '@/lib/api';

/**
 * useStudySession — tracks elapsed time since the page was opened.
 * Stores cumulative session times in backend (Neon DB) for authenticated users,
 * falls back to localStorage for guests.
 * Returns the current session elapsed seconds, total cumulative seconds, and a formatted string.
 */
export function useStudySession(category: string) {
  const startTimeRef = useRef<number>(Date.now());
  const [elapsed, setElapsed] = useState(0); // seconds in current session
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load stored cumulative total from localStorage (fallback)
  const storageKey = `study-session:${category}`;
  const storedTotal = (): number => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? parseInt(raw, 10) : 0;
    } catch {
      return 0;
    }
  };

  useEffect(() => {
    const loadStudySession = async () => {
      setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      if (!token) {
        // Guest: load from localStorage
        setIsAuthenticated(false);
        setTotalSeconds(storedTotal());
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      try {
        const res = await api.get(`/study-sessions?category=${category}`);
        setTotalSeconds(res.data.totalSeconds || 0);
      } catch (err: any) {
        if (err.response?.status !== 401) {
          console.error('Error loading study session:', err);
        }
        // Fallback to localStorage on error
        setTotalSeconds(storedTotal());
      } finally {
        setLoading(false);
      }
    };

    loadStudySession();
    startTimeRef.current = Date.now();
  }, [category]);

  useEffect(() => {
    const interval = setInterval(() => {
      const sessionSecs = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsed(sessionSecs);
    }, 1000);

    // Save elapsed time when user leaves
    const handleUnload = async () => {
      const sessionSecs = Math.floor((Date.now() - startTimeRef.current) / 1000);
      
      if (isAuthenticated) {
        // Save to backend
        try {
          await api.post('/study-sessions', {
            category,
            additionalSeconds: sessionSecs
          });
        } catch (err) {
          console.error('Error saving study session to backend:', err);
          // Fallback to localStorage
          try {
            const prev = storedTotal();
            localStorage.setItem(storageKey, String(prev + sessionSecs));
          } catch { /* ignore */ }
        }
      } else {
        // Save to localStorage
        try {
          const prev = storedTotal();
          localStorage.setItem(storageKey, String(prev + sessionSecs));
        } catch { /* ignore */ }
      }
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
  }, [category, isAuthenticated]);

  const formatTime = useCallback((seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }, []);

  const resetTotal = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await api.post('/study-sessions/reset', { category });
        setTotalSeconds(0);
      } catch (err) {
        console.error('Error resetting study session:', err);
        // Fallback to localStorage
        try {
          localStorage.setItem(storageKey, '0');
          setTotalSeconds(0);
        } catch { /* ignore */ }
      }
    } else {
      try {
        localStorage.setItem(storageKey, '0');
        setTotalSeconds(0);
      } catch { /* ignore */ }
    }
  }, [category, isAuthenticated, storageKey]);

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
    /** Loading state */
    loading,
    /** Whether user is authenticated (using backend vs localStorage) */
    isAuthenticated,
  };
}
