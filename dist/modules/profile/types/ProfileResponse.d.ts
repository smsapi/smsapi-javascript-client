import { PaymentType } from './PaymentType';
export interface ProfileResponse {
    id: string;
    name: string;
    email: string;
    username: string;
    phoneNumber: string;
    paymentType: PaymentType;
    userType: 'native' | 'subuser';
    points?: number;
}
