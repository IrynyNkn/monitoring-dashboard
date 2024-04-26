import { PingMetricsResponseType } from '@/types/ping.ts';
import { BE_URL } from '@/utils/consts.ts';

export const fetchMetricsByPingId = async (pingId: string): Promise<PingMetricsResponseType> => {
  const response = await fetch(`${BE_URL}/ping/${pingId}`);

  if (!response.ok) {
    throw new Error('Could not fetch metrics by ping id');
  }

  const data: PingMetricsResponseType = await response.json();
  return data;
};