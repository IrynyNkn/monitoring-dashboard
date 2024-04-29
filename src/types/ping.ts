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