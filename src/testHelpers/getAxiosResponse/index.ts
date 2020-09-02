import { AxiosResponse } from 'axios';

export const getAxiosResponse = (data: unknown): AxiosResponse => ({
  config: {},
  data,
  headers: {},
  status: 200,
  statusText: 'OK',
});
