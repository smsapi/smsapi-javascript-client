import nock from 'nock';

import { SMSAPI } from '../../../../index';

import { Field } from './types/Field';
import { FieldType } from './types/FieldType';

const smsapi = new SMSAPI('someToken');

describe(`Contact's fields`, () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should get all fields', async () => {
    // given
    const field: Field = {
      id: 'someId',
      name: 'someName',
      type: 'phone_number',
    };

    const request = nock('https://smsapi.io/api')
      .get('/contacts/fields')
      .reply(200, {
        collection: [field],
        size: 1,
      });

    // when
    const response = await smsapi.contacts.fields.get();

    // then
    expect(request.isDone()).toBeTruthy();
    expect(response.collection).toEqual([field]);
  });

  it('should create field', async () => {
    // given
    const fieldName = 'someNewField';
    const fieldType: FieldType = 'phone_number';

    const request = nock('https://smsapi.io/api')
      .post('/contacts/fields', {
        name: fieldName,
        type: fieldType,
      })
      .reply(200, {
        id: 'someFieldId',
        name: fieldName,
        type: fieldType,
      });

    // when
    const response = await smsapi.contacts.fields.create(fieldName, fieldType);

    // then
    expect(request.isDone()).toBeTruthy();
    expect(response).toMatchObject({
      name: fieldName,
      type: fieldType,
    });
  });

  it('should update field', async () => {
    // given
    const fieldId = 'someFieldId';
    const fieldName = 'someUpdatedFieldName';

    const request = nock('https://smsapi.io/api')
      .put(`/contacts/fields/${fieldId}`, {
        name: fieldName,
      })
      .reply(200, {
        id: fieldId,
        name: fieldName,
        type: 'text',
      });

    // when
    const response = await smsapi.contacts.fields.update(fieldId, fieldName);

    // then
    expect(request.isDone()).toBeTruthy();
    expect(response).toMatchObject({
      id: fieldId,
      name: fieldName,
    });
  });

  it('should remove field', async () => {
    // given
    const fieldId = 'someFieldId';

    const request = nock('https://smsapi.io/api')
      .delete(`/contacts/fields/${fieldId}`)
      .reply(204);

    // when
    const response = await smsapi.contacts.fields.remove(fieldId);

    // then
    expect(request.isDone()).toBeTruthy();
    expect(response).toBeUndefined();
  });
});
