import React, {useEffect, useState} from 'react';
import {Button, Space, Table, type TableProps, Badge} from 'antd';
import {Link} from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout.tsx';
import PageTitle from '@/components/common/PageTitle';
import CreatePingModal from '@/components/Monitors/CreatePingModal.tsx';
import useWithAuth from '@/hooks/useWithAuth.ts';
import {getIcmpPingList} from '@/queries/ping-config.ts';
import {PingItemDataType} from '@/types/ping.ts';

const columns: TableProps<PingItemDataType>['columns'] = [
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
        <Button type="text" href={`/ping/${p.id}`}>Go to ping</Button>
        <Button type="text" danger>Delete</Button>
      </Space>
    ),
  },
];

const Monitors = () => {
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

  return (
    <MainLayout>
      <PageTitle>Monitors</PageTitle>
      <CreatePingModal />
      <Table
        columns={columns}
        dataSource={pingsToDraw}
      />
    </MainLayout>
  );
};

export default Monitors;