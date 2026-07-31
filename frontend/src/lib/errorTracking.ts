// Error tracking and logging utilities

interface ErrorLog {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  userId?: string;
}

/**
 * Log error to console and optionally send to monitoring service
 */
export const logError = (
  error: Error,
  errorInfo?: { componentStack?: string },
  context?: Record<string, any>
) => {
  const errorLog: ErrorLog = {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack,
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  };

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error caught:", errorLog);
    if (context) console.error("Context:", context);
  }

  // In production, you could send to a monitoring service
  // Example: Sentry, LogRocket, Datadog, etc.
  if (process.env.NODE_ENV === "production") {
    // Store in localStorage for debugging
    try {
      const errors = JSON.parse(localStorage.getItem("error_logs") || "[]");
      errors.push(errorLog);
      // Keep only last 10 errors
      if (errors.length > 10) errors.shift();
      localStorage.setItem("error_logs", JSON.stringify(errors));
    } catch (e) {
      // Ignore localStorage errors
    }

    // TODO: Send to monitoring service
    // Example with fetch:
    // fetch('/api/log-error', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...errorLog, context }),
    // }).catch(() => {}); // Fail silently
  }
};

/**
 * Log a warning (non-fatal issue)
 */
export const logWarning = (message: string, context?: Record<string, any>) => {
  if (process.env.NODE_ENV === "development") {
    console.warn("Warning:", message, context);
  }
};

/**
 * Log performance metrics
 */
export const logPerformance = (metric: string, value: number) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Performance] ${metric}:`, value, "ms");
  }

  // Send to analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "timing_complete", {
      name: metric,
      value: Math.round(value),
      event_category: "Performance",
    });
  }
};

/**
 * Retrieve error logs from localStorage (for debugging)
 */
export const getErrorLogs = (): ErrorLog[] => {
  try {
    return JSON.parse(localStorage.getItem("error_logs") || "[]");
  } catch {
    return [];
  }
};

/**
 * Clear error logs
 */
export const clearErrorLogs = () => {
  try {
    localStorage.removeItem("error_logs");
  } catch {
    // Ignore
  }
};
