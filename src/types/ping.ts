export type PingType = {
  time: number,
  status: 'success' | 'failed' | 'unknown',
  'round_trip_time': number,
};

export type HealthCheckType = Omit<PingType, 'status'> & {
  status: 0 | 1
};

export type PingMetricsMetadata = {
  'ping_id': string,
  hostname: string,
  'failed_checks': number,
  'total_checks': number,
  'success_rate': number,
  'last_check_time': string,
  'first_check_time': string,
  'successful_checks': number
}

export type PingMetricsResponseType = {
  metadata: PingMetricsMetadata,
  metrics: PingType[]
};

export type HealthCheckMetricsMetadata = {
  'health_check_id': string,
  'endpoint_url': string;
  'failed_checks': number,
  'total_checks': number,
  'success_rate': number,
  'last_check_time': string,
  'first_check_time': string,
  'successful_checks': number
}

export type HealthCheckMetricsResponseType = {
  metadata: HealthCheckMetricsMetadata,
  metrics: HealthCheckType[]
};

export type PingItemDataType = {
  id: string;
  host: string;
  is_paused: boolean;
  interval: number;
};

export type HealthCheckDataType = {
  id: string;
  endpoint_url: string;
  is_paused: boolean;
  interval: number;
  created_at: string;
};

export type PingListResponseType = {
  icmp_pings: PingItemDataType[];
};

export type HealthChecksListResponseType = {
  health_checks: HealthCheckDataType[];
};

export type CreateIcmpPingFieldType = {
  // name: string;
  hostname: string;
  period: number;
};

export type CreateHealthCheckFieldType = {
  // name: string;
  endpoint_url: string;
  period: number;
};

export type EditIcmpPingFieldType = {
  period: number;
};

export type CreatePingResponseType = {
  task_id: string;
};

export type CreateHealthCheckResponseType = CreatePingResponseType;

export type DeletePingResponseType = {
  status: 'cancelled';
  id: string;
};

export type EditPingResponseType = {
  status: 'updated';
  id: string;
};
