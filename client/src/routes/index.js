import React from 'react';
import { useRoutes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
const Profile = React.lazy(() => import('../pages/Profile'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const UserAuthPage = React.lazy(() => import('../pages/UserAuthPage'));
const Search = React.lazy(() => import('../pages/Search'));
const Details = React.lazy(() => import('../pages/Details'));
const Topic = React.lazy(() => import('../pages/Topic'));
const ResetPassword = React.lazy(() => import('../pages/ResetPassword'));

export default function Routes() {
  let element = useRoutes([
    { path: 'search', element: <Search /> },
    {
      path: 'reset-password',
      element: (
        <ProtectedRoute>
          <ResetPassword />
        </ProtectedRoute>
      ),
    },
    {
      path: 'auth',
      element: (
        <ProtectedRoute>
          <UserAuthPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: '/*',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: 'profile/:profileId',
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: 'detail/:detailId',
      element: (
        <ProtectedRoute>
          <Details />
        </ProtectedRoute>
      ),
    },
    {
      path: 'topic/:topicId',
      element: (
        <ProtectedRoute>
          <Topic />
        </ProtectedRoute>
      ),
    },
  ]);
  return element;
}
