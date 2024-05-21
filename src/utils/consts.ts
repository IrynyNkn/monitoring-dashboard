export const BE_URL = 'http://127.0.0.1:8000/api/v1';
export const authStorageKey = 'monitoring-auth-storage';
// export const BE_URL = 'http://127.0.0.1:52840/api/v1';

export const pingPeriods = [
  {
    label: '30sec',
    value: 30,
  },
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

/* eslint-disable-next-line */
export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

/* eslint-disable-next-line */
export const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
