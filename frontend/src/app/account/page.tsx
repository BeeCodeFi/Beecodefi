"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User, Camera, Mail, Lock, RotateCcw, Trash2, Save,
  BookOpen, Trophy, BarChart3, Calendar, AlertTriangle, Check, X, Eye, EyeOff,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import type { User as UserType, AccountStats } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5219";

export default function AccountPage() {
  const { user, isLoading, updateUser, logout } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Avatar
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Stats
  const [stats, setStats] = useState<AccountStats | null>(null);

  // Reset progress
  const [resetConfirm, setResetConfirm] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);
  const [resetMsg, setResetMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    try {
      const { data } = await api.get<AccountStats>("/account/stats");
      setStats(data);
    } catch {
      // silently fail
    }
  };

  // --- Profile Update ---
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg(null);
    try {
      const { data } = await api.put<UserType>("/account/profile", { name, email });
      updateUser(data);
      setProfileMsg({ type: "success", text: "Profile updated successfully" });
    } catch (err: unknown) {
      console.error("Profile update error:", err);
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to update profile";
      setProfileMsg({ type: "error", text: msg });
    } finally {
      setProfileSaving(false);
    }
  };

  // --- Password Change ---
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New passwords do not match" });
      return;
    }
    setPasswordSaving(true);
    setPasswordMsg(null);
    try {
      await api.put("/account/password", { currentPassword, newPassword });
      setPasswordMsg({ type: "success", text: "Password changed successfully" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to change password";
      setPasswordMsg({ type: "error", text: msg });
    } finally {
      setPasswordSaving(false);
    }
  };

  // --- Avatar Upload ---
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post<UserType>("/account/avatar", formData);
      updateUser(data);
    } catch (err: unknown) {
      console.error("Avatar upload error:", err);
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to upload avatar";
      setProfileMsg({ type: "error", text: msg });
    } finally {
      setAvatarUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAvatarDelete = async () => {
    try {
      await api.delete("/account/avatar");
      if (user) updateUser({ ...user, profileImageUrl: null });
    } catch {
      // silently fail
    }
  };

  // --- Reset Progress ---
  const handleReset = async (type: string) => {
    setResetting(true);
    setResetMsg(null);
    try {
      await api.post("/account/reset-progress", { type });

      // Clear localStorage tutorial progress when resetting tutorials or all
      if (type === "tutorial" || type === "all") {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith("tutorial-progress-")) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));
      }

      setResetMsg({ type: "success", text: `${type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)} progress reset successfully` });
      setResetConfirm(null);
      loadStats();
    } catch {
      setResetMsg({ type: "error", text: "Failed to reset progress" });
    } finally {
      setResetting(false);
    }
  };

  // --- Delete Account ---
  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await api.delete("/account", { data: { currentPassword: deletePassword, newPassword: "unused" } });
      logout();
      router.push("/");
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to delete account";
      setProfileMsg({ type: "error", text: msg });
    } finally {
      setDeleting(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
      </div>
    );
  }

  const avatarUrl = user.profileImageUrl ? `${API_BASE_URL}${user.profileImageUrl}` : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your profile, security, and learning progress</p>
        </motion.div>

        {/* Stats Cards */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { icon: Trophy, label: "Quizzes Completed", value: stats.quizzesCompleted, color: "text-yellow-500" },
              { icon: BookOpen, label: "Lessons Done", value: stats.totalLessonsCompleted, color: "text-green-500" },
              { icon: BarChart3, label: "Avg Quiz Score", value: `${stats.averageQuizScore}%`, color: "text-blue-500" },
              { icon: Calendar, label: "Member Since", value: new Date(stats.memberSince).toLocaleDateString("en-US", { month: "short", year: "numeric" }), color: "text-purple-500" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        <div className="space-y-6">
          {/* Profile & Avatar Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" /> Profile Information
            </h2>

            {/* Avatar */}
            <div className="flex items-center gap-6 mb-6">
              <div className="relative group">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{user.name[0].toUpperCase()}</span>
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={avatarUploading}
                  className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{avatarUploading ? "Uploading..." : "Profile Photo"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">JPEG, PNG, WebP, or GIF. Max 2MB.</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={avatarUploading}
                    className="text-xs px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                  >
                    Upload
                  </button>
                  {user.profileImageUrl && (
                    <button
                      onClick={handleAvatarDelete}
                      className="text-xs px-3 py-1 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {profileMsg && (
                <div className={`flex items-center gap-2 text-sm p-3 rounded-lg ${profileMsg.type === "success" ? "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400" : "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400"}`}>
                  {profileMsg.type === "success" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  {profileMsg.text}
                </div>
              )}

              <button
                type="submit"
                disabled={profileSaving}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {profileSaving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </motion.div>

          {/* Password Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-500" /> Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    autoComplete="one-time-code"
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                  <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showNewPw ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      autoComplete="new-password"
                      minLength={6}
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                    <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      autoComplete="new-password"
                      minLength={6}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {passwordMsg && (
                <div className={`flex items-center gap-2 text-sm p-3 rounded-lg ${passwordMsg.type === "success" ? "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400" : "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400"}`}>
                  {passwordMsg.type === "success" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  {passwordMsg.text}
                </div>
              )}

              <button
                type="submit"
                disabled={passwordSaving}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                {passwordSaving ? "Updating..." : "Update Password"}
              </button>
            </form>
          </motion.div>

          {/* Reset Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-orange-500" /> Reset Progress
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Reset your learning progress. This cannot be undone.
            </p>

            {resetMsg && (
              <div className={`flex items-center gap-2 text-sm p-3 rounded-lg mb-4 ${resetMsg.type === "success" ? "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400" : "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400"}`}>
                {resetMsg.type === "success" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                {resetMsg.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { type: "tutorial", label: "Tutorial Progress", desc: "Reset all lesson completions", icon: BookOpen, color: "text-green-500" },
                { type: "quiz", label: "Quiz History", desc: "Reset all quiz attempts & scores", icon: Trophy, color: "text-yellow-500" },
                { type: "all", label: "Everything", desc: "Reset all tutorials and quizzes", icon: RotateCcw, color: "text-red-500" },
              ].map((item) => (
                <div key={item.type} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{item.desc}</p>
                  {resetConfirm === item.type ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReset(item.type)}
                        disabled={resetting}
                        className="flex-1 text-xs px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                      >
                        {resetting ? "Resetting..." : "Confirm"}
                      </button>
                      <button
                        onClick={() => setResetConfirm(null)}
                        className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setResetConfirm(item.type)}
                      className="w-full text-xs px-3 py-1.5 bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900 transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-red-200 dark:border-red-900 p-6"
          >
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Danger Zone
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg hover:bg-red-100 dark:hover:bg-red-900 border border-red-200 dark:border-red-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete Account
              </button>
            ) : (
              <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-3">
                <p className="text-sm text-red-700 dark:text-red-300 font-medium">Enter your password to confirm account deletion:</p>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Current password"
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleting || !deletePassword}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" /> {deleting ? "Deleting..." : "Permanently Delete"}
                  </button>
                  <button
                    onClick={() => { setShowDeleteConfirm(false); setDeletePassword(""); }}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
