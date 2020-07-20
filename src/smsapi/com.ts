import { SMSAPI } from '.';

export class SMSAPIcom extends SMSAPI {
  constructor(accessToken: string) {
    const API_URL = 'https://api.smsapi.com';

    super(accessToken, API_URL);
  }
}
