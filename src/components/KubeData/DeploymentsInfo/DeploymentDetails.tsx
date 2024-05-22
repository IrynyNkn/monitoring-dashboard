import React, {useMemo} from 'react';
import {Descriptions, DescriptionsProps, List, Space, Typography} from 'antd';
import dayjs from 'dayjs';

import {DeploymentInfoType} from '@/types/kube-data.ts';

type Props = {
  details: DeploymentInfoType;
};

const DeploymentDetails = ({ details }: Props) => {
  const detailsList: DescriptionsProps['items'] = useMemo(() => [
    {
      key: 'namespace',
      label: 'Namespace',
      children: details.namespace,
    },
    {
      key: 'available_replicas',
      label: 'Available Replicas',
      children: details.available_replicas,
    },
    {
      key: 'replicas',
      label: 'Replicas',
      children: details.replicas,
    },
    {
      key: 'created_at',
      label: 'Created At',
      children: dayjs(details.created_at).format('HH:mm:ss YYYY-MM-DD'),
    },
    {
      key: 'labels',
      label: 'Labels',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={Object.entries(details.labels).map(([key, value]) => ({ item: `${key}: ${value}`}))}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.item}
              />
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'selector',
      label: 'Selector',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={Object.entries(details.selector).map(([key, value]) => ({ item: `${key}: ${value}`}))}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.item}
              />
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'conditions',
      label: 'Conditions',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={details.conditions.map((c) => ({ condition: c}))}
          renderItem={(item) => (
            <List.Item>
              <Space direction="vertical">
                <Typography.Text>Type: {item.condition.type}</Typography.Text>
                <Typography.Text>Reason: {item.condition.reason}</Typography.Text>
                <Typography.Text>Status: {item.condition.status}</Typography.Text>
              </Space>
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

export default DeploymentDetails;