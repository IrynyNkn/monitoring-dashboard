import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import dayjs from 'dayjs';

import {
  HealthCheckMetricsResponseType,
  PingMetricsResponseType
} from '@/types/ping.ts';

import useStyles from './styles';

type Props = {
  data: PingMetricsResponseType | HealthCheckMetricsResponseType | undefined;
};

const StatisticCards = ({ data }: Props) => {
  const { theme } = useStyles();
  const successRate = data?.metadata ?
    (data.metadata.successful_checks / data.metadata.total_checks) * 100 : 0;

  const getTimeDiff = (pingTime: number | undefined, suffix = '') => {
    if (pingTime) {
      const dateOfStart = dayjs(pingTime);
      const cDate = dayjs();

      const difS = cDate.diff(dateOfStart, 'second');
      const difM = cDate.diff(dateOfStart, 'minute');
      const difH = cDate.diff(dateOfStart, 'hour');
      const difD = cDate.diff(dateOfStart, 'day');

      return difD > 0 ?
        `${difD}days ${suffix}` :
        difH > 0 ?
          `${difH}hours ${suffix}` :
          difM > 0 ?
            `${difM}min ${suffix}` :
            `${difS}sec ${suffix}`;
    }

    return '--';
  };

  return (
    <Row gutter={16} style={{ width: '100%' }}>
      <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Success Rate"
              value={data?.metadata ? successRate : '--'}
              precision={2}
              valueStyle={{
                color: successRate >= 80 ?
                  '#3f8600' :
                  successRate >= 60 ? theme.colorWarning : theme.colorError
              }}
              suffix="%"
            />
          </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Failed Checks"
            value={data?.metadata?.failed_checks ?? '--'}
            suffix={`/${data?.metadata?.total_checks ?? '--'}`}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Monitoring is up for"
            value={getTimeDiff(data?.metrics?.[0]?.time)}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Last Checked"
            value={getTimeDiff(data?.metrics?.[data?.metrics?.length - 1]?.time, 'ago')}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticCards;