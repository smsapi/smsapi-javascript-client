# Subusers

- Get all subusers

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

let subusers = [];

smsapi.subusers.get()
  .then((data) => {
    subusers = data.collection;
  });
```

- Get subuser by subuser id

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.subusers.getById('someSubuserId')
  .then((subuser) => {
    console.log(subuser);
  });
```

- Create subuser

```ts
import { SMSAPIpl, SMSAPI } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

const newSubuser: SMSAPI.NewSubuser = {
  credentials: {
    username: 'newUser',
    password: 'superStrongPassword123',
    apiPassword: 'anotherSuperStrongPassword321',   // OPTIONAL - default same as credentials.password
  },
  active: true,                                     // OPTIONAL - default false
  description: 'Just a typical subuser',            // OPTIONAL - default null
  points: {
    fromAccount: 100,                               // OPTIONAL - default 0
    per_month: 100,                                 // OPTIONAL - default 0
  },
};

smsapi.subusers.create(newSubuser)
  .then((createdSubuser) => {
    console.log(createdSubuser);
  });
```

- Update subuser

```ts
import { SMSAPIpl, SMSAPI } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

// Only provided properties will be updated, expect credentials.username
const updateSubuser: SMSAPI.UpdateSubuser = {
  active: true,
  description: 'Just a typical subuser number 2',
};

smsapi.subusers.update('subuserIdToUpdate', updateSubuser)
  .then((updatedSubuser) => {
    console.log(updatedSubuser);
  });
```

- Remove subuser

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.subusers.remove('subuserIdToRemove')
  .then(() => {
    // subuser removed
  });
```
