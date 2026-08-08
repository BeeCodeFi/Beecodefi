import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

interface ProgressSummary {
  category: string;
  totalRead: number;
  readQuestionIds: string[];
}

export function useInterviewProgress(category: string) {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) { setLoading(false); return; }

        const response = await api.get<ProgressSummary>(
          `/interview-progress?category=${category}`
        );
        setReadIds(new Set(response.data.readQuestionIds));
      } catch (err: any) {
        if (err.response?.status !== 401) {
          console.error('Error loading interview progress:', err);
        }
        setReadIds(new Set());
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [category]);

  const markAsRead = useCallback(async (questionId: string): Promise<void> => {
    // Optimistic update
    setReadIds(prev => new Set([...prev, questionId]));

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await api.post('/interview-progress', { category, questionId });
    } catch (err) {
      // Rollback on failure
      setReadIds(prev => {
        const next = new Set(prev);
        next.delete(questionId);
        return next;
      });
      console.error('Error marking question as read:', err);
    }
  }, [category]);

  const isRead = useCallback((questionId: string) => readIds.has(questionId), [readIds]);

  return {
    readIds,
    loading,
    isRead,
    markAsRead,
    readCount: readIds.size,
  };
}
