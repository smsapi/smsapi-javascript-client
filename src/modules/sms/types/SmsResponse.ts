import { SmsStatus } from './SmsStatus';

export interface SmsResponse {
  count: number;
  list: {
    id: string;
    points: number;
    number: string;
    dateSent: Date;
    submittedNumber: string;
    status: SmsStatus;
    idx: string | null;
    parts: number;
  }[];
  message: string;
  length: number;
  parts: number;
}
