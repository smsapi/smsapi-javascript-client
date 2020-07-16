import { AxiosInstance } from 'axios';

export class BaseModule {
  protected httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }
}
