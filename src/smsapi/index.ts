/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Contacts } from '../modules/contacts';
import { Hlr } from '../modules/hlr';
import { Mfa } from '../modules/mfa';
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

import { HttpClient } from './httpClient';
/* eslint-enable @typescript-eslint/ban-ts-comment */

export class SMSAPI {
  private accessToken: string;
  private serviceUrl: string;

  private httpClient: HttpClient;

  public contacts: Contacts;
  public hlr: Hlr;
  public mfa: Mfa;
  public mms: Mms;
  public profile: Profile;
  public sendernames: Sendernames;
  public sms: Sms;
  public subusers: Subusers;
  public templates: Templates;
  public vms: Vms;

  constructor(accessToken: string, serviceUrl?: string) {
    this.accessToken = accessToken;
    this.serviceUrl = serviceUrl ?? API_URL;

    this.httpClient = this.getHttpClient();

    this.contacts = new Contacts(this.getHttpClient());
    this.hlr = new Hlr(this.httpClient);
    this.mfa = new Mfa(this.httpClient);
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

  private getHttpClient(): HttpClient {
    return new HttpClient(this.serviceUrl, {
      Accept: 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
      'User-Agent': this.getUserAgent(),
    });
  }
}
