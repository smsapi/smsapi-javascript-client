import { AxiosInstance } from 'axios';
import { BaseModule } from '../baseModule';
import { ApiCollection } from '../../types/ApiCollection';
import { Contact } from './types/Contact';
import { NewContact } from './types/NewContact';
import { GetContactsQueryParams } from './types/GetContactsQueryParams';
export declare class Contacts extends BaseModule {
    constructor(httpClient: AxiosInstance);
    get(params?: GetContactsQueryParams): Promise<ApiCollection<Contact>>;
    create(phoneNumber: string, details?: NewContact): Promise<Contact>;
    remove(contactId: string): Promise<void>;
    private formatDate;
    private formatContactDetails;
}
