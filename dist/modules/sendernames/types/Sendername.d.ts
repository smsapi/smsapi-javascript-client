import { SendernameStatus } from './SendernameStatus';
export interface Sendername {
    createdAt: Date;
    isDefault: boolean;
    sender: string;
    status: SendernameStatus;
}
