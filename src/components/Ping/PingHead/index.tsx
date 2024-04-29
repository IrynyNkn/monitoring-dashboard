import React from 'react';
import {Flex, Typography} from 'antd';

import StatusIndicator from '@/components/StatusIndicator';
import useStyles from './styles.tsx';
import {usePingMetricsById} from '@/hooks/ping-metrics.ts';
import {pingId} from '@/utils/consts.ts';

const { Title, Text } = Typography;

const PingHead = () => {
  const { styles, theme } = useStyles();
  const { data } = usePingMetricsById(pingId);

  const isUp = data?.metrics?.[data?.metrics?.length - 1]?.status === 'success';

  return (
    <Flex align="center" gap="middle" className={styles.wrap}>
      <StatusIndicator isUp={isUp} />
      <div>
        <Title className={styles.title}>{data?.metadata?.hostname || '--'}</Title>
        <Flex gap="middle">
          <Text
            className={styles.indicatorText}
            style={{ color: isUp ? theme.colorSuccess : theme.colorError }}
          >{isUp ? 'Up' : 'Down'}</Text>
          <Text className={styles.infoText}>Checked every 30 min</Text>
        </Flex>
      </div>
    </Flex>
  );
};

export default PingHead;