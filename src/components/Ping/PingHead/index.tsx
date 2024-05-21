import React from 'react';
import {Flex, Typography} from 'antd';

import StatusIndicator from '@/components/common/StatusIndicator';
import {HealthCheckMetricsResponseType, PingMetricsResponseType} from '@/types/ping.ts';

import useStyles from './styles.tsx';

const { Title, Text } = Typography;

type Props = {
  icmp_pings_data?: PingMetricsResponseType | undefined;
  health_checks_data?: HealthCheckMetricsResponseType | undefined;
  dataType: 'ICMP_PINGS' | 'HEALTH_CHECKS';
  isFetching: boolean;
};

const PingHead = ({ icmp_pings_data, health_checks_data, dataType, isFetching }: Props) => {
  const data = dataType === 'ICMP_PINGS' ? icmp_pings_data : health_checks_data;
  const { styles, theme } = useStyles();

  const isUp =
    data?.metrics?.[data?.metrics?.length - 1]?.status === 'success' ||
    data?.metrics?.[data?.metrics?.length - 1]?.status === 1;

  return (
    <Flex align="center" gap="middle" className={styles.wrap}>
      <StatusIndicator isUp={isUp} isFetching={isFetching} />
      <div>
        <Title className={styles.title}>{
          dataType === 'ICMP_PINGS' ?
            (data as PingMetricsResponseType)?.metadata?.hostname || '--' :
            (data as HealthCheckMetricsResponseType)?.metadata?.endpoint_url || '--'}</Title>
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