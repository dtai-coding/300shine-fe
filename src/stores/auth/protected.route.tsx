/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuthStore } from 'src/stores/auth/auth.store'; // Adjust the path as necessary

interface ProtectedRouteProps {
  allowedRoles: string[];
  children?: ReactNode; // Add this to support children inside ProtectedRoute
}
// eslint-disable-next-line react/prop-types
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { auth } = useAuthStore();

  if (!auth.user) {
    // Not logged in, redirect to sign-in
    return <Navigate to="/sign-in" replace />;
  }

  if (!allowedRoles.includes(auth.user.role)) {
    // If the user role is not allowed, redirect to a forbidden page or homepage
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;