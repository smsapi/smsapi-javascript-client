import { AxiosInstance } from 'axios';

import { ProfileResponse } from '../../types/ProfileResponse';

export class Profile {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async get(): Promise<ProfileResponse> {
    const { data } = await this.httpClient.get('/profile');

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
