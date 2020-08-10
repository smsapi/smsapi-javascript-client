import { BaseMessageModule } from '../baseMessageModule';
import { MessageResponse } from '../../types/MessageResponse';
import { ScheduledSmsResponse } from './types/ScheduledSmsResponse';
import { SmsDetails } from './types/SmsDetails';
export declare class Sms extends BaseMessageModule {
    endpoint: string;
    sendSms(numbers: string | string[], message: string, details?: SmsDetails): Promise<MessageResponse>;
    sendFlashSms(numbers: string | string[], message: string, details?: SmsDetails): Promise<MessageResponse>;
    sendSmsToGroup(groups: string | string[], message: string, details?: SmsDetails): Promise<MessageResponse>;
    sendFlashSmsToGroup(groups: string | string[], message: string, details?: SmsDetails): Promise<MessageResponse>;
    removeScheduledSms(smsId: string | string[]): Promise<ScheduledSmsResponse>;
}
