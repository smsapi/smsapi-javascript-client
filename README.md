# SMSAPI JavaScript (node.js) Client

## Supported modules

- Profile

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.profile.get();
```

- HLR

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

// Number check
smsapi.hlr.check(['48500000000']);

// Number check with idx
smsapi.hlr.check(['48500000000'], 'some idx');
```
