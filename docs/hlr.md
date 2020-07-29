# HLR

- Number check

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.hlr.check(['48500000000'])
  .then((hlr) => {
    console.log(hlr);
  });
```

- Number check with idx

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.hlr.check(['48500000000'], 'some idx')
  .then((hlr) => {
    console.log(hlr);
  });
```
