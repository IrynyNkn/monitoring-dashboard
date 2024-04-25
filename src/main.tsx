import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { ConfigProvider } from 'antd';

import config from './utils/theme.ts';

// pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

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
    element: <Dashboard />,
  },
  {
    path: '/notifications',
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={config}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
);
