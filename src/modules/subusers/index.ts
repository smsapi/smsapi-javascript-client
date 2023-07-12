import { BaseModule } from '../baseModule';
import { ApiCollection, NewSubuser } from '../../types';

import { Subuser } from './types/Subuser';
import { UpdateSubuser } from './types/UpdateSubuser';

export interface ApiSubuser
  extends Omit<Omit<Subuser, 'credentials'>, 'points'> {
  credentials: {
    username: string;
    password: string;
    api_password: string;
  };
  points: {
    from_account: number;
    per_month: number;
  };
}

export class Subusers extends BaseModule {
  async get(): Promise<ApiCollection<Subuser>> {
    return await this.httpClient.get<
      ApiCollection<Subuser>,
      ApiCollection<Subuser>
    >('/subusers');
  }

  async getById(subuserId: string): Promise<Subuser> {
    return await this.httpClient.get<Subuser, Subuser>(
      `/subusers/${subuserId}`,
    );
  }

  async create(newSubuser: NewSubuser): Promise<Subuser> {
    const { credentials, points } = newSubuser;

    return await this.httpClient.post<Subuser, Subuser>('/subusers', {
      ...newSubuser,
      credentials: {
        api_password: credentials.apiPassword,
        password: credentials.password,
        username: credentials.username,
      },
      points: points
        ? {
            from_account: points.fromAccount,
            per_month: points.perMonth,
          }
        : undefined,
    });
  }

  async update(
    subuserId: string,
    updateSubuser: Partial<UpdateSubuser>,
  ): Promise<Subuser> {
    const { credentials, points } = updateSubuser;

    return await this.httpClient.put<Subuser, Subuser>(
      `/subusers/${subuserId}`,
      {
        ...updateSubuser,
        credentials:
          credentials && (credentials.password || credentials.apiPassword)
            ? {
                api_password: credentials.apiPassword,
                password: credentials.password,
              }
            : undefined,
        points:
          points && (points.fromAccount || points.perMonth)
            ? {
                from_account: points.fromAccount,
                per_month: points.perMonth,
              }
            : undefined,
      },
    );
  }

  async remove(subuserId: string): Promise<void> {
    await this.httpClient.delete<void, void>(`/subusers/${subuserId}`);
  }
}
