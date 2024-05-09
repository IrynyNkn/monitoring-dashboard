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
      ready: string,
      restart_count: 1,
      state: {
        [key: string]: {
          [key: string]: string;
        }
      }
    }
  ]
};

export type NodesInfoResponseType = {
  nodes: NodeInfoType[];
};

export type PodsInfoResponseType = {
  pods: PodInfoType[];
};