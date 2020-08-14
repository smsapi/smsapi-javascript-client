import isArray from 'lodash/isArray';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';

import { BaseModule } from '../baseModule';
import { SmsDetails } from '../sms/types/SmsDetails';
import { MessageResponse } from '../../types/MessageResponse';

import {
  MessageContent,
  SmsContent,
  MmsContent,
  VmsTextContent,
  VmsLocalFileContent,
  VmsRemoteFileContent,
} from './types/MessageContent';

interface SmsApiDetails {
  [key: string]: unknown;
}

export class BaseMessageModule extends BaseModule {
  protected endpoint: string;

  // constructor(httpClient: AxiosInstance) {
  //   super(httpClient);

  //   this.httpClient.interceptors.request.use((config) => {
  //     const params = config.params;

  //     return {
  //       ...config,
  //       params: mapValues(params, (param) => {
  //         if (typeof param !== 'boolean') {
  //           return param;
  //         }

  //         return +param;
  //       }),
  //     };
  //   });
  // }

  protected async send(
    content: MessageContent,
    to?: string | string[],
    group?: string | string[],
    details?: SmsDetails
  ): Promise<MessageResponse> {
    const body: Record<string, unknown> = {
      details: true,
      encoding: 'utf-8',
      format: 'json',
      ...this.formatSmsDetails(details || {}),
    };

    if (to) {
      body.to = isArray(to) ? to.join(',') : to;
    } else {
      body.group = isArray(group) ? group.join(',') : group;
    }

    if (this.isSms(content)) {
      body.message = content.message.trim();
    }

    if (this.isMms(content)) {
      body.subject = content.subject.trim();
      body.smil = content.smil;
    }

    if (this.isVmsText(content)) {
      body.tts = content.tts.trim();
      body.tts_lector = content.ttsLector || 'ewa';
    }

    if (this.isVmsRemotePath(content)) {
      body.file = content.remotePath;
    }

    if (this.isVmsLocalFile(content)) {
      // const options = {
      //   knownLength: fs.statSync(content.localPath).size,
      // };
      // const file = fs.createReadStream(content.localPath);
      // const form = new FormData();
      // form.append('file', file, options);
      // const ret = form.pipe(
      //   concat((data: FormData) => {
      //     this.httpClient.post(this.endpoint, data, {
      //       headers: {
      //         ...form.getHeaders(),
      //         'Content-length': options.knownLength,
      //       },
      //       params: body,
      //     });
      //   })
      // );
    }

    const data = await this.httpClient.post<MessageResponse, MessageResponse>(
      this.endpoint,
      body
    );

    return this.formatSmsResponse(data);
  }

  private isSms(content: MessageContent): content is SmsContent {
    return (content as SmsContent).message !== undefined;
  }

  private isMms(content: MessageContent): content is MmsContent {
    return (
      (content as MmsContent).smil !== undefined &&
      (content as MmsContent).subject !== undefined
    );
  }

  private isVmsText(content: MessageContent): content is VmsTextContent {
    return (content as VmsTextContent).tts !== undefined;
  }

  private isVmsLocalFile(
    content: MessageContent
  ): content is VmsLocalFileContent {
    return (content as VmsLocalFileContent).localPath !== undefined;
  }

  private isVmsRemotePath(
    content: MessageContent
  ): content is VmsRemoteFileContent {
    return (content as VmsRemoteFileContent).remotePath !== undefined;
  }

  private formatSmsDetails(details: SmsDetails): SmsApiDetails {
    const formattedDetails = details as Record<string, unknown>;

    if (details.date) {
      formattedDetails.dateValidate = true;
      formattedDetails.date = details.date.toISOString();
    }

    if (details.expirationDate) {
      formattedDetails.expirationDate = details.expirationDate.toISOString();
    }

    return mapKeys(formattedDetails, (_, key) => {
      if (/param[1-4]/.test(key)) {
        return key;
      }

      if (key === 'noUnicode') {
        return key.toLowerCase();
      }

      return snakeCase(key);
    });
  }

  protected formatSmsResponse(response: MessageResponse): MessageResponse {
    return {
      ...response,
      list: response.list.map((sms) => ({
        ...sms,
        dateSent: new Date(sms.dateSent),
        points:
          typeof sms.points === 'string' ? parseFloat(sms.points) : sms.points,
      })),
    };
  }
}
