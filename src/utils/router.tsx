import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

import ProtectedRoute from '@/layouts/ProtectedRoute.tsx';

import Home from '@/pages/Home';
import Ping from '@/pages/PingPage';
// import Dashboard from '@/pages/Dashboard';
import Monitors from '@/pages/Monitors';
import CreateMonitorPage from '@/pages/Monitors/CreateMonitor.tsx';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

// const router = createBrowserRouter([
//   {
//     path: '/ping',
//     element: <Ping />,
//   },
//   {
//     path: '/notifications',
//     element: <Dashboard />,
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<ProtectedRoute />}>
        <Route index element={<Home />} />
        <Route path="/ping" element={<Ping />} />
        <Route path="/monitors" element={<Monitors />} />
        <Route path="/monitors/create" element={<CreateMonitorPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);

export default router;