"use client";

// React
import { useState, useEffect, useCallback } from "react";

// Local imports
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  color: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: number;
  requiredCount: number;
}

export function useBadges() {
  const { user } = useAuth();
  const toast = useToast();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBadges = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const { data } = await api.get<Badge[]>("/badge");
      setBadges(data);
    } catch (err: unknown) {
      const enhancedError = err as { userMessage?: string; message?: string };
      const errorMessage =
        enhancedError.userMessage ||
        enhancedError.message ||
        "Failed to fetch badges";
      setError(errorMessage);
      toast.error("Error loading badges", errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  const checkForNewBadges = useCallback(async () => {
    if (!user) return [];
    
    try {
      const { data } = await api.post<Badge[]>("/badge/check");
      if (data.length > 0) {
        // Refresh badges list
        const { data: updatedBadges } = await api.get<Badge[]>("/badge");
        setBadges(updatedBadges);
      }
      return data;
    } catch (err: unknown) {
      const enhancedError = err as { userMessage?: string; message?: string };
      const errorMessage =
        enhancedError.userMessage ||
        enhancedError.message ||
        "Failed to check for new badges";
      toast.error("Error checking badges", errorMessage);
      return [];
    }
  }, [user, toast]);

  const getTutorialBadge = useCallback(
    (tutorialSlug: string) => {
      const badgeMap: Record<string, string> = {
        html: "HTML Master",
        css: "CSS Wizard",
        javascript: "JavaScript Pro",
      };
      const badgeName = badgeMap[tutorialSlug];
      return badges.find((b) => b.name === badgeName);
    },
    [badges]
  );

  return {
    data: badges,
    loading,
    error,
    refetch: fetchBadges,
    // Legacy aliases for backward compatibility
    badges,
    checkForNewBadges,
    getTutorialBadge,
  };
}
