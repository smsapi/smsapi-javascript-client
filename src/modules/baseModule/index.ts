import { HttpClient } from '../../smsapi/httpClient';

export class BaseModule {
  protected httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
}
