import { BaseModule } from '../baseModule';
import { MfaGenerateCodeOptions } from './types/MfaGenerateCodeOptions';
import { MfaResponse } from './types/MfaResponse';

export class Mfa extends BaseModule {
  async generateCode(number: string, options?: MfaGenerateCodeOptions): Promise<MfaResponse> {
    return await this.httpClient.post<MfaResponse>('/mfa/codes', {
      phone_number: number,
      ...options,
    });
  }

  async verifyCode(number: string, code: string): Promise<void> {
    return await this.httpClient.post<void>('/mfa/codes/verifications', {
      phone_number: number,
      code,
    });
  }
}
