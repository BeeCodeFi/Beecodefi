"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { Award, Flame, Calendar, BookOpen, CheckCircle, Clock, Code, Tag } from "lucide-react";
import Image from "next/image";

interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
}

interface RecentActivity {
  id: number;
  activityType?: string;
  title?: string;
  description?: string;
  tutorialTitle?: string;
  lessonTitle?: string;
  timestamp: string;
}

interface UserProfile {
  id: number;
  name: string;
  username: string;
  bio?: string;
  skills?: string;
  profileImageUrl?: string;
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  createdAt: string;
  badgesCount: number;
  lessonsCompleted: number;
  quizzesCompleted: number;
  unlockedBadges: Badge[];
  recentActivities: RecentActivity[];
}

export default function PublicProfile({ username }: { username: string }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await api.get(`/profile/${username}`);
        setProfile(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, [username]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Profile Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 items-center md:items-start"
        >
          <div className="w-32 h-32 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
              {profile.profileImageUrl ? (
                <Image src={profile.profileImageUrl} alt={profile.name} width={128} height={128} className="object-cover" />
              ) : (
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-600">
                  {profile.name[0].toUpperCase()}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">@{profile.username}</p>
            {profile.bio && (
              <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl">{profile.bio}</p>
            )}
            {profile.skills && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                {profile.skills.split(',').map((skill, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                    <Tag className="w-3 h-3" />
                    {skill.trim()}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400 justify-center md:justify-start">
              <Calendar className="w-4 h-4" /> Joined {new Date(profile.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
             <div className="text-center px-6 py-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-100 dark:border-indigo-800/40">
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mb-1">Level</p>
                <p className="text-4xl font-black text-indigo-700 dark:text-indigo-300">{profile.level}</p>
             </div>
             <div className="text-center px-6 py-4 bg-orange-50 dark:bg-orange-950/30 rounded-2xl border border-orange-100 dark:border-orange-900/40">
                <p className="text-sm text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider mb-1">Streak</p>
                <div className="flex items-center gap-1 justify-center">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <p className="text-4xl font-black text-orange-700 dark:text-orange-300">{profile.currentStreak}</p>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.totalXP.toLocaleString()}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total XP</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.lessonsCompleted}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Lessons Finished</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.quizzesCompleted}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Quizzes Passed</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Badges & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Badges */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-500" /> Earned Badges ({profile.badgesCount})
            </h2>
            {profile.unlockedBadges.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {profile.unlockedBadges.map(badge => (
                  <div key={badge.id} className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 text-center hover:shadow-md transition-shadow">
                     <div className="text-4xl mb-2">{badge.iconUrl || '🏆'}</div>
                     <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{badge.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                No badges earned yet.
              </div>
            )}
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" /> Recent Activity
            </h2>
            {profile.recentActivities.length > 0 ? (
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
                {profile.recentActivities.map((activity, i) => (
                  <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white dark:border-gray-900 bg-indigo-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 ml-[3px] md:ml-0" />
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {activity.title || activity.tutorialTitle || 'Activity'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                        {activity.description || activity.lessonTitle}
                      </p>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mt-2 block">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                No recent activity.
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
