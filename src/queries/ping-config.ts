import { BE_URL } from '@/utils/consts.ts';
import {
  CreatePingResponseType,
  DeletePingResponseType,
  EditPingResponseType,
  PingListResponseType,
  PingMetricsResponseType,
} from '@/types/ping.ts';
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

export const editIcmpPing = async (
  d: {
    interval: number;
  },
  pingId: string,
  customFetch: (...args: Parameters<typeof fetch>) => Promise<AuthFetchType> = authFetch
): Promise<EditPingResponseType | undefined> => {
  try {
    const req = await customFetch(`${BE_URL}/ping/${pingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${getToken()}`
      },
      body: JSON.stringify({
        interval: d.interval,
      }),
    });

    if (req.unauthorized) {
      return;
    }

    return await req.response.json();
  } catch (e) {
    console.error('Error on editing ping', e);
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

export const pauseIcmpPing = async (
  id: string,
  type: 'pause' | 'resume',
  customFetch: (...args: Parameters<typeof fetch>) => Promise<AuthFetchType>
): Promise<Response | undefined> => {
  try {
    const req = await customFetch(`${BE_URL}/ping/${type}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${getToken()}`
      },
    });

    if (req.unauthorized) {
      return;
    }

    return req.response;
  } catch (e) {
    console.error('Error on pauseIcmpPing', e);
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

export const fetchMetricsByPingId = async (pingId: string, timeRange = '-12h'): Promise<PingMetricsResponseType> => {
  const r = await authFetch(`${BE_URL}/ping/${pingId}?time_range=${timeRange}`, {
    headers: {
      'Authorization': `Token ${getToken()}`
    }
  });

  if (!r.response.ok) {
    throw new Error('Error on fetchMetricsByPingId');
  }

  const data: PingMetricsResponseType = await r.response.json();
  return data;
};