import nock from 'nock';

import { SMSAPIpl, SMSAPIcom } from '../src';

let nockPl: nock.Scope;
let nockCom: nock.Scope;

describe('SMSAPI', () => {
  beforeEach(() => {
    nockPl = nock('https://api.smsapi.pl/').get('/profile').reply(200);
    nockCom = nock('https://api.smsapi.com/').get('/profile').reply(200);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('SMSAPIpl should call https://api.smsapi.pl', async () => {
    // given
    const token = 'someToken';
    const smsapi = new SMSAPIpl(token);

    // when
    await smsapi.profile.get();

    // then
    expect(nockPl.pendingMocks()).toEqual([]);
    expect(nockCom.pendingMocks().length).toEqual(1);
  });

  it('SMSAPIcom should call https://api.smsapi.com', async () => {
    // given
    const token = 'someToken';
    const smsapi = new SMSAPIcom(token);

    // when
    await smsapi.profile.get();

    // then
    expect(nockCom.pendingMocks()).toEqual([]);
    expect(nockPl.pendingMocks().length).toEqual(1);
  });
});
