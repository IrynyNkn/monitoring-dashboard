import React from 'react';
import {Flex, Typography} from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

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

dayjs.extend(duration);

function formatTime(seconds: number) {
  // Use Day.js to create a duration object
  const timeDuration = dayjs.duration(seconds, 'seconds');

  // Check for hours, minutes, and seconds
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();
  const secs = timeDuration.seconds();

  if (hours >= 1) {
    return `${hours} h`;
  } else if (minutes >= 1) {
    return `${minutes} min`;
  } else {
    return `${secs} sec`;
  }
}

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
          <Text className={styles.infoText}>Checked every {formatTime(data?.metadata?.interval || 0)}</Text>
        </Flex>
      </div>
    </Flex>
  );
};

export default PingHead;