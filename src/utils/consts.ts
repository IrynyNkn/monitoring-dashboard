export const BE_URL = 'http://127.0.0.1:8000/api/v1';
export const pingId = '3f81a024dd9449b791c0852c2dd4025c';
export const authStorageKey = 'monitoring-auth-storage';

export const pingPeriods = [
  {
    label: '1min',
    value: 60,
  },
  {
    label: '3mins',
    value: 180,
  },
  {
    label: '5mins',
    value: 300,
  },
  {
    label: '15mins',
    value: 300,
  },
  {
    label: '30mins',
    value: 1800,
  },
  {
    label: '1h',
    value: 3600,
  },
  {
    label: '6h',
    value: 21600,
  },
  {
    label: '12h',
    value: 43200,
  },
  {
    label: '1d',
    value: 86400,
  },
];

/* eslint-disable-next-line */
export const hostnameRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/;
