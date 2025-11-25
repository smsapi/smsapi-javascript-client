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
          id: 'someId',
          code: '123456',
          phone_number: phoneNumber,
          from: null,
        });

      // when
      const response = await smsapi.mfa.generateCode(phoneNumber);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toEqual({
        id: 'someId',
        code: '123456',
        phoneNumber: phoneNumber,
        from: null,
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
          phone_number: phoneNumber,
          content: options.content,
          fast: options.fast,
          from: options.from,
        })
        .reply(200, {
          id: 'someId',
          code: '654321',
          phone_number: phoneNumber,
          from: 'Test',
        });

      // when
      const response = await smsapi.mfa.generateCode(phoneNumber, options);

      // then
      expect(req.isDone()).toBeTruthy();
      expect(response).toEqual({
        id: 'someId',
        code: '654321',
        phoneNumber: phoneNumber,
        from: 'Test',
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
          phone_number: phoneNumber,
          code: code,
        })
        .reply(204);

      // when
      await smsapi.mfa.verifyCode(phoneNumber, code);

      // then
      expect(req.isDone()).toBeTruthy();
    });
  });
});
