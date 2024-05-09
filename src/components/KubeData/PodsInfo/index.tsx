import React, {useMemo} from 'react';
import {Collapse, CollapseProps, Empty} from 'antd';

import useWithAuth from '@/hooks/useWithAuth.ts';
import {getPodsInfo} from '@/queries/kube-data.ts';
import PodDetails from '@/components/KubeData/PodsInfo/PodDetails.tsx';

const PodsInfo = () => {
  const { data, error, isFetching } = useWithAuth({
    queryKey: ['pods-data'],
    queryFn: () => getPodsInfo(),
    placeholderData: { pods: [] },
    select: (d) => d?.['pods'] ?? [],
    staleTime: 1 * 60 * 1000,
  });

  const podCards: CollapseProps['items'] = useMemo(() => (data || []).map((p, idx) => ({
    key: idx,
    label: p.name,
    children: <PodDetails details={p} />
  })), [data]);

  if (!isFetching && podCards?.length === 0) {
    return <Empty />;
  }

  return (
    <Collapse
      items={podCards}
      defaultActiveKey={[0]}
    />
  );
};

export default PodsInfo;