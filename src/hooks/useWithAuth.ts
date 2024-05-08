import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {UseQueryResult, UseQueryOptions, useQuery} from '@tanstack/react-query';

import authStore from '@/store/authStore.ts';
import {ExtendedError} from '@/types/auth.ts';
import {authStorageKey} from '@/utils/consts.ts';

/* eslint-disable @typescript-eslint/no-explicit-any */
const useWithAuth = <TQuery, TResult>(config: UseQueryOptions<TQuery, any, TResult, any[]>): UseQueryResult<TResult> => {
  const navigate = useNavigate();
  const clearAuthData = authStore(s => s.clearAuthData);

  const result = useQuery<TQuery, any, TResult, any[]>(config);

  useEffect(() => {
    if ((result.error as ExtendedError)?.status === 401) {
      clearAuthData();
      localStorage.removeItem(authStorageKey);
      navigate('/login');
    }
  }, [result]);

  return result;
};

export default useWithAuth;