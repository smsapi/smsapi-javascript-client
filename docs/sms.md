# SMS

- Send single sms

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.sms.sendSms('500000000', 'Some message')
  .then((sentSms) => {
    console.log(sentSms);
  });
```

- Send single sms to many numbers

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.sms.sendSms(['500000000', '500000001'], 'Some message')
  .then((sentSms) => {
    console.log(sentSms);
  });
```

- Send flash sms

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.sms.sendFlashSms('500000000', 'Some message')
  .then((sentSms) => {
    console.log(sentSms);
  });
```

- Send single sms with details

```ts
import { SMSAPIpl, SMSAPI } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

const smsDetails: SMSAPI.SmsDetails = {
  test: true,
};

smsapi.sms.sendSms('500000000', 'Some message', smsDetails)
  .then((sentSms) => {
    console.log(sentSms);
  });
```

- Send sms to group

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.sms.sendSmsToGroup('someGroupName', 'Some message')
  .then((sentSms) => {
    console.log(sentSms);
  });
```

- Send sms to many groups

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.sms.sendSmsToGroup(['someGroupName', 'someGroupName2'], 'Some message')
  .then((sentSms) => {
    console.log(sentSms);
  });
```

- Send flash sms to group

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.sms.sendFlashSmsToGroup('500000000', 'Some message')
  .then((sentSms) => {
    console.log(sentSms);
  });
```

- Send sms to group with details

```ts
import { SMSAPIpl, SMSAPI } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

const smsDetails: SMSAPI.SmsDetails = {
  test: true,
};

smsapi.sms.sendSmsToGroup('someGroupName', 'Some message', smsDetails)
  .then((sentSms) => {
    console.log(sentSms);
  });
```
