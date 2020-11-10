import nock from 'nock';
import { v4 as uuidv4 } from 'uuid';

import { SMSAPI } from '../../smsapi';

import { NewSubuser } from './types/NewSubuser';

const smsapi = new SMSAPI('someToken');

describe('Subusers', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should get all subusers', async () => {
    // given
    const subuser = {
      active: true,
      description: 'someDescription',
      id: 'someId',
      points: {
        from_account: 100,
        per_month: 100,
      },
      username: 'someUsername',
    };

    const req = nock('https://smsapi.io/api')
      .get('/subusers')
      .reply(200, {
        collection: [subuser],
        size: 1,
      });

    // when
    const response = await smsapi.subusers.get();

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toEqual({
      collection: [
        {
          active: true,
          description: 'someDescription',
          id: 'someId',
          points: {
            fromAccount: 100,
            perMonth: 100,
          },
          username: 'someUsername',
        },
      ],
      size: 1,
    });
  });

  it('should get subuser by id', async () => {
    // given
    const subuserId = 'someSubuserId';
    const subuser = {
      active: true,
      description: 'someDescription',
      id: subuserId,
      points: {
        from_account: 100,
        per_month: 100,
      },
      username: 'someUsername',
    };

    const req = nock('https://smsapi.io/api')
      .get(`/subusers/${subuserId}`)
      .reply(200, subuser);

    // when
    const response = await smsapi.subusers.getById(subuserId);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toEqual({
      active: true,
      description: 'someDescription',
      id: subuserId,
      points: {
        fromAccount: 100,
        perMonth: 100,
      },
      username: 'someUsername',
    });
  });

  it('should create subuser', async () => {
    // given
    const subuser: NewSubuser = {
      credentials: {
        password: 'somePassword',
        username: 'someUsername',
      },
    };

    const req = nock('https://smsapi.io/api')
      .post('/subusers')
      .reply(200, {
        active: true,
        description: 'someDescription',
        id: 'someId',
        points: {
          from_account: 100,
          per_month: 100,
        },
        username: subuser.credentials.username,
      });

    // when
    const response = await smsapi.subusers.create(subuser);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response.username).toEqual(subuser.credentials.username);
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

    const req = nock('https://smsapi.io/api')
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
    expect(req.isDone()).toBeTruthy();
  });

  it('should update subuser', async () => {
    // given
    const description = 'Some new description';

    const subuser = {
      active: true,
      description,
      id: 'someId',
      points: {
        from_account: 100,
        per_month: 100,
      },
      username: 'someUsername',
    };

    const req = nock('https://smsapi.io/api')
      .put(`/subusers/${subuser.id}`, {
        description,
      })
      .reply(200, subuser);

    // when
    const response = await smsapi.subusers.update(subuser.id, {
      description,
    });

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toEqual({
      active: true,
      description,
      id: 'someId',
      points: {
        fromAccount: 100,
        perMonth: 100,
      },
      username: 'someUsername',
    });
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

    const req = nock('https://smsapi.io/api')
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
    expect(req.isDone()).toBeTruthy();
  });

  it('should remove subuser', async () => {
    // given
    const subuserId = 'someSubuserId';

    const req = nock('https://smsapi.io/api')
      .delete(`/subusers/${subuserId}`)
      .reply(204);

    // when
    const response = await smsapi.subusers.remove(subuserId);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toBeUndefined();
  });
});
