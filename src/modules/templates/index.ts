import { BaseModule } from '../baseModule';
import { ApiCollection } from '../../types';

import { NewTemplate } from './types/NewTemplate';
import { Template } from './types/Template';

export class Templates extends BaseModule {
  async get(): Promise<ApiCollection<Template>> {
    return await this.httpClient.get('/sms/templates');
  }

  async getById(templateId: string): Promise<Template> {
    return await this.httpClient.get(`/sms/templates/${templateId}`);
  }

  async create(newTemplate: NewTemplate): Promise<Template> {
    return await this.httpClient.post('/sms/templates', newTemplate);
  }

  async update(
    templateId: string,
    newTemplate: Partial<NewTemplate>
  ): Promise<Template> {
    return await this.httpClient.put(
      `/sms/templates/${templateId}`,
      newTemplate
    );
  }

  async remove(templateId: string): Promise<void> {
    await this.httpClient.delete(`/sms/templates/${templateId}`);
  }
}
