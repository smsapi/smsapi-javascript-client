import { SubuserCredentials } from './SubuserCredentials';
import { SubuserPoints } from './SubuserPoints';
export interface NewSubuser {
    credentials: SubuserCredentials;
    active?: boolean;
    description?: string;
    points?: SubuserPoints;
}
