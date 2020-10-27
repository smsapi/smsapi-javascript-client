import { AxiosInstance } from 'axios';
import { BaseModule } from '../baseModule';
import { ApiCollection } from '../../types/ApiCollection';
import { Contact } from './types/Contact';
import { NewContact } from './types/NewContact';
import { GetContactsQueryParams } from './types/GetContactsQueryParams';
import { Groups } from './modules/groups';
import { Group } from './modules/groups/types/Group';
import { UpdateContact } from './types/UpdateContact';
import { Fields } from './modules/fields';
export declare class Contacts extends BaseModule {
    private contactHttpClient;
    fields: Fields;
    groups: Groups;
    constructor(httpClient: AxiosInstance);
    get(params?: GetContactsQueryParams): Promise<ApiCollection<Contact>>;
    getById(contactId: string): Promise<Contact>;
    create(phoneNumber: string, details?: NewContact): Promise<Contact>;
    update(contactId: string, updateContact: UpdateContact): Promise<Contact>;
    remove(contactId: string): Promise<void>;
    getGroups(contactId: string): Promise<ApiCollection<Group>>;
    getGroupById(contactId: string, groupId: string): Promise<Group>;
    assignContactToGroup(contactId: string, groupId: string): Promise<ApiCollection<Group>>;
    unpinContactFromGroup(contactId: string, groupId: string): Promise<void>;
    private formatContactDetails;
}
