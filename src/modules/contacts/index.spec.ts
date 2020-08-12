import random from 'lodash/random';
import isEqual from 'lodash/isEqual';
import nock from 'nock';

import { SMSAPI } from '../../smsapi';

import { Contact } from './types/Contact';
import { NewContact } from './types/NewContact';
import { GetContactsQueryParams } from './types/GetContactsQueryParams';

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

    describe('with params', () => {
      it('should make a proper request to get contact with all params', async () => {
        // given
        const contactParams: GetContactsQueryParams = {
          birthdayDate: new Date('2015-07-13'),
          email: 'someEmail',
          firstName: 'someFirstName',
          gender: 'female',
          groupId: 'someGroupId',
          lastName: 'someLastName',
          limit: 5,
          offset: 2,
          orderBy: 'first_name',
          phoneNumber: '48500000000',
          q: '48500000000',
        };

        const body = {
          birthday_date: '2015-07-13',
          email: contactParams.email,
          first_name: contactParams.firstName,
          gender: contactParams.gender,
          group_id: contactParams.groupId,
          last_name: contactParams.lastName,
          limit: contactParams.limit,
          offset: contactParams.offset,
          order_by: contactParams.orderBy,
          phone_number: contactParams.phoneNumber,
          q: contactParams.q,
        };

        const getContactRequest = nock(`${SMSAPI_API_URL}`)
          .get('/contacts')
          .query(body)
          .reply(200);

        // when
        await smsapi.contacts.get(contactParams);

        // then
        expect(getContactRequest.isDone()).toBeTruthy();
      });

      it('should make a proper request to get contact with all params as arrays', async () => {
        // given
        const contactParams: GetContactsQueryParams = {
          birthdayDate: [new Date('2015-07-13'), new Date('2015-07-15')],
          email: 'someEmail',
          firstName: 'someFirstName',
          gender: 'female',
          groupId: 'someGroupId',
          lastName: 'someLastName',
          limit: 5,
          offset: 2,
          orderBy: 'first_name',
          phoneNumber: '48500000000',
          q: '48500000000',
        };

        const body = {
          birthday_date: ['2015-07-13', '2015-07-15'],
          email: contactParams.email,
          first_name: contactParams.firstName,
          gender: contactParams.gender,
          group_id: contactParams.groupId,
          last_name: contactParams.lastName,
          limit: contactParams.limit,
          offset: contactParams.offset,
          order_by: contactParams.orderBy,
          phone_number: contactParams.phoneNumber,
          q: contactParams.q,
        };

        const getContactRequest = nock(`${SMSAPI_API_URL}`)
          .get('/contacts')
          .query(body)
          .reply(200);

        // when
        await smsapi.contacts.get(contactParams);

        // then
        expect(getContactRequest.isDone()).toBeTruthy();
      });
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

    it('should make a proper request to create contact with all details', async () => {
      // given
      const someNumber = getRandomPhoneNumber();

      const contactDetails: NewContact = {
        birthdayDate: new Date('2015-07-13'),
        city: 'someCity',
        description: 'someDescription',
        email: 'someEmail',
        firstName: 'someFirstName',
        gender: 'male',
        lastName: 'someLastName',
        source: 'someSource',
      };

      const body = {
        birthday_date: '2015-07-13',
        city: contactDetails.city,
        description: contactDetails.description,
        email: contactDetails.email,
        first_name: contactDetails.firstName,
        gender: contactDetails.gender,
        last_name: contactDetails.lastName,
        phone_number: someNumber,
        source: contactDetails.source,
      };

      const createContactRequest = nock(`${SMSAPI_API_URL}`)
        .post('/contacts', (requestBody): boolean => isEqual(body, requestBody))
        .reply(201);

      // when
      await smsapi.contacts.create(someNumber, contactDetails);

      // then
      expect(createContactRequest.isDone()).toBeTruthy();
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
