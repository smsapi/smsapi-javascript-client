import { BaseModule } from '../baseModule';
import { SmsDetails } from '../sms/types/SmsDetails';
import { MessageResponse } from '../../types/MessageResponse';
import { MessageContent } from './types/MessageContent';
interface NumberRecipient {
    to: string | string[];
}
interface GroupRecipient {
    group: string | string[];
}
declare type Recipient = NumberRecipient | GroupRecipient;
export declare class BaseMessageModule extends BaseModule {
    protected endpoint: string;
    protected send(content: MessageContent, recipient: Recipient, details?: SmsDetails): Promise<MessageResponse>;
    private isNumberRecipient;
    private isGroupRecipient;
    private isSms;
    private isMms;
    private isVmsText;
    private isVmsLocalFile;
    private isVmsRemotePath;
    private getFormDataForVmsLocalFile;
    private formatSmsDetails;
    protected formatSmsResponse(response: MessageResponse): MessageResponse;
}
export {};
