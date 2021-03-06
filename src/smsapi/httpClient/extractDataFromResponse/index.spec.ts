import { createAxiosResponse } from '../../../testHelpers/createAxiosResponse';

import { extractDataFromResponse } from './index';

describe('extractDataFromResponse', () => {
  it('should return data from response', () => {
    // given
    const response = createAxiosResponse({
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
    const response = createAxiosResponse({
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
    const response = createAxiosResponse({
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

    const response = createAxiosResponse({
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
    const response = createAxiosResponse([
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
    const response = createAxiosResponse([
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
    const response = createAxiosResponse({
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
    const response = createAxiosResponse(undefined);

    // when
    const data = extractDataFromResponse(response);

    // then
    expect(data).toBe(undefined);
  });

  it(`shouldn't format Date values`, () => {
    // given
    const response = createAxiosResponse({
      array_with_dates: [new Date()],
      date_created: new Date(),
    });

    // when
    const data = extractDataFromResponse(response);

    // then
    expect(data).toEqual({
      arrayWithDates: [expect.any(Date)],
      dateCreated: expect.any(Date),
    });
  });

  it(`should format contact's group permissions`, () => {
    // given
    const response = createAxiosResponse({
      another_array: [0, 1, 2, 3],
      permissions: [
        {
          group_id: 'someGroupId1',
        },
        {
          group_id: 'someGroupId2',
        },
      ],
    });

    // when
    const data = extractDataFromResponse(response);

    // then
    expect(data).toEqual({
      anotherArray: [0, 1, 2, 3],
      permissions: [
        {
          groupId: 'someGroupId1',
        },
        {
          groupId: 'someGroupId2',
        },
      ],
    });
  });
});
