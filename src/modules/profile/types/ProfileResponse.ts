import { PaymentType } from './PaymentType';

export interface ProfileResponse {
  name: string;
  email: string;
  username: string;
  phoneNumber: string;
  paymentType: PaymentType;
  userType: 'native' | 'subuser';
  points?: number;
}
