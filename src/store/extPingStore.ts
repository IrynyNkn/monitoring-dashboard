import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {externalPingStorageKey} from '@/utils/consts.ts';
import {ExtPingTimeRangeType} from '@/queries/external.ts';

export type GatheredInfoType = {
  status: 0 | 1;
  round_trip_time: number;
  host: string;
}

type State = {
  externalPingEnabled: boolean;
  gatheredExtPingData: ExtPingTimeRangeType[];
};

type Actions = {
  setExternalPingEnabled: (v: boolean) => void;
  setGatheredExtPingTimeRange: (d: ExtPingTimeRangeType) => void;
};

const externalPingStore = create<State & Actions>()(
  persist((set, get) => ({
    externalPingEnabled: false,
    gatheredExtPingData: [],
    setExternalPingEnabled: (v: boolean) => set({
      externalPingEnabled: v,
    }),
    setGatheredExtPingTimeRange: (d: ExtPingTimeRangeType) => set({
      gatheredExtPingData: [...get().gatheredExtPingData, d]
    }),
  }), {
    name: externalPingStorageKey
  })
);

export default externalPingStore;