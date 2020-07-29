import { Hlr } from '../modules/hlr';
import { Profile } from '../modules/profile';
import { Templates } from '../modules/templates';
export declare class SMSAPI {
    private apiUrl;
    private accessToken;
    private httpClient;
    hlr: Hlr;
    profile: Profile;
    templates: Templates;
    constructor(accessToken: string, apiUrl: string);
    private getUserAgent;
    private setHttpClient;
}
