import { BaseModule } from '../baseModule';
import { ProfileResponse } from './types/ProfileResponse';
export declare class Profile extends BaseModule {
    get(): Promise<ProfileResponse>;
}
