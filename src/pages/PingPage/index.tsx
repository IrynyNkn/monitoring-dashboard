import React from 'react';
import {Breadcrumb, Space, Alert} from 'antd';
import {AimOutlined, HomeOutlined} from '@ant-design/icons';
import {useParams} from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout.tsx';
import PingHead from '@/components/Ping/PingHead';
import PingActions from '@/components/Ping/PingActions';
import StatisticCards from '@/components/Ping/StatisticCards';
import PingDurationLineChart from '@/components/Ping/PingDurationChart';
import useWithAuth from '@/hooks/useWithAuth.ts';
import {fetchMetricsByPingId} from '@/queries/ping-config.ts';
import {PingMetricsResponseType} from '@/types/ping.ts';

const PingPage = () => {
  const { pingId } = useParams<{pingId: string}>();
  const { data, isFetching, refetch } = useWithAuth<PingMetricsResponseType, PingMetricsResponseType>({
    queryKey: ['pingMetrics', pingId],
    queryFn: () => fetchMetricsByPingId(pingId as string),
    staleTime: 1 * 60 * 1000,
  });

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
        {data?.metadata?.is_paused && <Alert message="Ping is paused" type="warning" showIcon />}
        <PingHead
          icmp_pings_data={data}
          isFetching={isFetching}
          dataType={'ICMP_PINGS'}
        />
        <PingActions
          refetch={refetch}
          isFetching={isFetching}
          pingIsPaused={data?.metadata?.is_paused || false}
        />
        <StatisticCards data={data} />
        <PingDurationLineChart data={data} />
      </Space>
    </MainLayout>
  );
};

export default PingPage;