import React from 'react';
import {Flex, Typography} from 'antd';

import StatusIndicator from '@/components/StatusIndicator';
import {PingMetricsResponseType} from '@/types/ping.ts';

import useStyles from './styles.tsx';

const { Title, Text } = Typography;

type Props = {
  data: PingMetricsResponseType | undefined;
  isFetching: boolean;
};

const PingHead = ({ data, isFetching }: Props) => {
  const { styles, theme } = useStyles();

  const isUp = data?.metrics?.[data?.metrics?.length - 1]?.status === 'success';

  return (
    <Flex align="center" gap="middle" className={styles.wrap}>
      <StatusIndicator isUp={isUp} isFetching={isFetching} />
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