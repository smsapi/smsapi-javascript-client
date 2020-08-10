import nock from 'nock';

import { SMSAPI } from '../../smsapi';

const { SMSAPI_OAUTH_TOKEN, SMSAPI_API_URL } = process.env;

const smsapi = new SMSAPI(SMSAPI_OAUTH_TOKEN || '', SMSAPI_API_URL || '');

describe('Base message module', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should trim message', async () => {
    // given
    const number = '500000000';
    const message = 'someMessage';

    const req = nock(`${SMSAPI_API_URL}`)
      .post('/sms.do', {
        details: true,
        encoding: 'utf-8',
        format: 'json',
        message,
        to: number,
      })
      .reply(200);

    // when
    try {
      await smsapi.sms.sendSms(number, `  ${message} `);
    } catch {} // eslint-disable-line

    // then
    expect(req.isDone()).toBeTruthy();
  });

  it('should parseFloat points if returned as string', async () => {
    // given
    const number = '500000000';
    const message = 'someMessage';

    const points = '0.1';

    const req = nock(`${SMSAPI_API_URL}`)
      .post('/sms.do', {
        details: true,
        encoding: 'utf-8',
        format: 'json',
        message,
        to: number,
      })
      .reply(200, {
        count: 1,
        list: [
          {
            date_sent: new Date(),
            points,
          },
        ],
      });

    // when
    const res = await smsapi.sms.sendSms(number, message);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(res.list[0].points).toEqual(0.1);
  });

  it('should add dateValidate when date is present', async () => {
    // given
    const number = '500000000';
    const message = 'someMessage';

    const date = new Date();

    const req = nock(`${SMSAPI_API_URL}`)
      .post('/sms.do', {
        date: date.toISOString(),
        date_validate: true,
        details: true,
        encoding: 'utf-8',
        format: 'json',
        message,
        to: number,
      })
      .reply(200);

    // when
    try {
      await smsapi.sms.sendSms(number, message, {
        date,
      });
    } catch {} // eslint-disable-line

    // then
    expect(req.isDone()).toBeTruthy();
  });
});
