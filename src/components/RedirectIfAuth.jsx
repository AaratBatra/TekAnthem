import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectIfAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    // Redirect authenticated users to /dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RedirectIfAuth;
