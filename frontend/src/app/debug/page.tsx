"use client";

import { useState, useEffect } from "react";
import { getErrorLogs, clearErrorLogs } from "@/lib/errorTracking";
import { AlertTriangle, Trash2, Info } from "lucide-react";

export default function DebugPage() {
  const [errors, setErrors] = useState<any[]>([]);
  const [systemInfo, setSystemInfo] = useState<any>({});

  useEffect(() => {
    // Load error logs
    setErrors(getErrorLogs());

    // Collect system info
    setSystemInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      online: navigator.onLine,
      cookiesEnabled: navigator.cookieEnabled,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      url: window.location.href,
    });
  }, []);

  const handleClear = () => {
    clearErrorLogs();
    setErrors([]);
  };

  // Only show in development
  if (process.env.NODE_ENV === "production") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Debug Page</h1>
          <p className="text-gray-600">Not available in production</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Debug Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Development monitoring and error tracking
          </p>
        </div>

        {/* System Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              System Information
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {Object.entries(systemInfo).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[140px]">
                  {key}:
                </span>
                <span className="text-gray-600 dark:text-gray-400 break-all">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Error Logs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Error Logs ({errors.length})
              </h2>
            </div>
            {errors.length > 0 && (
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear Logs
              </button>
            )}
          </div>

          {errors.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No errors logged yet
            </div>
          ) : (
            <div className="space-y-4">
              {errors.map((error, index) => (
                <details
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                    {error.message}
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      {new Date(error.timestamp).toLocaleString()}
                    </span>
                  </summary>
                  <div className="mt-3 space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        URL:
                      </span>{" "}
                      <span className="text-gray-600 dark:text-gray-400 break-all">
                        {error.url}
                      </span>
                    </div>
                    {error.stack && (
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300 block mb-1">
                          Stack Trace:
                        </span>
                        <pre className="bg-gray-100 dark:bg-gray-900 rounded p-3 overflow-x-auto text-xs text-gray-800 dark:text-gray-200">
                          {error.stack}
                        </pre>
                      </div>
                    )}
                    {error.componentStack && (
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300 block mb-1">
                          Component Stack:
                        </span>
                        <pre className="bg-gray-100 dark:bg-gray-900 rounded p-3 overflow-x-auto text-xs text-gray-800 dark:text-gray-200">
                          {error.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
