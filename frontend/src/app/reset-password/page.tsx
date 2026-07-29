"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Lock,
  Code2,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

// Separate component that uses useSearchParams — must be wrapped in Suspense
function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const password = watch("password", "");

  // Redirect if no token provided
  useEffect(() => {
    if (!token) {
      setServerError("Missing or invalid reset link. Please request a new one.");
    }
  }, [token]);

  // Password strength helper
  const getStrength = (pw: string) => {
    if (!pw) return { level: 0, label: "", color: "" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return { level: 1, label: "Weak", color: "bg-red-500" };
    if (score === 2) return { level: 2, label: "Fair", color: "bg-amber-500" };
    if (score === 3) return { level: 3, label: "Good", color: "bg-yellow-400" };
    return { level: 4, label: "Strong", color: "bg-green-500" };
  };

  const strength = getStrength(password);

  const onSubmit = async (data: FormData) => {
    if (!token) return;
    try {
      setServerError("");
      await api.post("/auth/reset-password", {
        token,
        newPassword: data.password,
      });
      setDone(true);
      // Redirect to login after 2.5s
      setTimeout(() => router.push("/login"), 2500);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setServerError(
        axiosErr.response?.data?.message ??
          "Something went wrong. Please try again or request a new reset link."
      );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {done ? (
        /* ── Success state ── */
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4"
        >
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Password updated!
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-1">
            Your password has been changed successfully.
          </p>
          <p className="text-gray-400 text-xs mb-6">Redirecting you to sign in…</p>
          <div className="flex justify-center">
            <div className="w-5 h-5 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        </motion.div>
      ) : (
        /* ── Form state ── */
        <motion.form
          key="form"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Error banner */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 text-sm mb-5"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <span>{serverError}</span>
                <div className="mt-2">
                  <Link
                    href="/forgot-password"
                    className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-xs"
                  >
                    Request a new reset link →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* New password */}
          <div className="mb-4">
            <label
              htmlFor="reset-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="reset-password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                autoFocus
                className={cn(
                  "w-full pl-10 pr-11 py-3 rounded-xl border bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors",
                  errors.password
                    ? "border-red-300 dark:border-red-700"
                    : "border-gray-200 dark:border-gray-700"
                )}
                placeholder="Min 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.password.message}
              </p>
            )}
            {/* Password strength bar */}
            {password.length > 0 && (
              <div className="mt-2.5">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-all duration-300",
                        i <= strength.level ? strength.color : "bg-gray-200 dark:bg-gray-700"
                      )}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  Strength:{" "}
                  <span
                    className={cn(
                      "font-medium",
                      strength.level <= 1
                        ? "text-red-500"
                        : strength.level === 2
                        ? "text-amber-500"
                        : strength.level === 3
                        ? "text-yellow-500"
                        : "text-green-500"
                    )}
                  >
                    {strength.label}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div className="mb-6">
            <label
              htmlFor="reset-confirm-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="reset-confirm-password"
                {...register("confirmPassword")}
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                className={cn(
                  "w-full pl-10 pr-11 py-3 rounded-xl border bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors",
                  errors.confirmPassword
                    ? "border-red-300 dark:border-red-700"
                    : "border-gray-200 dark:border-gray-700"
                )}
                placeholder="Re-enter your new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            id="reset-password-submit"
            disabled={isSubmitting || !token}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/20"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ShieldCheck className="w-5 h-5" />
            )}
            {isSubmitting ? "Updating..." : "Set New Password"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to sign in
            </Link>
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">BEECODEFI</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Set New Password</h1>
          <p className="text-gray-500 mt-2">Choose a strong password for your account</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-xl overflow-hidden">
          <Suspense
            fallback={
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </motion.div>
    </div>
  );
}
