import nock from 'nock';

import { SMSAPI } from '../../smsapi';

const smsapi = new SMSAPI('someToken');

describe('Sendernames', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should get all sendernames', async () => {
    // given
    const sendername = {
      created_at: '1992-12-03',
      is_default: true,
      sender: 'someSender',
      status: 'ACTIVE',
    };

    const req = nock('https://smsapi.io/api')
      .get('/sms/sendernames')
      .reply(200, {
        collection: [sendername],
        size: 1,
      });

    // when
    const response = await smsapi.sendernames.get();

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response.collection).toEqual([
      {
        createdAt: new Date('1992-12-03'),
        isDefault: true,
        sender: 'someSender',
        status: 'ACTIVE',
      },
    ]);
    expect(response.size).toEqual(1);
  });

  it('should get sendername by sender', async () => {
    // given
    const sendername = {
      created_at: '1992-12-03',
      is_default: true,
      sender: 'someSender',
      status: 'ACTIVE',
    };

    const req = nock('https://smsapi.io/api')
      .get(`/sms/sendernames/${sendername.sender}`)
      .reply(200, sendername);

    // when
    const response = await smsapi.sendernames.getBySender(sendername.sender);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toEqual({
      createdAt: new Date('1992-12-03'),
      isDefault: true,
      sender: 'someSender',
      status: 'ACTIVE',
    });
  });

  it('should create sendername', async () => {
    // given
    const sendername = {
      created_at: '1992-12-03',
      is_default: true,
      sender: 'someSender',
      status: 'ACTIVE',
    };

    const req = nock('https://smsapi.io/api')
      .post('/sms/sendernames', {
        sender: sendername.sender,
      })
      .reply(200, sendername);

    // when
    const response = await smsapi.sendernames.create(sendername.sender);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toEqual({
      createdAt: new Date('1992-12-03'),
      isDefault: true,
      sender: 'someSender',
      status: 'ACTIVE',
    });
  });

  it('should make sender default', async () => {
    // given
    const sendername = 'sendername';

    const req = nock('https://smsapi.io/api')
      .post(`/sms/sendernames/${sendername}/commands/make_default`)
      .reply(204);

    // when
    const response = await smsapi.sendernames.makeDefault(sendername);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toBeUndefined();
  });

  it('should remove sendername', async () => {
    // given
    const sendername = 'sendername';

    const req = nock('https://smsapi.io/api')
      .delete(`/sms/sendernames/${sendername}`)
      .reply(204);

    // when
    const response = await smsapi.sendernames.remove(sendername);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(response).toBeUndefined();
  });
});
