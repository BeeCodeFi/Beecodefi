/**
 * Standardized hook for making API calls with consistent error handling
 * Uses enhanced AxiosError properties from api.ts (userMessage, isRetryable)
 */
import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { useToast } from "@/context/ToastContext";

interface EnhancedAxiosError extends AxiosError {
  userMessage?: string;
  isRetryable?: boolean;
}

interface ApiCallState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface ApiCallReturn<T> extends ApiCallState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

/**
 * Hook for making API calls with consistent error handling and loading states
 * 
 * @param apiFunc - Async function that makes the API call
 * @param options - Configuration options
 * @returns Object with data, loading, error states and execute function
 * 
 * @example
 * const { data, loading, error, execute } = useApiCall(
 *   (userId: number) => api.get(`/user/${userId}`),
 *   { showToast: true }
 * );
 */
export function useApiCall<T>(
  apiFunc: (...args: any[]) => Promise<any>,
  options: {
    showToast?: boolean;
    toastOnSuccess?: string;
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
  } = {}
): ApiCallReturn<T> {
  const [state, setState] = useState<ApiCallState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  const toast = useToast();

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await apiFunc(...args);
        const data = response.data || response;

        setState({ data, loading: false, error: null });

        if (options.toastOnSuccess && options.showToast !== false) {
          toast.success(options.toastOnSuccess);
        }

        if (options.onSuccess) {
          options.onSuccess(data);
        }

        return data;
      } catch (err: unknown) {
        const enhancedError = err as EnhancedAxiosError;
        const errorMessage =
          enhancedError.userMessage ||
          enhancedError.message ||
          "An unexpected error occurred";

        setState({ data: null, loading: false, error: errorMessage });

        if (options.showToast !== false) {
          toast.error("Error", errorMessage);
        }

        if (options.onError) {
          options.onError(errorMessage);
        }

        return null;
      }
    },
    [apiFunc, options, toast]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
