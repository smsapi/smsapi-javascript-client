import { getAxiosResponse } from '../../../testHelpers/getAxiosResponse';

import { extractDataFromResponse } from './index';

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

  it('should return formatted date from response with object 1 level deep', () => {
    // given
    const response = getAxiosResponse({
      some_a: 'someA',
      some_b: {
        some_c: 'someC',
      },
    });

    // when
    const data = extractDataFromResponse(response);

    // then
    expect(data).toEqual({
      someA: 'someA',
      someB: {
        someC: 'someC',
      },
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

  it('should return formatted data from array response with object 1 level deep', () => {
    // given
    const response = getAxiosResponse([
      {
        test_a: 'someA',
      },
      {
        test_b: {
          test_c: 'someTestC',
        },
      },
    ]);

    // when
    const data = extractDataFromResponse(response);

    // then
    expect(data).toEqual([
      {
        testA: 'someA',
      },
      {
        testB: {
          testC: 'someTestC',
        },
      },
    ]);
  });

  it('should return formatted data from sms response', () => {
    // given
    const response = getAxiosResponse({
      count: 1,
      list: [
        {
          date_sent: 1596539492,
        },
      ],
      message: 'someMessage',
    });

    // when
    const data = extractDataFromResponse(response);

    // then
    expect(data).toEqual({
      count: 1,
      list: [
        {
          dateSent: 1596539492,
        },
      ],
      message: 'someMessage',
    });
  });

  it(`should return data when it's not an object`, () => {
    // given
    const response = getAxiosResponse(undefined);

    // when
    const data = extractDataFromResponse(response);

    // then
    expect(data).toBe(undefined);
  });

  it(`shouldn't format ignored keys`, () => {
    // given
    const response = getAxiosResponse({
      date_created: new Date(),
      date_updated: new Date(),
    });

    // when
    const data = extractDataFromResponse(response);

    // then
    expect(data).toEqual({
      dateCreated: expect.any(Date),
      dateUpdated: expect.any(Date),
    });
  });
});
