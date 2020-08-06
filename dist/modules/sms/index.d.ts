import { BaseModule } from '../baseModule';
import { ScheduledSmsResponse } from './types/ScheduledSmsResponse';
import { SmsDetails } from './types/SmsDetails';
import { SmsResponse } from './types/SmsResponse';
export declare class Sms extends BaseModule {
    sendSms(numbers: string | string[], message: string, details?: SmsDetails): Promise<SmsResponse>;
    sendFlashSms(numbers: string | string[], message: string, details?: SmsDetails): Promise<SmsResponse>;
    sendSmsToGroup(groups: string | string[], message: string, details?: SmsDetails): Promise<SmsResponse>;
    sendFlashSmsToGroup(groups: string | string[], message: string, details?: SmsDetails): Promise<SmsResponse>;
    removeScheduledSms(smsId: string | string[]): Promise<ScheduledSmsResponse>;
    private send;
    private formatSmsDetails;
    private formatSmsResponse;
}
