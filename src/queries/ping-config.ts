import { BE_URL } from '@/utils/consts.ts';
import {CreatePingResponseType, DeletePingResponseType, PingListResponseType} from '@/types/ping.ts';
import {authFetch, getToken} from '@/queries/auth.ts';
import {AuthFetchType} from '@/types/auth.ts';

export const createIcmpPing = async (
  d: {
    interval: number;
    host: string;
  },
  customFetch: (...args: Parameters<typeof fetch>) => Promise<AuthFetchType> = authFetch
): Promise<CreatePingResponseType | undefined> => {
  try {
    const req = await customFetch(`${BE_URL}/ping`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${getToken()}`
      },
      body: JSON.stringify({
        interval: d.interval,
        host: d.host,
      }),
    });

    if (req.unauthorized) {
      return;
    }

    return await req.response.json();
  } catch (e) {
    console.error('Error on creating ping', e);
  }
};

export const deleteIcmpPing = async (
  id: string,
  customFetch: (...args: Parameters<typeof fetch>) => Promise<AuthFetchType>
): Promise<DeletePingResponseType | undefined> => {
  try {
    const req = await customFetch(`${BE_URL}/ping/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${getToken()}`
      },
    });

    if (req.unauthorized) {
      return;
    }

    return await req.response.json();
  } catch (e) {
    console.error('Error on creating ping', e);
  }
};

export const getIcmpPingList = async (): Promise<PingListResponseType> => {
  const r = await authFetch(`${BE_URL}/ping/pings`, {
    headers: {
      'Authorization': `Token ${getToken()}`
    }
  });

  if (!r.response.ok) {
    throw new Error('Error on getIcmpPingList');
  }

  const data: PingListResponseType = await r.response.json();
  return data;
};