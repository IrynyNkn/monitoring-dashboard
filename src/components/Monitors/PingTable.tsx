import React from 'react';
import { Link } from 'react-router-dom'
import { Space, Table, Button } from 'antd';
import type { TableProps } from 'antd';
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
    // render: (_, p) => <Link to={`/ping/${p.hostname}`}>{p.hostname}</Link>,
  },
  {
    title: 'Currently running',
    dataIndex: 'is_paused',
    key: 'is_paused',
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

const data: PingItemDataType[] = [];

const PingTable = () => {
  return (
    <Table columns={columns} dataSource={data} />
  );
};

export default PingTable;