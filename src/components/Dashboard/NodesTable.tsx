import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import {Button, Flex, Space, Table, TableProps, Typography} from 'antd';

import useWithAuth from '@/hooks/useWithAuth.ts';
import {getNodesInfo} from '@/queries/kube-data.ts';
import {NodeInfoType} from '@/types/kube-data.ts';

const columns: TableProps<NodeInfoType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, n) => <p>{n.name}</p>,
  },
  {
    title: 'IP Address',
    dataIndex: 'ip_address',
    key: 'ip_address',
    render: (_, n) => <p>{n.ip_address}</p>,
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (_, n) => <p>{dayjs(n.created_at).format('HH:mm:ss YYYY-MM-DD')}</p>,
  },
];

const NodesTable = () => {
  const { data, error, isFetching } = useWithAuth({
    queryKey: ['nodes-data'],
    queryFn: () => getNodesInfo(),
    placeholderData: { nodes: [] },
    select: (d) => d?.['nodes'] ?? [],
    staleTime: 1 * 60 * 1000,
  });
  const [nodesToDraw, setNodesToDraw] = useState<NodeInfoType[]>([]);

  useEffect(() => {
    setNodesToDraw(data?.map((n, idx) => ({...n, key: idx})) || []);
  }, [data]);

  return (
    <Space direction={'vertical'}>
      <Flex justify="space-between" align="center">
        <Typography.Title level={5} style={{ margin: 0 }}>Nodes</Typography.Title>
        <Link to="/kube-data"><Button>View More</Button></Link>
      </Flex>
      <Table
        columns={columns}
        dataSource={nodesToDraw}
        pagination={false}
      />
    </Space>
  );
};

export default NodesTable;