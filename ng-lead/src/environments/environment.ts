import { DefaultDataServiceConfig } from '@ngrx/data';

const ngrxDataConfig: DefaultDataServiceConfig = {
  root: 'https://dev-api.example.com/', // Development API URL
  timeout: 3000, // Request timeout in milliseconds
};

export const environment = {
  production: false,
  ngrxDataConfig,
  mockApiDelay: 2000,
};
