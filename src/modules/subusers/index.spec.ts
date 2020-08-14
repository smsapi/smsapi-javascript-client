import nock from 'nock';
import { v4 as uuidv4 } from 'uuid';

import { SMSAPI } from '../../smsapi';

import { NewSubuser } from './types/NewSubuser';

const { SMSAPI_OAUTH_TOKEN, SMSAPI_API_URL } = process.env;

const smsapi = new SMSAPI(SMSAPI_OAUTH_TOKEN || '', SMSAPI_API_URL || '');

describe('Subusers', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should get all subusers', async () => {
    // given
    const subuser: NewSubuser = {
      credentials: {
        password: 'SomeSuperStrongPassword123',
        username: `user-${uuidv4()}`,
      },
    };

    const createdSubuser = await smsapi.subusers.create(subuser);

    // when
    const response = await smsapi.subusers.get();

    // then
    expect(response.collection).toContainEqual(createdSubuser);
    expect(response.size).toBeGreaterThan(0);

    await smsapi.subusers.remove(createdSubuser.id);
  });

  it('should get subuser by id', async () => {
    // given
    const subuser: NewSubuser = {
      credentials: {
        password: 'SomeSuperStrongPassword123',
        username: `user-${uuidv4()}`,
      },
    };

    const createdSubuser = await smsapi.subusers.create(subuser);

    // when
    const response = await smsapi.subusers.getById(createdSubuser.id);

    // then
    expect(response).toEqual(createdSubuser);

    await smsapi.subusers.remove(createdSubuser.id);
  });

  it('should create subuser', async () => {
    // given
    const subuser: NewSubuser = {
      credentials: {
        password: 'SomeSuperStrongPassword123',
        username: `user-${uuidv4()}`,
      },
    };

    // when
    const response = await smsapi.subusers.create(subuser);

    // then
    expect(response.username).toEqual(subuser.credentials.username);

    await smsapi.subusers.remove(response.id);
  });

  it('should create subuser with all details', async () => {
    // given
    const subuser = {
      active: true,
      credentials: {
        apiPassword: 'SomeSuperStrongApiPassword123',
        password: 'SomeSuperStrongPassword123',
        username: `user-${uuidv4()}`,
      },
      description: 'Some subuser description',
      points: {
        fromAccount: 100,
        perMonth: 50,
      },
    };

    const createSubuserNock = nock(`${SMSAPI_API_URL}`)
      .post('/subusers', {
        ...subuser,
        credentials: {
          api_password: subuser.credentials.apiPassword,
          password: subuser.credentials.password,
          username: subuser.credentials.username,
        },
        points: {
          from_account: subuser.points.fromAccount,
          per_month: subuser.points.perMonth,
        },
      })
      .reply(200);

    // when
    await smsapi.subusers.create(subuser);

    // then
    expect(createSubuserNock.pendingMocks()).toEqual([]);
  });

  it('should update subuser', async () => {
    // given
    const subuser: NewSubuser = {
      credentials: {
        password: 'SomeSuperStrongPassword123',
        username: `user-${uuidv4()}`,
      },
    };

    const createdSubuser = await smsapi.subusers.create(subuser);

    const description = 'Some new description';

    // when
    const response = await smsapi.subusers.update(createdSubuser.id, {
      description,
    });

    // then
    expect(response).toEqual({
      ...createdSubuser,
      description,
    });

    await smsapi.subusers.remove(createdSubuser.id);
  });

  it('should update subuser with all details', async () => {
    // given
    const subuserId = 'someSubuserId';

    const subuser = {
      active: true,
      credentials: {
        apiPassword: 'SomeSuperStrongApiPassword123',
        password: 'SomeSuperStrongPassword123',
      },
      description: 'Some subuser description',
      points: {
        fromAccount: 100,
        perMonth: 50,
      },
    };

    const createSubuserNock = nock(`${SMSAPI_API_URL}`)
      .put(`/subusers/${subuserId}`, {
        ...subuser,
        credentials: {
          api_password: subuser.credentials.apiPassword,
          password: subuser.credentials.password,
        },
        points: {
          from_account: subuser.points.fromAccount,
          per_month: subuser.points.perMonth,
        },
      })
      .reply(200);

    // when
    await smsapi.subusers.update(subuserId, subuser);

    // then
    expect(createSubuserNock.pendingMocks()).toEqual([]);
  });

  it('should remove subuser', async () => {
    // given
    const subuser: NewSubuser = {
      credentials: {
        password: 'SomeSuperStrongPassword123',
        username: `user-${uuidv4()}`,
      },
    };

    const createdSubuser = await smsapi.subusers.create(subuser);

    // when
    const response = await smsapi.subusers.remove(createdSubuser.id);

    // then
    expect(response).toBeUndefined();
  });
});
