"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Tag, Users, TrendingUp, Code } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface SkillCategory {
  category: string;
  level: number;
  tags: string[];
}

interface UserSkills {
  userId: number;
  skills: string | null;
  parsedSkills: SkillCategory[];
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
}

interface PopularSkill {
  skill: string;
  userCount: number;
}

export default function SkillsPage() {
  const { user } = useAuth();
  const [mySkills, setMySkills] = useState<UserSkills | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [popularSkills, setPopularSkills] = useState<PopularSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchMySkills();
    fetchPopularSkills();
  }, []);

  const fetchMySkills = async () => {
    try {
      const { data } = await api.get("/skills/my");
      setMySkills(data);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularSkills = async () => {
    try {
      const { data } = await api.get("/skills/popular");
      setPopularSkills(data);
    } catch (error) {
      console.error("Failed to fetch popular skills:", error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.length < 2) return;
    
    setSearching(true);
    try {
      const { data } = await api.get(`/skills/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchResults(data);
    } catch (error) {
      console.error("Failed to search skills:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Frontend": "from-blue-500 to-cyan-500",
      "Backend": "from-green-500 to-emerald-500",
      "Database": "from-purple-500 to-pink-500",
      "DevOps": "from-orange-500 to-red-500",
      "Mobile": "from-indigo-500 to-violet-500",
      "Other": "from-gray-500 to-slate-500"
    };
    return colors[category] || colors["Other"];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
            <Code className="w-4 h-4" />
            Skills Showcase
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-gradient">Discover Skills</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore what developers are learning and find people with specific skills
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-8"
        >
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for skills (e.g., React, Python, Docker...)"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={searching || searchQuery.length < 2}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {searching ? "Searching..." : "Search"}
            </button>
          </div>
        </motion.div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              Found {searchResults.length} developers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((profile) => (
                <div
                  key={profile.id}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {profile.name[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{profile.name}</h3>
                      <p className="text-sm text-indigo-600 dark:text-indigo-400">@{profile.username}</p>
                    </div>
                  </div>
                  {profile.skills && (
                    <div className="flex flex-wrap gap-1">
                      {profile.skills.split(',').slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                          {skill.trim()}
                        </span>
                      ))}
                      {profile.skills.split(',').length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                          +{profile.skills.split(',').length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* My Skills Section */}
        {user && mySkills && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-indigo-500" />
              My Skills
            </h2>
            {mySkills.parsedSkills.length > 0 ? (
              <div className="space-y-4">
                {mySkills.parsedSkills.map((category, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{category.category}</h3>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < category.level ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(category.category)} text-white rounded-full text-sm`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No skills added yet. Add skills in your profile settings.</p>
            )}
          </motion.div>
        )}

        {/* Popular Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            Popular Skills
          </h2>
          {popularSkills.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {popularSkills.map((skill, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(skill.skill);
                    handleSearch();
                  }}
                  className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors text-left"
                >
                  <Tag className="w-4 h-4 text-indigo-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{skill.skill}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{skill.userCount} developers</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No popular skills data available yet.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}