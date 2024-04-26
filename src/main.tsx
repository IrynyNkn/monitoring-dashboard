import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import config from './utils/theme.ts';

// pages
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import Ping from '@/pages/PingPage';
import MonitorsPage from '@/pages/Monitors';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/cluster-data',
    element: <Home />,
  },
  {
    path: '/ping',
    element: <Ping />,
  },
  {
    path: '/notifications',
    element: <Dashboard />,
  },
  {
    path: '/monitors',
    element: <MonitorsPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={config}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
