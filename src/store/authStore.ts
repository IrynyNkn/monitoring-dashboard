import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UserType, AuthResponseType } from '@/types/auth.ts';

type State = {
  token: string | undefined;
  user: UserType | undefined;
};

type Actions = {
  authorize: (d: AuthResponseType) => void,
  clearAuthData: () => void,
};

const authStore = create<State & Actions>()(
  persist(
      (set) => ({
        token: undefined,
        user: undefined,
        authorize: (d) => set({
          token: d.token,
          user: d.user,
        }),
        clearAuthData: () => set({
          token: undefined,
          user: undefined,
        })
    }),
    {
      name: 'monitoring-auth-storage'
    }
  )
);

export default authStore;