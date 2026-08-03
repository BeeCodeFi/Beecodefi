"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchBadges = async () => {
      try {
        const { data } = await api.get<Badge[]>("/badge");
        setBadges(data);
      } catch (error: unknown) {
        const enhancedError = error as { userMessage?: string; message?: string };
        const errorMessage =
          enhancedError.userMessage ||
          enhancedError.message ||
          "Failed to fetch badges";
        toast.error("Error loading badges", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [user, toast]);

  const checkForNewBadges = async () => {
    if (!user) return [];
    
    try {
      const { data } = await api.post<Badge[]>("/badge/check");
      if (data.length > 0) {
        // Refresh badges list
        const { data: updatedBadges } = await api.get<Badge[]>("/badge");
        setBadges(updatedBadges);
      }
      return data;
    } catch (error: unknown) {
      const enhancedError = error as { userMessage?: string; message?: string };
      const errorMessage =
        enhancedError.userMessage ||
        enhancedError.message ||
        "Failed to check for new badges";
      toast.error("Error checking badges", errorMessage);
      return [];
    }
  };

  const getTutorialBadge = (tutorialSlug: string) => {
    const badgeMap: Record<string, string> = {
      html: "HTML Master",
      css: "CSS Wizard",
      javascript: "JavaScript Pro",
    };
    const badgeName = badgeMap[tutorialSlug];
    return badges.find((b) => b.name === badgeName);
  };

  return {
    badges,
    loading,
    checkForNewBadges,
    getTutorialBadge,
  };
}
