"use client";

// React
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Local imports
import api from "@/lib/api";
import { User, AuthResponse } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    try {
      const parsedUser = JSON.parse(storedUser) as User;
      parsedUser.level = Math.floor(Math.sqrt((parsedUser.totalXP || 0) / 10)) + 1;
      return parsedUser;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      const userWithLevel = {
        ...data.user,
        level: Math.floor(Math.sqrt((data.user.totalXP || 0) / 10)) + 1
      };
      localStorage.setItem("user", JSON.stringify(userWithLevel));
      setUser(userWithLevel);
    } catch (error: unknown) {
      // Re-throw with enhanced error message from api.ts interceptor
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      const userWithLevel = {
        ...data.user,
        level: Math.floor(Math.sqrt((data.user.totalXP || 0) / 10)) + 1
      };
      localStorage.setItem("user", JSON.stringify(userWithLevel));
      setUser(userWithLevel);
    } catch (error: unknown) {
      // Re-throw with enhanced error message from api.ts interceptor
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    const userWithLevel = {
      ...updatedUser,
      level: Math.floor(Math.sqrt((updatedUser.totalXP || 0) / 10)) + 1
    };
    localStorage.setItem("user", JSON.stringify(userWithLevel));
    setUser(userWithLevel);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
