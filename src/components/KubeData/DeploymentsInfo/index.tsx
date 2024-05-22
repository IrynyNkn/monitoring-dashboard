import React, {useMemo} from 'react';
import useWithAuth from '@/hooks/useWithAuth.ts';
import {getDeploymentsInfo} from '@/queries/kube-data.ts';
import {Collapse, CollapseProps, Empty} from 'antd';
import DeploymentDetails from '@/components/KubeData/DeploymentsInfo/DeploymentDetails.tsx';

const DeploymentsInfo = () => {
  const { data, isFetching } = useWithAuth({
    queryKey: ['deployments-data'],
    queryFn: () => getDeploymentsInfo(),
    placeholderData: { deployments: [] },
    select: (d) => d?.['deployments'] ?? [],
    staleTime: 1 * 60 * 1000,
  });

  const deploymentCards: CollapseProps['items'] = useMemo(() => (data || []).map((p, idx) => ({
    key: idx,
    label: p.name,
    children: <DeploymentDetails details={p} />
  })), [data]);

  if (!isFetching && deploymentCards?.length === 0) {
    return <Empty />;
  }

  return (
    <Collapse
      items={deploymentCards}
      defaultActiveKey={[0]}
    />
  );
};

export default DeploymentsInfo;