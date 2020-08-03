# Templates

- Get all templates

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

let templates = [];

smsapi.templates.get()
  .then((data) => {
    templates = data.collection;
  });
```

- Get template by template's id

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.templates.getById('someTemplateId')
  .then((template) => {
    console.log(template);
  });
```

- Create template

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

const newTemplate = {
  name: 'Some template name',
  template: 'Some template content',
  normalize: true, // optional property, false by default
};

smsapi.templates.create(newTemplate)
  .then((createdTemplate) => {
    console.log(createdTemplate);
  });
```

- Update template

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

// Only provided properties will be updated.
const newTemplate = {
  name: 'Some new template name',
  normalize: true,
};

smsapi.templates.update('templateIdToUpdate', newTemplate)
  .then((updatedTemplate) => {
    console.log(updatedTemplate);
  });
```

- Remove template

```ts
import { SMSAPIpl } from 'smsapi';

const smsapi = new SMSAPIpl('someToken');

smsapi.templates.remove('templateIdToRemove')
  .then(() => {
    // Template removed
  });
```
