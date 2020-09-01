import nock from 'nock';

import { SMSAPI } from '../../smsapi';

const { SMSAPI_OAUTH_TOKEN, SMSAPI_API_URL } = process.env;

const smsapi = new SMSAPI(SMSAPI_OAUTH_TOKEN || '', SMSAPI_API_URL || '');

const smil = `<smil>
  <head>
    <layout>
      <root-layout backgroundColor="#FFFFFF" background-color="#FFFFFF" height="100%" width="100%"/>
      <region id="Image" top="0" left="0" height="50%" width="100%" fit="meet"/>
    </layout>
  </head>
  <body>
    <par dur="5000ms">
      <img src="https://www.smsapi.pl/public/images/logo.png" region="Image"/>
    </par>
  </body>
</smil>`;

describe('Mms', () => {
  describe('Single mms', () => {
    it('should send single mms', async () => {
      // given
      const number = '500000000';
      const subject = 'Some subject';

      // when
      const response = await smsapi.mms.sendMms(number, subject, smil, {
        test: true,
      });

      // then
      expect(response).toEqual({
        count: 1,
        list: [
          {
            dateSent: expect.any(Date),
            error: null,
            id: expect.any(String),
            idx: null,
            number: expect.stringContaining(number),
            points: expect.any(Number),
            status: 'QUEUE',
            submittedNumber: number,
          },
        ],
      });
    });

    it('should send single mms to many numbers', async () => {
      // given
      const numbers = ['500000000', '500000001'];
      const subject = 'Some subject';

      // when
      const response = await smsapi.mms.sendMms(numbers, subject, smil, {
        test: true,
      });

      // then
      expect(response).toMatchObject({
        count: numbers.length,
        list: numbers.map((number) => ({
          dateSent: expect.any(Date),
          error: null,
          id: expect.any(String),
          idx: null,
          number: expect.stringContaining(number),
          points: expect.any(Number),
          status: 'QUEUE',
          submittedNumber: number,
        })),
      });
    });
  });

  describe('Group mms', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should send mms to group', async () => {
      // given
      const groupName = 'someGroupName';
      const subject = 'Some subject';

      const req = nock(`${SMSAPI_API_URL}`)
        .post('/mms.do', {
          details: true,
          encoding: 'utf-8',
          format: 'json',
          group: groupName,
          smil,
          subject,
        })
        .reply(200, {
          count: 1,
          list: [
            {
              date_sent: 1598964973,
              error: null,
              id: 'someId',
              idx: null,
              number: 'someNumber',
              points: 0.16,
              status: 'QUEUE',
              submitted_number: 'someNumber',
            },
          ],
        });

      // when
      const response = await smsapi.mms.sendMmsToGroup(
        groupName,
        subject,
        smil
      );

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toEqual({
        count: 1,
        list: [
          {
            dateSent: expect.any(Date),
            error: null,
            id: 'someId',
            idx: null,
            number: 'someNumber',
            points: 0.16,
            status: 'QUEUE',
            submittedNumber: 'someNumber',
          },
        ],
      });
    });

    it('should send mms to many groups', async () => {
      // given
      const groupNames = ['someGroupName1', 'someGroupName2'];
      const subject = 'Some subject';

      const req = nock(`${SMSAPI_API_URL}`)
        .post('/mms.do', {
          details: true,
          encoding: 'utf-8',
          format: 'json',
          group: groupNames.join(','),
          smil,
          subject,
        })
        .reply(200, {
          count: 1,
          list: [
            {
              date_sent: 1598964973,
              error: null,
              id: 'someId',
              idx: null,
              number: 'someNumber',
              points: 0.16,
              status: 'QUEUE',
              submitted_number: 'someNumber',
            },
          ],
        });

      // when
      const response = await smsapi.mms.sendMmsToGroup(
        groupNames,
        subject,
        smil
      );

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toEqual({
        count: 1,
        list: [
          {
            dateSent: expect.any(Date),
            error: null,
            id: 'someId',
            idx: null,
            number: 'someNumber',
            points: 0.16,
            status: 'QUEUE',
            submittedNumber: 'someNumber',
          },
        ],
      });
    });
  });
});
