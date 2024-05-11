import {authFetch, getToken} from '@/queries/auth.ts';
import {BE_URL} from '@/utils/consts.ts';
import {AddAlertFieldType, AddAlertResponseType, AlertResponseType} from '@/types/alerts.ts';
import {AuthFetchType} from '@/types/auth.ts';

export const getAlerts = async (): Promise<AlertResponseType> => {
  const r = await authFetch(`${BE_URL}/alerts`, {
    headers: {
      'Authorization': `Token ${getToken()}`
    }
  });

  if (!r.response.ok) {
    throw new Error('Error on getAlerts');
  }

  const data: AlertResponseType = await r.response.json();
  return data;
};

export const createAlert = async (
  d: AddAlertFieldType,
  customFetch: (...args: Parameters<typeof fetch>) => Promise<AuthFetchType> = authFetch
): Promise<AddAlertResponseType | undefined> => {
  try {
    const req = await customFetch(`${BE_URL}/alerts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${getToken()}`
      },
      body: JSON.stringify({
        email: d.email,
        'for_': d.for,
        'repeat_alert': d.repeatRate,
        'alert_group': d.alertGroup,
        'alert_type': d.alertType
      }),
    });

    if (req.unauthorized) {
      return;
    }

    return await req.response.json();
  } catch (e) {
    console.error('Error on creating alert', e);
  }
};

export const updateAlert = async (
  id: string,
  d: AddAlertFieldType,
  customFetch: (...args: Parameters<typeof fetch>) => Promise<AuthFetchType> = authFetch
): Promise<AddAlertResponseType | undefined> => {
  try {
    const req = await customFetch(`${BE_URL}/alerts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${getToken()}`
      },
      body: JSON.stringify({
        email: d.email,
        'for_': d.for,
        'repeat_alert': d.repeatRate,
        'alert_group': d.alertGroup,
        'alert_type': d.alertType
      }),
    });

    if (req.unauthorized) {
      return;
    }

    return await req.response.json();
  } catch (e) {
    console.error('Error on updating alert', e);
  }
};

export const deleteAlert = async (
  id: string,
  customFetch: (...args: Parameters<typeof fetch>) => Promise<AuthFetchType>
): Promise<AddAlertResponseType | undefined> => {
  try {
    const req = await customFetch(`${BE_URL}/alerts/${id}`, {
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
    console.error('Error on deleting ping', e);
  }
};