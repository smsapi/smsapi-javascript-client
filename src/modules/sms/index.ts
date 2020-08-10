import isArray from 'lodash/isArray';

import { BaseMessageModule } from '../baseMessageModule';

import { ScheduledSmsResponse } from './types/ScheduledSmsResponse';
import { SmsDetails } from './types/SmsDetails';
import { SmsResponse } from './types/SmsResponse';

export class Sms extends BaseMessageModule {
  endpoint = '/sms.do';

  async sendSms(
    numbers: string | string[],
    message: string,
    details?: SmsDetails
  ): Promise<SmsResponse> {
    return await this.send(message, numbers, undefined, details);
  }

  async sendFlashSms(
    numbers: string | string[],
    message: string,
    details?: SmsDetails
  ): Promise<SmsResponse> {
    return await this.sendSms(numbers, message, { ...details, flash: true });
  }

  async sendSmsToGroup(
    groups: string | string[],
    message: string,
    details?: SmsDetails
  ): Promise<SmsResponse> {
    return await this.send(message, undefined, groups, details);
  }

  async sendFlashSmsToGroup(
    groups: string | string[],
    message: string,
    details?: SmsDetails
  ): Promise<SmsResponse> {
    return await this.sendSmsToGroup(groups, message, {
      ...details,
      flash: true,
    });
  }

  async removeScheduledSms(
    smsId: string | string[]
  ): Promise<ScheduledSmsResponse> {
    const ids = isArray(smsId) ? smsId.join(',') : smsId;

    return await this.httpClient.post<
      ScheduledSmsResponse,
      ScheduledSmsResponse
    >(this.endpoint, {
      format: 'json',
      sch_del: ids,
    });
  }
}
