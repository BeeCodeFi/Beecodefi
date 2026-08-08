"use client";

import { useXPInfo } from "@/hooks/useXPInfo";
import { useAuth } from "@/context/AuthContext";
import { Zap, Flame, Target, TrendingUp } from "lucide-react";

export default function XPDisplay() {
  const { user } = useAuth();
  const { xpInfo, loading } = useXPInfo();

  if (!user || loading || !xpInfo) return null;

  const levelProgress = (xpInfo.xpForCurrentLevel / xpInfo.xpToNextLevel) * 100;
  const dailyProgress = (xpInfo.dailyXPEarned / xpInfo.dailyXPGoal) * 100;
  const weeklyProgress = (xpInfo.weeklyXPEarned / xpInfo.weeklyXPGoal) * 100;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Level {xpInfo.level}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{xpInfo.totalXP} XP</p>
          </div>
        </div>
        {xpInfo.streakMultiplier > 1 && (
          <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-sm font-medium">
            <Flame className="w-4 h-4" />
            {xpInfo.streakMultiplier}x Multiplier
          </div>
        )}
      </div>

      {/* Level Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
          <span>Level Progress</span>
          <span>{xpInfo.xpForCurrentLevel} / {xpInfo.xpToNextLevel} XP</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${Math.min(levelProgress, 100)}%` }}
          />
        </div>
      </div>

      {/* Daily Goal */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
          <div className="flex items-center gap-1">
            <Target className="w-3 h-3" />
            Daily Goal
          </div>
          <span>{xpInfo.dailyXPEarned} / {xpInfo.dailyXPGoal} XP</span>
        </div>
        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${Math.min(dailyProgress, 100)}%` }}
          />
        </div>
      </div>

      {/* Weekly Goal */}
      <div>
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Weekly Goal
          </div>
          <span>{xpInfo.weeklyXPEarned} / {xpInfo.weeklyXPGoal} XP</span>
        </div>
        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}