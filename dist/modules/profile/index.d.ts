import { BaseModule } from '../baseModule';
import { ProfileResponse } from '../../types';
export declare class Profile extends BaseModule {
    get(): Promise<ProfileResponse>;
}
