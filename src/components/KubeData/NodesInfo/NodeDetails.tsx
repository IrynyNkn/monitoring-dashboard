import React, {useMemo} from 'react';
import {Badge, Descriptions, List, Typography} from 'antd';
import type { DescriptionsProps } from 'antd';
import dayjs from 'dayjs';

import {NodeInfoType} from '@/types/kube-data.ts';

type Props = {
  details: NodeInfoType;
};

const NodeDetails = ({ details }: Props) => {
  const detailsList: DescriptionsProps['items'] = useMemo(() => [
    {
      key: 'cpu_capacity',
      label: 'Cpu Capacity',
      children: details.cpu_capacity
    },
    {
      key: 'ip_address',
      label: 'IP Address',
      children: details.ip_address
    },
    {
      key: 'memory_capacity',
      label: 'Memory Capacity',
      children: details.memory_capacity
    },
    {
      key: 'os_image',
      label: 'OS image',
      children: details.os_image
    },
    {
      key: 'roles',
      label: 'Roles',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={details.roles}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>{item}</Typography.Text>
            </List.Item>
          )}
        />
      )
    },
    {
      key: 'created_at',
      label: 'Created At',
      children: dayjs(details.created_at).format('HH:mm:ss YYYY-MM-DD'),
    },
    {
      key: 'allocatable_cpu',
      label: 'Allocatable CPU',
      children: details.allocatable_cpu
    },
    {
      key: 'allocatable_memory',
      label: 'Allocatable Memory',
      children: details.allocatable_memory
    },
    {
      key: 'os_arch',
      label: 'OS arch',
      children: details.os_arch
    },
    {
      key: 'status',
      label: 'Status',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={Object.entries(details.status).map(([key, value]) => ({ title: `${key}: ${value}`, badge: value === 'True' ? 'processing': 'default' }))}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Badge status={(item.badge as never) || 'default'} />}
                title={item.title}
              />
            </List.Item>
          )}
        />
      ),
    },
  ], [details]);

  return (
    <Descriptions title={`${details.name} info`} layout="vertical" bordered items={detailsList} />
  );
};

export default NodeDetails;