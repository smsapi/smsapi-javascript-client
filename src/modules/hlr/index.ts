import isArray from 'lodash/isArray';

import { BaseModule } from '../baseModule';

import { HlrCheckResponse } from './types/HlrCheckResponse';

export class Hlr extends BaseModule {
  async check(
    numbers: string | string[],
    idx?: string | string[]
  ): Promise<HlrCheckResponse | HlrCheckResponse[]> {
    const params: Record<string, unknown> = {
      number: isArray(numbers) ? numbers.join(',') : numbers,
    };

    if (idx) {
      params.idx = isArray(idx) ? idx.join(',') : idx;
    }

    return await this.httpClient.get<
      HlrCheckResponse | HlrCheckResponse[],
      HlrCheckResponse | HlrCheckResponse[]
    >('/hlr.do', {
      params: {
        format: 'json',
        ...params,
      },
    });
  }
}
