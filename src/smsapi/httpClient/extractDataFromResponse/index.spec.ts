import { AxiosResponse } from 'axios';

import { extractDataFromResponse } from './index';

const getAxiosResponse = (data: any): AxiosResponse => ({
  data,
  status: 200,
  config: {},
  headers: {},
  statusText: 'OK',
});

describe('extractDataFromResponse', () => {
  it('should return data from response', () => {
    // given
    const response = getAxiosResponse({
      a: 'someA',
      b: 'someB',
    });

    // when
    const data = extractDataFromResponse(response);

    // then
    expect(data).toEqual({
      a: 'someA',
      b: 'someB',
    });
  });

  it('should return formatted data from response', () => {
    // given
    const response = getAxiosResponse({
      test_a: 'someA',
      test_b: 'someB',
    });

    // when
    const data = extractDataFromResponse(response);

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

    const response = getAxiosResponse({
      collection,
      size: collection.length,
    });

    // when
    const data = extractDataFromResponse(response);

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
    const response = getAxiosResponse([
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
    ]);

    // when
    const data = extractDataFromResponse(response);

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
    const response = getAxiosResponse(undefined);

    // when
    const data = extractDataFromResponse(response);

    // then
    expect(data).toBe(undefined);
  });
});
