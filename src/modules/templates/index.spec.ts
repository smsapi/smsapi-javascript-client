import { v4 as uuidv4 } from 'uuid';

import { SMSAPI } from '../../smsapi';

import { NewTemplate } from './types/NewTemplate';
import { Template } from './types/Template';

const { SMSAPI_OAUTH_TOKEN, SMSAPI_API_URL } = process.env;

const smsapi = new SMSAPI(SMSAPI_OAUTH_TOKEN || '', SMSAPI_API_URL || '');

let createdTemplate: Template;

describe('Templates', () => {
  beforeAll(async () => {
    // given
    createdTemplate = await smsapi.templates.create({
      name: `template-name-${uuidv4()}`.slice(0, 32),
      template: 'someTemplate',
    });
  });

  it('should get all templates', async () => {
    // when
    const response = await smsapi.templates.get();

    // then
    expect(response.collection).toContainEqual(createdTemplate);
    expect(response.size).toBeGreaterThan(0);
  });

  it('should get template by id', async () => {
    // when
    const response = await smsapi.templates.getById(createdTemplate.id);

    // then
    expect(response).toEqual(createdTemplate);
  });

  it('should create template', async () => {
    // given
    const someNewTemplate: NewTemplate = {
      name: `template-name-${uuidv4()}`.slice(0, 32),
      template: 'someNewTemplate',
    };

    // when
    const response = await smsapi.templates.create(someNewTemplate);

    // then
    expect(response).toEqual({
      id: expect.any(String),
      ...someNewTemplate,
    });
  });

  it('should create template with normalize', async () => {
    // given
    const someNewTemplate: NewTemplate = {
      name: `template-name-${uuidv4()}`.slice(0, 32),
      template: 'ęółśążźćń',
      normalize: true,
    };

    // when
    const response = await smsapi.templates.create(someNewTemplate);

    // then
    expect(response).toEqual({
      id: expect.any(String),
      name: someNewTemplate.name,
      template: 'eolsazzcn',
    });
  });

  it('should update template', async () => {
    // given
    const someNewTemplate: Partial<NewTemplate> = {
      template: 'someUpdateTemplate',
    };

    // when
    const response = await smsapi.templates.update(
      createdTemplate.id,
      someNewTemplate
    );

    // then
    expect(response).toEqual({
      ...createdTemplate,
      ...someNewTemplate,
    });
  });

  it('should remove template', async () => {
    // when
    const response = await smsapi.templates.remove(createdTemplate.id);

    // then
    expect(response).toBeUndefined();
  });
});
