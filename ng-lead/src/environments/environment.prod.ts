import { DefaultDataServiceConfig } from '@ngrx/data';

const ngrxDataConfig: DefaultDataServiceConfig = {
  root: 'https://api.example.com/', // Production API URL
  timeout: 5000, // Request timeout in milliseconds
};

export const environment = {
  production: true,
  ngrxDataConfig,
};
