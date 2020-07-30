import { BaseModule } from '../baseModule';

import { ProfileResponse } from './types/ProfileResponse';

export class Profile extends BaseModule {
  async get(): Promise<ProfileResponse> {
    return await this.httpClient.get('/profile');
  }
}
