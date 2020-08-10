import { BaseMessageModule } from '../baseMessageModule';
import { MessageResponse } from '../../types/MessageResponse';
import { MmsDetails } from './types/MmsDetails';
export declare class Mms extends BaseMessageModule {
    endpoint: string;
    sendMms(numbers: string | string[], subject: string, smil: string, details?: MmsDetails): Promise<MessageResponse>;
    sendMmsToGroup(groups: string | string[], subject: string, smil: string, details?: MmsDetails): Promise<MessageResponse>;
}
