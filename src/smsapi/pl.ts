import { SMSAPI } from '.';

export class SMSAPIpl extends SMSAPI {
  constructor(accessToken: string) {
    const API_URL = 'https://api.smsapi.pl';

    super(accessToken, API_URL);
  }
}
