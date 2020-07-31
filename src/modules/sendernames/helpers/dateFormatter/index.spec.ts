import { ApiSendername } from 'modules/sendernames';

import { dateFormatter } from '.';

describe('Sendernames - dateFormatter', () => {
  it('should format date in ApiSendername', () => {
    // given
    const apiSendername: ApiSendername = {
      createdAt: '2020-07-29T16:24:32+02:00',
      isDefault: false,
      sender: 'someSuperSendername',
      status: 'ACTIVE',
    };

    // when
    const sendername = dateFormatter(apiSendername);

    // then
    expect(sendername).toEqual({
      ...apiSendername,
      createdAt: new Date(apiSendername.createdAt),
    });
  });
});
