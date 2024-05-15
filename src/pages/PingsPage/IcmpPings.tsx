import React, {useEffect, useMemo, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Badge, Button, Space, Table, type TableProps} from 'antd';

import {PingItemDataType} from '@/types/ping.ts';
import useWithAuth from '@/hooks/useWithAuth.ts';
import {deleteIcmpPing, getIcmpPingList} from '@/queries/ping-config.ts';
import MainLayout from '@/layouts/MainLayout.tsx';
import PageTitle from '@/components/common/PageTitle';
import CreatePingModal from '@/components/Monitors/CreatePingModal.tsx';
import {createAuthFetch} from '@/queries/auth.ts';
import {useQueryClient} from '@tanstack/react-query';

const IcmpPings = () => {
  const navigate = useNavigate();
  const authFetch = createAuthFetch(navigate);
  const queryClient = useQueryClient();
  const { data, error, isFetching } = useWithAuth({
    queryKey: ['icmp_pings'],
    queryFn: () => getIcmpPingList(),
    placeholderData: { icmp_pings: [] },
    select: (d) => d?.['icmp_pings'] ?? [],
    staleTime: 5 * 60 * 1000, // 5 minute
  });
  const [pingsToDraw, setPingsToDraw] = useState(data);

  useEffect(() => {
    setPingsToDraw((data || []).map((p, idx) => ({
      ...p,
      key: `${idx}-${p.host}`
    })));
  }, [data]);

  const onDeletePing = async (id: string) => {
    const r = await deleteIcmpPing(id, authFetch);
    if (r?.status === 'cancelled') {
      await queryClient.invalidateQueries({ queryKey: ['icmp_pings'] });
    }
  };

  const columns: TableProps<PingItemDataType>['columns'] = useMemo(() => [
    {
      title: 'Hostname',
      dataIndex: 'hostname',
      key: 'hostname',
      render: (_, p) => <Link to={`/ping/${p.id}`}>{p.host}</Link>,
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
          <Link to={`/ping/${p.id}`}><Button type="text">Go to ping</Button></Link>
          <Button type="text" danger onClick={() => onDeletePing(p.id)}>Delete</Button>
        </Space>
      ),
    },
  ], []);

  return (
    <MainLayout>
      <PageTitle>ICMP Pings</PageTitle>
      <CreatePingModal />
      <Table
        columns={columns}
        dataSource={pingsToDraw}
      />
    </MainLayout>
  );
};

export default IcmpPings;