/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosInstance } from 'axios';
// @ts-ignore TS7016
import adapter from 'axios/lib/adapters/http';

import { Hlr } from '../modules/hlr';
import { Profile } from '../modules/profile';
// @ts-ignore TS6059
import { version } from '../../package.json';
/* eslint-enable @typescript-eslint/ban-ts-comment */

export class SMSAPI {
  private apiUrl: string;
  private accessToken: string;

  private httpClient: AxiosInstance;

  public hlr: Hlr;
  public profile: Profile;

  constructor(accessToken: string, apiUrl: string) {
    this.accessToken = accessToken;
    this.apiUrl = apiUrl;

    this.httpClient = this.setHttpClient();

    this.hlr = new Hlr(this.httpClient);
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
