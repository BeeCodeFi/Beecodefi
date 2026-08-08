import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

export interface InterviewNoteItem {
  id: number;
  category: string;
  questionId: string;
  noteText: string;
  updatedAt: string;
}

const LOCAL_PREFIX = 'interview-notes-guest:';

/** Fallback: read/write to localStorage for unauthenticated users */
function localRead(category: string): Record<string, string> {
  const result: Record<string, string> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(`${LOCAL_PREFIX}${category}:`)) {
        const qId = key.replace(`${LOCAL_PREFIX}${category}:`, '');
        result[qId] = localStorage.getItem(key) ?? '';
      }
    }
  } catch { /* ignore */ }
  return result;
}

function localSave(category: string, questionId: string, text: string) {
  const key = `${LOCAL_PREFIX}${category}:${questionId}`;
  try {
    if (text.trim()) {
      localStorage.setItem(key, text);
    } else {
      localStorage.removeItem(key);
    }
  } catch { /* ignore */ }
}

function localDelete(category: string, questionId: string) {
  try {
    localStorage.removeItem(`${LOCAL_PREFIX}${category}:${questionId}`);
  } catch { /* ignore */ }
}

export function useInterviewNotes(category: string) {
  // Map of questionId -> noteText (from backend or localStorage)
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      if (!token) {
        // Guest: load from localStorage
        setIsAuthenticated(false);
        const local = localRead(category);
        setNotes(local);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      try {
        const res = await api.get<{ notes: InterviewNoteItem[] }>(
          `/interview-notes?category=${category}`
        );
        const map: Record<string, string> = {};
        res.data.notes.forEach((n) => { map[n.questionId] = n.noteText; });
        setNotes(map);
      } catch (err: any) {
        if (err.response?.status !== 401) {
          console.error('Error loading interview notes:', err);
        }
        setNotes({});
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [category]);

  const saveNote = useCallback(async (questionId: string, noteText: string): Promise<boolean> => {
    // Optimistic update
    setNotes(prev => {
      const next = { ...prev };
      if (noteText.trim()) {
        next[questionId] = noteText;
      } else {
        delete next[questionId];
      }
      return next;
    });

    if (!isAuthenticated) {
      // Guest: persist locally
      localSave(category, questionId, noteText);
      return true;
    }

    if (!noteText.trim()) {
      // Delete note
      try {
        await api.delete(`/interview-notes?category=${category}&questionId=${questionId}`);
        return true;
      } catch {
        // Rollback
        setNotes(prev => {
          const next = { ...prev };
          delete next[questionId];
          return next;
        });
        return false;
      }
    }

    try {
      await api.post('/interview-notes', { category, questionId, noteText: noteText.trim() });
      return true;
    } catch {
      // Rollback
      setNotes(prev => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
      return false;
    }
  }, [category, isAuthenticated]);

  const deleteNote = useCallback(async (questionId: string): Promise<boolean> => {
    return saveNote(questionId, '');
  }, [saveNote]);

  const getNote = useCallback((questionId: string) => notes[questionId] ?? '', [notes]);
  const hasNote = useCallback((questionId: string) => Boolean(notes[questionId]?.trim()), [notes]);
  const noteCount = Object.values(notes).filter(n => n?.trim()).length;

  return {
    notes,
    loading,
    getNote,
    saveNote,
    deleteNote,
    hasNote,
    noteCount,
    isAuthenticated,
  };
}
