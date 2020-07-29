import { SMSAPI } from '../src/smsapi';

const { SMSAPI_OAUTH_TOKEN, SMSAPI_API_URL } = process.env;

const smsapi = new SMSAPI(SMSAPI_OAUTH_TOKEN || '', SMSAPI_API_URL || '');

describe('HLR', () => {
  it('should add number to HRL queue', async () => {
    // given
    const someNumber = '48500000000';

    // when
    const res = await smsapi.hlr.check([someNumber]);

    // then
    expect(res).toEqual({
      id: expect.any(String),
      number: someNumber,
      price: expect.any(Number),
      status: 'OK',
    });
  });

  it('should add number to HRL queue with idx', async () => {
    // given
    const someNumber = '48500000000';
    const someIdx = 'someIdx';

    // when
    const res = await smsapi.hlr.check([someNumber], someIdx);

    // then
    expect(res).toEqual({
      id: expect.any(String),
      number: someNumber,
      price: expect.any(Number),
      status: 'OK',
    });
  });

  it('should add numbers to HRL queue', async () => {
    // given
    const someNumbers = ['48500000000', '48500000001'];

    // when
    const res = await smsapi.hlr.check(someNumbers);

    // then
    expect(res).toEqual(
      someNumbers.map((number) => ({
        id: expect.any(String),
        number,
        price: expect.any(Number),
        status: 'OK',
      }))
    );
  });

  it('should handle one invalid number', async () => {
    // given
    const someNumber = '48500';

    // when
    const res = await smsapi.hlr.check([someNumber]);

    // then
    expect(res).toEqual({
      error: 13,
      number: someNumber,
      status: 'ERROR',
    });
  });

  it('should handle one valid number and one invalid number', async () => {
    // given
    const someNumbers = ['48500000000', '48500'];

    // when
    const res = await smsapi.hlr.check(someNumbers);

    // then
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
