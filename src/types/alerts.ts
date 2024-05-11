export enum AlertGroups {
  icmpPing = 'ICMP_PING',
  httpPing = 'HTTP_PING',
  kubernetes = 'KUBERNETES',
}

export enum IcmpPingAlerts {
  serviceUnavailable = 'SERVICE_UNAVAILABLE',
}

export enum HttpPingAlerts {
  healthCheckFailed = 'HEALTH_CHECK_FAILED',
}

export enum KubernetesAlerts {
  highCpuUsage = 'HIGH_CPU_USAGE',
  highMemoryUsage = 'HIGH_MEMORY_USAGE',
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

export type AlertDataType = {
  id: string;
  email: string;
  'for_': number;
  'repeat_alert': number;
  'alert_group': AlertGroups;
  'alert_type': IcmpPingAlerts | HttpPingAlerts | KubernetesAlerts;
};

export type AlertResponseType = {
  alerts: AlertDataType[];
};

export type AddAlertResponseType = {
  alert_id: string;
}