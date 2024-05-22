import {
  ContainerMetricsResponseType,
  DeploymentsInfoResponseType,
  NodesInfoResponseType,
  PodsInfoResponseType
} from '@/types/kube-data.ts';
import {authFetch, getToken} from '@/queries/auth.ts';
import {BE_URL} from '@/utils/consts.ts';

export const getNodesInfo = async (): Promise<NodesInfoResponseType> => {
  const r = await authFetch(`${BE_URL}/kube-metrics/nodes`, {
    headers: {
      'Authorization': `Token ${getToken()}`
    }
  });

  if (!r.response.ok) {
    throw new Error('Error on getNodesInfo');
  }

  const data: NodesInfoResponseType = await r.response.json();
  return data;
};

export const getPodsInfo = async (): Promise<PodsInfoResponseType> => {
  const r = await authFetch(`${BE_URL}/kube-metrics/pods`, {
    headers: {
      'Authorization': `Token ${getToken()}`
    }
  });

  if (!r.response.ok) {
    throw new Error('Error on getPodsInfo');
  }

  const data: PodsInfoResponseType = await r.response.json();
  return data;
};

export const getDeploymentsInfo = async (): Promise<DeploymentsInfoResponseType> => {
  const r = await authFetch(`${BE_URL}/kube-metrics/deployments`, {
    headers: {
      'Authorization': `Token ${getToken()}`
    }
  });

  if (!r.response.ok) {
    throw new Error('Error on getPodsInfo');
  }

  const data: DeploymentsInfoResponseType = await r.response.json();
  return data;
};

export const getContainerMetrics = async (containerName: string): Promise<ContainerMetricsResponseType> => {
  if (!containerName) {
    return {container_metrics: []};
  }

  const r = await authFetch(
    `${BE_URL}/kube-metrics/container-metrics/${containerName}`,
    {
      headers: {
        'Authorization': `Token ${getToken()}`
      }
    });

  if (!r.response.ok) {
    throw new Error('Error on getPodsInfo');
  }

  const data: ContainerMetricsResponseType = await r.response.json();
  return data;
};
