import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Revision {
  id: number;
  category: string;
  questionId: string;
  markedAt: string;
}

export function useRevisions(category: string) {
  const [revisions, setRevisions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load revisions from API
  useEffect(() => {
    const loadRevisions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await api.get<Revision[]>(`/interview-revisions?category=${category}`);
        const questionIds = new Set(response.data.map(r => r.questionId));
        setRevisions(questionIds);
        setError(null);
      } catch (err: any) {
        // If unauthorized, just set empty revisions
        if (err.response?.status === 401) {
          setRevisions(new Set());
        } else {
          setError('Failed to load revisions');
          console.error('Error loading revisions:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadRevisions();
  }, [category]);

  const toggleRevision = async (questionId: string): Promise<boolean> => {
    const isMarked = revisions.has(questionId);

    try {
      if (isMarked) {
        // Unmark
        await api.delete(`/interview-revisions?category=${category}&questionId=${questionId}`);
        setRevisions(prev => {
          const next = new Set(prev);
          next.delete(questionId);
          return next;
        });
      } else {
        // Mark
        await api.post('/interview-revisions', {
          category,
          questionId,
        });
        setRevisions(prev => new Set([...prev, questionId]));
      }
      return true;
    } catch (err: any) {
      console.error('Error toggling revision:', err);
      setError('Failed to update revision mark');
      return false;
    }
  };

  const clearAllRevisions = async (): Promise<boolean> => {
    try {
      await api.delete(`/interview-revisions/all?category=${category}`);
      setRevisions(new Set());
      return true;
    } catch (err: any) {
      console.error('Error clearing revisions:', err);
      setError('Failed to clear revisions');
      return false;
    }
  };

  const isMarked = (questionId: string) => revisions.has(questionId);

  return {
    revisions,
    loading,
    error,
    toggleRevision,
    clearAllRevisions,
    isMarked,
    count: revisions.size,
  };
}
