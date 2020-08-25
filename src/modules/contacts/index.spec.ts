import random from 'lodash/random';
import nock from 'nock';

import { SMSAPI } from '../../smsapi';

import { Contact } from './types/Contact';

const { SMSAPI_OAUTH_TOKEN, SMSAPI_API_URL } = process.env;

const smsapi = new SMSAPI(SMSAPI_OAUTH_TOKEN || '', SMSAPI_API_URL || '');

const getRandomPhoneNumber = (): string => {
  return `48500000${random(999).toString().padStart(3, '0')}`;
};

const createTestContact = async (): Promise<Contact> => {
  const someNumber = getRandomPhoneNumber();
  return await smsapi.contacts.create(someNumber);
};

const removeTestContact = async (testContactId: string): Promise<void> => {
  await smsapi.contacts.remove(testContactId);
};

describe('Contacts', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('get contacts', () => {
    it('should get contacts', async () => {
      // given
      const createdContact = await createTestContact();

      // when
      const response = await smsapi.contacts.get();

      // then
      expect(response.size).toBeGreaterThan(0);
      expect(response.collection).toContainEqual(createdContact);

      await removeTestContact(createdContact.id);
    });

    it('should get contact by phone number', async () => {
      // given
      const createdContact = await createTestContact();

      // when
      const response = await smsapi.contacts.get({
        phoneNumber: createdContact.phoneNumber,
      });

      // then
      expect(response.size).toEqual(1);
      expect(response.collection[0]).toEqual(createdContact);

      await removeTestContact(createdContact.id);
    });
  });

  describe('create contact', () => {
    it('should create contact', async () => {
      // given
      const someNumber = getRandomPhoneNumber();

      // when
      const response = await smsapi.contacts.create(someNumber);

      // then
      expect(response.phoneNumber).toEqual(someNumber);

      await removeTestContact(response.id);
    });

    it('should create contact with details', async () => {
      // given
      const someNumber = getRandomPhoneNumber();

      // when
      const response = await smsapi.contacts.create(someNumber, {
        email: 'someEmail@email.com',
      });

      // then
      expect(response.phoneNumber).toEqual(someNumber);

      await removeTestContact(response.id);
    });
  });

  it('should remove contact', async () => {
    // given
    const createdContact = await createTestContact();

    // when
    const response = await smsapi.contacts.remove(createdContact.id);

    // then
    expect(response).toBeUndefined();
  });
});
