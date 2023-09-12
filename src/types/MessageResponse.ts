import { MessageStatus } from './MessageStatus';

export interface ApiMessageResponse {
  count: number;
  list: {
    id: string;
    points: number;
    number: string;
    dateSent: number;
    submittedNumber: string;
    status: MessageStatus;
    idx: string | null;
    parts?: number;
  }[];
  message?: string;
  length: number;
  parts?: number;
}

export interface MessageResponse extends Omit<ApiMessageResponse, 'list'> {
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
}
