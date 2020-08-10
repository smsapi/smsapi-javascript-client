import { SMSAPI } from '../../smsapi';

const { SMSAPI_OAUTH_TOKEN, SMSAPI_API_URL } = process.env;

describe('Profile', () => {
  it('should get profile', async () => {
    // given
    const smsapi = new SMSAPI(SMSAPI_OAUTH_TOKEN || '', SMSAPI_API_URL || '');

    // when
    const profile = await smsapi.profile.get();

    // then
    expect(profile).toEqual({
      email: expect.any(String),
      id: expect.any(String),
      name: expect.any(String),
      paymentType: expect.any(String),
      phoneNumber: expect.any(String),
      points: expect.any(Number),
      userType: expect.any(String),
      username: expect.any(String),
    });
  });
});
