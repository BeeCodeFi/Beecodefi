"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User, Camera, Mail, Lock, RotateCcw, Trash2, Save,
  BookOpen, Trophy, BarChart3, Calendar, AlertTriangle, Check, X, Eye, EyeOff,
  ZoomIn, ZoomOut, Crop, PlayCircle, CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import type { User as UserType, AccountStats, QuizAttempt, CompletedCourse } from "@/types";

const COURSES_STORAGE_KEY = "beeCodeFi_completedCourses";
function loadCompletedCourses(): CompletedCourse[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(COURSES_STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5219";

export default function AccountPage() {
  const { user, isLoading, updateUser, logout } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const CROP_SIZE = 256;
  const OUTPUT_SIZE = 200;

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

  // Crop modal
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [cropOffset, setCropOffset] = useState({ x: 0, y: 0 });
  const [cropZoom, setCropZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Stats
  const [stats, setStats] = useState<AccountStats | null>(null);

  // Quiz history
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Course progress (localStorage)
  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([]);

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
      loadQuizHistory();
      setCompletedCourses(loadCompletedCourses());
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

  const loadQuizHistory = async () => {
    setHistoryLoading(true);
    try {
      const { data } = await api.get<QuizAttempt[]>("/quiz/history");
      setQuizHistory(data);
    } catch {
      // silently fail
    } finally {
      setHistoryLoading(false);
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

  // --- Avatar Upload (opens crop modal) ---
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setRawImageSrc(ev.target?.result as string);
      setCropOffset({ x: 0, y: 0 });
      setCropZoom(1);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCropDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pos = "touches" in e
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
    setDragStart({ x: pos.x - cropOffset.x, y: pos.y - cropOffset.y });
  };

  const handleCropDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const pos = "touches" in e
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
    setCropOffset({ x: pos.x - dragStart.x, y: pos.y - dragStart.y });
  };

  const handleCropDragEnd = () => setIsDragging(false);

  const handleApplyCrop = async () => {
    const img = imgRef.current;
    if (!img || !rawImageSrc) return;
    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const ctx = canvas.getContext("2d")!;
    const initialScale = CROP_SIZE / Math.max(img.naturalWidth, img.naturalHeight);
    const currentScale = initialScale * cropZoom;
    const imgCenterX = CROP_SIZE / 2 + cropOffset.x;
    const imgCenterY = CROP_SIZE / 2 + cropOffset.y;
    const srcX = (0 - imgCenterX) / currentScale + img.naturalWidth / 2;
    const srcY = (0 - imgCenterY) / currentScale + img.naturalHeight / 2;
    const srcW = CROP_SIZE / currentScale;
    const srcH = CROP_SIZE / currentScale;
    ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
    const base64 = canvas.toDataURL("image/jpeg", 0.88);
    setCropModalOpen(false);
    setRawImageSrc(null);
    setAvatarUploading(true);
    try {
      const { data } = await api.post<UserType>("/account/avatar", { image: base64 });
      updateUser(data);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to upload avatar";
      setProfileMsg({ type: "error", text: msg });
    } finally {
      setAvatarUploading(false);
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
      loadQuizHistory();
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

  const avatarUrl = user.profileImageUrl
    ? (user.profileImageUrl.startsWith("data:")
        ? user.profileImageUrl
        : `${API_BASE_URL}${user.profileImageUrl}`)
    : null;

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
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          >
            {[
              { icon: Trophy, label: "Quizzes Completed", value: stats.quizzesCompleted, color: "text-yellow-500" },
              { icon: BookOpen, label: "Lessons Done", value: stats.totalLessonsCompleted, color: "text-green-500" },
              { icon: PlayCircle, label: "Courses Completed", value: completedCourses.length, color: "text-orange-500" },
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

          {/* Quiz History Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" /> Quiz History
            </h2>
            {historyLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500" />
              </div>
            ) : quizHistory.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
                No quiz attempts yet. Take a quiz to see your history here!
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">Quiz</th>
                      <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">Category</th>
                      <th className="text-center py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">Score</th>
                      <th className="text-center py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">%</th>
                      <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {quizHistory.map((attempt) => (
                      <tr key={attempt.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white">{attempt.quizTitle}</td>
                        <td className="py-2.5 pr-4 text-gray-500 dark:text-gray-400 capitalize">{attempt.category}</td>
                        <td className="py-2.5 pr-4 text-center text-gray-700 dark:text-gray-300">
                          {attempt.score}/{attempt.totalQuestions}
                        </td>
                        <td className="py-2.5 pr-4 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                            attempt.percentage >= 80
                              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                              : attempt.percentage >= 50
                              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                              : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                          }`}>
                            {attempt.percentage}%
                          </span>
                        </td>
                        <td className="py-2.5 text-right text-gray-400 dark:text-gray-500 text-xs">
                          {new Date(attempt.completedAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Course Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-orange-500" /> Course Progress
            </h2>
            {completedCourses.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
                No courses completed yet. Visit a course and click &quot;Mark as Complete&quot;!
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">Course</th>
                      <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">Category</th>
                      <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">Difficulty</th>
                      <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">Completed On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {completedCourses.map((course) => (
                      <tr key={course.slug} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-2.5 pr-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            <span className="font-medium text-gray-900 dark:text-white">{course.title}</span>
                          </div>
                        </td>
                        <td className="py-2.5 pr-4 text-gray-500 dark:text-gray-400">{course.category}</td>
                        <td className="py-2.5 pr-4">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                            course.difficulty === "beginner"
                              ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"
                              : course.difficulty === "intermediate"
                              ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400"
                              : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400"
                          }`}>
                            {course.difficulty}
                          </span>
                        </td>
                        <td className="py-2.5 text-right text-gray-400 dark:text-gray-500 text-xs">
                          {new Date(course.completedAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Reset Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
            transition={{ delay: 0.6 }}
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

      {/* ── Crop Modal ── */}
      {cropModalOpen && rawImageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl w-full max-w-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Crop className="w-5 h-5 text-indigo-500" /> Adjust Photo
              </h2>
              <button
                onClick={() => { setCropModalOpen(false); setRawImageSrc(null); }}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Crop viewport */}
            <div className="flex justify-center mb-4">
              <div
                className="relative overflow-hidden rounded-full border-4 border-indigo-500 shadow-lg cursor-grab active:cursor-grabbing"
                style={{ width: CROP_SIZE, height: CROP_SIZE }}
                onMouseDown={handleCropDragStart}
                onMouseMove={handleCropDragMove}
                onMouseUp={handleCropDragEnd}
                onMouseLeave={handleCropDragEnd}
                onTouchStart={handleCropDragStart}
                onTouchMove={handleCropDragMove}
                onTouchEnd={handleCropDragEnd}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={rawImageSrc}
                  alt="crop preview"
                  draggable={false}
                  style={{
                    position: "absolute",
                    maxWidth: "none",
                    width: `${CROP_SIZE * cropZoom}px`,
                    height: `${CROP_SIZE * cropZoom}px`,
                    objectFit: "contain",
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${cropOffset.x}px), calc(-50% + ${cropOffset.y}px))`,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            {/* Zoom slider */}
            <div className="flex items-center gap-3 mb-5">
              <ZoomOut className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={cropZoom}
                onChange={(e) => { setCropZoom(Number(e.target.value)); }}
                className="flex-1 accent-indigo-600"
              />
              <ZoomIn className="w-4 h-4 text-gray-400 shrink-0" />
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mb-5">
              Drag to reposition · Slide to zoom
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => { setCropModalOpen(false); setRawImageSrc(null); }}
                className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCrop}
                className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
              >
                Apply & Upload
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
