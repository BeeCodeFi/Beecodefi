"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

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
      } catch (error) {
        console.error("Failed to fetch badges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [user]);

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
    } catch (error) {
      console.error("Failed to check badges:", error);
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
