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
});
