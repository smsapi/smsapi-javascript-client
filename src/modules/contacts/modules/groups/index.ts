import { BaseModule } from '../../../baseModule';

import { CreateGroupDetails } from './types/CreateGroupDetails';
import { Group } from './types/Group';

export class Groups extends BaseModule {
  async getById(groupId: string): Promise<Group> {
    return await this.httpClient.get<Group, Group>(
      `/contacts/groups/${groupId}`
    );
  }

  async create(name: string, details?: CreateGroupDetails): Promise<Group> {
    return await this.httpClient.post<Group, Group>('/contacts/groups', {
      name,
      ...details,
    });
  }

  async remove(groupId: string, deleteContacts = false): Promise<void> {
    await this.httpClient.delete(`/contacts/groups/${groupId}`, {
      params: {
        deleteContacts,
      },
    });
  }

  // private formatResponseDates(group: Group): Group {
  //   return {
  //     ...group,
  //     dateCreated: new Date(group.dateCreated),
  //     dateUpdated: new Date(group.dateUpdated),
  //   };
  // }
}
