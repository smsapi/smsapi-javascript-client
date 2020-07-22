import nock from 'nock';

import { SMSAPIpl } from '../src';

import { API_URL } from './constants';

describe('HLR', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should add number to HRL queue', async () => {
    // given
    const smsapi = new SMSAPIpl('someToken');
    const someNumber = 'someNumber';

    const apiResponse = {
      id: 'someId',
      number: someNumber,
      price: 0,
      status: 'OK',
    };

    nock(API_URL)
      .get('/hlr.do')
      .query({
        format: 'json',
        number: someNumber,
      })
      .reply(200, apiResponse);

    // when
    const res = await smsapi.hlr.check([someNumber]);

    // then
    expect(res).toEqual(apiResponse);
  });

  it('should add numbers to HRL queue', async () => {
    // given
    const smsapi = new SMSAPIpl('someToken');
    const someNumbers = ['someNumber1', 'someNumber2'];

    const apiResponse = someNumbers.map((number) => ({
      id: 'someId',
      number,
      price: 0,
      status: 'OK',
    }));

    nock(API_URL)
      .get('/hlr.do')
      .query({
        format: 'json',
        number: someNumbers.join(','),
      })
      .reply(200, apiResponse);

    // when
    const res = await smsapi.hlr.check(someNumbers);

    // then
    expect(res).toEqual(apiResponse);
  });

  it('should handle one invalid number', async () => {
    // given
    const smsapi = new SMSAPIpl('someToken');
    const someNumber = 'someInvalidNumber';

    const apiResponse = {
      id: 'someId',
      error: 13,
      number: someNumber,
    };

    nock(API_URL)
      .get('/hlr.do')
      .query({
        format: 'json',
        number: someNumber,
      })
      .reply(200, apiResponse);

    // when
    const res = await smsapi.hlr.check([someNumber]);

    // then
    expect(res).toEqual(apiResponse);
  });

  it('should handle one valid number and one invalid number', async () => {
    // given
    const smsapi = new SMSAPIpl('someToken');
    const someNumbers = ['someNumber1', 'someInvalidNumber2'];

    const apiResponse = [
      {
        id: 'someId',
        number: someNumbers[0],
        price: 0,
        status: 'OK',
      },
      {
        id: 'someId',
        error: 13,
        number: someNumbers[1],
      },
    ];

    nock(API_URL)
      .get('/hlr.do')
      .query({
        format: 'json',
        number: someNumbers.join(','),
      })
      .reply(200, apiResponse);

    // when
    const res = await smsapi.hlr.check(someNumbers);

    // then
    expect(res).toEqual(apiResponse);
  });
});
