import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import MainLayout from '@/layouts/MainLayout.tsx';
import PageTitle from '@/components/common/PageTitle';
import NodesInfo from '@/components/KubeData/NodesInfo';
import PodsInfo from '@/components/KubeData/PodsInfo';
import DeploymentsInfo from '@/components/KubeData/DeploymentsInfo';

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
  {
    key: 'deployments',
    label: 'Deployments',
    children: <DeploymentsInfo />
  }
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