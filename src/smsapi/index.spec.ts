import nock from 'nock';

import { API_URL } from '../constants';
import { SMSAPI } from '../index';

const token = 'someToken';

describe('SMSAPI', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it(`SMSAPI should call ${API_URL}`, async () => {
    // given
    nock(API_URL, {
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

  it(`SMSAPI should call service provided by user`, async () => {
    // given
    const url = 'https://ssl.smsapi.com/api';

    nock(url, {
      reqheaders: {
        authorization: `Bearer ${token}`,
      },
    })
      .get('/profile')
      .reply(200);

    const smsapi = new SMSAPI(token, url);

    // when
    await smsapi.profile.get();

    // then
    expect(nock.pendingMocks()).toEqual([]);
    expect(nock.isDone()).toEqual(true);
  });
});
