import nock from 'nock';

import { API_URL } from '../../constants';
import { SMSAPI } from '../../smsapi';

const smsapi = new SMSAPI('someToken');

describe('Contacts', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should get contact', async () => {
    // given
    const contact = {
      birthday_date: '1992-12-03',
      city: 'someCity',
      description: 'someDescription',
      email: 'someEmail',
      first_name: 'someFirstName',
      gender: 'female',
      id: 'someId',
      last_name: 'someLastName',
      phone_number: 'somePhoneNumber',
      source: 'someSource',
    };

    const req = nock(API_URL)
      .get(`/contacts/${contact.id}`)
      .reply(200, contact);

    // when
    const response = await smsapi.contacts.getById(contact.id);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toEqual({
      birthdayDate: '1992-12-03',
      city: 'someCity',
      description: 'someDescription',
      email: 'someEmail',
      firstName: 'someFirstName',
      gender: 'female',
      id: 'someId',
      lastName: 'someLastName',
      phoneNumber: 'somePhoneNumber',
      source: 'someSource',
    });
  });

  describe('get contacts', () => {
    it('should get contacts', async () => {
      // given
      const contact = {
        birthday_date: '1992-12-03',
        city: 'someCity',
        description: 'someDescription',
        email: 'someEmail',
        first_name: 'someFirstName',
        gender: 'female',
        id: 'someId',
        last_name: 'someLastName',
        phone_number: 'somePhoneNumber',
        source: 'someSource',
      };

      const req = nock(API_URL)
        .get('/contacts')
        .reply(200, {
          collection: [contact],
          size: 1,
        });

      // when
      const response = await smsapi.contacts.get();

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response.size).toEqual(1);
      expect(response.collection).toContainEqual({
        birthdayDate: '1992-12-03',
        city: 'someCity',
        description: 'someDescription',
        email: 'someEmail',
        firstName: 'someFirstName',
        gender: 'female',
        id: 'someId',
        lastName: 'someLastName',
        phoneNumber: 'somePhoneNumber',
        source: 'someSource',
      });
    });

    it('should get contact by phone number', async () => {
      // given
      const contact = {
        birthday_date: '1992-12-03',
        city: 'someCity',
        description: 'someDescription',
        email: 'someEmail',
        first_name: 'someFirstName',
        gender: 'female',
        id: 'someId',
        last_name: 'someLastName',
        phone_number: 'somePhoneNumber',
        source: 'someSource',
      };

      const req = nock(API_URL)
        .get('/contacts')
        .query({
          phone_number: contact.phone_number,
        })
        .reply(200, {
          collection: [contact],
          size: 1,
        });

      // when
      const response = await smsapi.contacts.get({
        phoneNumber: contact.phone_number,
      });

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response.size).toEqual(1);
      expect(response.collection[0]).toEqual({
        birthdayDate: '1992-12-03',
        city: 'someCity',
        description: 'someDescription',
        email: 'someEmail',
        firstName: 'someFirstName',
        gender: 'female',
        id: 'someId',
        lastName: 'someLastName',
        phoneNumber: 'somePhoneNumber',
        source: 'someSource',
      });
    });
  });

  describe('create contact', () => {
    it('should create contact', async () => {
      // given
      const someNumber = '48500000000';
      const contact = {
        birthday_date: '1992-12-03',
        city: 'someCity',
        description: 'someDescription',
        email: 'someEmail',
        first_name: 'someFirstName',
        gender: 'female',
        id: 'someId',
        last_name: 'someLastName',
        phone_number: someNumber,
        source: 'someSource',
      };

      const req = nock(API_URL)
        .post('/contacts', {
          phone_number: someNumber,
        })
        .reply(200, contact);

      // when
      const response = await smsapi.contacts.create(someNumber);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response.phoneNumber).toEqual(someNumber);
    });

    it('should create contact with details', async () => {
      // given
      const someNumber = '48500000000';
      const someEmail = 'someEmail@email.com';
      const contact = {
        birthday_date: '1992-12-03',
        city: 'someCity',
        description: 'someDescription',
        email: 'someEmail',
        first_name: 'someFirstName',
        gender: 'female',
        id: 'someId',
        last_name: 'someLastName',
        phone_number: someNumber,
        source: 'someSource',
      };

      const req = nock(API_URL)
        .post('/contacts', {
          email: someEmail,
          phone_number: someNumber,
        })
        .reply(200, contact);

      // when
      const response = await smsapi.contacts.create(someNumber, {
        email: someEmail,
      });

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response.phoneNumber).toEqual(someNumber);
    });
  });

  it('should update contact', async () => {
    // given
    const someFirstName = 'Some first name';
    const contact = {
      birthday_date: '1992-12-03',
      city: 'someCity',
      description: 'someDescription',
      email: 'someEmail',
      first_name: someFirstName,
      gender: 'female',
      id: 'someId',
      last_name: 'someLastName',
      phoneNumber: 'somePhoneNumber',
      source: 'someSource',
    };

    const req = nock(API_URL)
      .put(`/contacts/${contact.id}`, {
        first_name: someFirstName,
      })
      .reply(200, contact);

    // when
    const response = await smsapi.contacts.update(contact.id, {
      firstName: someFirstName,
    });

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response.firstName).toEqual(someFirstName);
  });

  it('should remove contact', async () => {
    // given
    const contact = {
      birthday_date: '1992-12-03',
      city: 'someCity',
      description: 'someDescription',
      email: 'someEmail',
      first_name: 'someFirstName',
      gender: 'female',
      id: 'someId',
      last_name: 'someLastName',
      phone_number: 'somePhoneNumber',
      source: 'someSource',
    };

    const req = nock(API_URL).delete(`/contacts/${contact.id}`).reply(200);

    // when
    const response = await smsapi.contacts.remove(contact.id);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toBeUndefined();
  });

  describe(`contact's groups`, () => {
    it('should get all groups', async () => {
      // given
      const contactId = 'someContactId';

      const req = nock(API_URL)
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

      const req = nock(API_URL)
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

      const req = nock(API_URL)
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

      const req = nock(API_URL)
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
