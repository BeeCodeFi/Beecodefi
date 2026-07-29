"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Code2, AlertCircle, CheckCircle, ArrowLeft, Send } from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      setServerError("");
      await api.post("/auth/forgot-password", { email: data.email });
      setSubmittedEmail(data.email);
      setSent(true);
    } catch {
      // Still show success to prevent email enumeration — only show error for network issues
      setServerError("Something went wrong. Please check your connection and try again.");
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
          <p className="text-gray-500 mt-2">We&apos;ll send you a link to get back in</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            {sent ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-4"
              >
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Check your inbox
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-1">
                  If <span className="font-medium text-gray-700 dark:text-gray-300">{submittedEmail}</span> is
                  registered, you&apos;ll receive a password reset link shortly.
                </p>
                <p className="text-gray-400 text-xs mt-3 mb-6">
                  Didn&apos;t receive it? Check your spam folder or wait a minute before trying again.
                </p>

                <button
                  onClick={() => { setSent(false); setSubmittedEmail(""); }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Try a different email
                </button>

                <p className="text-center text-sm text-gray-500 mt-5">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to sign in
                  </Link>
                </p>
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
                {serverError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 text-sm mb-5"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{serverError}</span>
                  </motion.div>
                )}

                <div className="mb-6">
                  <label
                    htmlFor="forgot-email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="forgot-email"
                      {...register("email")}
                      type="email"
                      autoComplete="email"
                      autoFocus
                      className={cn(
                        "w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors",
                        errors.email
                          ? "border-red-300 dark:border-red-700"
                          : "border-gray-200 dark:border-gray-700"
                      )}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email.message}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                    Enter the email linked to your account and we&apos;ll send you a secure reset link.
                  </p>
                </div>

                <button
                  type="submit"
                  id="forgot-password-submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/20"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
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
        </div>
      </motion.div>
    </div>
  );
}
