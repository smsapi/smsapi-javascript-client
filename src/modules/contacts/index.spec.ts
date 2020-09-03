import random from 'lodash/random';
import nock from 'nock';

import { SMSAPI } from '../../smsapi';

import { Contact } from './types/Contact';
import { UpdateContact } from './types/UpdateContact';

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

  it('should get contact', async () => {
    // given
    const contact = await createTestContact();

    // when
    const response = await smsapi.contacts.getById(contact.id);

    // then
    expect(response).toEqual(contact);

    await removeTestContact(contact.id);
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

  it('should update contact', async () => {
    // given
    const contact = await createTestContact();

    const updateContact: UpdateContact = {
      firstName: 'Some first name',
    };

    // when
    const response = await smsapi.contacts.update(contact.id, updateContact);

    // then
    expect(response.firstName).toEqual(updateContact.firstName);

    await removeTestContact(contact.id);
  });

  it('should remove contact', async () => {
    // given
    const createdContact = await createTestContact();

    // when
    const response = await smsapi.contacts.remove(createdContact.id);

    // then
    expect(response).toBeUndefined();
  });

  describe(`contact's groups`, () => {
    it('should get all groups', async () => {
      // given
      const contactId = 'someContactId';

      const req = nock(`${SMSAPI_API_URL}`)
        .get(`/contacts/${contactId}/groups`)
        .reply(200, {
          collection: [
            {
              contact_expire_after: null,
              contacts_count: 4,
              created_by: 'someUser',
              date_created: '2020-09-01T14:49:00+02:00',
              date_updated: '2020-09-01T14:49:00+02:00',
              description: '',
              id: 'someId',
              idx: null,
              name: 'someGroup',
              permissions: [
                {
                  group_id: 'someId',
                  read: true,
                  send: true,
                  username: 'someUser',
                  write: true,
                },
              ],
            },
          ],
          size: 1,
        });

      // when
      const response = await smsapi.contacts.getGroups(contactId);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response.collection[0]).toEqual({
        contactExpireAfter: null,
        contactsCount: 4,
        createdBy: 'someUser',
        dateCreated: expect.any(Date),
        dateUpdated: expect.any(Date),
        description: '',
        id: 'someId',
        idx: null,
        name: 'someGroup',
        permissions: [
          {
            groupId: 'someId',
            read: true,
            send: true,
            username: 'someUser',
            write: true,
          },
        ],
      });
    });

    it('should get group by id', async () => {
      // given
      const contactId = 'someContactId';
      const groupId = 'someGroupId';

      const req = nock(`${SMSAPI_API_URL}`)
        .get(`/contacts/${contactId}/groups/${groupId}`)
        .reply(200, {
          contact_expire_after: null,
          contacts_count: 4,
          created_by: 'someUser',
          date_created: '2020-09-01T14:49:00+02:00',
          date_updated: '2020-09-01T14:49:00+02:00',
          description: '',
          id: groupId,
          idx: null,
          name: 'someGroup',
          permissions: [
            {
              group_id: groupId,
              read: true,
              send: true,
              username: 'someUser',
              write: true,
            },
          ],
        });

      // when
      const response = await smsapi.contacts.getGroupById(contactId, groupId);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toEqual({
        contactExpireAfter: null,
        contactsCount: 4,
        createdBy: 'someUser',
        dateCreated: expect.any(Date),
        dateUpdated: expect.any(Date),
        description: '',
        id: groupId,
        idx: null,
        name: 'someGroup',
        permissions: [
          {
            groupId,
            read: true,
            send: true,
            username: 'someUser',
            write: true,
          },
        ],
      });
    });

    it('should assign contact to group', async () => {
      // given
      const contactId = 'someContactId';
      const groupId = 'someGroupId';

      const req = nock(`${SMSAPI_API_URL}`)
        .put(`/contacts/${contactId}/groups/${groupId}`)
        .reply(200, {
          collection: [
            {
              contact_expire_after: null,
              contacts_count: 4,
              created_by: 'someUser',
              date_created: '2020-09-01T14:49:00+02:00',
              date_updated: '2020-09-01T14:49:00+02:00',
              description: '',
              id: 'someId',
              idx: null,
              name: 'someGroup',
              permissions: [
                {
                  group_id: 'someId',
                  read: true,
                  send: true,
                  username: 'someUser',
                  write: true,
                },
              ],
            },
          ],
          size: 1,
        });

      // when
      const response = await smsapi.contacts.assignContactToGroup(
        contactId,
        groupId
      );

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response.collection[0]).toEqual({
        contactExpireAfter: null,
        contactsCount: 4,
        createdBy: 'someUser',
        dateCreated: expect.any(Date),
        dateUpdated: expect.any(Date),
        description: '',
        id: 'someId',
        idx: null,
        name: 'someGroup',
        permissions: [
          {
            groupId: 'someId',
            read: true,
            send: true,
            username: 'someUser',
            write: true,
          },
        ],
      });
    });

    it('should unpin contact from group', async () => {
      // given
      const contactId = 'someContactId';
      const groupId = 'someGroupId';

      const req = nock(`${SMSAPI_API_URL}`)
        .delete(`/contacts/${contactId}/groups/${groupId}`)
        .reply(204);

      // when
      const response = await smsapi.contacts.unpinContactFromGroup(
        contactId,
        groupId
      );

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toBeUndefined();
    });
  });
});
