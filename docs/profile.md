# Profile

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

let profile;

smsapi.profile.get()
  .then((profile) => {
    console.log(profile);
  });
```
