import axios, { AxiosInstance } from 'axios';

import { extractDataFromResponse } from '../../smsapi/httpClient/extractDataFromResponse';
import { BaseModule } from '../baseModule';
import { ApiCollection } from '../../types/ApiCollection';
import { mapKeys } from '../../helpers/mapKeys';
import { snakeCase } from '../../helpers/snakeCase';

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
  private contactHttpClient: AxiosInstance;

  public fields: Fields;
  public groups: Groups;

  constructor(httpClient: AxiosInstance) {
    super(httpClient);

    this.contactHttpClient = axios.create({
      adapter: httpClient.defaults.adapter,
      baseURL: httpClient.defaults.baseURL,
      headers: httpClient.defaults.headers,
    });

    this.contactHttpClient.interceptors.request.use(prepareParamsForRequest);
    this.contactHttpClient.interceptors.response.use(formatResponseDates);
    this.contactHttpClient.interceptors.response.use(extractDataFromResponse);

    this.fields = new Fields(this.contactHttpClient);
    this.groups = new Groups(this.contactHttpClient);
  }

  async get(params?: GetContactsQueryParams): Promise<ApiCollection<Contact>> {
    return await this.contactHttpClient.get<
      ApiCollection<Contact>,
      ApiCollection<Contact>
    >('/contacts', {
      params,
    });
  }

  async getById(contactId: string): Promise<Contact> {
    return await this.contactHttpClient.get<Contact, Contact>(
      `/contacts/${contactId}`,
    );
  }

  async create(phoneNumber: string, details?: NewContact): Promise<Contact> {
    return await this.contactHttpClient.post<Contact, Contact>('/contacts', {
      phone_number: phoneNumber,
      ...this.formatContactDetails(details || {}),
    });
  }

  async update(
    contactId: string,
    updateContact: UpdateContact,
  ): Promise<Contact> {
    return await this.contactHttpClient.put<Contact, Contact>(
      `/contacts/${contactId}`,
      {
        ...this.formatContactDetails(updateContact || {}),
      },
    );
  }

  async remove(contactId: string): Promise<void> {
    await this.contactHttpClient.delete(`/contacts/${contactId}`);
  }

  async getGroups(contactId: string): Promise<ApiCollection<Group>> {
    return await this.contactHttpClient.get<
      ApiCollection<Group>,
      ApiCollection<Group>
    >(`/contacts/${contactId}/groups`);
  }

  async getGroupById(contactId: string, groupId: string): Promise<Group> {
    return await this.contactHttpClient.get<Group, Group>(
      `/contacts/${contactId}/groups/${groupId}`,
    );
  }

  async assignContactToGroup(
    contactId: string,
    groupId: string,
  ): Promise<ApiCollection<Group>> {
    return await this.contactHttpClient.put<
      ApiCollection<Group>,
      ApiCollection<Group>
    >(`/contacts/${contactId}/groups/${groupId}`);
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
