/* eslint-disable react/prop-types */
import type { ReactNode } from 'react';

import { Outlet, Navigate } from 'react-router-dom';

import { useAuthStore } from 'src/stores/auth/auth.store'; // Adjust the path as necessary

interface ProtectedRouteProps {
  allowedRoles: string[];
  children?: ReactNode; // To support wrapping components
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { auth } = useAuthStore();

  if (!auth.user) {
    // Not logged in, redirect to sign-in
    return <Navigate to="/sign-in" replace />;
  }

  if (!allowedRoles.includes(auth.user.roleName)) {
    // If the user role is not allowed, redirect to a forbidden page or homepage
    return <Navigate to="/forbidden" replace />; // Or some other "forbidden" page
  }

  // If children exist, render them; otherwise, render Outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
