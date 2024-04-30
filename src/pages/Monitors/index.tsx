import React from 'react';
import {useQuery} from '@tanstack/react-query';

import MainLayout from '@/layouts/MainLayout.tsx';
import PingTable from '@/components/Monitors/PingTable.tsx';
import PageTitle from '@/components/common/PageTitle';
import CreatePingModal from '@/components/Monitors/CreatePingModal.tsx';
import withAuth from '@/hooks/withAuth.ts';
import {getIcmpPingList} from '@/queries/ping-config.ts';

const Monitors = () => {
  const { data, error, isFetching } = withAuth(() => useQuery({
    queryKey: ['pings'],
    queryFn: () => getIcmpPingList(),
    placeholderData: { icmp_pings: [] },
    select: (d) => d?.["icmp_pings"] ?? [],
    staleTime: 5 * 60 * 1000, // 5 minute
  }));

  return (
    <MainLayout>
      <PageTitle>Monitors</PageTitle>
      <CreatePingModal />
      <PingTable />
    </MainLayout>
  );
};

export default Monitors;