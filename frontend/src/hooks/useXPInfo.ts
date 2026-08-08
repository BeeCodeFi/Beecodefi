import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface XPInfo {
  totalXP: number;
  level: number;
  xpToNextLevel: number;
  xpForCurrentLevel: number;
  streakMultiplier: number;
  currentStreak: number;
  dailyXPGoal: number;
  dailyXPEarned: number;
  weeklyXPGoal: number;
  weeklyXPEarned: number;
}

export function useXPInfo() {
  const [xpInfo, setXPInfo] = useState<XPInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchXPInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/xp/info');
      setXPInfo(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch XP info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchXPInfo();
  }, []);

  return {
    xpInfo,
    loading,
    error,
    fetchXPInfo,
  };
}