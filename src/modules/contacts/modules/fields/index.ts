import { BaseModule } from '../../../baseModule';
import { ApiCollection } from '../../../../types/ApiCollection';

import { Field } from './types/Field';
import { FieldType } from './types/FieldType';

export class Fields extends BaseModule {
  async get(): Promise<ApiCollection<Field>> {
    return await this.httpClient.get<ApiCollection<Field>>('/contacts/fields');
  }

  async create(
    fieldName: string,
    fieldType: FieldType = 'text',
  ): Promise<Field> {
    return await this.httpClient.post<Field>('/contacts/fields', {
      name: fieldName,
      type: fieldType,
    });
  }

  async update(fieldId: string, newName: string): Promise<Field> {
    return await this.httpClient.put<Field>(`/contacts/fields/${fieldId}`, {
      name: newName,
    });
  }

  async remove(fieldId: string): Promise<void> {
    await this.httpClient.delete(`/contacts/fields/${fieldId}`);
  }
}
