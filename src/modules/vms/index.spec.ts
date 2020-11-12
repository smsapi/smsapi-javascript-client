import nock from 'nock';

import { SMSAPI } from '../../smsapi';
import { hexToString } from '../../testHelpers/hexToString';

const { VMS_LOCAL_FILE_PATH } = process.env;

const smsapi = new SMSAPI('someToken');

describe('Vms', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('Single vms', () => {
    describe('tts', () => {
      it('should send single vms', async () => {
        // given
        const number = '500000000';
        const tts = 'Some tts';

        const req = nock('https://smsapi.io/api')
          .post('/vms.do', {
            details: true,
            encoding: 'utf-8',
            format: 'json',
            to: number,
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
                number: number,
                points: 0.16,
                status: 'QUEUE',
                submitted_number: number,
              },
            ],
          });

        // when
        const response = await smsapi.vms.sendVms(number, tts);

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
              number: number,
              points: 0.16,
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

        const req = nock('https://smsapi.io/api')
          .post('/vms.do', {
            details: true,
            encoding: 'utf-8',
            format: 'json',
            to: number,
            tts,
            tts_lector: 'maja',
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
                points: 0.16,
                status: 'QUEUE',
                submitted_number: number,
              },
            ],
          });

        // when
        const response = await smsapi.vms.sendVms(number, tts, 'maja');

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
              number: number,
              points: 0.16,
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

        const req = nock('https://smsapi.io/api')
          .post('/vms.do', {
            details: true,
            encoding: 'utf-8',
            format: 'json',
            to: numbers.join(','),
            tts,
            tts_lector: 'ewa',
          })
          .reply(200, {
            count: numbers.length,
            list: numbers.map((number) => ({
              date_sent: 1598964973,
              error: null,
              id: 'someId',
              idx: null,
              number: number,
              points: 0.16,
              status: 'QUEUE',
              submitted_number: number,
            })),
          });

        // when
        const response = await smsapi.vms.sendVms(numbers, tts);

        // then
        expect(req.isDone()).toBeTruthy();
        expect(response).toEqual({
          count: numbers.length,
          list: numbers.map((number) => ({
            dateSent: expect.any(Date),
            error: null,
            id: 'someId',
            idx: null,
            number: number,
            points: 0.16,
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

          const req = nock('https://smsapi.io/api')
            .post('/vms.do', (body) => {
              const data = hexToString(body);

              return (
                data.includes('Content-Disposition: form-data;') &&
                data.includes('Content-Type: audio/wav') &&
                data.includes('filename="vms.wav"')
              );
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
                  points: 0.16,
                  status: 'QUEUE',
                  submitted_number: number,
                },
              ],
            });

          // when
          const response = await smsapi.vms.sendVmsWithLocalFile(
            number,
            VMS_LOCAL_FILE_PATH
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
                number: number,
                points: 0.16,
                status: 'QUEUE',
                submittedNumber: number,
              },
            ],
          });
        });

        it('should send single vms to many numbers', async () => {
          // given
          const numbers = ['500000000', '500000001'];

          const req = nock('https://smsapi.io/api')
            .post('/vms.do', (body) => {
              const data = hexToString(body);

              return (
                data.includes('Content-Disposition: form-data;') &&
                data.includes('Content-Type: audio/wav') &&
                data.includes('filename="vms.wav"')
              );
            })
            .reply(200, {
              count: numbers.length,
              list: numbers.map((number) => ({
                date_sent: 1598964973,
                error: null,
                id: 'someId',
                idx: null,
                number: number,
                points: 0.16,
                status: 'QUEUE',
                submitted_number: number,
              })),
            });

          // when
          const response = await smsapi.vms.sendVmsWithLocalFile(
            numbers,
            VMS_LOCAL_FILE_PATH
          );

          // then
          expect(req.isDone()).toBeTruthy();
          expect(response).toEqual({
            count: numbers.length,
            list: numbers.map((number) => ({
              dateSent: expect.any(Date),
              error: null,
              id: 'someId',
              idx: null,
              number: number,
              points: 0.16,
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

    describe('remote file', () => {
      it('should send single vms', async () => {
        // given
        const number = '500000000';
        const url = 'someUrl';

        const req = nock('https://smsapi.io/api')
          .post('/vms.do', {
            details: true,
            encoding: 'utf-8',
            file: url,
            format: 'json',
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
                points: 0.16,
                status: 'QUEUE',
                submitted_number: number,
              },
            ],
          });

        // when
        const response = await smsapi.vms.sendVmsWithRemoteFile(number, url);

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
              number: number,
              points: 0.16,
              status: 'QUEUE',
              submittedNumber: number,
            },
          ],
        });
      });

      it('should send single vms to many numbers', async () => {
        // given
        const numbers = ['500000000', '500000001'];
        const url = 'someUrl';

        const req = nock('https://smsapi.io/api')
          .post('/vms.do', {
            details: true,
            encoding: 'utf-8',
            file: url,
            format: 'json',
            to: numbers.join(','),
          })
          .reply(200, {
            count: numbers.length,
            list: numbers.map((number) => ({
              date_sent: 1598964973,
              error: null,
              id: 'someId',
              idx: null,
              number: number,
              points: 0.16,
              status: 'QUEUE',
              submitted_number: number,
            })),
          });

        // when
        const response = await smsapi.vms.sendVmsWithRemoteFile(numbers, url);

        // then
        expect(req.isDone()).toBeTruthy();
        expect(response).toEqual({
          count: numbers.length,
          list: numbers.map((number) => ({
            dateSent: expect.any(Date),
            error: null,
            id: 'someId',
            idx: null,
            number: number,
            points: 0.16,
            status: 'QUEUE',
            submittedNumber: number,
          })),
        });
      });
    });
  });

  describe('Group vms', () => {
    describe('tts', () => {
      it('should send vms to group', async () => {
        // given
        const groupName = 'someGroupName';
        const tts = 'Some tts';

        const req = nock('https://smsapi.io/api')
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

        const req = nock('https://smsapi.io/api')
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

    if (VMS_LOCAL_FILE_PATH) {
      describe('local file', () => {
        it('should send vms to group', async () => {
          // given
          const groupName = 'someGroupName';

          const req = nock('https://smsapi.io/api')
            .post('/vms.do', (body) => {
              const data = hexToString(body);

              return (
                data.includes('Content-Disposition: form-data;') &&
                data.includes('Content-Type: audio/wav') &&
                data.includes('filename="vms.wav"')
              );
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
          const response = await smsapi.vms.sendVmsWithLocalFileToGroup(
            groupName,
            VMS_LOCAL_FILE_PATH
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

        it('should send vms to many groups', async () => {
          // given
          const groupNames = ['someGroupName1', 'someGroupName2'];

          const req = nock('https://smsapi.io/api')
            .post('/vms.do', (body) => {
              const data = hexToString(body);

              return (
                data.includes('Content-Disposition: form-data;') &&
                data.includes('Content-Type: audio/wav') &&
                data.includes('filename="vms.wav"')
              );
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
          const response = await smsapi.vms.sendVmsWithLocalFileToGroup(
            groupNames,
            VMS_LOCAL_FILE_PATH
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
    } else {
      console.warn(
        'Please add VMS_LOCAL_FILE_PATH env to test vms with local path'
      );
    }

    describe('remote file', () => {
      it('should send vms to group', async () => {
        // given
        const groupName = 'someGroupName';
        const pathToRemoteFile = 'somePath';

        const req = nock('https://smsapi.io/api')
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

        const req = nock('https://smsapi.io/api')
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
