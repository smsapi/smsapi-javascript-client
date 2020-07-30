import { BaseModule } from '../baseModule';
import { ApiCollection } from '../../types';

import { NewTemplate } from './types/NewTemplate';
import { Template } from './types/Template';

export class Templates extends BaseModule {
  async get(): Promise<ApiCollection<Template>> {
    const { data } = await this.httpClient.get<ApiCollection<Template>>(
      '/sms/templates'
    );

    return data;
  }

  async getById(templateId: string): Promise<Template> {
    const { data } = await this.httpClient.get<Template>(
      `/sms/templates/${templateId}`
    );

    return data;
  }

  async create(newTemplate: NewTemplate): Promise<Template> {
    const { data } = await this.httpClient.post<Template>(
      '/sms/templates',
      newTemplate
    );

    return data;
  }

  async update(
    templateId: string,
    newTemplate: Partial<NewTemplate>
  ): Promise<Template> {
    const { data } = await this.httpClient.put<Template>(
      `/sms/templates/${templateId}`,
      newTemplate
    );

    return data;
  }

  async remove(templateId: string): Promise<void> {
    await this.httpClient.delete(`/sms/templates/${templateId}`);
  }
}
