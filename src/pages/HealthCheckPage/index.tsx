import React from 'react';
import {Breadcrumb, Space} from 'antd';
import {AimOutlined, HomeOutlined} from '@ant-design/icons';
import {useParams} from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout.tsx';
import useWithAuth from '@/hooks/useWithAuth.ts';
import {fetchMetricsByHealthCheckId} from '@/queries/health-check-config.ts';
import {HealthCheckMetricsResponseType} from '@/types/ping.ts';
import PingHead from '@/components/Ping/PingHead';
import HealthCheckActions from '@/components/HealthChecks/HealthCheckActions.tsx';
import StatisticCards from '@/components/Ping/StatisticCards';
import PingDurationLineChart from '@/components/Ping/PingDurationChart';

const HealthCheckPage = () => {
  const { healthCheckId } = useParams<{healthCheckId: string}>();
  const { data, isFetching, refetch } = useWithAuth<HealthCheckMetricsResponseType, HealthCheckMetricsResponseType>({
    queryKey: ['health_check_metrics', healthCheckId],
    queryFn: () => fetchMetricsByHealthCheckId(healthCheckId as string),
    select: (d) => d,
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
              href: '/http-health-checks',
              title: (
                <>
                  <AimOutlined />
                  <span>Health Checks</span>
                </>
              ),
            },
            {
              title: data?.metadata?.endpoint_url || ''
            }
          ]}
        />
        <PingHead
          health_checks_data={data}
          isFetching={isFetching}
          dataType={'HEALTH_CHECKS'}
        />
        <HealthCheckActions refetch={refetch} isFetching={isFetching} />
        <StatisticCards data={data} />
        <PingDurationLineChart data={data} />
      </Space>
    </MainLayout>
  );
};

export default HealthCheckPage;