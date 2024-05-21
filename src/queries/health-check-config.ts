import {AuthFetchType} from '@/types/auth.ts';
import {authFetch, getToken} from '@/queries/auth.ts';
import {
  CreateHealthCheckResponseType,
  DeletePingResponseType,
  EditPingResponseType,
  HealthCheckMetricsResponseType,
  HealthChecksListResponseType,
} from '@/types/ping.ts';
import {BE_URL} from '@/utils/consts.ts';

export const createHealthCheck = async (
  d: {
    interval: number;
    endpoint_url: string;
  },
  customFetch: (...args: Parameters<typeof fetch>) => Promise<AuthFetchType> = authFetch
): Promise<CreateHealthCheckResponseType | undefined> => {
  try {
    const req = await customFetch(`${BE_URL}/health-checks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${getToken()}`
      },
      body: JSON.stringify({
        interval: d.interval,
        endpoint_url: d.endpoint_url,
      }),
    });

    if (req.unauthorized) {
      return;
    }

    return await req.response.json();
  } catch (e) {
    console.error('Error on creating health check', e);
  }
};

export const getHealthChecksList = async (): Promise<HealthChecksListResponseType> => {
  const r = await authFetch(`${BE_URL}/health-checks`, {
    headers: {
      'Authorization': `Token ${getToken()}`
    }
  });

  if (!r.response.ok) {
    throw new Error('Error on getHealthChecksList');
  }

  const data: HealthChecksListResponseType = await r.response.json();
  return data;
};

export const deleteHealthCheck = async (
  id: string,
  customFetch: (...args: Parameters<typeof fetch>) => Promise<AuthFetchType>
): Promise<DeletePingResponseType | undefined> => {
  try {
    const req = await customFetch(`${BE_URL}/health-checks/${id}`, {
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
    console.error('Error on deleting health check', e);
  }
};

export const fetchMetricsByHealthCheckId = async (hcId: string): Promise<HealthCheckMetricsResponseType> => {
  const r = await authFetch(`${BE_URL}/health-checks/${hcId}`, {
    headers: {
      'Authorization': `Token ${getToken()}`
    },
  })

  if (!r.response.ok) {
    throw new Error('Error on fetchMetricsByHealthCheckId');
  }

  const data: HealthCheckMetricsResponseType = await r.response.json();
  return data;
};

export const editHealthCheck = async (
  d: {
    interval: number;
  },
  pingId: string,
  customFetch: (...args: Parameters<typeof fetch>) => Promise<AuthFetchType> = authFetch
): Promise<EditPingResponseType | undefined> => {
  try {
    const req = await customFetch(`${BE_URL}/health-checks/${pingId}`, {
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
    console.error('Error on editing health check', e);
  }
};
