import { formatResponseDates } from '.';

describe('formatResponseDates', () => {
  it('should format dates for ApiCollection<Group>', () => {
    // given
    const response = {
      data: {
        collection: [
          {
            date_created: '2020-09-01T14:49:00+02:00',
            date_updated: '2020-09-01T14:49:00+02:00',
          },
        ],
        size: 1,
      },
    };

    // when
    const formattedResponse = formatResponseDates(response);

    // then
    expect(formattedResponse.data).toMatchObject({
      collection: [
        {
          date_created: expect.any(Date),
          date_updated: expect.any(Date),
        },
      ],
    });
  });

  it('should format dates for Group', () => {
    // given
    const response = {
      data: {
        date_created: '2020-09-01T14:49:00+02:00',
        date_updated: '2020-09-01T14:49:00+02:00',
      },
    };

    // when
    const formattedResponse = formatResponseDates(response);

    // then
    expect(formattedResponse.data).toMatchObject({
      date_created: expect.any(Date),
      date_updated: expect.any(Date),
    });
  });

  it('should not format dates when date_created or date_updated are not present', () => {
    // given
    const response = {
      data: {
        name: 'someName',
      },
    };

    // when
    const formattedResponse = formatResponseDates(response);

    // then
    expect(formattedResponse.data.date_created).toBeUndefined();
    expect(formattedResponse.data.date_updated).toBeUndefined();
  });
});
