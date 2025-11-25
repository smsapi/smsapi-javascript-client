import nock from 'nock';

import { API_URL } from '../../constants';
import { SMSAPI } from '../../smsapi';

describe('MFA', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('generateCode', () => {
    it('should generate MFA code without options', async () => {
      // given
      const smsapi = new SMSAPI('someToken');
      const phoneNumber = '+48123456789';

      const req = nock(API_URL)
        .post('/mfa/codes', {
          phone_number: phoneNumber,
        })
        .reply(200, {
          code: '123456',
          from: null,
          id: 'someId',
          phone_number: phoneNumber,
        });

      // when
      const response = await smsapi.mfa.generateCode(phoneNumber);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toEqual({
        code: '123456',
        from: null,
        id: 'someId',
        phoneNumber: phoneNumber,
      });
    });

    it('should generate MFA code with options', async () => {
      // given
      const smsapi = new SMSAPI('someToken');
      const phoneNumber = '+48123456789';
      const options = {
        content: 'Your code is: [%code%]',
        fast: true,
        from: 'Test',
      };

      const req = nock(API_URL)
        .post('/mfa/codes', {
          content: options.content,
          fast: options.fast,
          from: options.from,
          phone_number: phoneNumber,
        })
        .reply(200, {
          code: '654321',
          from: 'Test',
          id: 'someId',
          phone_number: phoneNumber,
        });

      // when
      const response = await smsapi.mfa.generateCode(phoneNumber, options);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toEqual({
        code: '654321',
        from: 'Test',
        id: 'someId',
        phoneNumber: phoneNumber,
      });
    });
  });

  describe('verifyCode', () => {
    it('should verify MFA code', async () => {
      // given
      const smsapi = new SMSAPI('someToken');
      const phoneNumber = '+48123456789';
      const code = '123456';

      const req = nock(API_URL)
        .post('/mfa/codes/verifications', {
          code: code,
          phone_number: phoneNumber,
        })
        .reply(204);

      // when
      await smsapi.mfa.verifyCode(phoneNumber, code);

      // then
      expect(req.isDone()).toBeTruthy();
    });
  });
});
