import { BaseModule } from '../../../baseModule';

import { CreateGroupDetails } from './types/CreateGroupDetails';
import { Group } from './types/Group';

export class Groups extends BaseModule {
  async getById(groupId: string): Promise<Group> {
    const response = await this.httpClient.get<Group, Group>(
      `/contacts/groups/${groupId}`
    );

    return this.formatResponseDates(response);
  }

  async create(name: string, details?: CreateGroupDetails): Promise<Group> {
    const response = await this.httpClient.post<Group, Group>(
      '/contacts/groups',
      {
        name,
        ...details,
      }
    );

    return this.formatResponseDates(response);
  }

  async remove(groupId: string, deleteContacts = false): Promise<void> {
    await this.httpClient.delete(`/contacts/groups/${groupId}`, {
      params: {
        deleteContacts,
      },
    });
  }

  private formatResponseDates(group: Group): Group {
    return {
      ...group,
      dateCreated: new Date(group.dateCreated),
      dateUpdated: new Date(group.dateUpdated),
    };
  }
}
