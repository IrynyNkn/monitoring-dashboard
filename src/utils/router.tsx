import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

import ProtectedRoute from '@/layouts/ProtectedRoute.tsx';

import Ping from '@/pages/PingPage';
// import Monitors from '@/pages/Monitors';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import IcmpPings from '@/pages/PingsPage/IcmpPings.tsx';
import KubeDataPage from '@/pages/KubeDataPage';
import KubeMetricsPage from '@/pages/KubeMetricsPage';
import NotificationsPage from '@/pages/Notifications';
import HealthChecksPage from '@/pages/HealthChecksPage';
import HealthCheckPage from '@/pages/HealthCheckPage';
import Dashboard from '@/pages/Dashboard';
import ExternalPingPage from '@/pages/ExternalPingPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        {/*<Route path="/monitors" element={<Monitors />} />*/}
        <Route path="/kube-data" element={<KubeDataPage />} />
        <Route path="/alerts" element={<NotificationsPage />} />
        <Route path="/kube-metrics/:containerName" element={<KubeMetricsPage />} />
        <Route path="/icmp-pings" element={<IcmpPings />} />
        <Route path="/http-health-checks" element={<HealthChecksPage />} />
        <Route path="/external-ping" element={<ExternalPingPage />} />
        <Route
          path="/ping/:pingId"
          element={<Ping />} />
        <Route
          path="/http-health-check/:healthCheckId"
          element={<HealthCheckPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);

export default router;