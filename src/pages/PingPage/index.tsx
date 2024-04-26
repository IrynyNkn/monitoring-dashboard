import React from 'react';
import {Button, Space} from 'antd';
import {LeftOutlined} from '@ant-design/icons';

import MainLayout from '@/layouts/MainLayout.tsx';

import PingHead from '@/components/Ping/PingHead';
import PingActions from '@/components/Ping/PingActions';
import StatisticCards from '@/components/Ping/StatisticCards';
import PingDurationLineChart from '@/components/Ping/PingDurationChart';

const PingPage = () => {
  // const { data, error, isFetching } = usePingMetricsById(pingId);

  return (
    <MainLayout>
      <Space direction="vertical" size="middle" style={{width: '100%'}}>
        <Button
          href="/"
          type="link"
          icon={<LeftOutlined />}
        >Home</Button>
        <PingHead />
        <PingActions />
        <StatisticCards />
        <PingDurationLineChart />
      </Space>
    </MainLayout>
  );
};

export default PingPage;