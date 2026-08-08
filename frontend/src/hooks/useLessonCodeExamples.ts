import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface LessonCodeExample {
  id: number;
  userId: number;
  userName: string;
  tutorialSlug: string;
  lessonSlug: string;
  title: string;
  description: string;
  code: string;
  language: string;
  upvotes: number;
  downvotes: number;
  isApproved: boolean;
  createdAt: string;
  updatedAt?: string;
  userVote?: boolean | null;
  isOwner: boolean;
}

export interface CreateLessonCodeExampleDto {
  tutorialSlug: string;
  lessonSlug: string;
  title: string;
  description: string;
  code: string;
  language: string;
}

export interface UpdateLessonCodeExampleDto {
  title: string;
  description: string;
  code: string;
  language: string;
}

export function useLessonCodeExamples(tutorialSlug: string, lessonSlug: string) {
  const [codeExamples, setCodeExamples] = useState<LessonCodeExample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCodeExamples = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/lessoncodeexample', {
        params: { tutorialSlug, lessonSlug }
      });
      setCodeExamples(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch code examples');
    } finally {
      setLoading(false);
    }
  };

  const createCodeExample = async (dto: CreateLessonCodeExampleDto): Promise<LessonCodeExample | null> => {
    try {
      const response = await api.post('/lessoncodeexample', dto);
      setCodeExamples(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create code example');
    }
  };

  const updateCodeExample = async (id: number, dto: UpdateLessonCodeExampleDto): Promise<LessonCodeExample | null> => {
    try {
      const response = await api.put(`/lessoncodeexample/${id}`, dto);
      setCodeExamples(prev => prev.map(c => c.id === id ? response.data : c));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update code example');
    }
  };

  const deleteCodeExample = async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/lessoncodeexample/${id}`);
      setCodeExamples(prev => prev.filter(c => c.id !== id));
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to delete code example');
    }
  };

  const voteCodeExample = async (id: number, isUpvote: boolean): Promise<LessonCodeExample | null> => {
    try {
      const response = await api.post(`/lessoncodeexample/${id}/vote`, { isUpvote });
      setCodeExamples(prev => prev.map(c => c.id === id ? response.data : c));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to vote');
    }
  };

  const removeVote = async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/lessoncodeexample/${id}/vote`);
      await fetchCodeExamples(); // Refresh to get updated vote counts
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to remove vote');
    }
  };

  useEffect(() => {
    if (tutorialSlug && lessonSlug) {
      fetchCodeExamples();
    }
  }, [tutorialSlug, lessonSlug]);

  return {
    codeExamples,
    loading,
    error,
    fetchCodeExamples,
    createCodeExample,
    updateCodeExample,
    deleteCodeExample,
    voteCodeExample,
    removeVote,
  };
}