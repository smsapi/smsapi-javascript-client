# Changelog

## [2.0.6](https://github.com/smsapi/smsapi-javascript-client/compare/v2.0.5...v2.0.6) - 2023-01-09

### Changed

- Dependencies update.

## [2.0.5](https://github.com/smsapi/smsapi-javascript-client/compare/v2.0.4...v2.0.5) - 2022-12-08

### Changed

- Dependencies update.

## [2.0.4](https://github.com/smsapi/smsapi-javascript-client/compare/v2.0.3...v2.0.4) - 2021-08-13

### Changed

- Dependencies update.

## [2.0.3](https://github.com/smsapi/smsapi-javascript-client/compare/v2.0.2...v2.0.3) - 2021-07-08

### Changed

- Dependencies update.

## [2.0.2](https://github.com/smsapi/smsapi-javascript-client/compare/v2.0.1...v2.0.2) - 2021-04-20

### Added

- `test:watch` npm script and `make test--watch`.

### Fixed

- Error handling.

## [2.0.1](https://github.com/smsapi/smsapi-javascript-client/compare/v2.0.0...v2.0.1) - 2021-01-15

### Changed

- Updated `tsconfig.json`.

## [2.0.0](https://github.com/smsapi/smsapi-javascript-client/compare/v1.7.1...v2.0.0) - 2021-01-14

In version 2.0 we've rewritten library and introduced long awaited TypeScript support. We also introduced support of smsapi.io - a proxy which simplifies logging into both smsapi.pl and smsapi.com services. For all changes details check the list below.

### Added

- TypeScript support.
- Support for `https://smsapi.io`. One service for `https://api.smsapi.pl` and `https://api.smsapi.com`.
- `smsapi.sms.sendFlashSms()`
- `smsapi.sms.sendFlashSmsToGroup()`
- `smsapi.sendernames.getBySender()`

### Changed

- `new SMSAPI()` now accepts OAuth token as argument instead of options object.
- `smsapi.hlr.check()` now can handle array of phone numbers and array of idx as second argument.
- Replaced `smsapi.contacts.list()` with `smsapi.contacts.get()`.
- Replaced `smsapi.contacts.add()` with `smsapi.contacts.create()`.
- Updated `smsapi.contacts.update()` to accepts object of fields to update as second argument.
- Replaced `smsapi.contacts.delete()` with `smsapi.contacts.remove()`.
- Replaced `smsapi.contacts.groups.assignments.list()` with `smsapi.contacts.getGroups()`.
- Replaced `smsapi.contacts.groups.assignments.get()` with `smsapi.contacts.getGroupById()`.
- Replaced `smsapi.contacts.groups.assignments.add()` with `smsapi.contacts.assignContactToGroup()`.
- Replaced `smsapi.contacts.groups.assignments.delete()` with `smsapi.contacts.unpinContactFromGroup()`.
- Replaced `smsapi.contacts.fields.list()` with `smsapi.contacts.fields.get()`.
- Replaced `smsapi.contacts.fields.add()` with `smsapi.contacts.fields.create()`.
- Updated `smsapi.contacts.fields.update()` to accepts field's name as second argument.
- Replaced `smsapi.contacts.fields.delete()` with `smsapi.contacts.fields.remove()`.
- Replaced `smsapi.contacts.groups.list()` with `smsapi.contacts.groups.get()`.
- Replaced `smsapi.contacts.groups.add()` with `smsapi.contacts.groups.create()`.
- Replaced `smsapi.contacts.groups.get()` with `smsapi.contacts.groups.getById()`.
- Updated `smsapi.contacts.groups.update()` to accepts group's name and description in options object as second argument.
- Replaced `smsapi.contacts.groups.delete()` with `smsapi.contacts.groups.remove()`.
- Replaced `smsapi.contacts.groups.members.add()` with `smsapi.contacts.assignContactToGroup()`.
- Replaced `smsapi.contacts.groups.members.delete()` with `smsapi.contacts.unpinContactFromGroup()`.
- Replaced `smsapi.message.sms().to()` with `smsapi.sms.sendSms()`.
- Replaced `smsapi.message.sms().group()` with `smsapi.sms.sendSmsToGroup()`.
- Replaced `smsapi.message.delete()` with `smsapi.sms.removeScheduledSms()`.
- Replaced `smsapi.message.mms().to()` with `smsapi.sms.sendMms()`.
- Replaced `smsapi.message.mms().group()` with `smsapi.mms.sendMmsToGroup()`.
- Replaced `smsapi.message.vms().to().tts()` with `smsapi.sms.sendVms()`.
- Replaced `smsapi.message.vms().group().tts()` with `smsapi.mms.sendVmsToGroup()`.
- Replaced `smsapi.message.vms().to().localFile()` with `smsapi.sms.sendVmsWithLocalFile()`.
- Replaced `smsapi.message.vms().group().localFile()` with `smsapi.mms.sendVmsWithLocalFileToGroup()`.
- Replaced `smsapi.message.vms().to().remoteFile()` with `smsapi.sms.sendVmsWithRemoteFile()`.
- Replaced `smsapi.message.vms().group().remoteFile()` with `smsapi.mms.sendVmsWithRemoteFileToGroup()`.
- Replaced `smsapi.sender.list()` with `smsapi.sendernames.get()`.
- Replaced `smsapi.sender.add()` with `smsapi.sendernames.create()`.
- Replaced `smsapi.sender.default()` with `smsapi.sendernames.makeDefault()`.
- Replaced `smsapi.sender.delete()` with `smsapi.sendernames.remove()`.
- Replaced `smsapi.template.list()` with `smsapi.templates.get()`.
- Replaced `smsapi.template.get()` with `smsapi.templates.getById()`.
- Replaced `smsapi.template.add()` with `smsapi.templates.create()`.
- Replaced `smsapi.template.update()` with `smsapi.templates.update()`.
- Replaced `smsapi.template.delete()` with `smsapi.templates.remove()`.
- Replaced `smsapi.user.list()` with `smsapi.subusers.get()`.
- Replaced `smsapi.user.get()` with `smsapi.subusers.getById()`.
- Replaced `smsapi.user.add()` with `smsapi.subusers.create()`.
- Replaced `smsapi.user.update()` with `smsapi.subusers.update()`.
- Replaced `smsapi.user.delete()` with `smsapi.subusers.remove()`.

### Removed

- Support for username/password authorization.
- `smsapi.points.get()` - instead use response of `smsapi.profile.get()`.
- `smsapi.contacts.groups.list().name()`
- `smsapi.contacts.groups.list().id()` - instead use `smsapi.contacts.groups.getById()`.
- `smsapi.contacts.groups.permissions`
- `smsapi.contacts.groups.members.get()`
- `smsapi.sender.status()` - instead use `smsapi.sendernames.getBySender()` and check `status` in returned object.
