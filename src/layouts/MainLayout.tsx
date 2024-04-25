import React from 'react';
import { Layout } from 'antd';

import Sidebar from './Sidebar';
import Header from './Header';

const { Content } = Layout;

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout hasSider={true}>
        <Sidebar />
        <Content style={{ padding: 16 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;