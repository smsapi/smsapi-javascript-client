import { BaseModule } from '../baseModule';

import { HlrCheckResponse } from './types/HlrCheckResponse';

export class Hlr extends BaseModule {
  async check(
    numbers: string | string[],
    idx?: string | string[],
  ): Promise<HlrCheckResponse | HlrCheckResponse[]> {
    const params: Record<string, unknown> = {
      number: Array.isArray(numbers) ? numbers.join(',') : numbers,
    };

    if (idx) {
      params.idx = Array.isArray(idx) ? idx.join(',') : idx;
    }

    return await this.httpClient.post<HlrCheckResponse | HlrCheckResponse[]>(
      '/hlr.do',
      undefined,
      {
        params: {
          format: 'json',
          ...params,
        },
      },
    );
  }
}
