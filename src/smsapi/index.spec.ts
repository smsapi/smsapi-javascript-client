import nock from 'nock';

import { SMSAPI } from '../index';

const token = 'someToken';

describe('SMSAPI', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('SMSAPI should call https://smsapi.io/api', async () => {
    // given
    nock('https://smsapi.io/api', {
      reqheaders: {
        authorization: `Bearer ${token}`,
      },
    })
      .get('/profile')
      .reply(200);

    const smsapi = new SMSAPI(token);

    // when
    await smsapi.profile.get();

    // then
    expect(nock.pendingMocks()).toEqual([]);
    expect(nock.isDone()).toEqual(true);
  });
});
