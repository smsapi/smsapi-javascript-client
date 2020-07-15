import axios, { AxiosInstance } from 'axios';

import { version } from '../../package.json';

export class SMSAPI {
  private apiUrl: string;
  private accessToken: string;

  private httpClient: AxiosInstance;

  constructor(accessToken: string, apiUrl: string) {
    this.accessToken = accessToken;
    this.apiUrl = apiUrl;

    this.setHttpClient();
  }

  private getUserAgent(): string {
    return `smsapi/js-client:${version}`;
  }

  private setHttpClient(): void {
    this.httpClient = axios.create({
      baseURL: this.apiUrl,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
        'User-Agent': this.getUserAgent(),
      },
    });
  }
}
