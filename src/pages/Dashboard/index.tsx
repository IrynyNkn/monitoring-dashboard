import React from 'react';
import {Flex, Space, Switch, Typography} from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';

import MainLayout from '@/layouts/MainLayout.tsx';
// import NodesTable from '@/components/Dashboard/NodesTable.tsx';
import PodsData from '@/components/Dashboard/PodsData.tsx';
import externalPingStore from '@/store/extPingStore.ts';
import PageTitle from '@/components/common/PageTitle';

const Dashboard = () => {
  const { externalPingEnabled, setExternalPingEnabled } = externalPingStore(s => s);

  return (
    <MainLayout>
      <Space direction={'vertical'}>
        <PageTitle>Dashboard</PageTitle>
        <Flex align={'center'} gap={20}>
          <Typography.Text style={{ fontSize: 15, fontWeight: 600 }}>Cluster external availability check</Typography.Text>
          <Switch
            checked={externalPingEnabled}
            onChange={(v) => setExternalPingEnabled(v)}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />
        </Flex>
        <Space direction={'vertical'}>
          <Typography.Title level={4}>Cluster Data</Typography.Title>
          {/*<Flex gap={20}>*/}
          {/*  <NodesTable />*/}
            <PodsData />
          {/*</Flex>*/}
        </Space>
      </Space>
    </MainLayout>
  );
};

export default Dashboard;