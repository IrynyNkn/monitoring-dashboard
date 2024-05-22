import React, {useEffect, useMemo, useState} from 'react';
import {Legend, RadialBar, RadialBarChart, Tooltip} from 'recharts';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';

import useWithAuth from '@/hooks/useWithAuth.ts';
import {getContainerMetrics, getPodsInfo} from '@/queries/kube-data.ts';
import {Button, Card, Flex, Space, Table, TableProps, Typography} from 'antd';
import {PodInfoType} from '@/types/kube-data.ts';

const columns: TableProps<PodInfoType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, n) => <p>{n.name}</p>,
  },
  {
    title: 'Node Name',
    dataIndex: 'node_name',
    key: 'node_name',
    render: (_, n) => <p>{n.node_name}</p>,
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
    render: (_, n) => <p>{n.ip}</p>,
  },
  {
    title: 'Containers',
    dataIndex: 'containers',
    key: 'contianers',
    render: (_, n) => <p>{n.containers?.map(c => c.name).join(', ') || '-'}</p>,
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (_, n) => <p>{dayjs(n.created_at).format('HH:mm:ss YYYY-MM-DD')}</p>,
  },
];

const PodsData = () => {
  const { data, error, isFetching } = useWithAuth({
    queryKey: ['pods-data'],
    queryFn: () => getPodsInfo(),
    placeholderData: { pods: [] },
    select: (d) => d?.['pods'] ?? [],
    staleTime: 1 * 60 * 1000,
  });
  const [podsToDraw, setPodsToDraw] = useState<PodInfoType[]>([]);
  const [containerName, setContainerName] = useState<string>('');

  const { data: containerData, isFetching: isFetchingContainer } = useWithAuth({
    queryKey: ['container-metrics', containerName],
    queryFn: () => getContainerMetrics(containerName as string),
    placeholderData: { container_metrics: [] },
    select: (d) => d?.['container_metrics'] ?? [],
    staleTime: 1 * 60 * 1000,
  });
  console.log('containerData', containerData);

  useEffect(() => {
    const pods = data?.map((n, idx) => ({...n, key: idx})).slice(0, 3) || [];
    setContainerName(pods.length ? pods[0]?.containers?.[0]?.name || '' : '');
    setPodsToDraw(pods);
  }, [data]);

  const cpuRadialChartData = useMemo(() => {
    const lastData = containerData?.[containerData.length - 1];
    if (lastData) {
      return [{cpu: 0.5, name: 'total capacity', fill: '#8884d8'}, {cpu: lastData.cpu, name: 'last use', fill: '#83a6ed'}];
    }
    return [];
  }, [containerData]);

  const memoryRadialChartData = useMemo(() => {
    const lastData = containerData?.[containerData.length - 1];
    if (lastData) {
      return [
        {memory: 1048576, name: 'total capacity', fill: '#a4de6c'},
        {memory: lastData.memory, name: 'last use', fill: '#82ca9d'}
      ];
    }
    return [];
  }, [containerData]);

  return (
    <Flex justify="space-between" gap={30}>
      <Space direction={'vertical'}>
        <Flex justify="space-between" align="center">
          <Typography.Title level={5} style={{ margin: 0 }}>Pods</Typography.Title>
          <Link to="/kube-data"><Button>View More</Button></Link>
        </Flex>
        <Table
          columns={columns}
          dataSource={podsToDraw}
          pagination={false}
        />
      </Space>
      <Space direction="vertical">
        <Typography.Title level={5} style={{ margin: 0 }}>Last Check Metrics</Typography.Title>
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
    </Flex>
  );
};

export default PodsData;