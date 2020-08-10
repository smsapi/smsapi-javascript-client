import { VmsTtsLector } from '../../vms/types/VmsTtsLector';
export interface SmsContent {
    message: string;
}
export interface MmsContent {
    smil: string;
    subject: string;
}
export interface VmsTextContent {
    tts: string;
    ttsLector?: VmsTtsLector;
}
export interface VmsLocalFileContent {
    localPath: string;
}
export interface VmsRemoteFileContent {
    remotePath: string;
}
export declare type MessageContent = MmsContent | SmsContent | VmsLocalFileContent | VmsRemoteFileContent | VmsTextContent;
