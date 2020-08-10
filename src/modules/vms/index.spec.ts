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
});
