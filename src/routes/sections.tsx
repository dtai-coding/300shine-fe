import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { HomeLayout } from 'src/layouts/home'; 
import { DashboardLayout } from 'src/layouts/dashboard';
import { StaffLayout } from 'src/layouts/staff';
import AxiosInterceptor from 'src/api/axiosInterceptor';
import ProtectedRoute from '../stores/auth/protected.route'; // Path to your ProtectedRoute component


// Lazy imports for pages
const Dashboard = lazy(() => import('src/pages/dashboard'));
const Staff = lazy(() => import('src/pages/staff'));
const HomePage = lazy(() => import('src/pages/home'));
const AppointmentPage = lazy(() => import('src/pages/appointment'));
const SelectSalonPage = lazy(() => import('src/pages/select-salon'));
const BlogPage = lazy(() => import('src/pages/blog'));
const UserPage = lazy(() => import('src/pages/user'));
const SignInPage = lazy(() => import('src/pages/sign-in'));
const SignUpPage = lazy(() => import('src/pages/sign-up'));
const ProductsPage = lazy(() => import('src/pages/products'));
const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      path: '',
      element: <AxiosInterceptor />,
      children: [ 
    {
      element: (
        <HomeLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </HomeLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'appointment', element: <AppointmentPage /> },
        { path: 'select-salon', element: <SelectSalonPage /> },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      ),
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute allowedRoles={['admin']}>
          <DashboardLayout>
            <Suspense fallback={renderFallback}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { path: '', element: <Dashboard /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'staff',
      element: (
        <ProtectedRoute allowedRoles={['staff']}>
          <StaffLayout>
            <Suspense fallback={renderFallback}>
              <Outlet />
            </Suspense>
          </StaffLayout>
        </ProtectedRoute>
      ),
      children: [
        { path: '', element: <Staff /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ],
},
]);
}
