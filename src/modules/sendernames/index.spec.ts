import nock from 'nock';

import { SMSAPI } from '../../smsapi';
import { Sendername } from '../../types';

const { SMSAPI_OAUTH_TOKEN, SMSAPI_API_URL } = process.env;

const smsapi = new SMSAPI(SMSAPI_OAUTH_TOKEN || '', SMSAPI_API_URL || '');

let createdSendername: Sendername | null = null;

const generateSendername = (): string => {
  let result = '';

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const MAX_SENDERNAME_LENGTH = 11;

  for (let i = 0; i < MAX_SENDERNAME_LENGTH; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

describe('Sendernames', () => {
  afterEach(async () => {
    nock.cleanAll();

    if (createdSendername !== null) {
      await smsapi.sendernames.remove(createdSendername.sender);
      createdSendername = null;
    }
  });

  it('should get all sendernames', async () => {
    // given
    createdSendername = await smsapi.sendernames.create(generateSendername());

    // when
    const response = await smsapi.sendernames.get();

    // then
    expect(response.collection).toContainEqual(createdSendername);
    expect(response.size).toBeGreaterThan(0);
  });

  it('should get sendername by sender', async () => {
    // given
    createdSendername = await smsapi.sendernames.create(generateSendername());

    // when
    const response = await smsapi.sendernames.getBySender(
      createdSendername.sender
    );

    // then
    expect(response).toEqual(createdSendername);
  });

  it('should create sendername', async () => {
    // given
    const someSenderName = generateSendername();

    // when
    createdSendername = await smsapi.sendernames.create(someSenderName);

    // then
    expect(createdSendername).toEqual({
      createdAt: expect.any(Date),
      isDefault: false,
      sender: someSenderName,
      status: expect.any(String),
    });
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
    // given
    createdSendername = await smsapi.sendernames.create(generateSendername());

    // when
    const response = await smsapi.sendernames.remove(createdSendername.sender);

    createdSendername = null;

    // then
    expect(response).toBeUndefined();
  });
});
