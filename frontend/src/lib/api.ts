import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5219";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 30000, // 30 second timeout
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  // Let browser set Content-Type automatically for FormData (multipart uploads)
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized — attempt token refresh
    if (error.response?.status === 401 && typeof window !== "undefined" && originalRequest) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken && !(originalRequest as any)._retry) {
        (originalRequest as any)._retry = true;
        try {
          const { data } = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
            refreshToken,
          });
          localStorage.setItem("token", data.token);
          localStorage.setItem("refreshToken", data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return api(originalRequest);
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          window.location.href = "/";
        }
      }
    }

    // Enhance error object with user-friendly messages
    const enhancedError: any = error;
    enhancedError.userMessage = getUserFriendlyMessage(error);
    enhancedError.isRetryable = isRetryableError(error);

    return Promise.reject(enhancedError);
  }
);

function getUserFriendlyMessage(error: AxiosError): string {
  // Network errors
  if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
    return "Unable to connect to the server. Check your internet connection and try again.";
  }

  // Timeout
  if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
    return "Request timed out. The server is taking too long to respond.";
  }

  // Rate limiting
  if (error.response?.status === 429) {
    return "Too many requests. Please wait a moment before trying again.";
  }

  // Server errors
  if (error.response?.status && error.response.status >= 500) {
    return "Something went wrong on our end. Our team has been notified.";
  }

  // Validation errors
  if (error.response?.status === 400) {
    const data: any = error.response.data;
    if (data?.message) return data.message;
    if (data?.errors) {
      const firstError = Object.values(data.errors)[0];
      if (Array.isArray(firstError)) return firstError[0] as string;
    }
    return "Invalid request. Please check your input and try again.";
  }

  // Forbidden
  if (error.response?.status === 403) {
    return "You don't have permission to perform this action.";
  }

  // Not found
  if (error.response?.status === 404) {
    return "The requested resource was not found.";
  }

  // Default fallback
  const data: any = error.response?.data;
  return data?.message || "An unexpected error occurred. Please try again.";
}

function isRetryableError(error: AxiosError): boolean {
  // Network errors and timeouts are retryable
  if (error.code === "ERR_NETWORK" || error.code === "ECONNABORTED") {
    return true;
  }

  // Server errors (5xx) are retryable
  if (error.response?.status && error.response.status >= 500) {
    return true;
  }

  // Rate limiting — user can retry after waiting
  if (error.response?.status === 429) {
    return true;
  }

  return false;
}

export default api;
