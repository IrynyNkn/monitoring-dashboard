import React from 'react';
import {useParams} from 'react-router-dom';
import {Breadcrumb, Space, Typography} from 'antd';
import {KubernetesOutlined, HomeOutlined} from '@ant-design/icons';

import MainLayout from '@/layouts/MainLayout.tsx';
import useWithAuth from '@/hooks/useWithAuth.ts';
import {getContainerMetrics} from '@/queries/kube-data.ts';
import KubeMetricsChart from '@/components/KubeData/KubeMetricsChart';

const KubeMetricsPage = () => {
  const { containerName} = useParams<{containerName: string}>();
  const { data, error, isFetching } = useWithAuth({
    queryKey: ['container-metrics', containerName],
    queryFn: () => getContainerMetrics(containerName as string),
    placeholderData: { container_metrics: [] },
    select: (d) => d?.['container_metrics'] ?? [],
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
                  <KubernetesOutlined />
                  <span>Cluster Data</span>
                </>
              ),
            },
            {
              title: containerName,
            }
          ]}
        />
        <Typography.Title level={2}>{containerName}</Typography.Title>
        <KubeMetricsChart data={data || []} />
      </Space>
    </MainLayout>
  );
};

export default KubeMetricsPage;