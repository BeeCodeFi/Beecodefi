import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface LessonTip {
  id: number;
  userId: number;
  userName: string;
  tutorialSlug: string;
  lessonSlug: string;
  tip: string;
  upvotes: number;
  downvotes: number;
  isApproved: boolean;
  createdAt: string;
  updatedAt?: string;
  userVote?: boolean | null;
  isOwner: boolean;
}

export interface CreateLessonTipDto {
  tutorialSlug: string;
  lessonSlug: string;
  tip: string;
}

export interface UpdateLessonTipDto {
  tip: string;
}

export function useLessonTips(tutorialSlug: string, lessonSlug: string) {
  const [tips, setTips] = useState<LessonTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTips = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/lessontip', {
        params: { tutorialSlug, lessonSlug }
      });
      setTips(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tips');
    } finally {
      setLoading(false);
    }
  };

  const createTip = async (dto: CreateLessonTipDto): Promise<LessonTip | null> => {
    try {
      const response = await api.post('/lessontip', dto);
      setTips(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create tip');
    }
  };

  const updateTip = async (id: number, dto: UpdateLessonTipDto): Promise<LessonTip | null> => {
    try {
      const response = await api.put(`/lessontip/${id}`, dto);
      setTips(prev => prev.map(t => t.id === id ? response.data : t));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update tip');
    }
  };

  const deleteTip = async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/lessontip/${id}`);
      setTips(prev => prev.filter(t => t.id !== id));
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to delete tip');
    }
  };

  const voteTip = async (id: number, isUpvote: boolean): Promise<LessonTip | null> => {
    try {
      const response = await api.post(`/lessontip/${id}/vote`, { isUpvote });
      setTips(prev => prev.map(t => t.id === id ? response.data : t));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to vote');
    }
  };

  const removeVote = async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/lessontip/${id}/vote`);
      await fetchTips(); // Refresh to get updated vote counts
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to remove vote');
    }
  };

  useEffect(() => {
    if (tutorialSlug && lessonSlug) {
      fetchTips();
    }
  }, [tutorialSlug, lessonSlug]);

  return {
    tips,
    loading,
    error,
    fetchTips,
    createTip,
    updateTip,
    deleteTip,
    voteTip,
    removeVote,
  };
}