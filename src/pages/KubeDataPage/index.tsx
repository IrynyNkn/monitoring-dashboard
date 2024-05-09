import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import MainLayout from '@/layouts/MainLayout.tsx';
import PageTitle from '@/components/common/PageTitle';
import NodesInfo from '@/components/KubeData/NodesInfo';
import PodsInfo from '@/components/KubeData/PodsInfo';

const items: TabsProps['items'] = [
  {
    key: 'nodes',
    label: 'Nodes',
    children: <NodesInfo />,
  },
  {
    key: 'pods',
    label: 'Pods',
    children: <PodsInfo />,
  },
];

const KubeDataPage = () => {


  return (
    <MainLayout>
      <PageTitle>Kubernetes Data</PageTitle>
      <Tabs defaultActiveKey="nodes" items={items} />
    </MainLayout>
  );
};

export default KubeDataPage;