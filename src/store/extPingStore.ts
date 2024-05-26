import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {externalPingStorageKey} from '@/utils/consts.ts';

export type GatheredInfoType = {
  status: 0 | 1;
  round_trip_time: number;
}

type State = {
  externalPingEnabled: boolean;
  gatheredExtPingData: GatheredInfoType[];
};

type Actions = {
  setExternalPingEnabled: (v: boolean) => void;
  setGatheredExtPingTimeRange: (d: GatheredInfoType) => void;
};

const externalPingStore = create<State & Actions>()(
  persist((set, get) => ({
    externalPingEnabled: false,
    gatheredExtPingData: [],
    setExternalPingEnabled: (v: boolean) => set({
      externalPingEnabled: v,
    }),
    setGatheredExtPingTimeRange: (d: GatheredInfoType) => set({
      gatheredExtPingData: [...get().gatheredExtPingData, d]
    }),
  }), {
    name: externalPingStorageKey
  })
);

export default externalPingStore;