import React from 'react';
import {Flex, Button} from 'antd';
import {PauseCircleOutlined, DeleteOutlined, ReloadOutlined, EditOutlined} from '@ant-design/icons';

import {usePingMetricsById} from '@/hooks/ping-metrics.ts';

const pingId = 'd4546a4ce2124eabb1951930d04235fa';

const PingActions = () => {
  const { refetch, isFetching } = usePingMetricsById(pingId);

  return (
    <Flex gap="small">
      <Button
        type="text"
        icon={<ReloadOutlined />}
        onClick={() => refetch()}
        loading={isFetching}
      >Refresh Data</Button>
      <Button
        type="text"
        icon={<PauseCircleOutlined />}
      >Pause this monitor</Button>
      <Button
        type="text"
        icon={<EditOutlined />}
      >Edit</Button>
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
      >Delete</Button>
    </Flex>
  );
};

export default PingActions;