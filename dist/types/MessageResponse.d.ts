import { MessageStatus } from './MessageStatus';
export interface MessageResponse {
    count: number;
    list: {
        id: string;
        points: number;
        number: string;
        dateSent: Date;
        submittedNumber: string;
        status: MessageStatus;
        idx: string | null;
        parts?: number;
    }[];
    message?: string;
    length: number;
    parts?: number;
}
