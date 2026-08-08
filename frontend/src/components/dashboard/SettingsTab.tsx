"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  User,
  Camera,
  Mail,
  Lock,
  RotateCcw,
  Trash2,
  Save,
  Check,
  X,
  Eye,
  EyeOff,
  AlertTriangle,
  MousePointer2,
  Tag,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { getUserStorageKey } from "@/lib/userStorage";
import { useToast } from "@/context/ToastContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5219";
const _CROP_SIZE = 256;
const _OUTPUT_SIZE = 200;

export default function SettingsTab({
  reloadStats,
}: {
  reloadStats: () => void;
}) {
  const { user, updateUser, logout } = useAuth();
  const { success, error: toastError } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const _imgRef = useRef<HTMLImageElement>(null);

  // Profile form
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Accessibility
  const [disableCustomCursor, setDisableCustomCursor] = useState(false);

  // Avatar
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Reset progress
  const [resetConfirm, setResetConfirm] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);
  const [resetMsg, setResetMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("beecodefi_custom_cursor");
    if (saved === "disabled") {
      queueMicrotask(() => setDisableCustomCursor(true));
    }
  }, []);

  const handleToggleCursor = () => {
    const newVal = !disableCustomCursor;
    setDisableCustomCursor(newVal);
    if (newVal) {
      localStorage.setItem("beecodefi_custom_cursor", "disabled");
    } else {
      localStorage.removeItem("beecodefi_custom_cursor");
    }
    // Reload page to apply changes if needed, or rely on layout
    window.location.reload();
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg(null);
    try {
      const { data } = await api.put("/account/profile", { name, email, username, bio, skills });
      updateUser(data);
      setProfileMsg({ type: "success", text: "Profile updated successfully" });
      success("Profile updated", "Your name and email have been saved");
    } catch (err: unknown) {
      const msg =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as { response?: { data?: { message?: string } } })
          .response === "object" &&
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : "Failed to update profile";
      const safeMessage = msg ?? "Failed to update profile";
      setProfileMsg({ type: "error", text: safeMessage });
      toastError("Update failed", safeMessage);
    } finally {
      setProfileSaving(false);
    }
  };

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
      setPasswordMsg({
        type: "success",
        text: "Password changed successfully",
      });
      success("Password changed", "Your new password is now active");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const msg =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as { response?: { data?: { message?: string } } })
          .response === "object" &&
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : "Failed to change password";
      const safeMessage = msg ?? "Failed to change password";
      setPasswordMsg({ type: "error", text: safeMessage });
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target?.result as string;
      setAvatarUploading(true);
      try {
        const { data } = await api.post("/account/avatar", { image: base64 });
        updateUser(data);
      } catch {
        setProfileMsg({ type: "error", text: "Failed to upload avatar" });
      } finally {
        setAvatarUploading(false);
      }
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAvatarDelete = async () => {
    try {
      await api.delete("/account/avatar");
      if (user) updateUser({ ...user, profileImageUrl: null });
    } catch {
      // fail silently
    }
  };

  const handleReset = async (type: string) => {
    setResetting(true);
    setResetMsg(null);
    try {
      await api.post("/account/reset-progress", { type });

      // Clear localStorage based on reset type
      if (type === "tutorial" || type === "all") {
        // Clear tutorial progress
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (
            key?.startsWith(getUserStorageKey(user?.id, "tutorial-progress-"))
          ) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));
      }

      if (type === "quiz" || type === "all") {
        // Clear quiz progress from localStorage
        const quizKeysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (
            key?.includes("quiz-") || 
            key?.includes("-quiz-") || 
            key?.includes("lesson-quiz-")
          ) {
            quizKeysToRemove.push(key);
          }
        }
        quizKeysToRemove.forEach((key) => localStorage.removeItem(key));
        
        // Dispatch storage event to notify quiz page to refresh
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new Event('quiz-progress-updated'));
      }

      setResetMsg({
        type: "success",
        text: `${type === "all" ? "All" : type} progress reset successfully`,
      });
      success("Progress reset", `Your ${type} progress has been cleared`);
      setResetConfirm(null);
      reloadStats();
      
      // If quiz or all was reset, refresh the page to update quiz counts
      if (type === "quiz" || type === "all") {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch {
      setResetMsg({ type: "error", text: "Failed to reset progress" });
      toastError("Reset failed", "Could not reset your progress");
    } finally {
      setResetting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await api.delete("/account", {
        data: { currentPassword: deletePassword, newPassword: "unused" },
      });
      logout();
      window.location.href = "/";
    } catch (err: unknown) {
      const msg =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as { response?: { data?: { message?: string } } })
          .response === "object" &&
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : "Failed to delete account";
      const safeMessage = msg ?? "Failed to delete account";
      setProfileMsg({
        type: "error",
        text: safeMessage,
      });
    } finally {
      setDeleting(false);
    }
  };

  const avatarUrl = user?.profileImageUrl
    ? user.profileImageUrl.startsWith("data:")
      ? user.profileImageUrl
      : `${API_BASE_URL}${user.profileImageUrl}`
    : null;

  return (
    <div className="space-y-6">
      {/* Profile */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-500" /> Profile Information
        </h2>

        {/* Avatar */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative group">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Profile"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user?.name[0].toUpperCase()}
                </span>
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
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {avatarUploading ? "Uploading..." : "Profile Photo"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              JPEG, PNG, WebP, or GIF. Max 2MB.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarUploading}
                className="text-xs px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
              >
                Upload
              </button>
              {user?.profileImageUrl && (
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

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-8 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                pattern="[a-zA-Z0-9_]{3,20}"
                title="3-20 characters, letters, numbers, and underscores only"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={160}
              placeholder="Tell the world about yourself..."
              className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
            <p className="text-xs text-gray-500 mt-1 text-right">{bio.length}/160</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Skills
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="JavaScript, React, Node.js, Python..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Comma-separated skills (max 20)</p>
          </div>

          {profileMsg && (
            <div
              className={`flex items-center gap-2 text-sm p-3 rounded-lg ${profileMsg.type === "success" ? "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400" : "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400"}`}
            >
              {profileMsg.type === "success" ? (
                <Check className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
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
      </div>

      {/* Accessibility */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MousePointer2 className="w-5 h-5 text-indigo-500" /> Accessibility
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Disable Custom Cursor
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Turn off the animated cursor trail effect (requires reload).
            </p>
          </div>
          <button
            onClick={handleToggleCursor}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              disableCustomCursor
                ? "bg-indigo-600"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                disableCustomCursor ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-indigo-500" /> Change Password
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showCurrentPw ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showCurrentPw ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showNewPw ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={6}
                  className="w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showNewPw ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {passwordMsg && (
            <div
              className={`flex items-center gap-2 text-sm p-3 rounded-lg ${passwordMsg.type === "success" ? "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400" : "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400"}`}
            >
              {passwordMsg.type === "success" ? (
                <Check className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
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
      </div>

      {/* Reset Progress */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-orange-500" /> Reset Progress
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Reset your learning progress. This cannot be undone.
        </p>

        {resetMsg && (
          <div
            className={`flex items-center gap-2 text-sm p-3 rounded-lg mb-4 ${resetMsg.type === "success" ? "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400" : "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400"}`}
          >
            {resetMsg.type === "success" ? (
              <Check className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
            {resetMsg.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["tutorial", "quiz", "all"].map((type) => (
            <div
              key={type}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                {type} Progress
              </p>
              {resetConfirm === type ? (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleReset(type)}
                    disabled={resetting}
                    className="flex-1 text-xs px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setResetConfirm(null)}
                    className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setResetConfirm(type)}
                  className="w-full mt-3 text-xs px-3 py-1.5 bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900"
                >
                  Reset
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-red-200 dark:border-red-900 p-6">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Danger Zone
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Permanently delete your account and all associated data.
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
            <p className="text-sm text-red-700 dark:text-red-300 font-medium">
              Enter your password to confirm:
            </p>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Current password"
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleDeleteAccount}
                disabled={deleting || !deletePassword}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" /> Confirm Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletePassword("");
                }}
                disabled={deleting}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
