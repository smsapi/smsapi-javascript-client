import { BaseModule } from '../baseModule';
import { ApiCollection } from '../../types';

import { Sendername } from './types/Sendername';
import { SendernameStatus } from './types/SendernameStatus';
import { dateFormatter } from './helpers/dateFormatter';

export interface ApiSendername {
  createdAt: string;
  isDefault: boolean;
  sender: string;
  status: SendernameStatus;
}

export class Sendernames extends BaseModule {
  async get(): Promise<ApiCollection<Sendername>> {
    const data = await this.httpClient.get<any, ApiCollection<ApiSendername>>(
      '/sms/sendernames'
    );

    return {
      ...data,
      collection: data.collection.map(dateFormatter),
    };
  }

  async getBySender(sender: string): Promise<Sendername> {
    const data = await this.httpClient.get<any, ApiSendername>(
      `/sms/sendernames/${sender}`
    );

    return dateFormatter(data);
  }

  async create(sender: string): Promise<Sendername> {
    const data = await this.httpClient.post<any, ApiSendername>(
      '/sms/sendernames',
      {
        sender,
      }
    );

    return dateFormatter(data);
  }

  async makeDefault(sender: string): Promise<void> {
    await this.httpClient.post<any, void>(
      `/sms/sendernames/${sender}/commands/make_default`
    );
  }

  async remove(sender: string): Promise<void> {
    await this.httpClient.delete<any, void>(`/sms/sendernames/${sender}`);
  }
}
