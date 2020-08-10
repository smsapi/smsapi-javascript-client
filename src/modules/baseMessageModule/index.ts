import isArray from 'lodash/isArray';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';

import { BaseModule } from '../baseModule';
import { SmsDetails } from '../sms/types/SmsDetails';
import { MessageResponse } from '../../types/MessageResponse';

interface SmsApiDetails {
  [key: string]: unknown;
}

interface SmsContent {
  message: string;
}

interface MmsContent {
  smil: string;
  subject: string;
}

export class BaseMessageModule extends BaseModule {
  protected endpoint: string;

  protected async send(
    content: SmsContent | MmsContent,
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

    const data = await this.httpClient.post<MessageResponse, MessageResponse>(
      this.endpoint,
      body
    );

    return this.formatSmsResponse(data);
  }

  private isSms(content: SmsContent | MmsContent): content is SmsContent {
    return (content as SmsContent).message !== undefined;
  }

  private isMms(content: SmsContent | MmsContent): content is MmsContent {
    return (
      (content as MmsContent).smil !== undefined &&
      (content as MmsContent).subject !== undefined
    );
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
