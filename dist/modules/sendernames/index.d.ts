import { BaseModule } from '../baseModule';
import { ApiCollection } from '../../types';
import { Sendername } from './types/Sendername';
import { SendernameStatus } from './types/SendernameStatus';
export interface ApiSendername {
    createdAt: string;
    isDefault: boolean;
    sender: string;
    status: SendernameStatus;
}
export declare class Sendernames extends BaseModule {
    get(): Promise<ApiCollection<Sendername>>;
    getBySender(sender: string): Promise<Sendername>;
    create(sender: string): Promise<Sendername>;
    makeDefault(sender: string): Promise<void>;
    remove(sender: string): Promise<void>;
}
