import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "student" | "owner";
}

/**
 * Component to protect routes that require authentication
 */
export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-r-transparent rounded-full animate-spin mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/auth${requiredRole ? `?role=${requiredRole}` : ""}`} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={`/auth?role=${requiredRole}`} replace />;
  }

  return <>{children}</>;
}
