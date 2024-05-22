import React, {useMemo} from 'react';
import {ContainerMetricsType} from '@/types/kube-data.ts';
import {Card, Space, Typography} from 'antd';
import {
  Area,
  AreaChart,
  CartesianGrid, Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import useStyles from '@/components/Ping/PingDurationChart/styles.tsx';
import {dateFormatter} from '@/utils/misc.ts';

type Props = {
  data: ContainerMetricsType[];
};

const KubeMetricsChart = ({data}: Props) => {
  const { styles } = useStyles();

  const cpuRadialChartData = useMemo(() => {
    const lastData = data[data.length - 1];
    if (lastData) {
      return [{cpu: 0.5, name: 'total capacity', fill: '#8884d8'}, {cpu: lastData.cpu, name: 'last use', fill: '#83a6ed'}];
    }
    return [];
  }, [data]);

  const memoryRadialChartData = useMemo(() => {
    const lastData = data[data.length - 1];
    if (lastData) {
      return [
        {memory: 1048576, name: 'total capacity', fill: '#a4de6c'},
        {memory: lastData.memory, name: 'last use', fill: '#82ca9d'}
      ];
    }
    return [];
  }, [data]);

  return (
    <Space direction="vertical" style={{width: '100%'}} size="large">
      <Space>
        <Card title="CPU Usage">
          <RadialBarChart
            cx="25%"
            cy="70%"
            barCategoryGap={'15%'}
            margin={{left: 0, bottom: 0, top: 0, right: 0}}
            width={350}
            height={120}
            innerRadius="35"
            outerRadius="90"
            data={cpuRadialChartData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar label={{ fill: '#666', position: 'insideStart' }} background dataKey='cpu'/>
            <Legend
              iconSize={10}
              width={120}
              height={90}
              layout='vertical'
              verticalAlign='middle'
              align="right"
            />
            <Tooltip />
          </RadialBarChart>
        </Card>
        <Card title="Memory">
          <RadialBarChart
            cx="25%"
            cy="70%"
            barCategoryGap={'15%'}
            margin={{left: 0, bottom: 0, top: 0, right: 0}}
            width={350}
            height={120}
            innerRadius="35"
            outerRadius="90"
            data={memoryRadialChartData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar label={{ fill: '#666', position: 'insideStart' }} background dataKey='memory'/>
            <Legend
              iconSize={10}
              width={120}
              height={90}
              layout='vertical'
              verticalAlign='middle'
              align="right"
            />
            <Tooltip />
          </RadialBarChart>
        </Card>
      </Space>
      <div>
        <Typography.Title level={5} className={styles.title}>Cpu Usage</Typography.Title>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart width={730} height={250} data={data}
                     margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tickFormatter={dateFormatter}
              interval="preserveStartEnd"
            />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip labelFormatter={dateFormatter} />
            <Area type="monotone" dataKey="cpu" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div>
        <Typography.Title level={5} className={styles.title}>Memory Usage</Typography.Title>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart width={730} height={250} data={data}
                     margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tickFormatter={dateFormatter}
              interval="preserveStartEnd"
            />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip labelFormatter={dateFormatter} />
            <Area type="monotone" dataKey="memory" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Space>
  );
};

export default KubeMetricsChart;