import { BaseModule } from '../baseModule';
import { SmsDetails } from '../sms/types/SmsDetails';
import { MessageResponse } from '../../types/MessageResponse';
interface SmsContent {
    message: string;
}
interface MmsContent {
    smil: string;
    subject: string;
}
export declare class BaseMessageModule extends BaseModule {
    protected endpoint: string;
    protected send(content: SmsContent | MmsContent, to?: string | string[], group?: string | string[], details?: SmsDetails): Promise<MessageResponse>;
    private isSms;
    private isMms;
    private formatSmsDetails;
    protected formatSmsResponse(response: MessageResponse): MessageResponse;
}
export {};
