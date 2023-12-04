import { BaseModule } from '../baseModule';
import { ApiCollection } from '../../types/ApiCollection';
import { mapKeys } from '../../helpers/mapKeys';
import { snakeCase } from '../../helpers/snakeCase';
import { HttpClient } from '../../smsapi/httpClient';

import { Contact } from './types/Contact';
import { NewContact } from './types/NewContact';
import { GetContactsQueryParams } from './types/GetContactsQueryParams';
import { formatDate } from './helpers/formatDate';
import { prepareParamsForRequest } from './httpClient/prepareParamsForRequest';
import { Groups } from './modules/groups';
import { Group } from './modules/groups/types/Group';
import { formatResponseDates } from './httpClient/formatResponseDates';
import { UpdateContact } from './types/UpdateContact';
import { Fields } from './modules/fields';

export class Contacts extends BaseModule {
  private contactHttpClient: HttpClient;

  public fields: Fields;
  public groups: Groups;

  constructor(httpClient: HttpClient) {
    super(httpClient);

    this.contactHttpClient = httpClient;

    this.contactHttpClient.addRequestInterceptors(prepareParamsForRequest);
    this.contactHttpClient.addResponseInterceptors(formatResponseDates);

    this.fields = new Fields(this.contactHttpClient);
    this.groups = new Groups(this.contactHttpClient);
  }

  async get(params?: GetContactsQueryParams): Promise<ApiCollection<Contact>> {
    return await this.contactHttpClient.get<ApiCollection<Contact>>(
      '/contacts',
      {
        params,
      },
    );
  }

  async getById(contactId: string): Promise<Contact> {
    return await this.contactHttpClient.get<Contact>(`/contacts/${contactId}`);
  }

  async create(phoneNumber: string, details?: NewContact): Promise<Contact> {
    return await this.contactHttpClient.post<Contact>('/contacts', {
      data: {
        phone_number: phoneNumber,
        ...this.formatContactDetails(details || {}),
      },
    });
  }

  async update(
    contactId: string,
    updateContact: UpdateContact,
  ): Promise<Contact> {
    return await this.contactHttpClient.put<Contact>(`/contacts/${contactId}`, {
      data: this.formatContactDetails(updateContact || {}),
    });
  }

  async remove(contactId: string): Promise<void> {
    await this.contactHttpClient.delete(`/contacts/${contactId}`);
  }

  async getGroups(contactId: string): Promise<ApiCollection<Group>> {
    return await this.contactHttpClient.get<ApiCollection<Group>>(
      `/contacts/${contactId}/groups`,
    );
  }

  async getGroupById(contactId: string, groupId: string): Promise<Group> {
    return await this.contactHttpClient.get<Group>(
      `/contacts/${contactId}/groups/${groupId}`,
    );
  }

  async assignContactToGroup(
    contactId: string,
    groupId: string,
  ): Promise<ApiCollection<Group>> {
    return await this.contactHttpClient.put<ApiCollection<Group>>(
      `/contacts/${contactId}/groups/${groupId}`,
    );
  }

  async unpinContactFromGroup(
    contactId: string,
    groupId: string,
  ): Promise<void> {
    await this.contactHttpClient.delete(
      `/contacts/${contactId}/groups/${groupId}`,
    );
  }

  private formatContactDetails(details: NewContact): Record<string, unknown> {
    const formattedDetails = details as Record<string, unknown>;

    if (details.birthdayDate) {
      formattedDetails.birthdayDate = formatDate(details.birthdayDate);
    }

    return mapKeys(formattedDetails, snakeCase);
  }
}
