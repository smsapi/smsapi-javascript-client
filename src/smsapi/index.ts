/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosInstance } from 'axios';

import { Contacts } from '../modules/contacts';
import { Hlr } from '../modules/hlr';
import { Mms } from '../modules/mms';
import { Profile } from '../modules/profile';
import { Sendernames } from '../modules/sendernames';
import { Sms } from '../modules/sms';
import { Subusers } from '../modules/subusers';
import { Templates } from '../modules/templates';
import { Vms } from '../modules/vms';
// @ts-ignore TS6059
import { version } from '../../package.json';
import { API_URL } from '../constants';

import { extractDataFromResponse } from './httpClient/extractDataFromResponse';
/* eslint-enable @typescript-eslint/ban-ts-comment */

export class SMSAPI {
  private accessToken: string;

  private httpClient: AxiosInstance;

  public contacts: Contacts;
  public hlr: Hlr;
  public mms: Mms;
  public profile: Profile;
  public sendernames: Sendernames;
  public sms: Sms;
  public subusers: Subusers;
  public templates: Templates;
  public vms: Vms;

  constructor(accessToken: string) {
    this.accessToken = accessToken;

    this.httpClient = this.setHttpClient();

    this.contacts = new Contacts(this.httpClient);
    this.hlr = new Hlr(this.httpClient);
    this.mms = new Mms(this.httpClient);
    this.profile = new Profile(this.httpClient);
    this.sendernames = new Sendernames(this.httpClient);
    this.sms = new Sms(this.httpClient);
    this.subusers = new Subusers(this.httpClient);
    this.templates = new Templates(this.httpClient);
    this.vms = new Vms(this.httpClient);
  }

  private getUserAgent(): string {
    return `smsapi/js-client:${version}`;
  }

  private setHttpClient(): AxiosInstance {
    const httpClient = axios.create({
      adapter: 'http',
      baseURL: API_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
        'User-Agent': this.getUserAgent(),
      },
    });

    httpClient.interceptors.response.use(extractDataFromResponse);

    return httpClient;
  }
}
