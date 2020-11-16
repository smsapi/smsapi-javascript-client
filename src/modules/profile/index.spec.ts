import nock from 'nock';

import { API_URL } from '../../constants';
import { SMSAPI } from '../../smsapi';

describe('Profile', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should get profile', async () => {
    // given
    const smsapi = new SMSAPI('someToken');

    const req = nock(API_URL).get('/profile').reply(200, {
      email: 'someEmail',
      id: 'someId',
      name: 'someName',
      payment_type: 'trial',
      phone_number: 'somePhoneNumber',
      points: 1,
      user_type: 'native',
      username: 'someUsername',
    });

    // when
    const profile = await smsapi.profile.get();

    // then
    expect(req.isDone()).toBeTruthy();
    expect(profile).toEqual({
      email: 'someEmail',
      id: 'someId',
      name: 'someName',
      paymentType: 'trial',
      phoneNumber: 'somePhoneNumber',
      points: 1,
      userType: 'native',
      username: 'someUsername',
    });
  });
});
