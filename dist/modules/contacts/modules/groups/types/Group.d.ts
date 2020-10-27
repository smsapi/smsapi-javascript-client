import { GroupPermission } from './GroupPermission';
export interface Group {
    id: string;
    name: string;
    description: string;
    contactsCount: number;
    dateCreated: Date;
    dateUpdated: Date;
    createdBy: string;
    idx: string | null;
    permissions: GroupPermission[];
}
