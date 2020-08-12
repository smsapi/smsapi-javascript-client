import { ContactGender } from './ContactGender';
export interface NewContact {
    firstName?: string;
    lastName?: string;
    email?: string;
    gender?: ContactGender;
    birthdayDate?: Date;
    description?: string;
    city?: string;
    source?: string;
}
