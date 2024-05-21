import React, {useEffect, useMemo, useState} from 'react';

import PageTitle from '@/components/common/PageTitle';
import MainLayout from '@/layouts/MainLayout.tsx';
import CreateHcModal from '@/components/HealthChecks/CreateHCModal.tsx';
import useWithAuth from '@/hooks/useWithAuth.ts';
import {deleteHealthCheck, getHealthChecksList} from '@/queries/health-check-config.ts';
import {HealthCheckDataType} from '@/types/ping.ts';
import {Badge, Button, Space, Table, TableProps} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {useQueryClient} from '@tanstack/react-query';
import {createAuthFetch} from '@/queries/auth.ts';

const HealthChecksPage = () => {
  const navigate = useNavigate();
  const authFetch = createAuthFetch(navigate);
  const queryClient = useQueryClient();

  const { data, error, isFetching } = useWithAuth({
    queryKey: ['health_checks'],
    queryFn: () => getHealthChecksList(),
    placeholderData: { health_checks: [] },
    select: (d) => d?.['health_checks'] ?? [],
    staleTime: 5 * 60 * 1000, // 5 minute
  });
  const [healthChecksToDraw, setHealthChecksToDraw] = useState<HealthCheckDataType[]>([]);

  const onDeletePing = async (id: string) => {
    const r = await deleteHealthCheck(id, authFetch);
    if (r?.status === 'cancelled') {
      await queryClient.invalidateQueries({ queryKey: ['health_checks'] });
    }
  };

  useEffect(() => {
    setHealthChecksToDraw((data || []).map((p, idx) => ({
      ...p,
      key: `${idx}-${p.endpoint_url}`
    })));
  }, [data]);

  const columns: TableProps<HealthCheckDataType>['columns'] = useMemo(() => [
    {
      title: 'Endpoint URL',
      dataIndex: 'endpoint',
      key: 'endpoint',
      render: (_, p) => <Link to={`/http-health-check/${p.id}`}>{p.endpoint_url}</Link>,
    },
    {
      title: 'Check Interval',
      dataIndex: 'interval',
      key: 'interval',
      render: (_, p) => <p>{p.interval} seconds</p>,
    },
    {
      title: 'Status',
      dataIndex: 'is_paused',
      key: 'is_paused',
      render: (_, p) => (
        <Badge
          text={p.is_paused ? 'paused' : 'running'}
          color={p.is_paused ? 'red' : 'green'}
          size="default"
        />
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, p) => (
        <Space size="middle">
          <Link to={`/http-health-check/${p.id}`}><Button type="text">View health checks data</Button></Link>
          <Button type="text" danger onClick={() => onDeletePing(p.id)}>Delete</Button>
        </Space>
      ),
    },
  ], []);

  return (
    <MainLayout>
      <PageTitle>HTTP Health Checks</PageTitle>
      <CreateHcModal />
      <Table
        columns={columns}
        dataSource={healthChecksToDraw}
      />
    </MainLayout>
  );
};

export default HealthChecksPage;