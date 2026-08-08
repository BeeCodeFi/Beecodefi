import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface CodeFile {
  name: string;
  content: string;
  language: string;
}

export interface CodeSnippet {
  id: number;
  name: string;
  code: string;
  language: string;
  shareId?: string;
  files?: string; // JSON string for multi-file support
  createdAt: string;
  updatedAt: string;
}

export interface CreateSnippetDto {
  name: string;
  code: string;
  language: string;
  files?: string; // JSON string for multi-file support
}

export interface UpdateSnippetDto {
  name: string;
  code: string;
  files?: string; // JSON string for multi-file support
}

// Helper functions for multi-file support
export const parseFiles = (filesJson?: string): CodeFile[] => {
  if (!filesJson) return [];
  try {
    return JSON.parse(filesJson);
  } catch {
    return [];
  }
};

export const stringifyFiles = (files: CodeFile[]): string => {
  return JSON.stringify(files);
};

export function useCodeSnippets() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/codesnippet');
      setSnippets(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch snippets');
    } finally {
      setLoading(false);
    }
  };

  const createSnippet = async (dto: CreateSnippetDto): Promise<CodeSnippet | null> => {
    try {
      const response = await api.post('/codesnippet', dto);
      setSnippets(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create snippet');
    }
  };

  const updateSnippet = async (id: number, dto: UpdateSnippetDto): Promise<CodeSnippet | null> => {
    try {
      const response = await api.put(`/codesnippet/${id}`, dto);
      setSnippets(prev => prev.map(s => s.id === id ? response.data : s));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update snippet');
    }
  };

  const deleteSnippet = async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/codesnippet/${id}`);
      setSnippets(prev => prev.filter(s => s.id !== id));
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to delete snippet');
    }
  };

  const getSharedSnippet = async (shareId: string): Promise<CodeSnippet | null> => {
    try {
      const response = await api.get(`/shared/${shareId}`);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to fetch shared snippet');
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  return {
    snippets,
    loading,
    error,
    fetchSnippets,
    createSnippet,
    updateSnippet,
    deleteSnippet,
    getSharedSnippet,
    parseFiles,
    stringifyFiles,
  };
}
