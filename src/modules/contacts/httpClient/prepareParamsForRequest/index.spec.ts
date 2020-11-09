import nock from 'nock';
import isEqual from 'lodash/isEqual';

import { SMSAPI } from '../../../../smsapi';
import { GetContactsQueryParams } from '../../types/GetContactsQueryParams';
import { NewContact } from '../../types/NewContact';

const smsapi = new SMSAPI('someToken');

describe('prepareParamsForRequest', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should make a proper request to get contact with all params', async () => {
    // given
    const contactParams: GetContactsQueryParams = {
      birthdayDate: new Date('2015-07-13'),
      email: 'someEmail',
      firstName: 'someFirstName',
      gender: 'female',
      groupId: 'someGroupId',
      lastName: 'someLastName',
      limit: 5,
      offset: 2,
      orderBy: 'first_name',
      phoneNumber: '48500000000',
      q: '48500000000',
    };

    const body = {
      birthday_date: '2015-07-13',
      email: contactParams.email,
      first_name: contactParams.firstName,
      gender: contactParams.gender,
      group_id: contactParams.groupId,
      last_name: contactParams.lastName,
      limit: contactParams.limit,
      offset: contactParams.offset,
      order_by: contactParams.orderBy,
      phone_number: contactParams.phoneNumber,
      q: contactParams.q,
    };

    const getContactRequest = nock('https://smsapi.io/api')
      .get('/contacts')
      .query(body)
      .reply(200);

    // when
    await smsapi.contacts.get(contactParams);

    // then
    expect(getContactRequest.isDone()).toBeTruthy();
  });

  it('should make a proper request to get contact with all params as arrays', async () => {
    // given
    const contactParams: GetContactsQueryParams = {
      birthdayDate: [new Date('2015-07-13'), new Date('2015-07-15')],
      email: 'someEmail',
      firstName: 'someFirstName',
      gender: 'female',
      groupId: 'someGroupId',
      lastName: 'someLastName',
      limit: 5,
      offset: 2,
      orderBy: 'first_name',
      phoneNumber: '48500000000',
      q: '48500000000',
    };

    const body = {
      birthday_date: ['2015-07-13', '2015-07-15'],
      email: contactParams.email,
      first_name: contactParams.firstName,
      gender: contactParams.gender,
      group_id: contactParams.groupId,
      last_name: contactParams.lastName,
      limit: contactParams.limit,
      offset: contactParams.offset,
      order_by: contactParams.orderBy,
      phone_number: contactParams.phoneNumber,
      q: contactParams.q,
    };

    const getContactRequest = nock('https://smsapi.io/api')
      .get('/contacts')
      .query(body)
      .reply(200);

    // when
    await smsapi.contacts.get(contactParams);

    // then
    expect(getContactRequest.isDone()).toBeTruthy();
  });

  it('should make a proper request to create contact with all details', async () => {
    // given
    const someNumber = '48500500500';

    const contactDetails: NewContact = {
      birthdayDate: new Date('2015-07-13'),
      city: 'someCity',
      description: 'someDescription',
      email: 'someEmail',
      firstName: 'someFirstName',
      gender: 'male',
      lastName: 'someLastName',
      source: 'someSource',
    };

    const body = {
      birthday_date: '2015-07-13',
      city: contactDetails.city,
      description: contactDetails.description,
      email: contactDetails.email,
      first_name: contactDetails.firstName,
      gender: contactDetails.gender,
      last_name: contactDetails.lastName,
      phone_number: someNumber,
      source: contactDetails.source,
    };

    const createContactRequest = nock('https://smsapi.io/api')
      .post('/contacts', (requestBody): boolean => isEqual(body, requestBody))
      .reply(201);

    // when
    await smsapi.contacts.create(someNumber, contactDetails);

    // then
    expect(createContactRequest.isDone()).toBeTruthy();
  });
});
