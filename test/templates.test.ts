import nock from 'nock';

import { SMSAPIpl } from '../src';
import { Template, NewTemplate } from '../src/types';

import { API_URL } from './constants';

const someTemplates: Template[] = [
  {
    id: 'someId1',
    name: 'someTemplateName1',
    template: 'someTemplate1',
  },
  {
    id: 'someId2',
    name: 'someTemplateName2',
    template: 'someTemplate2',
  },
];

describe('Templates', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should get all templates', async () => {
    // given
    const smsapi = new SMSAPIpl('someToken');

    nock(API_URL).get('/sms/templates').reply(200, {
      collection: someTemplates,
      size: someTemplates.length,
    });

    // when
    const response = await smsapi.templates.get();

    // then
    expect(response.collection).toEqual(someTemplates);
    expect(response.size).toEqual(someTemplates.length);
  });

  it('should get template by id', async () => {
    // given
    const smsapi = new SMSAPIpl('someToken');

    const someTemplate = someTemplates[0];

    nock(API_URL)
      .get(`/sms/templates/${someTemplate.id}`)
      .reply(200, someTemplate);

    // when
    const response = await smsapi.templates.getById(someTemplate.id);

    // then
    expect(response).toEqual(someTemplate);
  });

  it('should create template', async () => {
    // given
    const smsapi = new SMSAPIpl('someToken');

    const someNewTemplate: NewTemplate = {
      name: 'someNewTemplateName',
      template: 'someNewTemplate',
    };

    nock(API_URL)
      .post('/sms/templates')
      .reply(201, {
        id: 'someNewTemplateId',
        ...someNewTemplate,
      });

    // when
    const response = await smsapi.templates.create(someNewTemplate);

    // then
    expect(response.name).toEqual(someNewTemplate.name);
    expect(response.template).toEqual(someNewTemplate.template);
  });

  it('should update template', async () => {
    // given
    const smsapi = new SMSAPIpl('someToken');

    const templateIdToUpdate = 'someTemplateId';

    const someNewTemplate: NewTemplate = {
      name: 'someNewTemplateName',
      template: 'someNewTemplate',
    };

    nock(API_URL)
      .put(`/sms/templates/${templateIdToUpdate}`)
      .reply(200, {
        id: templateIdToUpdate,
        ...someNewTemplate,
      });

    // when
    const response = await smsapi.templates.update(
      templateIdToUpdate,
      someNewTemplate
    );

    // then
    expect(response.name).toEqual(someNewTemplate.name);
    expect(response.template).toEqual(someNewTemplate.template);
  });

  it('should remove template', async () => {
    // given
    const smsapi = new SMSAPIpl('someToken');

    const templateIdToRemove = 'someTemplateId';

    nock(API_URL).delete(`/sms/templates/${templateIdToRemove}`).reply(204);

    // when
    const response = await smsapi.templates.remove(templateIdToRemove);

    // then
    expect(response).toBeUndefined();
  });
});
