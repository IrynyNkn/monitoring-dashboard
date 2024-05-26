import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {Badge, Descriptions, DescriptionsProps, List, Typography} from 'antd';
import dayjs from 'dayjs';

import {PodInfoType} from '@/types/kube-data.ts';

type Props = {
  details: PodInfoType;
};

const PodDetails = ({ details }: Props) => {
  const detailsList: DescriptionsProps['items'] = useMemo(() => [
    {
      key: 'name',
      label: 'Name',
      children: details.name
    },
    {
      key: 'node_name',
      label: 'Node Name',
      children: details.node_name
    },
    {
      key: 'namespace',
      label: 'Namespace',
      children: details.namespace
    },
    {
      key: 'status',
      label: 'Status',
      children: details.status
    },
    {
      key: 'ip',
      label: 'IP',
      children: details.ip
    },
    {
      key: 'created_at',
      label: 'Created At',
      children: dayjs(details.created_at).format('HH:mm:ss YYYY-MM-DD'),
    },
    {
      key: 'containers',
      label: 'Containers',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={details.containers}
          renderItem={(item) => (
            <List.Item style={{flexDirection: 'column'}}>
              <List.Item.Meta
                style={{width: '100%'}}
                avatar={<Badge status={item.ready ? 'success' : 'warning'} />}
                title={<Link to={`/kube-metrics/${item.name}`}>{item.name}</Link>}
              />
              <div style={{width: '100%', marginTop: 10}}>
                <Typography>
                  <b>Image:</b> {item.image}
                  <br />
                  <b>Ready:</b> {item.ready.toString()}
                  <br />
                  <b>Restart Count:</b> {item.restart_count}
                  <br />
                  <b>State:</b> {Object.keys(item.state)?.[0]}
                </Typography>
              </div>
            </List.Item>
          )}
        />
      ),
    }
  ], [details]);
  return (
    <Descriptions title={`${details.name} info`} layout="vertical" bordered items={detailsList} />
  );
};

export default PodDetails;