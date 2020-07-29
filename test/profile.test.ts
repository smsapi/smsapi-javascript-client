import nock from 'nock';

import { SMSAPIpl } from '../src';

import { API_URL } from './constants';

describe('Profile', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should get profile', async () => {
    // given
    const smsapi = new SMSAPIpl('someToken');

    nock(`${API_URL}`).get('/profile').reply(200, {
      name: 'someName',
      email: 'some@email.com',
      username: 'someUsername',
      phone_number: 'somePhoneNumber',
      payment_type: 'prepaid',
      user_type: 'native',
      points: 1000,
    });

    // when
    const profile = await smsapi.profile.get();

    // then
    expect(profile).toEqual({
      name: 'someName',
      email: 'some@email.com',
      username: 'someUsername',
      phoneNumber: 'somePhoneNumber',
      paymentType: 'prepaid',
      userType: 'native',
      points: 1000,
    });
  });
});
