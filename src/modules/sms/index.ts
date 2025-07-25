import { BaseMessageModule } from '../baseMessageModule';
import { MessageResponse } from '../../types/MessageResponse';

import { ScheduledSmsResponse } from './types/ScheduledSmsResponse';
import { SmsDetails } from './types/SmsDetails';

export class Sms extends BaseMessageModule {
  endpoint = '/sms.do';

  async sendSms(
    numbers: string | string[],
    message: string,
    details?: SmsDetails,
  ): Promise<MessageResponse> {
    return await this.send(
      {
        message,
      },
      {
        to: numbers,
      },
      details,
    );
  }

  async sendFlashSms(
    numbers: string | string[],
    message: string,
    details?: SmsDetails,
  ): Promise<MessageResponse> {
    return await this.sendSms(numbers, message, { ...details, flash: true });
  }

  async sendSmsToGroup(
    groups: string | string[],
    message: string,
    details?: SmsDetails,
  ): Promise<MessageResponse> {
    return await this.send(
      {
        message,
      },
      {
        group: groups,
      },
      details,
    );
  }

  async sendFlashSmsToGroup(
    groups: string | string[],
    message: string,
    details?: SmsDetails,
  ): Promise<MessageResponse> {
    return await this.sendSmsToGroup(groups, message, {
      ...details,
      flash: true,
    });
  }

  async removeScheduledSms(
    smsId: string | string[],
  ): Promise<ScheduledSmsResponse> {
    const ids = Array.isArray(smsId) ? smsId.join(',') : smsId;

    return await this.httpClient.post<ScheduledSmsResponse>(this.endpoint, {
      format: 'json',
      sch_del: ids,
    });
  }
}
