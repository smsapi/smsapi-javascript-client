import { SMSAPI } from '.';

export class SMSAPIcom extends SMSAPI {
  constructor(accessToken: string) {
    super(accessToken, 'https://api.smsapi.com');
  }
}
