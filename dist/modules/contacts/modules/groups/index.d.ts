import { BaseModule } from '../../../baseModule';
import { ApiCollection } from '../../../../types/ApiCollection';
import { CreateGroupDetails } from './types/CreateGroupDetails';
import { Group } from './types/Group';
import { UpdateGroup } from './types/UpdateGroup';
export declare class Groups extends BaseModule {
    get(): Promise<ApiCollection<Group>>;
    getById(groupId: string): Promise<Group>;
    create(name: string, details?: CreateGroupDetails): Promise<Group>;
    update(groupId: string, updateGroup: UpdateGroup): Promise<Group>;
    remove(groupId: string, deleteContacts?: boolean): Promise<void>;
}
