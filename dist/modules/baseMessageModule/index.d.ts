import { AxiosInstance } from 'axios';
import { BaseModule } from '../baseModule';
import { SmsDetails } from '../sms/types/SmsDetails';
import { MessageResponse } from '../../types/MessageResponse';
import { MessageContent } from './types/MessageContent';
export declare class BaseMessageModule extends BaseModule {
    protected endpoint: string;
    constructor(httpClient: AxiosInstance);
    protected send(content: MessageContent, to?: string | string[], group?: string | string[], details?: SmsDetails): Promise<MessageResponse>;
    private isSms;
    private isMms;
    private isVmsText;
    private isVmsLocalFile;
    private isVmsRemotePath;
    private formatSmsDetails;
    protected formatSmsResponse(response: MessageResponse): MessageResponse;
}
