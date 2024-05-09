import React, {useMemo} from 'react';
import { Empty, Collapse } from 'antd';
import type { CollapseProps } from 'antd';

import NodeDetails from '@/components/KubeData/NodesInfo/NodeDetails.tsx';
import useWithAuth from '@/hooks/useWithAuth.ts';
import {getNodesInfo} from '@/queries/kube-data.ts';

// const contentStyle: React.CSSProperties = {
//   padding: 50,
//   background: 'rgba(0, 0, 0, 0.05)',
//   borderRadius: 4,
// };

const NodesInfo = () => {
  const { data, error, isFetching } = useWithAuth({
    queryKey: ['nodes-data'],
    queryFn: () => getNodesInfo(),
    placeholderData: { nodes: [] },
    select: (d) => d?.['nodes'] ?? [],
    staleTime: 1 * 60 * 1000,
  });

  const nodeCards: CollapseProps['items'] = useMemo(() => (data || []).map((p, idx) => ({
    key: idx,
    label: p.name,
    children: <NodeDetails details={p} />
  })), [data]);

  if (!isFetching && nodeCards?.length === 0) {
    return <Empty />;
  }

  // if (isFetching) {
  //   return (
  //     <Spin tip="Loading" size="small">
  //       <div style={contentStyle} />
  //     </Spin>
  //   );
  // }

  return (
    <Collapse
      items={nodeCards}
      defaultActiveKey={[0]}
    />
  );
};

export default NodesInfo;