import { Contacts } from '../modules/contacts';
import { Hlr } from '../modules/hlr';
import { Mms } from '../modules/mms';
import { Profile } from '../modules/profile';
import { Sendernames } from '../modules/sendernames';
import { Sms } from '../modules/sms';
import { Subusers } from '../modules/subusers';
import { Templates } from '../modules/templates';
import { Vms } from '../modules/vms';

import { HttpClient } from './httpClient';

export class SMSAPI {
  private httpClient: HttpClient;

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
    this.httpClient = new HttpClient(accessToken);

    this.contacts = new Contacts(new HttpClient(accessToken));
    this.hlr = new Hlr(this.httpClient);
    this.mms = new Mms(this.httpClient);
    this.profile = new Profile(this.httpClient);
    this.sendernames = new Sendernames(this.httpClient);
    this.sms = new Sms(this.httpClient);
    this.subusers = new Subusers(this.httpClient);
    this.templates = new Templates(this.httpClient);
    this.vms = new Vms(this.httpClient);
  }
}
