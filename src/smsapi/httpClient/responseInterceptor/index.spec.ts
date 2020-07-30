import { responseInterceptor } from './index';

describe('responseInterceptor', () => {
  it('should return data from response', () => {
    // given
    const response = {
      data: {
        a: 'someA',
        b: 'someB',
      },
    };

    // when
    const data = responseInterceptor(response);

    // then
    expect(data).toEqual({
      a: 'someA',
      b: 'someB',
    });
  });

  it('should return formatted data from response', () => {
    // given
    const response = {
      data: {
        test_a: 'someA',
        test_b: 'someB',
      },
    };

    // when
    const data = responseInterceptor(response);

    // then
    expect(data).toEqual({
      testA: 'someA',
      testB: 'someB',
    });
  });

  it('should return formatted data from ApiCollection response', () => {
    // given
    const collection = [
      {
        testa: 'someA',
      },
      {
        test_b: 'someB',
      },
      {
        'some-test-c': 'someC',
      },
      {
        someTestD: 'someD',
      },
    ];

    const response = {
      data: {
        collection,
        size: collection.length,
      },
    };

    // when
    const data = responseInterceptor(response);

    // then
    expect(data).toEqual({
      collection: [
        {
          testa: 'someA',
        },
        {
          testB: 'someB',
        },
        {
          someTestC: 'someC',
        },
        {
          someTestD: 'someD',
        },
      ],
      size: collection.length,
    });
  });

  it('should return formatted data from array response', () => {
    // given
    const response = {
      data: [
        {
          testa: 'someA',
        },
        {
          test_b: 'someB',
        },
        {
          'some-test-c': 'someC',
        },
        {
          someTestD: 'someD',
        },
      ],
    };

    // when
    const data = responseInterceptor(response);

    // then
    expect(data).toEqual([
      {
        testa: 'someA',
      },
      {
        testB: 'someB',
      },
      {
        someTestC: 'someC',
      },
      {
        someTestD: 'someD',
      },
    ]);
  });

  it(`should return data when it's not an object`, () => {
    // given
    const response = {
      data: undefined,
    };

    // when
    const data = responseInterceptor(response);

    // then
    expect(data).toBe(undefined);
  });

  it(`2 should return data when it's not an object`, () => {
    // given
    const response = {
      data: {
        email: 'ittestingphpunit@smsapi.pl',
        id: '193FAFB33361354EAF84E7A1',
        name: 'phpunit',
        payment_type: 'prepaid',
        phone_number: '48781441344',
        points: 92.8,
        user_type: 'native',
        username: 'phpunit',
      },
    };

    // when
    const data = responseInterceptor(response);

    // then
    expect(data).toEqual({
      email: 'ittestingphpunit@smsapi.pl',
      id: '193FAFB33361354EAF84E7A1',
      name: 'phpunit',
      paymentType: 'prepaid',
      phoneNumber: '48781441344',
      points: 92.8,
      userType: 'native',
      username: 'phpunit',
    });
  });
});
