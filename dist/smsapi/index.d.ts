import { Contacts } from '../modules/contacts';
import { Hlr } from '../modules/hlr';
import { Mms } from '../modules/mms';
import { Profile } from '../modules/profile';
import { Sendernames } from '../modules/sendernames';
import { Sms } from '../modules/sms';
import { Subusers } from '../modules/subusers';
import { Templates } from '../modules/templates';
import { Vms } from '../modules/vms';
export declare class SMSAPI {
    private accessToken;
    private httpClient;
    contacts: Contacts;
    hlr: Hlr;
    mms: Mms;
    profile: Profile;
    sendernames: Sendernames;
    sms: Sms;
    subusers: Subusers;
    templates: Templates;
    vms: Vms;
    constructor(accessToken: string);
    private getUserAgent;
    private setHttpClient;
}
