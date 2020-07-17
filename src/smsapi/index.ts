import axios, { AxiosInstance } from 'axios';
// @ts-ignore
import adapter from 'axios/lib/adapters/http';

import { Profile } from '../modules/profile';
// @ts-ignore
import { version } from '../../package.json';

export class SMSAPI {
  private apiUrl: string;
  private accessToken: string;

  private httpClient: AxiosInstance;

  public profile: Profile;

  constructor(accessToken: string, apiUrl: string) {
    this.accessToken = accessToken;
    this.apiUrl = apiUrl;

    this.httpClient = this.setHttpClient();

    this.profile = new Profile(this.httpClient);
  }

  private getUserAgent(): string {
    return `smsapi/js-client:${version}`;
  }

  private setHttpClient(): AxiosInstance {
    return axios.create({
      adapter,
      baseURL: this.apiUrl,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
        'User-Agent': this.getUserAgent(),
      },
    });
  }
}
