export type PingType = {
  time: number,
  status: 'success' | 'failed' | 'unknown',
  'round_trip_time': number,
};

export type PingMetricsResponseType = {
  metadata: {
    'ping_d': string,
    hostname: string,
    'failed_checks': number,
    'total_checks': number,
    'success_rate': number,
    'last_check_time': string,
    'first_check_time': string,
    'successful_checks': number
  },
  metrics: PingType[]
};

export type PingListResponseType = {
  icmp_pings: {
    id: string;
    host: string;
    is_paused: boolean;
    interval: number;
  }[];
};

export type CreateIcmpPingFieldType = {
  // name: string;
  hostname: string;
  period: number;
};


export type CreatePingResponseType = {
  task_id: string;
};
