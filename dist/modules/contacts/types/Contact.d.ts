import { ContactGender } from './ContactGender';
export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    gender: ContactGender;
    birthdayDate: Date;
    description: string;
    city: string;
    source: string;
}
