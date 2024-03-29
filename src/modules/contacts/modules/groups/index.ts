import { BaseModule } from '../../../baseModule';
import { ApiCollection } from '../../../../types/ApiCollection';

import { CreateGroupDetails } from './types/CreateGroupDetails';
import { Group } from './types/Group';
import { UpdateGroup } from './types/UpdateGroup';

export class Groups extends BaseModule {
  async get(): Promise<ApiCollection<Group>> {
    return await this.httpClient.get<
      ApiCollection<Group>,
      ApiCollection<Group>
    >('/contacts/groups');
  }

  async getById(groupId: string): Promise<Group> {
    return await this.httpClient.get<Group, Group>(
      `/contacts/groups/${groupId}`,
    );
  }

  async create(name: string, details?: CreateGroupDetails): Promise<Group> {
    return await this.httpClient.post<Group, Group>('/contacts/groups', {
      name,
      ...details,
    });
  }

  async update(groupId: string, updateGroup: UpdateGroup): Promise<Group> {
    return await this.httpClient.put<Group, Group>(
      `/contacts/groups/${groupId}`,
      updateGroup,
    );
  }

  async remove(groupId: string, deleteContacts = false): Promise<void> {
    await this.httpClient.delete(`/contacts/groups/${groupId}`, {
      params: {
        deleteContacts,
      },
    });
  }
}
