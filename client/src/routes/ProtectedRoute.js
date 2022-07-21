import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const useAuth = () => {
  const userInfo = window.localStorage.getItem('user');
  if (userInfo) {
    return true;
  } else {
    return false;
  }
};

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const auth = useAuth();

  if (
    location.pathname === '/auth' ||
    location.pathname === '/forgot-password' ||
    location.pathname === '/reset-password'
  ) {
    return auth ? (
      <Navigate to={location.state?.from ?? '/'} />
    ) : (
      children
    );
  }
  return (
    <>
      {auth ? children : <Navigate to={'/auth'} state={{ from: location }} />}
    </>
  );
}
