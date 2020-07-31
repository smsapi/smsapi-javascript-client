import { BaseModule } from '../baseModule';
import { ApiCollection, NewSubuser } from '../../types';
import { Subuser } from './types/Subuser';
import { UpdateSubuser } from './types/UpdateSubuser';
export interface ApiSubuser extends Omit<Omit<Subuser, 'credentials'>, 'points'> {
    credentials: {
        username: string;
        password: string;
        api_password: string;
    };
    points: {
        from_account: number;
        per_month: number;
    };
}
export declare class Subusers extends BaseModule {
    get(): Promise<ApiCollection<Subuser>>;
    getById(subuserId: string): Promise<Subuser>;
    create(newSubuser: NewSubuser): Promise<Subuser>;
    update(subuserId: string, updateSubuser: Partial<UpdateSubuser>): Promise<Subuser>;
    remove(subuserId: string): Promise<void>;
}
