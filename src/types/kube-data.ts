export type NodeInfoType = {
  name: string;
  status: {
    [key: string]: 'True' | 'False';
  };
  roles: string[];
  'ip_address': string;
  'os_arch': string;
  'os_image': string;
  'cpu_capacity': string;
  'memory_capacity': string;
  'allocatable_cpu': string;
  'allocatable_memory': string;
  'created_at': string;
};

export type PodInfoType = {
  name: string,
  namespace: string,
  status: string,
  'node_name': string,
  'created_at': string,
  ip: string,
  containers: [
    {
      name: string,
      image: string,
      ready: boolean,
      restart_count: number,
      state: {
        [key: string]: {
          [key: string]: string;
        }
      }
    }
  ]
};

export type DeploymentInfoType = {
  name: string;
  namespace: string;
  replicas: number;
  'available_replicas': number;
  'unavailable_replicas': number;
  labels: {[key: string]: string};
  'created_at': string;
  conditions: {
    type: string;
    status: string;
    reason: string;
  }[];
  selector: {[key: string]: string};
};

export type NodesInfoResponseType = {
  nodes: NodeInfoType[];
};

export type PodsInfoResponseType = {
  pods: PodInfoType[];
};

export type DeploymentsInfoResponseType = {
  deployments: DeploymentInfoType[];
};

export type ContainerMetricsType = {
  cpu: number;
  'cpu_unit': string;
  memory: number;
  'memory_unit': string;
  'pod_name': string;
  time: number;
};

export type ContainerMetricsResponseType = {
  container_metrics: ContainerMetricsType[];
};
