import React from 'react';
import {Breadcrumb, Space} from 'antd';
import {AimOutlined, HomeOutlined} from '@ant-design/icons';
import {useParams} from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout.tsx';
import PingHead from '@/components/Ping/PingHead';
import PingActions from '@/components/Ping/PingActions';
import StatisticCards from '@/components/Ping/StatisticCards';
import PingDurationLineChart from '@/components/Ping/PingDurationChart';
import {usePingMetricsById} from '@/hooks/ping-metrics.ts';

const PingPage = () => {
  const { pingId } = useParams<{pingId: string}>();
  const { data, isFetching } = usePingMetricsById(pingId || '');

  return (
    <MainLayout>
      <Space direction="vertical" size="middle" style={{width: '100%'}}>
        <Breadcrumb
          items={[
            {
              href: '/',
              title: <HomeOutlined />,
            },
            {
              href: '/icmp-pings',
              title: (
                <>
                  <AimOutlined />
                  <span>Icmp Pings</span>
                </>
              ),
            },
            {
              title: data?.metadata?.hostname || '',
            }
          ]}
        />
        <PingHead data={data} isFetching={isFetching} />
        <PingActions />
        <StatisticCards data={data} />
        <PingDurationLineChart data={data} />
      </Space>
    </MainLayout>
  );
};

export default PingPage;