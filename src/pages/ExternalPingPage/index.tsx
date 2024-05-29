import React, {useMemo} from 'react';
import {Typography, Empty, Flex, Space, Button} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';

import MainLayout from '@/layouts/MainLayout.tsx';
import PageTitle from '@/components/common/PageTitle';
import {useQuery} from '@tanstack/react-query';
import {ExtPingChartType, getExternalPing} from '@/queries/external.ts';
import StatusIndicator from '@/components/common/StatusIndicator';
import useStyles from '@/components/Ping/PingHead/styles.tsx';
import externalPingStore from '@/store/extPingStore.ts';
import PingDurationLineChart from '@/components/Ping/PingDurationChart';

const ExternalPingPage = () => {
  const { styles, theme } = useStyles();
  const {gatheredExtPingData, setGatheredExtPingTimeRange} = externalPingStore(s => s);
  const {data, isFetching, refetch} = useQuery({
    queryKey: ['external-ping'], // eslint-disable-line
    queryFn: () => getExternalPing(setGatheredExtPingTimeRange),
    staleTime: 1 * 60 * 1000,
    refetchInterval: 1 * 60 * 1000,
    refetchIntervalInBackground: true,
  });

  const gatheredCherData: ExtPingChartType = useMemo(() => (
    { metrics: gatheredExtPingData }
  ), [gatheredExtPingData]);

  const isUp = data?.status === 1;

  return (
    <MainLayout>
      <PageTitle>External Availability Check</PageTitle>
      {!data && <Empty />}

      {data && <>
        <Space direction="vertical" style={{width: '100%'}} size="middle">
          <Flex align="center" gap="middle">
            <StatusIndicator isUp={isUp} isFetching={isFetching} />
            <Space direction={'vertical'}>
              <Typography.Title level={4} style={{ margin: 0 }}>{data?.host || []}</Typography.Title>
              <Flex gap="middle">
                <Typography.Text
                  className={styles.indicatorText}
                  style={{ color: isUp ? theme.colorSuccess : theme.colorError }}
                >{isUp ? 'Up' : 'Down'}</Typography.Text>
                <Typography.Text className={styles.infoText}>Checked every 1 min</Typography.Text>
              </Flex>
            </Space>
          </Flex>
          <Button
            type="text"
            icon={<ReloadOutlined />}
            onClick={() => refetch()}
            loading={isFetching}
            style={{ marginTop: 10 }}
          >Refresh Data</Button>
          <PingDurationLineChart data={gatheredCherData} timeSelector="snapshot" />
        </Space>
      </>}
    </MainLayout>
  );
};

export default ExternalPingPage;