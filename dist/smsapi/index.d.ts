import { Hlr } from '../modules/hlr';
import { Profile } from '../modules/profile';
import { Sendernames } from '../modules/sendernames';
import { Templates } from '../modules/templates';
export declare class SMSAPI {
    private apiUrl;
    private accessToken;
    private httpClient;
    hlr: Hlr;
    profile: Profile;
    sendernames: Sendernames;
    templates: Templates;
    constructor(accessToken: string, apiUrl: string);
    private getUserAgent;
    private setHttpClient;
}
