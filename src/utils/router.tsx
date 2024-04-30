import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

import ProtectedRoute from '@/layouts/ProtectedRoute.tsx';

import Home from '@/pages/Home';
import Ping from '@/pages/PingPage';
import Monitors from '@/pages/Monitors';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import IcmpPings from '@/pages/PingsPage/IcmpPings.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<ProtectedRoute />}>
        <Route index element={<Home />} />
        <Route path="/monitors" element={<Monitors />} />
        <Route path="/icmp-pings" element={<IcmpPings />} />
        <Route path="/http-pings" element={<IcmpPings />} />
        <Route
          path="/ping/:pingId"
          element={<Ping />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);

export default router;