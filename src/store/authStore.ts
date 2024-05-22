import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UserType, AuthResponseType } from '@/types/auth.ts';
import {authStorageKey} from '@/utils/consts.ts';

type State = {
  token: string | undefined;
  user: UserType | undefined;
  icmpPingTimeRange: string;
};

type Actions = {
  authorize: (d: AuthResponseType) => void,
  clearAuthData: () => void,
  setIcmpPingTimeRange: (v: string) => void
};

const authStore = create<State & Actions>()(
  persist(
      (set) => ({
        token: undefined,
        user: undefined,
        icmpPingTimeRange: '-12h',
        authorize: (d) => set({
          token: d.token,
          user: d.user,
        }),
        clearAuthData: () => set({
          token: undefined,
          user: undefined,
        }),
        setIcmpPingTimeRange: (d) => set({ icmpPingTimeRange: d })
    }),
    {
      name: authStorageKey
    }
  )
);

export default authStore;