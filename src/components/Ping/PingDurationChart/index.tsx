import React, {useEffect, useState} from 'react';
import { Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import {PingMetricsResponseType} from '@/types/ping.ts';
import {dateFormatter} from '@/utils/misc.ts';

import useStyles from './styles.tsx';

type Props = {
  data: PingMetricsResponseType | undefined;
};

const PingDurationLineChart = ({ data }: Props) => {
  const { styles } = useStyles();
  const [metrics, setMetrics] = useState(data?.metrics);

  useEffect(() => {
    if (data?.metrics) {
      setMetrics(data?.metrics);
    }
  }, [data]);

  return (
    <div>
      <Typography.Title level={5} className={styles.title}>Ping Durations</Typography.Title>
      <div className={styles.wrapper}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={metrics}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              // scale="time"  // adds weird overflow
              tickFormatter={dateFormatter}
              interval="preserveStartEnd"
            />
            <YAxis
              tickFormatter={(v) => `${v}ms`}
            />
            <Tooltip
              labelFormatter={dateFormatter}
            />
            <Legend />
            <Line type="monotone" dataKey="round_trip_time" stroke="#8884d8" activeDot={{ r: 8 }} />
            {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PingDurationLineChart;