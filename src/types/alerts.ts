export enum AlertGroups {
  icmpPing = 'icmp-ping',
  httpPing = 'http-ping',
  kubernetes = 'kubernetes',
}

export enum IcmpPingAlerts {
  serviceUnavailable = 'service-unavailable',
}

export enum HttpPingAlerts {
  healthCheckFailed = 'health-check-failed',
}

export enum KubernetesAlerts {
  highCpuUsage = 'high-cpu-usage',
  highMemoryUsage = 'high-memory-usage',
}

export type AddAlertFieldType = {
  alertGroup: AlertGroups;
  alertType: IcmpPingAlerts | HttpPingAlerts | KubernetesAlerts;
  email: string;
  for: number;
  repeatRate: number;
};

export const k8sAlertsArray: { label: string; key: KubernetesAlerts }[] = [
  { label: 'High CPU Usage', key: KubernetesAlerts.highCpuUsage },
  { label: 'High Memory Usage', key: KubernetesAlerts.highMemoryUsage }
];

export const icmpPingAlertsArray: { label: string; key: IcmpPingAlerts }[] = [
  { label: 'Service Unavailable', key: IcmpPingAlerts.serviceUnavailable },
];

export const httpPingAlertsArray: { label: string; key: HttpPingAlerts }[] = [
  { label: 'Health-Check Failed', key: HttpPingAlerts.healthCheckFailed },
];
