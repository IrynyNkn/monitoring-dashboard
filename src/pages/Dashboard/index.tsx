import React from 'react';
import {Space, Typography} from 'antd';
import MainLayout from '@/layouts/MainLayout.tsx';
// import NodesTable from '@/components/Dashboard/NodesTable.tsx';
import PodsData from '@/components/Dashboard/PodsData.tsx';

const Dashboard = () => {
  return (
    <MainLayout>
      <Space direction={'vertical'}>
        <Typography.Title level={2}>Dashboard</Typography.Title>
        {/*<Flex gap={20}>*/}
        {/*  <NodesTable />*/}
          <PodsData />
        {/*</Flex>*/}
      </Space>
    </MainLayout>
  );
};

export default Dashboard;