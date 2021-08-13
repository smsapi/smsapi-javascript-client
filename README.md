# SMSAPI JavaScript (node.js) Client

## Installation

```bash
npm install smsapi --save
```

## Example

```ts
import { SMSAPI, MessageResponse } from 'smsapi';

const smsapi = new SMSAPI('oAuthToken');

const response = async (): Promise<MessageResponse> => {
  return await smsapi.sms.sendSms('+48605xxxxxx', 'My first message!');
};
```

## Supported modules

* Contacts
  * Contact fields
  * Contact groups
* Hlr
* MMS
* Profile
* Sendernames
* SMS
* Subusers
* Templates
* VMS

## Docs & Infos

* [SMSAPI.com API documentation](https://www.smsapi.com/docs)
* [SMSAPI.pl API documentation](https://www.smsapi.pl/docs)
* [Repository on GitHub](https://github.com/smsapi/smsapi-javascript-client)
* [Package on npm](https://www.npmjs.com/package/smsapi)
* [SMSAPI.com web page](https://smsapi.com)
* [SMSAPI.pl web page](https://smsapi.pl)

## License

[Apache 2.0 License](LICENSE)
