import { Profile } from '../modules/profile';
export declare class SMSAPI {
    private apiUrl;
    private accessToken;
    private httpClient;
    profile: Profile;
    constructor(accessToken: string, apiUrl: string);
    private getUserAgent;
    private setHttpClient;
}
