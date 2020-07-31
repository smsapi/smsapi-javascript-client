import nock from 'nock';
import { v4 as uuidv4 } from 'uuid';

import { SMSAPI } from '../../smsapi';
import { Sendername } from '../../types';

const { SMSAPI_OAUTH_TOKEN, SMSAPI_API_URL } = process.env;

const smsapi = new SMSAPI(SMSAPI_OAUTH_TOKEN || '', SMSAPI_API_URL || '');

let createdSendername: Sendername;

describe('Sendernames', () => {
  beforeAll(async () => {
    createdSendername = await smsapi.sendernames.create('sendername');
  });

  afterAll(async () => {
    await smsapi.sendernames.remove(createdSendername.sender);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should get all sendernames', async () => {
    // when
    const response = await smsapi.sendernames.get();

    // then
    expect(response.collection).toContainEqual(createdSendername);
    expect(response.size).toBeGreaterThan(0);
  });

  it('should get sendername by sender', async () => {
    // when
    const response = await smsapi.sendernames.getBySender(
      createdSendername.sender
    );

    // then
    expect(response).toEqual(createdSendername);
  });

  it('should create sendername', async () => {
    // given
    const someSenderName = `sender${uuidv4()}`.slice(0, 11);

    // when
    const response = await smsapi.sendernames.create(someSenderName);

    // then
    expect(response).toEqual({
      createdAt: expect.any(Date),
      isDefault: false,
      sender: someSenderName,
      status: expect.any(String),
    });

    await smsapi.sendernames.remove(response.sender);
  });

  it('should make sender default', async () => {
    // given
    const sendername = 'sendername';

    const removeSendernameNock = nock(`${SMSAPI_API_URL}`)
      .post(`/sms/sendernames/${sendername}/commands/make_default`)
      .reply(204);

    // when
    await smsapi.sendernames.makeDefault(sendername);

    // then
    expect(removeSendernameNock.pendingMocks()).toEqual([]);
  });

  it('should remove sendername', async () => {
    // when
    const response = await smsapi.sendernames.remove(createdSendername.sender);

    // then
    expect(response).toBeUndefined();
  });
});
