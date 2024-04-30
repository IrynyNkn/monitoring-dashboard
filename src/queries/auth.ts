import {authStorageKey, BE_URL} from '@/utils/consts.ts';
import {AuthFetchType, AuthResponseType, ExtendedError} from '@/types/auth.ts';

export const login = async (d: {
  email: string,
  password: string,
}): Promise<AuthResponseType | undefined> => {
  try {
    const req = await fetch(`${BE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: d.email,
        password: d.password
      }),
    });

    const response: AuthResponseType = await req.json();

    if (response.token) {
      return response;
    }
  } catch (e) {
    console.error(e);
  }
};

export const register = async (d: {
  email: string,
  password: string,
  repeatPassword: string,
}): Promise<AuthResponseType | undefined> => {
  try {
    const req = await fetch(`${BE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: d.email,
        password: d.password,
        repeatPassword: d.repeatPassword
      }),
    });

    const response: AuthResponseType = await req.json();

    if (response.token) {
      return response;
    }
  } catch (e) {
    console.error(e);
  }
};

export const getToken = () => {
  try {
    const authStorage = localStorage.getItem(authStorageKey);

    if (authStorage) {
      const authStorageObj = JSON.parse(authStorage);
      return authStorageObj.state.token;
    }
  } catch (e) {
    console.error('Parsing Token Error', e);
    return null;
  }
};

export const authFetch = async (...args: Parameters<typeof fetch>): Promise<AuthFetchType> => {
  const response = await fetch(...args);

  if (response.status === 401) {
    throw new ExtendedError('unauthorized', response.status);
  }

  return { response, unauthorized: false };
};

export const createAuthFetch = (navigate: (to: string) => void) => async (...args: Parameters<typeof fetch>): Promise<AuthFetchType> => {
  const response = await fetch(...args);

  if (response.status === 401) {
    localStorage.removeItem(authStorageKey);
    navigate('/login');
    return { response, unauthorized: true };
  }

  return { response, unauthorized: false };
};
