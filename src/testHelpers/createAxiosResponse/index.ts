import { AxiosResponse } from 'axios';

export const createAxiosResponse = (data: unknown): AxiosResponse => ({
  config: {},
  data,
  headers: {},
  status: 200,
  statusText: 'OK',
});
