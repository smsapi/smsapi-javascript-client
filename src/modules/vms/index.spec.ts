import nock from 'nock';

import { SMSAPI } from '../../smsapi';

const {
  SMSAPI_API_URL,
  SMSAPI_OAUTH_TOKEN,
  VMS_LOCAL_FILE_PATH,
  VMS_REMOTE_FILE_PATH,
} = process.env;

const smsapi = new SMSAPI(SMSAPI_OAUTH_TOKEN || '', SMSAPI_API_URL || '');

describe('Vms', () => {
  describe('Single vms', () => {
    describe('tts', () => {
      it('should send single vms', async () => {
        // given
        const number = '500000000';
        const tts = 'Some tts';

        // when
        const response = await smsapi.vms.sendVms(number, tts, undefined, {
          test: true,
        });

        // then
        expect(response).toMatchObject({
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

      it('should send single vms with lector', async () => {
        // given
        const number = '500000000';
        const tts = 'Some tts';

        // when
        const response = await smsapi.vms.sendVms(number, tts, 'maja', {
          test: true,
        });

        // then
        expect(response).toMatchObject({
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

      it('should send single vms to many numbers', async () => {
        // given
        const numbers = ['500000000', '500000001'];
        const tts = 'Some tts';

        // when
        const response = await smsapi.vms.sendVms(numbers, tts, undefined, {
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

    if (VMS_LOCAL_FILE_PATH) {
      describe('local file', () => {
        it('should send single vms', async () => {
          // given
          const number = '500000000';

          // when
          const response = await smsapi.vms.sendVmsWithLocalFile(
            number,
            VMS_LOCAL_FILE_PATH,
            {
              test: true,
            }
          );

          // then
          expect(response).toMatchObject({
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

        it('should send single vms to many numbers', async () => {
          // given
          const numbers = ['500000000', '500000001'];

          // when
          const response = await smsapi.vms.sendVmsWithLocalFile(
            numbers,
            VMS_LOCAL_FILE_PATH,
            {
              test: true,
            }
          );

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
    } else {
      console.warn(
        'Please add VMS_LOCAL_FILE_PATH env to test vms with local path'
      );
    }

    if (VMS_REMOTE_FILE_PATH) {
      describe('remote file', () => {
        it('should send single vms', async () => {
          // given
          const number = '500000000';

          // when
          const response = await smsapi.vms.sendVmsWithRemoteFile(
            number,
            VMS_REMOTE_FILE_PATH,
            {
              test: true,
            }
          );

          // then
          expect(response).toMatchObject({
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

        it('should send single vms to many numbers', async () => {
          // given
          const numbers = ['500000000', '500000001'];

          // when
          const response = await smsapi.vms.sendVmsWithRemoteFile(
            numbers,
            VMS_REMOTE_FILE_PATH,
            {
              test: true,
            }
          );

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
    } else {
      console.warn(
        'Please add VMS_REMOTE_FILE_PATH env to test vms with remote path'
      );
    }
  });

  describe('Group vms', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('tts', () => {
      it('should send vms to group', async () => {
        // given
        const groupName = 'someGroupName';
        const tts = 'Some tts';

        const req = nock(`${SMSAPI_API_URL}`)
          .post('/vms.do', {
            details: true,
            encoding: 'utf-8',
            format: 'json',
            group: groupName,
            tts,
            tts_lector: 'ewa',
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
        const response = await smsapi.vms.sendVmsToGroup(groupName, tts);

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
              number: 'someNumber',
              points: 0.16,
              status: 'QUEUE',
              submittedNumber: 'someNumber',
            },
          ],
        });
      });

      it('should send vms to many groups', async () => {
        // given
        const groupNames = ['someGroupName1', 'someGroupName2'];
        const tts = 'Some tts';

        const req = nock(`${SMSAPI_API_URL}`)
          .post('/vms.do', {
            details: true,
            encoding: 'utf-8',
            format: 'json',
            group: groupNames.join(','),
            tts,
            tts_lector: 'ewa',
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
        const response = await smsapi.vms.sendVmsToGroup(groupNames, tts);

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
              number: 'someNumber',
              points: 0.16,
              status: 'QUEUE',
              submittedNumber: 'someNumber',
            },
          ],
        });
      });
    });

    describe('remote file', () => {
      it('should send vms to group', async () => {
        // given
        const groupName = 'someGroupName';
        const pathToRemoteFile = 'somePath';

        const req = nock(`${SMSAPI_API_URL}`)
          .post('/vms.do', {
            details: true,
            encoding: 'utf-8',
            file: pathToRemoteFile,
            format: 'json',
            group: groupName,
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
        const response = await smsapi.vms.sendVmsWithRemoteFileToGroup(
          groupName,
          pathToRemoteFile
        );

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
              number: 'someNumber',
              points: 0.16,
              status: 'QUEUE',
              submittedNumber: 'someNumber',
            },
          ],
        });
      });

      it('should send vms to many groups', async () => {
        // given
        const groupNames = ['someGroupName1', 'someGroupName2'];
        const pathToRemoteFile = 'somePath';

        const req = nock(`${SMSAPI_API_URL}`)
          .post('/vms.do', {
            details: true,
            encoding: 'utf-8',
            file: pathToRemoteFile,
            format: 'json',
            group: groupNames.join(','),
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
        const response = await smsapi.vms.sendVmsWithRemoteFileToGroup(
          groupNames,
          pathToRemoteFile
        );

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
});
