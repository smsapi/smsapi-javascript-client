import { BaseModule } from '../baseModule';

import { HlrCheckResponse } from './types/HlrCheckResponse';

export class Hlr extends BaseModule {
  async check(
    numbers: string[],
    idx?: string
  ): Promise<HlrCheckResponse | HlrCheckResponse[]> {
    return await this.httpClient.get('/hlr.do', {
      params: {
        format: 'json',
        idx,
        number: numbers.join(','),
      },
    });
  }
}
