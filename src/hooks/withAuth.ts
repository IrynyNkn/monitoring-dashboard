import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {UseQueryResult} from '@tanstack/react-query';

import authStore from '@/store/authStore.ts';
import {ExtendedError} from '@/types/auth.ts';
import {authStorageKey} from '@/utils/consts.ts';

type Props<T> = () => UseQueryResult<T>;

const withAuth = <T,>(queryHook: Props<T>): UseQueryResult<T> => {
  const navigate = useNavigate();
  const clearAuthData = authStore(s => s.clearAuthData);

  const result = queryHook();

  useEffect(() => {
    if ((result.error as ExtendedError)?.status === 401) {
      clearAuthData();
      localStorage.removeItem(authStorageKey);
      navigate('/login');
    }
  }, [result]);

  return result;
};

export default withAuth;