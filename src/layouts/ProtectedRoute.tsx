import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import authStore from '@/store/authStore.ts';

const ProtectedRoute = () => {
  const token = authStore(s => s.token);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;