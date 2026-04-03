import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/lib/constants";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "owner";
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

/**
 * Hook to manage authentication state
 * Stores auth data in localStorage for persistence
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth on mount
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.authToken);
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data");
        localStorage.removeItem(STORAGE_KEYS.authToken);
        localStorage.removeItem("userData");
      }
    }

    setLoading(false);
  }, []);

  const login = (newUser: User, token: string) => {
    localStorage.setItem(STORAGE_KEYS.authToken, token);
    localStorage.setItem(STORAGE_KEYS.userId, newUser.id);
    localStorage.setItem(STORAGE_KEYS.userRole, newUser.role);
    localStorage.setItem("userData", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.authToken);
    localStorage.removeItem(STORAGE_KEYS.userId);
    localStorage.removeItem(STORAGE_KEYS.userRole);
    localStorage.removeItem("userData");
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}

/**
 * Hook to get the authentication token
 */
export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.authToken);
    setToken(storedToken);
  }, []);

  return token;
}

/**
 * Hook to check if user has specific role
 */
export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem(STORAGE_KEYS.userRole);
    setRole(storedRole);
  }, []);

  return role;
}

/**
 * Hook to require authentication
 * Redirects to auth page if not authenticated
 */
export function useRequireAuth() {
  const { isAuthenticated, loading } = useAuth();
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = "/auth";
    } else if (!loading) {
      setCanAccess(true);
    }
  }, [isAuthenticated, loading]);

  return { canAccess, loading };
}

/**
 * Hook to require specific role
 */
export function useRequireRole(requiredRole: "student" | "owner") {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.role !== requiredRole)) {
      window.location.href = "/auth?role=" + requiredRole;
    }
  }, [user, loading, requiredRole]);

  return { hasAccess: user?.role === requiredRole, loading };
}
