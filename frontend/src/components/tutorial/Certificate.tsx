"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Award, Share2, X } from "lucide-react";

interface CertificateProps {
  name: string;
  trackTitle: string;
  lessonsCount: number;
  completedAt: string;
  onClose: () => void;
}

export default function Certificate({ name, trackTitle, lessonsCount, completedAt, onClose }: CertificateProps) {
  const certRef = useRef<HTMLDivElement>(null);
  const date = new Date(completedAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const handleCopyLink = () => {
    const msg = `🎉 I just completed the ${trackTitle} course on BEECODEFI! ${lessonsCount} lessons done. Start your free learning journey at beecodefi-edu.vercel.app 🐝`;
    navigator.clipboard.writeText(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative max-w-2xl w-full"
      >
        {/* Close */}
        <button onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
          <X className="w-4 h-4" />
        </button>

        {/* Certificate card */}
        <div ref={certRef} className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-indigo-300 dark:border-indigo-700 rounded-tl-lg opacity-60" />
          <div className="absolute top-4 right-4 w-16 h-16 border-r-4 border-t-4 border-indigo-300 dark:border-indigo-700 rounded-tr-lg opacity-60" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-l-4 border-b-4 border-indigo-300 dark:border-indigo-700 rounded-bl-lg opacity-60" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-indigo-300 dark:border-indigo-700 rounded-br-lg opacity-60" />

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          {/* Content */}
          <div className="relative">
            {/* Logo + icon */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-3xl">🐝</span>
              <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                BEECODEFI
              </span>
            </div>

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Award className="w-8 h-8 text-white" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 mb-3">
              Certificate of Completion
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">This is to certify that</p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
              {name}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
              has successfully completed
            </p>

            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
              {trackTitle}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
              {lessonsCount} lessons completed
            </p>

            {/* Divider */}
            <div className="w-32 h-0.5 mx-auto bg-gradient-to-r from-transparent via-indigo-400 to-transparent mb-6" />

            <p className="text-xs text-gray-400 dark:text-gray-500">Completed on {date}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              beecodefi-edu.vercel.app · Free Education for Everyone
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button onClick={handleCopyLink}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-indigo-500/25">
            <Share2 className="w-4 h-4" />
            Share Achievement
          </button>
          <button onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Close
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">Share button copies an achievement message to clipboard</p>
      </motion.div>
    </div>
  );
}
