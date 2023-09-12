import nock from 'nock';

import { API_URL } from '../../constants';
import { SMSAPI } from '../../smsapi';
import { MessageErrorResponse } from '../../types';

const smsapi = new SMSAPI('someToken');

describe('Base message module', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should trim message', async () => {
    // given
    const number = '500000000';
    const message = 'someMessage';

    const req = nock(API_URL)
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

    const req = nock(API_URL)
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

    const req = nock(API_URL)
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

  it('should throw error when sms.do returns one', async () => {
    // given
    const invalidNumber = '500000xxx';
    const message = 'someMessage';
    const errorResponse: MessageErrorResponse = {
      error: 13,
      message: 'No correct phone numbers',
    };

    const date = new Date();

    const req = nock(API_URL)
      .post('/sms.do', {
        date: date.toISOString(),
        date_validate: true,
        details: true,
        encoding: 'utf-8',
        format: 'json',
        message,
        to: invalidNumber,
      })
      .reply(200, errorResponse);

    // when
    try {
      await smsapi.sms.sendSms(invalidNumber, message, {
        date,
      });
    } catch (error) {
      expect(req.isDone()).toBeTruthy();

      expect(error.data).toEqual(errorResponse);
    }
  });

  it('should properly convert date_sent to Date', async () => {
    // given
    const number = '500000000';
    const message = 'someMessage';

    const dateSentInSeconds = 1694509448;

    const req = nock(API_URL)
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
            date_sent: dateSentInSeconds,
          },
        ],
      });

    // when
    const res = await smsapi.sms.sendSms(number, message);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(res.list[0].dateSent.getTime() / 1000).toEqual(dateSentInSeconds);
  });
});
