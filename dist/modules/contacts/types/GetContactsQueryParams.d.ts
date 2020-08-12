import { ContactGender } from './ContactGender';
export interface GetContactsQueryParams {
    q?: string;
    offset?: number;
    limit?: number;
    orderBy?: 'first_name' | 'last_name' | 'date_updated' | 'date_created';
    phoneNumber?: string | string[];
    email?: string | string[];
    firstName?: string | string[];
    lastName?: string | string[];
    groupId?: string | string[];
    gender?: ContactGender;
    birthdayDate?: Date | Date[];
}
