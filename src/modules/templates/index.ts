import { BaseModule } from '../baseModule';
import { ApiCollection } from '../../types';

import { NewTemplate } from './types/NewTemplate';
import { Template } from './types/Template';

export class Templates extends BaseModule {
  async get(): Promise<ApiCollection<Template>> {
    return await this.httpClient.get<ApiCollection<Template>>('/sms/templates');
  }

  async getById(templateId: string): Promise<Template> {
    return await this.httpClient.get<Template>(`/sms/templates/${templateId}`);
  }

  async create(newTemplate: NewTemplate): Promise<Template> {
    return await this.httpClient.post<Template>('/sms/templates', {
      data: newTemplate,
    });
  }

  async update(
    templateId: string,
    newTemplate: Partial<NewTemplate>,
  ): Promise<Template> {
    return await this.httpClient.put<Template>(`/sms/templates/${templateId}`, {
      data: newTemplate,
    });
  }

  async remove(templateId: string): Promise<void> {
    await this.httpClient.delete<void>(`/sms/templates/${templateId}`);
  }
}
