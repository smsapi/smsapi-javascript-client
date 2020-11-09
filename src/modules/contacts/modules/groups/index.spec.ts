import nock from 'nock';

import { SMSAPI } from '../../../../smsapi';

const smsapi = new SMSAPI('someToken');

describe('Contacts Groups', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should get all groups', async () => {
    // given
    const group = {
      contacts_count: 1,
      created_by: 'someCreatedBy',
      date_created: '1992-12-03',
      date_updated: '1992-12-03',
      description: 'someDescription',
      id: 'someId',
      idx: 'someIdx',
      name: 'someName',
      permissions: [],
    };

    const req = nock('https://smsapi.io/api')
      .get('/contacts/groups')
      .reply(200, {
        collection: [group],
        size: 1,
      });

    // when
    const response = await smsapi.contacts.groups.get();

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response.collection).toEqual([
      {
        contactsCount: 1,
        createdBy: 'someCreatedBy',
        dateCreated: new Date('1992-12-03'),
        dateUpdated: new Date('1992-12-03'),
        description: 'someDescription',
        id: 'someId',
        idx: 'someIdx',
        name: 'someName',
        permissions: [],
      },
    ]);
  });

  describe('create', () => {
    it('should create group', async () => {
      // given
      const group = {
        contacts_count: 1,
        created_by: 'someCreatedBy',
        date_created: '1992-12-03',
        date_updated: '1992-12-03',
        description: 'someDescription',
        id: 'someId',
        idx: 'someIdx',
        name: 'someName',
        permissions: [],
      };

      const req = nock('https://smsapi.io/api')
        .post('/contacts/groups')
        .reply(201, group);

      // when
      const response = await smsapi.contacts.groups.create(group.name);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toEqual({
        contactsCount: 1,
        createdBy: 'someCreatedBy',
        dateCreated: new Date('1992-12-03'),
        dateUpdated: new Date('1992-12-03'),
        description: 'someDescription',
        id: 'someId',
        idx: 'someIdx',
        name: 'someName',
        permissions: [],
      });
    });

    it('should make proper request to create group with details', async () => {
      // given
      const group = {
        contacts_count: 1,
        created_by: 'someCreatedBy',
        date_created: '1992-12-03',
        date_updated: '1992-12-03',
        description: 'someDescription',
        id: 'someId',
        idx: 'someIdx',
        name: 'someName',
        permissions: [],
      };

      const req = nock('https://smsapi.io/api')
        .post('/contacts/groups', {
          contact_expire_after: 5,
          description: group.description,
          idx: group.idx,
          name: group.name,
        })
        .reply(201, group);

      // when
      const response = await smsapi.contacts.groups.create(group.name, {
        contactExpireAfter: 5,
        description: group.description,
        idx: group.idx,
      });

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toEqual({
        contactsCount: 1,
        createdBy: 'someCreatedBy',
        dateCreated: new Date('1992-12-03'),
        dateUpdated: new Date('1992-12-03'),
        description: 'someDescription',
        id: 'someId',
        idx: 'someIdx',
        name: 'someName',
        permissions: [],
      });
    });
  });

  describe('update', () => {
    it('should update group', async () => {
      // given
      const description = 'Some description';
      const group = {
        contacts_count: 1,
        created_by: 'someCreatedBy',
        date_created: '1992-12-03',
        date_updated: '1992-12-03',
        description,
        id: 'someId',
        idx: 'someIdx',
        name: 'someName',
        permissions: [],
      };

      const req = nock('https://smsapi.io/api')
        .put(`/contacts/groups/${group.id}`, {
          description,
        })
        .reply(201, group);

      // when
      const response = await smsapi.contacts.groups.update(group.id, {
        description,
      });

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toEqual({
        contactsCount: 1,
        createdBy: 'someCreatedBy',
        dateCreated: new Date('1992-12-03'),
        dateUpdated: new Date('1992-12-03'),
        description,
        id: 'someId',
        idx: 'someIdx',
        name: 'someName',
        permissions: [],
      });
    });

    it('should make proper request to update group with all details', async () => {
      // given
      const group = {
        contacts_count: 1,
        created_by: 'someCreatedBy',
        date_created: '1992-12-03',
        date_updated: '1992-12-03',
        description: 'someDescription',
        id: 'someId',
        idx: 'someIdx',
        name: 'someName',
        permissions: [],
      };

      const req = nock('https://smsapi.io/api')
        .put(`/contacts/groups/${group.id}`, {
          contact_expire_after: 5,
          description: group.description,
          idx: group.idx,
          name: group.name,
        })
        .reply(201, group);

      // when
      const response = await smsapi.contacts.groups.update(group.id, {
        contactExpireAfter: 5,
        description: group.description,
        idx: group.idx,
        name: group.name,
      });

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toEqual({
        contactsCount: 1,
        createdBy: 'someCreatedBy',
        dateCreated: new Date('1992-12-03'),
        dateUpdated: new Date('1992-12-03'),
        description: 'someDescription',
        id: 'someId',
        idx: 'someIdx',
        name: 'someName',
        permissions: [],
      });
    });
  });

  describe('remove', () => {
    it('should remove group', async () => {
      // given
      const groupId = 'someGroupId';

      const req = nock('https://smsapi.io/api')
        .delete(`/contacts/groups/${groupId}`)
        .query({
          delete_contacts: false,
        })
        .reply(204);

      // when
      const response = await smsapi.contacts.groups.remove(groupId);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toBeUndefined();
    });

    it('should make proper request to remove group with contacts', async () => {
      // given
      const groupId = 'someGroupId';

      const req = nock('https://smsapi.io/api')
        .delete(`/contacts/groups/${groupId}`)
        .query({
          delete_contacts: true,
        })
        .reply(204);

      // when
      const response = await smsapi.contacts.groups.remove(groupId, true);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toBeUndefined();
    });
  });
});
