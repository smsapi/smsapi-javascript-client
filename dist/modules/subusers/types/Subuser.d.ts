import { SubuserPoints } from './SubuserPoints';
export interface Subuser {
    id: string;
    username: string;
    active: boolean;
    description: string | null;
    points: SubuserPoints;
}
