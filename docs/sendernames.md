# Sendernames

- Get all sendernames

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

let sendernames = [];

smsapi.sendernames.get()
  .then((data) => {
    sendernames = data.collection;
  });
```

- Create sendername

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.sendernames.create('newSender')
  .then((createdSendername) => {
    console.log(createdSendername);
  });
```

- Make sendername default

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

const sender = 'newSender';

smsapi.sendernames.makeDefault(sender)
  .then(() => {
    console.log(`Sendername "${sender}" is now default.`);
  });
```

- Remove sendername

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.sendernames.remove('sender')
  .then(() => {
    console.log('Sendername removed!');
  });
```
