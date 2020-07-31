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
    return await this.httpClient.get<any, ApiCollection<Subuser>>('/subusers');
  }

  async getById(subuserId: string): Promise<Subuser> {
    return await this.httpClient.get<any, Subuser>(`/subusers/${subuserId}`);
  }

  async create(newSubuser: NewSubuser): Promise<Subuser> {
    const { credentials, points } = newSubuser;

    return await this.httpClient.post<any, Subuser>('/subusers', {
      ...newSubuser,
      credentials: {
        username: credentials.username,
        password: credentials.password,
        api_password: credentials.apiPassword,
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
    updateSubuser: Partial<UpdateSubuser>
  ): Promise<Subuser> {
    const { credentials, points } = updateSubuser;

    return await this.httpClient.put<any, Subuser>(`/subusers/${subuserId}`, {
      ...updateSubuser,
      credentials:
        credentials && (credentials.password || credentials.apiPassword)
          ? {
              password: credentials.password,
              api_password: credentials.apiPassword,
            }
          : undefined,
      points:
        points && (points.fromAccount || points.perMonth)
          ? {
              from_account: points.fromAccount,
              per_month: points.perMonth,
            }
          : undefined,
    });
  }

  async remove(subuserId: string): Promise<void> {
    await this.httpClient.delete<any, void>(`/subusers/${subuserId}`);
  }
}
