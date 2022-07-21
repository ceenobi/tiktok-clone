import React from 'react';
import { useRoutes } from 'react-router-dom';
import {
  Dashboard,
  UserAuthPage,
  ResetPassword,
  Profile,
  Search,
  Details,
  Topic
} from '../pages';
import ProtectedRoute from './ProtectedRoute';

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
