import isArray from 'lodash/isArray';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';

import { BaseModule } from '../baseModule';

import { SmsDetails } from './types/SmsDetails';
import { SmsResponse } from './types/SmsResponse';

interface SmsApiDetails {
  [key: string]: unknown;
}

export class Sms extends BaseModule {
  async sendSms(
    numbers: string | string[],
    message: string,
    details?: SmsDetails
  ): Promise<SmsResponse> {
    const to = isArray(numbers) ? numbers.join(',') : numbers;

    return await this.send(message, to, undefined, details);
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
    const group = isArray(groups) ? groups.join(',') : groups;

    return await this.send(message, undefined, group, details);
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

  private async send(
    message: string,
    to?: string,
    group?: string,
    details?: SmsDetails
  ): Promise<SmsResponse> {
    const body: Record<string, unknown> = {
      message: message.trim(),
      details: true,
      encoding: 'utf-8',
      format: 'json',
      ...this.formatSmsDetails(details || {}),
    };

    if (to) {
      body.to = to;
    } else {
      body.group = group;
    }

    const data = await this.httpClient.post<SmsResponse, SmsResponse>(
      '/sms.do',
      body
    );

    return this.formatSmsResponse(data);
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

  private formatSmsResponse(response: SmsResponse): SmsResponse {
    return {
      ...response,
      list: response.list.map((sms) => ({
        ...sms,
        dateSent: new Date(sms.dateSent),
      })),
    };
  }
}
