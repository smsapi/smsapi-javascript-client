import { SMSAPI } from '.';

export class SMSAPIpl extends SMSAPI {
  constructor(accessToken: string) {
    super(accessToken, 'https://api.smsapi.pl');
  }
}
