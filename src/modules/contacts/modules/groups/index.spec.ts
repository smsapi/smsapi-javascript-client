import nock from 'nock';
import { v4 as uuidv4 } from 'uuid';

import { SMSAPI } from '../../../../smsapi';

import { removeTestGroup, createTestGroup } from './testHelpers';
import { CreateGroupDetails } from './types/CreateGroupDetails';
import { UpdateGroup } from './types/UpdateGroup';

const { SMSAPI_OAUTH_TOKEN, SMSAPI_API_URL } = process.env;

const smsapi = new SMSAPI(SMSAPI_OAUTH_TOKEN || '', SMSAPI_API_URL || '');

const GROUP_NAME_MAX_LENGTH = 64;

describe('Contacts Groups', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('create', () => {
    it('should create group', async () => {
      // given
      const groupName = `test-group-${uuidv4()}`.substring(
        0,
        GROUP_NAME_MAX_LENGTH
      );

      // when
      const response = await smsapi.contacts.groups.create(groupName);

      // then
      expect(response).toMatchObject({
        contactsCount: 0,
        createdBy: expect.any(String),
        dateCreated: expect.any(Date),
        dateUpdated: expect.any(Date),
        description: '',
        id: expect.any(String),
        idx: null,
        name: groupName,
        permissions: [
          {
            read: true,
            send: true,
            username: expect.any(String),
            write: true,
          },
        ],
      });

      await removeTestGroup(response.id, smsapi);
    });

    it('should make proper request to create group with details', async () => {
      // given
      const groupName = 'someName';

      const groupDetails: CreateGroupDetails = {
        contactExpireAfter: 5,
        description: 'someDescription',
        idx: 'someIdx',
      };

      const req = nock(`${SMSAPI_API_URL}`)
        .post('/contacts/groups', {
          contact_expire_after: groupDetails.contactExpireAfter,
          description: groupDetails.description,
          idx: groupDetails.idx,
          name: groupName,
        })
        .reply(201, {
          dateCreated: new Date().toISOString(),
          dateUpdated: new Date().toISOString(),
        });

      // when
      await smsapi.contacts.groups.create(groupName, groupDetails);

      // then
      expect(req.isDone()).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should update group', async () => {
      // given
      const groupName = `test-group-${uuidv4()}`.substring(
        0,
        GROUP_NAME_MAX_LENGTH
      );
      const group = await createTestGroup(groupName, smsapi);
      const description = 'Some description';

      // when
      const response = await smsapi.contacts.groups.update(group.id, {
        description,
      });

      // then
      expect(response).toMatchObject({
        contactsCount: 0,
        createdBy: expect.any(String),
        dateCreated: expect.any(Date),
        dateUpdated: expect.any(Date),
        description,
        id: expect.any(String),
        idx: null,
        name: groupName,
        permissions: [
          {
            read: true,
            send: true,
            username: expect.any(String),
            write: true,
          },
        ],
      });

      await removeTestGroup(group.id, smsapi);
    });

    it('should make proper request to update group with all details', async () => {
      // given
      const groupId = 'someId';
      const groupDetails: UpdateGroup = {
        contactExpireAfter: 5,
        description: 'someDescription',
        idx: 'someIdx',
        name: 'Some new name',
      };

      const req = nock(`${SMSAPI_API_URL}`)
        .put(`/contacts/groups/${groupId}`, {
          contact_expire_after: groupDetails.contactExpireAfter,
          description: groupDetails.description,
          idx: groupDetails.idx,
          name: groupDetails.name,
        })
        .reply(201, {
          dateCreated: new Date().toISOString(),
          dateUpdated: new Date().toISOString(),
        });

      // when
      await smsapi.contacts.groups.update(groupId, groupDetails);

      // then
      expect(req.isDone()).toBeTruthy();
    });
  });

  describe('remove', () => {
    it('should remove group', async () => {
      // given
      const group = await createTestGroup('someGroupName', smsapi);

      // when
      await smsapi.contacts.groups.remove(group.id);

      // then
      try {
        await smsapi.contacts.groups.getById(group.id);
      } catch ({ response }) {
        expect(response.status).toEqual(404);
      }
    });

    it('should make proper request to remove group with contacts', async () => {
      // given
      const groupId = 'someGroupId';

      const req = nock(`${SMSAPI_API_URL}`)
        .delete(`/contacts/groups/${groupId}`)
        .query({
          delete_contacts: true,
        })
        .reply(201);

      // when
      await smsapi.contacts.groups.remove(groupId, true);

      // then
      expect(req.isDone()).toBeTruthy();
    });
  });
});
