import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@shared/api';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  requireAuth = true
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but trying to access login/register
  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/" replace />;
  }

  // If specific roles are required
  if (allowedRoles && user && !allowedRoles.includes(user.role as UserRole)) {
    // Redirect to appropriate dashboard or home
    if (user.role === 'ADMIN') {
      return <Navigate to="/dashboard/admin" replace />;
    } else if (user.role === 'SALON_OWNER') {
      return <Navigate to="/dashboard/owner" replace />;
    } else if (user.role === 'CUSTOMER') {
      return <Navigate to="/dashboard/customer" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
