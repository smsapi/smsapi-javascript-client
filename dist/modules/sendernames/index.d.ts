import { BaseModule } from '../baseModule';
import { ApiCollection } from '../../types';
import { Sendername } from './types/Sendername';
export declare class Sendernames extends BaseModule {
    get(): Promise<ApiCollection<Sendername>>;
    getBySender(sender: string): Promise<Sendername>;
    create(sender: string): Promise<Sendername>;
    makeDefault(sender: string): Promise<void>;
    remove(sender: string): Promise<void>;
    private formatSendernameDates;
}
