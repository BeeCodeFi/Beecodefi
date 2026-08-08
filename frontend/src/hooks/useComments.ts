import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface LessonComment {
  id: number;
  userId: number;
  userName: string;
  tutorialSlug: string;
  lessonSlug: string;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt?: string;
  userVote?: boolean | null;
}

export interface CreateCommentDto {
  tutorialSlug: string;
  lessonSlug: string;
  content: string;
}

export interface UpdateCommentDto {
  content: string;
}

export function useComments(tutorialSlug: string, lessonSlug: string) {
  const [comments, setComments] = useState<LessonComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/comment', {
        params: { tutorialSlug, lessonSlug }
      });
      setComments(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (dto: CreateCommentDto): Promise<LessonComment | null> => {
    try {
      const response = await api.post('/comment', dto);
      setComments(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create comment');
    }
  };

  const updateComment = async (id: number, dto: UpdateCommentDto): Promise<LessonComment | null> => {
    try {
      const response = await api.put(`/comment/${id}`, dto);
      setComments(prev => prev.map(c => c.id === id ? response.data : c));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update comment');
    }
  };

  const deleteComment = async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/comment/${id}`);
      setComments(prev => prev.filter(c => c.id !== id));
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  const voteComment = async (id: number, isUpvote: boolean): Promise<LessonComment | null> => {
    try {
      const response = await api.post(`/comment/${id}/vote`, { isUpvote });
      setComments(prev => prev.map(c => c.id === id ? response.data : c));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to vote');
    }
  };

  const removeVote = async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/comment/${id}/vote`);
      await fetchComments(); // Refresh to get updated vote counts
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to remove vote');
    }
  };

  useEffect(() => {
    if (tutorialSlug && lessonSlug) {
      fetchComments();
    }
  }, [tutorialSlug, lessonSlug]);

  return {
    comments,
    loading,
    error,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
    voteComment,
    removeVote,
  };
}
