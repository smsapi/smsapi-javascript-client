import nock from 'nock';

import { API_URL } from '../../constants';
import { SMSAPI } from '../../smsapi';

const smsapi = new SMSAPI('someToken');

describe('Templates', () => {
  beforeAll(() => {
    nock.cleanAll();
  });

  it('should get all templates', async () => {
    // given
    const template = {
      id: 'someId',
      name: 'someName',
      template: 'someTemplate',
    };

    const req = nock(API_URL)
      .get('/sms/templates')
      .reply(200, {
        collection: [template],
        size: 1,
      });

    // when
    const response = await smsapi.templates.get();

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toEqual({
      collection: [template],
      size: 1,
    });
  });

  it('should get template by id', async () => {
    // given
    const template = {
      id: 'someId',
      name: 'someName',
      template: 'someTemplate',
    };

    const req = nock(API_URL)
      .get(`/sms/templates/${template.id}`)
      .reply(200, template);

    // when
    const response = await smsapi.templates.getById(template.id);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toEqual(template);
  });

  it('should create template', async () => {
    // given
    const newTemplate = {
      name: 'someTemplateName',
      template: 'someNewTemplate',
    };

    const req = nock(API_URL)
      .post('/sms/templates', newTemplate)
      .reply(200, {
        id: 'someTemplateId',
        ...newTemplate,
      });

    // when
    const response = await smsapi.templates.create(newTemplate);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toEqual({
      id: 'someTemplateId',
      name: 'someTemplateName',
      template: 'someNewTemplate',
    });
  });

  it('should create template with normalize', async () => {
    // given
    const newTemplate = {
      name: 'someTemplateName',
      normalize: true,
      template: 'someNewTemplate',
    };

    const req = nock(API_URL).post('/sms/templates', newTemplate).reply(200, {
      id: 'someTemplateId',
      name: newTemplate.name,
      template: newTemplate.template,
    });

    // when
    const response = await smsapi.templates.create(newTemplate);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toEqual({
      id: 'someTemplateId',
      name: newTemplate.name,
      template: newTemplate.template,
    });
  });

  it('should update template', async () => {
    // given
    const template = {
      id: 'someTemplateId',
      name: 'someTemplateName',
      template: 'someNewTemplate',
    };

    const req = nock(API_URL)
      .put(`/sms/templates/${template.id}`, {
        name: template.name,
      })
      .reply(200, template);

    // when
    const response = await smsapi.templates.update(template.id, {
      name: template.name,
    });

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toEqual(template);
  });

  it('should remove template', async () => {
    // given
    const templateId = 'someTemplateId';

    const req = nock(API_URL).delete(`/sms/templates/${templateId}`).reply(204);

    // when
    const response = await smsapi.templates.remove(templateId);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toBeUndefined();
  });
});
