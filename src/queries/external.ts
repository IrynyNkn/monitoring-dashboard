import {getToken} from '@/queries/auth.ts';
import {EXTERNAL_BE_URL} from '@/utils/consts.ts';
import {GatheredInfoType} from '@/store/extPingStore.ts';

export type ExtPingTimeRangeType = GatheredInfoType & {
  snapshot: Date;
};

export type ExtPingChartType = {
  metrics: ExtPingTimeRangeType[]
}

export const getExternalPing = async (
  saveDateCallback: (d: ExtPingTimeRangeType) => void
): Promise<GatheredInfoType> => {
  const r = await fetch(`${EXTERNAL_BE_URL}/external-ping`, {
    headers: {
      'Authorization': `Token ${getToken()}`
    }
  });

  const data: GatheredInfoType = await r.json();
  if (r.status === 200) {
    const extPingData: ExtPingTimeRangeType = {
      ...data,
      snapshot: new Date(),
    };
    saveDateCallback(extPingData);
  }

  return data;
};