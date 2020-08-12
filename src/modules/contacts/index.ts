import { stringify } from 'querystring';

import { AxiosInstance } from 'axios';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import isArray from 'lodash/isArray';
import snakeCase from 'lodash/snakeCase';

import { BaseModule } from '../baseModule';
import { ApiCollection } from '../../types/ApiCollection';

import { Contact } from './types/Contact';
import { NewContact } from './types/NewContact';
import { GetContactsQueryParams } from './types/GetContactsQueryParams';

export class Contacts extends BaseModule {
  constructor(httpClient: AxiosInstance) {
    super(httpClient);

    this.httpClient.interceptors.request.use((config) => {
      const { data, method, params } = config;

      if (method?.toLowerCase() === 'get') {
        let formattedParams = mapValues(params, (value, key) => {
          if (key === 'birthdayDate') {
            if (isArray(value)) {
              return value.map(this.formatDate);
            }

            return this.formatDate(value);
          }

          return value;
        });

        formattedParams = mapKeys(formattedParams, (_, key) => {
          return snakeCase(key);
        });

        return {
          ...config,
          params: formattedParams,
          paramsSerializer: (params) => stringify(params),
        };
      }

      if (data) {
        return {
          ...config,
          data: stringify(data),
        };
      }

      return config;
    });
  }

  async get(params?: GetContactsQueryParams): Promise<ApiCollection<Contact>> {
    return await this.httpClient.get<
      ApiCollection<Contact>,
      ApiCollection<Contact>
    >('/contacts', {
      params,
    });
  }

  async create(phoneNumber: string, details?: NewContact): Promise<Contact> {
    return await this.httpClient.post<Contact, Contact>('/contacts', {
      phone_number: phoneNumber,
      ...this.formatContactDetails(details || {}),
    });
  }

  async remove(contactId: string): Promise<void> {
    await this.httpClient.delete(`/contacts/${contactId}`);
  }

  private formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  private formatContactDetails(details: NewContact): Record<string, unknown> {
    const formattedDetails = details as Record<string, unknown>;

    if (details.birthdayDate) {
      formattedDetails.birthdayDate = this.formatDate(details.birthdayDate);
    }

    return mapKeys(formattedDetails, (_, key) => {
      return snakeCase(key);
    });
  }
}
