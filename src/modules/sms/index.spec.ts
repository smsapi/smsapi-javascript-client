import nock from 'nock';

import { API_URL } from '../../constants';
import { SMSAPI } from '../../smsapi';

import { SmsDetails } from './types/SmsDetails';

const smsapi = new SMSAPI('someToken');

describe('Sms', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('Single sms', () => {
    it('should send single sms', async () => {
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
        .reply(200, {
          count: 1,
          list: [
            {
              date_sent: 1598964973,
              error: null,
              id: 'someId',
              idx: null,
              number: number,
              parts: 1,
              points: 0.16,
              status: 'QUEUE',
              submitted_number: number,
            },
          ],
        });

      // when
      const response = await smsapi.sms.sendSms(number, message);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toMatchObject({
        count: 1,
        list: [
          {
            dateSent: expect.any(Date),
            error: null,
            id: 'someId',
            idx: null,
            number: number,
            parts: 1,
            points: 0.16,
            status: 'QUEUE',
            submittedNumber: number,
          },
        ],
      });
    });

    it('should send single sms to many numbers', async () => {
      // given
      const numbers = ['500000000', '500000001'];
      const message = 'someMessage';

      const req = nock(API_URL)
        .post('/sms.do', {
          details: true,
          encoding: 'utf-8',
          format: 'json',
          message,
          to: numbers.join(','),
        })
        .reply(200, {
          count: 2,
          list: numbers.map((number) => ({
            date_sent: 1598964973,
            error: null,
            id: 'someId',
            idx: null,
            number: number,
            parts: 1,
            points: 0.16,
            status: 'QUEUE',
            submitted_number: number,
          })),
        });

      // when
      const response = await smsapi.sms.sendSms(numbers, message);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toMatchObject({
        count: numbers.length,
        list: numbers.map((number) => ({
          dateSent: expect.any(Date),
          error: null,
          id: 'someId',
          idx: null,
          number: number,
          parts: 1,
          points: 0.16,
          status: 'QUEUE',
          submittedNumber: number,
        })),
      });
    });

    it('should send single flash sms', async () => {
      // given
      const number = '500000000';
      const message = 'someMessage';

      const req = nock(API_URL)
        .post('/sms.do', {
          details: true,
          encoding: 'utf-8',
          flash: true,
          format: 'json',
          message,
          to: number,
        })
        .reply(200, {
          count: 1,
          list: [
            {
              date_sent: 1598964973,
              error: null,
              id: 'someId',
              idx: null,
              number: number,
              parts: 1,
              points: 0.16,
              status: 'QUEUE',
              submitted_number: number,
            },
          ],
        });

      // when
      const response = await smsapi.sms.sendFlashSms(number, message);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toMatchObject({
        count: 1,
        list: [
          {
            dateSent: expect.any(Date),
            error: null,
            id: 'someId',
            idx: null,
            number: number,
            parts: 1,
            points: 0.16,
            status: 'QUEUE',
            submittedNumber: number,
          },
        ],
      });
    });
  });

  describe('Group sms', () => {
    it('should send sms to group', async () => {
      // given
      const groupName = 'someGroupName';
      const message = 'someMessage';

      const req = nock(API_URL)
        .post('/sms.do', {
          details: true,
          encoding: 'utf-8',
          format: 'json',
          group: groupName,
          message,
        })
        .reply(200, {
          count: 1,
          length: message.length,
          list: [
            {
              date_sent: 1598964973,
              error: null,
              id: 'someId',
              idx: null,
              number: 'someNumber',
              parts: 1,
              points: 0.16,
              status: 'QUEUE',
              submitted_number: 'someNumber',
            },
          ],
          message,
          parts: 1,
        });

      // when
      const response = await smsapi.sms.sendSmsToGroup(groupName, message);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toMatchObject({
        count: 1,
        length: message.length,
        list: [
          {
            dateSent: expect.any(Date),
            error: null,
            id: 'someId',
            idx: null,
            number: 'someNumber',
            parts: 1,
            points: 0.16,
            status: 'QUEUE',
            submittedNumber: 'someNumber',
          },
        ],
        message,
        parts: 1,
      });
    });

    it('should send sms to many groups', async () => {
      // given
      const groupsNames = ['someGroupName1', 'someGroupName2'];
      const message = 'someMessage';

      const req = nock(API_URL)
        .post('/sms.do', {
          details: true,
          encoding: 'utf-8',
          format: 'json',
          group: groupsNames.join(','),
          message,
        })
        .reply(200, {
          count: 1,
          length: message.length,
          list: [
            {
              date_sent: 1598964973,
              error: null,
              id: 'someId',
              idx: null,
              number: 'someNumber',
              parts: 1,
              points: 0.16,
              status: 'QUEUE',
              submitted_number: 'someNumber',
            },
          ],
          message,
          parts: 1,
        });

      // when
      const response = await smsapi.sms.sendSmsToGroup(groupsNames, message);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toMatchObject({
        count: 1,
        length: message.length,
        list: [
          {
            dateSent: expect.any(Date),
            error: null,
            id: 'someId',
            idx: null,
            number: 'someNumber',
            parts: 1,
            points: 0.16,
            status: 'QUEUE',
            submittedNumber: 'someNumber',
          },
        ],
        message,
        parts: 1,
      });
    });

    it('should send flash sms to group', async () => {
      // given
      const groupName = 'someGroupName';
      const message = 'someMessage';

      const req = nock(API_URL)
        .post('/sms.do', {
          details: true,
          encoding: 'utf-8',
          flash: true,
          format: 'json',
          group: groupName,
          message,
        })
        .reply(200, {
          count: 1,
          length: message.length,
          list: [
            {
              date_sent: 1598964973,
              error: null,
              id: 'someId',
              idx: null,
              number: 'someNumber',
              parts: 1,
              points: 0.16,
              status: 'QUEUE',
              submitted_number: 'someNumber',
            },
          ],
          message,
          parts: 1,
        });

      // when
      const response = await smsapi.sms.sendFlashSmsToGroup(groupName, message);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toMatchObject({
        count: 1,
        length: message.length,
        list: [
          {
            dateSent: expect.any(Date),
            error: null,
            id: 'someId',
            idx: null,
            number: 'someNumber',
            parts: 1,
            points: 0.16,
            status: 'QUEUE',
            submittedNumber: 'someNumber',
          },
        ],
        message,
        parts: 1,
      });
    });
  });

  describe('Remove scheduled sms', () => {
    it('should remove single sms', async () => {
      // given
      const scheduledSmsId = 'someScheduledSmsId';

      const req = nock(API_URL)
        .post('/sms.do', {
          format: 'json',
          sch_del: scheduledSmsId,
        })
        .reply(200, {
          count: 1,
          list: [
            {
              date_sent: 1598964973,
              error: null,
              id: scheduledSmsId,
              idx: null,
              number: 'someNumber',
              parts: 1,
              points: 0.16,
              status: 'QUEUE',
              submitted_number: 'someNumber',
            },
          ],
        });

      // when
      const response = await smsapi.sms.removeScheduledSms(scheduledSmsId);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response.list[0].id).toEqual(scheduledSmsId);
    });

    it('should remove single sms scheduled for many numbers', async () => {
      // given
      const scheduledSmsIds = ['someScheduledSmsId1', 'someScheduledSmsId2'];

      const req = nock(API_URL)
        .post('/sms.do', {
          format: 'json',
          sch_del: scheduledSmsIds.join(','),
        })
        .reply(200, {
          count: 2,
          list: scheduledSmsIds.map((scheduledSmsId) => ({
            date_sent: 1598964973,
            error: null,
            id: scheduledSmsId,
            idx: null,
            number: 'someNumber',
            parts: 1,
            points: 0.16,
            status: 'QUEUE',
            submitted_number: 'someNumber',
          })),
        });

      // when
      const response = await smsapi.sms.removeScheduledSms(scheduledSmsIds);

      // then
      expect(req.isDone()).toBeTruthy();
      const removedIds = response.list.map((sms) => sms.id);
      expect(removedIds).toEqual(expect.arrayContaining(scheduledSmsIds));
    });
  });

  it('should make proper request when all details are present', async () => {
    // given
    const number = '500000005';
    const message = 'someMessage';

    const date = new Date();

    const details: SmsDetails = {
      allowDuplicates: false,
      checkIdx: false,
      datacoding: 'bin',
      date,
      discountGroup: 'someDiscountGroup',
      encoding: 'iso-8859-1',
      expirationDate: date,
      fast: false,
      flash: true,
      from: '2way',
      idx: 'someIdx',
      maxParts: 10,
      noUnicode: false,
      normalize: false,
      notifyUrl: 'someNotifyUrl',
      param1: 'someParam1',
      param2: 'someParam2',
      param3: 'someParam3',
      param4: 'someParam4',
      partnerId: 'somePartnerId',
      skipForeign: false,
      template: 'someTemplate',
      test: true,
      timeRestriction: 'follow',
      udh: 'someUdh',
    };

    const req = nock(API_URL)
      .post('/sms.do', {
        allow_duplicates: details.allowDuplicates,
        check_idx: details.checkIdx,
        datacoding: details.datacoding,
        date: details.date && details.date.toISOString(),
        date_validate: true,
        details: true,
        discount_group: details.discountGroup,
        encoding: details.encoding,
        expiration_date:
          details.expirationDate && details.expirationDate.toISOString(),
        fast: details.fast,
        flash: details.flash,
        format: 'json',
        from: details.from,
        idx: details.idx,
        max_parts: details.maxParts,
        message,
        normalize: details.normalize,
        notify_url: details.notifyUrl,
        nounicode: details.noUnicode,
        param1: details.param1,
        param2: details.param2,
        param3: details.param3,
        param4: details.param4,
        partner_id: details.partnerId,
        skip_foreign: details.skipForeign,
        template: details.template,
        test: details.test,
        time_restriction: details.timeRestriction,
        to: number,
        udh: details.udh,
      })
      .reply(200, {
        count: 1,
        length: message.length,
        list: [
          {
            date_sent: new Date(),
            error: null,
            id: 'someId',
            idx: null,
            number,
            parts: 1,
            points: 0.16,
            status: 'QUEUE',
            submitted_number: number,
          },
        ],
        message,
        parts: 1,
      });

    // when
    await smsapi.sms.sendSms(number, message, details);

    // then
    expect(req.isDone()).toBeTruthy();
  });
});
