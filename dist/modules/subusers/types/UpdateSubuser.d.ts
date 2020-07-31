import { SubuserCredentials } from './SubuserCredentials';
import { SubuserPoints } from './SubuserPoints';
export interface UpdateSubuser {
    credentials: Partial<Omit<SubuserCredentials, 'username'>>;
    active: boolean;
    description: string;
    points: Partial<SubuserPoints>;
}
