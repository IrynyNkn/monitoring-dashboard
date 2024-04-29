import {BE_URL} from '@/utils/consts.ts';
import {AuthResponseType} from '@/types/auth.ts';

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