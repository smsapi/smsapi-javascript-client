import { BaseModule } from '../baseModule';

import { HlrCheckResponse } from './types/HlrCheckResponse';

export class Hlr extends BaseModule {
  async check(
    numbers: string[],
    idx = ''
  ): Promise<HlrCheckResponse | HlrCheckResponse[]> {
    const { data } = await this.httpClient.get<
      HlrCheckResponse | HlrCheckResponse[]
    >('/hlr.do', {
      params: {
        format: 'json',
        idx: idx || undefined,
        number: numbers.join(','),
      },
    });

    return data;
  }
}
