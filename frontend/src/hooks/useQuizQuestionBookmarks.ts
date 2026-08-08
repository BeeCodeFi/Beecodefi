import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface QuizQuestionBookmark {
  id: number;
  questionId: number;
  quizTopic: string;
  questionText: string;
  bookmarkedAt: string;
}

export interface CreateQuizQuestionBookmarkDto {
  questionId: number;
  quizTopic: string;
  questionText: string;
}

export function useQuizQuestionBookmarks() {
  const [bookmarks, setBookmarks] = useState<QuizQuestionBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/quizquestionbookmark');
      setBookmarks(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const checkBookmark = async (questionId: number, quizTopic: string): Promise<QuizQuestionBookmark | null> => {
    try {
      const response = await api.get('/quizquestionbookmark/check', {
        params: { questionId, quizTopic }
      });
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to check bookmark');
    }
  };

  const createBookmark = async (dto: CreateQuizQuestionBookmarkDto): Promise<QuizQuestionBookmark> => {
    try {
      const response = await api.post('/quizquestionbookmark', dto);
      setBookmarks(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create bookmark');
    }
  };

  const deleteBookmark = async (questionId: number, quizTopic: string): Promise<boolean> => {
    try {
      await api.delete('/quizquestionbookmark', {
        params: { questionId, quizTopic }
      });
      setBookmarks(prev => prev.filter(b => !(b.questionId === questionId && b.quizTopic === quizTopic)));
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to delete bookmark');
    }
  };

  const isBookmarked = (questionId: number, quizTopic: string): boolean => {
    return bookmarks.some(b => b.questionId === questionId && b.quizTopic === quizTopic);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return {
    bookmarks,
    loading,
    error,
    fetchBookmarks,
    checkBookmark,
    createBookmark,
    deleteBookmark,
    isBookmarked,
  };
}
