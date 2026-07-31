"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type ToastVariant = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toast: (opts: Omit<Toast, "id">) => void;
  success: (title: string, description?: string) => void;
  error:   (title: string, description?: string) => void;
  info:    (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
}

// ── Context ───────────────────────────────────────────────────────────────
const ToastContext = createContext<ToastContextValue | null>(null);

// ── Config ────────────────────────────────────────────────────────────────
const VARIANTS: Record<
  ToastVariant,
  { icon: React.ElementType; bg: string; border: string; icon_color: string }
> = {
  success: {
    icon: CheckCircle2,
    bg:   "bg-white dark:bg-gray-900",
    border: "border-green-200 dark:border-green-800/60",
    icon_color: "text-green-500 dark:text-green-400",
  },
  error: {
    icon: XCircle,
    bg:   "bg-white dark:bg-gray-900",
    border: "border-red-200 dark:border-red-800/60",
    icon_color: "text-red-500 dark:text-red-400",
  },
  info: {
    icon: Info,
    bg:   "bg-white dark:bg-gray-900",
    border: "border-indigo-200 dark:border-indigo-800/60",
    icon_color: "text-indigo-500 dark:text-indigo-400",
  },
  warning: {
    icon: AlertTriangle,
    bg:   "bg-white dark:bg-gray-900",
    border: "border-amber-200 dark:border-amber-800/60",
    icon_color: "text-amber-500 dark:text-amber-400",
  },
};

// ── Provider ──────────────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const t = timers.current.get(id);
    if (t) { clearTimeout(t); timers.current.delete(id); }
  }, []);

  const toast = useCallback(
    ({ variant, title, description, duration = 4000 }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [{ id, variant, title, description, duration }, ...prev].slice(0, 5));
      const t = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, t);
    },
    [dismiss]
  );

  const success = useCallback((title: string, description?: string) => toast({ variant: "success", title, description }), [toast]);
  const error   = useCallback((title: string, description?: string) => toast({ variant: "error",   title, description }), [toast]);
  const info    = useCallback((title: string, description?: string) => toast({ variant: "info",    title, description }), [toast]);
  const warning = useCallback((title: string, description?: string) => toast({ variant: "warning", title, description }), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info, warning }}>
      {children}

      {/* ── Toast viewport ── */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-6 right-4 sm:right-6 z-[9999] flex flex-col gap-2.5 w-[calc(100vw-2rem)] sm:w-96 pointer-events-none"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const cfg = VARIANTS[t.variant];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0,  scale: 1 }}
                exit={{    opacity: 0, y: 8,   scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.21, 1.02, 0.73, 1] }}
                className={`
                  pointer-events-auto flex items-start gap-3 px-4 py-3.5
                  rounded-2xl border shadow-xl shadow-black/[0.06]
                  ${cfg.bg} ${cfg.border}
                `}
                role="status"
                aria-label={t.title}
              >
                {/* Icon */}
                <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${cfg.icon_color}`} />

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                    {t.title}
                  </p>
                  {t.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                      {t.description}
                    </p>
                  )}
                </div>

                {/* Dismiss */}
                <button
                  onClick={() => dismiss(t.id)}
                  className="p-1 -mr-1 -mt-0.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/8 transition-colors shrink-0"
                  aria-label="Dismiss notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Auto-dismiss progress bar */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-[2px] rounded-b-2xl ${
                    t.variant === "success" ? "bg-green-400" :
                    t.variant === "error"   ? "bg-red-400" :
                    t.variant === "warning" ? "bg-amber-400" :
                    "bg-indigo-400"
                  }`}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: (t.duration ?? 4000) / 1000, ease: "linear" }}
                  style={{ position: "absolute" }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
