import { BaseModule } from '../baseModule';

import { PaymentType, ProfileResponse } from '../../types';

interface ApiProfileResponse {
  name: string;
  email: string;
  username: string;
  phone_number: string;
  payment_type: PaymentType;
  user_type: 'native' | 'subuser';
  points?: number;
}

export class Profile extends BaseModule {
  async get(): Promise<ProfileResponse> {
    const { data } = await this.httpClient.get<ApiProfileResponse>('/profile');

    return {
      email: data.email,
      name: data.name,
      paymentType: data.payment_type,
      phoneNumber: data.phone_number,
      userType: data.user_type,
      username: data.username,
      points: data.points,
    };
  }
}
