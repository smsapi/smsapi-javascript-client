import { BaseMessageModule } from '../baseMessageModule';
import { MessageResponse } from '../../types/MessageResponse';
import { VmsTtsLector } from './types/VmsTtsLector';
import { VmsDetails } from './types/VmsDetails';
export declare class Vms extends BaseMessageModule {
    endpoint: string;
    sendVms(numbers: string | string[], tts: string, ttsLector?: VmsTtsLector, details?: VmsDetails): Promise<MessageResponse>;
    sendVmsWithLocalFile(numbers: string | string[], pathToLocaleFile: string, details?: VmsDetails): Promise<MessageResponse>;
    sendVmsWithRemoteFile(numbers: string | string[], pathToRemoteFile: string, details?: VmsDetails): Promise<MessageResponse>;
    sendVmsToGroup(groups: string | string[], tts: string, ttsLector?: VmsTtsLector, details?: VmsDetails): Promise<MessageResponse>;
    sendVmsWithLocalFileToGroup(groups: string | string[], pathToLocaleFile: string, details?: VmsDetails): Promise<MessageResponse>;
    sendVmsWithRemoteFileToGroup(groups: string | string[], pathToRemoteFile: string, details?: VmsDetails): Promise<MessageResponse>;
}
