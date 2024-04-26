import React from 'react';
import {Space, Typography} from 'antd';

const { Title } = Typography;

import MainLayout from '@/layouts/MainLayout.tsx';
import MonitorForm from '@/components/Ping/MonitorForm';

import useStyles from './styles.tsx';

const MonitorsPage = () => {
  const {styles} = useStyles();
  return (
    <MainLayout>
      <div className={styles.container}>
      <Space
        direction="vertical"
        size="middle"
        className={styles.space}
      >
        <Title level={3}>Configure monitor</Title>
        <MonitorForm />
      </Space>
      </div>
    </MainLayout>
  );
};

export default MonitorsPage;