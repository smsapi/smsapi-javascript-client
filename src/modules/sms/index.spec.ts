import nock from 'nock';

import { SMSAPI } from '../../smsapi';

import { SmsDetails } from './types/SmsDetails';

const { SMSAPI_OAUTH_TOKEN, SMSAPI_API_URL } = process.env;

const smsapi = new SMSAPI(SMSAPI_OAUTH_TOKEN || '', SMSAPI_API_URL || '');

describe('Sms', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('Single sms', () => {
    it('should send single sms', async () => {
      // given
      const number = '500000000';
      const message = 'someMessage';

      // when
      const response = await smsapi.sms.sendSms(number, message, {
        test: true,
      });

      // then
      expect(response).toMatchObject({
        count: 1,
        length: message.length,
        list: [
          {
            dateSent: expect.any(Date),
            error: null,
            id: expect.any(String),
            idx: null,
            number: expect.stringContaining(number),
            parts: 1,
            points: expect.any(Number),
            status: 'QUEUE',
            submittedNumber: number,
          },
        ],
        message,
        parts: 1,
      });
    });

    it('should send single sms to many numbers', async () => {
      // given
      const numbers = ['500000000', '500000001'];
      const message = 'someMessage';

      // when
      const response = await smsapi.sms.sendSms(numbers, message, {
        test: true,
      });

      // then
      expect(response).toMatchObject({
        count: numbers.length,
        length: message.length,
        list: numbers.map((number) => ({
          dateSent: expect.any(Date),
          error: null,
          id: expect.any(String),
          idx: null,
          number: expect.stringContaining(number),
          parts: 1,
          points: expect.any(Number),
          status: 'QUEUE',
          submittedNumber: number,
        })),
        message,
        parts: 1,
      });
    });

    it('should send single flash sms', async () => {
      // given
      const number = '500000000';
      const message = 'someMessage';

      // when
      const response = await smsapi.sms.sendFlashSms(number, message, {
        test: true,
      });

      // then
      expect(response).toMatchObject({
        count: 1,
        length: message.length,
        list: [
          {
            dateSent: expect.any(Date),
            error: null,
            id: expect.any(String),
            idx: null,
            number: expect.stringContaining(number),
            parts: 1,
            points: expect.any(Number),
            status: 'QUEUE',
            submittedNumber: number,
          },
        ],
        message,
        parts: 1,
      });
    });
  });

  // TODO: add group to send messages - task-7312
  xdescribe('Group sms', () => {
    it('should send sms to group', async () => {
      // given
      const groupName = 'someGroupName';
      const message = 'someMessage';

      // when
      const response = await smsapi.sms.sendSmsToGroup(groupName, message, {
        test: true,
      });

      // then
      expect(response).toMatchObject({
        //   count: 1,
        //   length: message.length,
        //   list: [
        //     {
        //       dateSent: expect.any(Date),
        //       error: null,
        //       id: expect.any(String),
        //       idx: null,
        //       number: expect.stringContaining(number),
        //       parts: 1,
        //       points: expect.any(Number),
        //       status: 'QUEUE',
        //       submittedNumber: number,
        //     },
        //   ],
        //   message,
        //   parts: 1,
      });
    });

    it('should send sms to many groups', async () => {
      // given
      const groupsNames = ['someGroupName1', 'someGroupName2'];
      const message = 'someMessage';

      // when
      const response = await smsapi.sms.sendSmsToGroup(groupsNames, message, {
        test: true,
      });

      // then
      expect(response).toMatchObject({
        //   count: 1,
        //   length: message.length,
        //   list: [
        //     {
        //       dateSent: expect.any(Date),
        //       error: null,
        //       id: expect.any(String),
        //       idx: null,
        //       number: expect.stringContaining(number),
        //       parts: 1,
        //       points: expect.any(Number),
        //       status: 'QUEUE',
        //       submittedNumber: number,
        //     },
        //   ],
        //   message,
        //   parts: 1,
      });
    });

    it('should send flash sms to group', async () => {
      // given
      const groupName = 'someGroupName';
      const message = 'someMessage';

      // when
      const response = await smsapi.sms.sendFlashSmsToGroup(
        groupName,
        message,
        {
          test: true,
        }
      );

      // then
      expect(response).toMatchObject({
        //   count: 1,
        //   length: message.length,
        //   list: [
        //     {
        //       dateSent: expect.any(Date),
        //       error: null,
        //       id: expect.any(String),
        //       idx: null,
        //       number: expect.stringContaining(number),
        //       parts: 1,
        //       points: expect.any(Number),
        //       status: 'QUEUE',
        //       submittedNumber: number,
        //     },
        //   ],
        //   message,
        //   parts: 1,
      });
    });
  });

  describe('Remove scheduled sms', () => {
    it('should remove single sms', async () => {
      // given
      const date = new Date();

      date.setHours(date.getHours() + 1);

      const scheduledSms = await smsapi.sms.sendSms(
        '500000000',
        'someMessage',
        {
          date,
        }
      );

      const scheduledSmsId = scheduledSms.list[0].id;

      // when
      const response = await smsapi.sms.removeScheduledSms(scheduledSmsId);

      // then
      expect(response.list[0].id).toEqual(scheduledSmsId);
    });

    it('should remove single sms scheduled for many numbers', async () => {
      // given
      const date = new Date();

      date.setHours(date.getHours() + 1);

      const scheduledSms = await smsapi.sms.sendSms(
        '500000000,500000001',
        'someMessage',
        {
          date,
        }
      );

      const scheduledSmsIds = scheduledSms.list.map((sms) => sms.id);

      // when
      const response = await smsapi.sms.removeScheduledSms(scheduledSmsIds);
      const removedIds = response.list.map((sms) => sms.id);

      // then
      expect(removedIds).toEqual(expect.arrayContaining(scheduledSmsIds));
    });
  });

  it('should trim message', async () => {
    // given
    const number = '500000000';
    const message = 'someMessage';

    // when
    const response = await smsapi.sms.sendSms(number, `  ${message} `, {
      test: true,
    });

    // then
    expect(response).toMatchObject({
      count: 1,
      length: message.length,
      list: [
        {
          dateSent: expect.any(Date),
          error: null,
          id: expect.any(String),
          idx: null,
          number: expect.stringContaining(number),
          parts: 1,
          points: expect.any(Number),
          status: 'QUEUE',
          submittedNumber: number,
        },
      ],
      message,
      parts: 1,
    });
  });

  it('should add dateValidate when date is present', async () => {
    // given
    const number = '500000000';
    const message = 'someMessage';

    const date = new Date();

    const req = nock(`${SMSAPI_API_URL}`)
      .post('/sms.do', {
        to: number,
        message,
        details: true,
        encoding: 'utf-8',
        format: 'json',
        date_validate: true,
        date: date.toISOString(),
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

  it('should make proper request when all details are present', async () => {
    // given
    const number = '500000005';
    const message = 'someMessage';

    const date = new Date();

    const details: SmsDetails = {
      allowDuplicates: false,
      checkIdx: false,
      date,
      discountGroup: 'someDiscountGroup',
      encoding: 'iso-8859-1',
      expirationDate: date,
      fast: false,
      flash: true,
      from: '2way',
      idx: 'someIdx',
      maxParts: 10,
      normalize: false,
      notifyUrl: 'someNotifyUrl',
      noUnicode: false,
      partnerId: 'somePartnerId',
      skipForeign: false,
      test: true,
      timeRestriction: 'follow',
      udh: 'someUdh',
      param1: 'someParam1',
      param2: 'someParam2',
      param3: 'someParam3',
      param4: 'someParam4',
      template: 'someTemplate',
      datacoding: 'bin',
    };

    const req = nock(`${SMSAPI_API_URL}`)
      .post('/sms.do', {
        to: number,
        message,
        details: true,
        format: 'json',
        date_validate: true,
        allow_duplicates: details.allowDuplicates,
        check_idx: details.checkIdx,
        date: details.date && details.date.toISOString(),
        discount_group: details.discountGroup,
        encoding: details.encoding,
        expiration_date:
          details.expirationDate && details.expirationDate.toISOString(),
        fast: details.fast,
        flash: details.flash,
        from: details.from,
        idx: details.idx,
        max_parts: details.maxParts,
        normalize: details.normalize,
        notify_url: details.notifyUrl,
        nounicode: details.noUnicode,
        partner_id: details.partnerId,
        skip_foreign: details.skipForeign,
        test: details.test,
        time_restriction: details.timeRestriction,
        udh: details.udh,
        param1: details.param1,
        param2: details.param2,
        param3: details.param3,
        param4: details.param4,
        template: details.template,
        datacoding: details.datacoding,
      })
      .reply(200);

    // when
    try {
      await smsapi.sms.sendSms(number, message, details);
    } catch {} // eslint-disable-line

    // then
    expect(req.isDone()).toBeTruthy();
  });
});
