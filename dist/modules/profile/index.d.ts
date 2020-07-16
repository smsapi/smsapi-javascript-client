import { AxiosInstance } from 'axios';
import { ProfileResponse } from '../../types/ProfileResponse';
export declare class Profile {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    get(): Promise<ProfileResponse>;
}
