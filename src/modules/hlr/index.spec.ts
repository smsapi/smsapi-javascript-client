import nock from 'nock';

import { API_URL } from '../../constants';
import { SMSAPI } from '../../smsapi';

const smsapi = new SMSAPI('someToken');

describe('HLR', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should add number to HRL queue', async () => {
    // given
    const someNumber = '48500000000';
    const hlrCheck = {
      id: 'someId',
      number: someNumber,
      price: 1,
      status: 'OK',
    };

    const req = nock(API_URL)
      .post('/hlr.do')
      .query({
        format: 'json',
        number: someNumber,
      })
      .reply(200, hlrCheck);

    // when
    const res = await smsapi.hlr.check(someNumber);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(res).toEqual(hlrCheck);
  });

  it('should add number to HRL queue with idx', async () => {
    // given
    const someNumber = '48500000000';
    const someIdx = 'someIdx';
    const hlrCheck = {
      id: 'someId',
      number: someNumber,
      price: 1,
      status: 'OK',
    };

    const req = nock(API_URL)
      .post('/hlr.do')
      .query({
        format: 'json',
        idx: someIdx,
        number: someNumber,
      })
      .reply(200, hlrCheck);

    // when
    const res = await smsapi.hlr.check(someNumber, someIdx);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(res).toEqual(hlrCheck);
  });

  it('should add numbers to HRL queue', async () => {
    // given
    const someNumbers = ['48500000000', '48500000001'];
    const hlrCheck = someNumbers.map((number) => ({
      id: 'someId',
      number: number,
      price: 1,
      status: 'OK',
    }));

    const req = nock(API_URL)
      .post('/hlr.do')
      .query({
        format: 'json',
        number: someNumbers.join(','),
      })
      .reply(200, hlrCheck);

    // when
    const res = await smsapi.hlr.check(someNumbers);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(res).toEqual(hlrCheck);
  });

  it('should add numbers to HRL queue with idx', async () => {
    // given
    const someNumbers = ['48500000000', '48500000001'];
    const someIdx = ['someIdx1', 'someIdx2'];
    const hlrCheck = someNumbers.map((number) => ({
      id: 'someId',
      number: number,
      price: 1,
      status: 'OK',
    }));

    const req = nock(API_URL)
      .post('/hlr.do')
      .query({
        format: 'json',
        idx: someIdx.join(','),
        number: someNumbers.join(','),
      })
      .reply(200, hlrCheck);

    // when
    const res = await smsapi.hlr.check(someNumbers, someIdx);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(res).toEqual(hlrCheck);
  });

  it('should handle one invalid number', async () => {
    // given
    const someNumber = '48500';
    const req = nock(API_URL)
      .post('/hlr.do')
      .query({
        format: 'json',
        number: someNumber,
      })
      .reply(200, {
        error: 13,
        number: someNumber,
        status: 'ERROR',
      });

    // when
    const res = await smsapi.hlr.check(someNumber);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(res).toEqual({
      error: 13,
      number: someNumber,
      status: 'ERROR',
    });
  });

  it('should handle one valid number and one invalid number', async () => {
    // given
    const someNumbers = ['48500000000', '48500'];
    const hlrCheck = {
      id: 'someId',
      number: someNumbers[0],
      price: 1,
      status: 'OK',
    };

    const req = nock(API_URL)
      .post('/hlr.do')
      .query({
        format: 'json',
        number: someNumbers.join(','),
      })
      .reply(200, [
        hlrCheck,
        {
          error: 13,
          number: someNumbers[1],
          status: 'ERROR',
        },
      ]);

    // when
    const res = await smsapi.hlr.check(someNumbers);

    // then
    expect(req.isDone()).toBeTruthy();
    expect(res).toEqual([
      {
        id: expect.any(String),
        number: someNumbers[0],
        price: expect.any(Number),
        status: 'OK',
      },
      {
        error: 13,
        number: someNumbers[1],
        status: 'ERROR',
      },
    ]);
  });
});
