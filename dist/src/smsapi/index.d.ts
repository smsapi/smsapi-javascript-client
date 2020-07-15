export declare class SMSAPI {
    private apiUrl;
    private accessToken;
    private httpClient;
    constructor(accessToken: string, apiUrl: string);
    private getUserAgent;
    private setHttpClient;
}
