import {useQuery} from '@tanstack/react-query';

import {fetchMetricsByPingId} from '@/queries/ping-metrics.ts';

export const usePingMetricsById = (pingId: string) => {
  return useQuery({
    queryKey: ['pingMetrics', pingId],
    queryFn: () => fetchMetricsByPingId(pingId),
    staleTime: 1 * 60 * 1000, // one minute
  });
};