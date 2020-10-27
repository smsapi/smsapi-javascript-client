import { CreateGroupDetails } from './CreateGroupDetails';
export interface UpdateGroup extends Partial<CreateGroupDetails> {
    name?: string;
}
