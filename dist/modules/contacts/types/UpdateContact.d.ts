import { NewContact } from './NewContact';
export interface UpdateContact extends NewContact {
    phoneNumber?: string;
}
