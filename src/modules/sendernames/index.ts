import { BaseModule } from '../baseModule';
import { ApiCollection } from '../../types';

import { Sendername } from './types/Sendername';
import { SendernameStatus } from './types/SendernameStatus';

interface ApiSendername {
  createdAt: string;
  isDefault: boolean;
  sender: string;
  status: SendernameStatus;
}

export class Sendernames extends BaseModule {
  async get(): Promise<ApiCollection<Sendername>> {
    const data =
      await this.httpClient.get<ApiCollection<ApiSendername>>(
        '/sms/sendernames',
      );

    return {
      ...data,
      collection: data.collection.map(this.formatSendernameDates),
    };
  }

  async getBySender(sender: string): Promise<Sendername> {
    const data = await this.httpClient.get<ApiSendername>(
      `/sms/sendernames/${sender}`,
    );

    return this.formatSendernameDates(data);
  }

  async create(sender: string): Promise<Sendername> {
    const data = await this.httpClient.post<ApiSendername>('/sms/sendernames', {
      sender,
    });

    return this.formatSendernameDates(data);
  }

  async makeDefault(sender: string): Promise<void> {
    await this.httpClient.post<void>(
      `/sms/sendernames/${sender}/commands/make_default`,
    );
  }

  async remove(sender: string): Promise<void> {
    await this.httpClient.delete<void>(`/sms/sendernames/${sender}`);
  }

  private formatSendernameDates(sendername: ApiSendername): Sendername {
    return {
      ...sendername,
      createdAt: new Date(sendername.createdAt),
    };
  }
}
