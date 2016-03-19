var _ = require('lodash'),
    chai = require('chai'),
    assert = chai.assert,
    SMSAPI = require('../lib/smsapi'),
    config = require('./config'),
    randomString = require('randomstring').generate;

var optionsByAuth = {
    AuthenticationSimple: {
        server: config.server
    },
    AuthenticationOAuth: {
        server: config.server,
        oauth: config.credentialsForDeprecatedPhonebook.oauth
    }
};

_.forEach(optionsByAuth, function (options, authName) {

    describe('phonebook (' + authName + ')', function () {
        var smsapi = new SMSAPI(options);

        if (authName === 'AuthenticationSimple') {
            before(function (done) {
                smsapi.authentication.loginHashed(
                    config.credentialsForDeprecatedPhonebook.username,
                    config.credentialsForDeprecatedPhonebook.password
                    )
                    .then(done.bind(null, null))
                    .catch(done);
            });
        }

        describe('group', function () {
            it('should get groups list', function (done) {
                smsapi.phonebook.group
                    .list()
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'count');
                        assert.property(result, 'list');
                        assert.isArray(result.list);
                        done();
                    })
                    .catch(done);
            });

            it('should add new group', function (done) {
                smsapi.phonebook.group
                    .add()
                    .name('NewTestGroup')
                    .info('NewTestGroupDescription')
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'name');
                        assert.property(result, 'info');
                        assert.equal(result.name, 'NewTestGroup');
                        assert.equal(result.info, 'NewTestGroupDescription');
                        done();
                    })
                    .catch(done);
            });

            it('should get group details', function (done) {
                smsapi.phonebook.group
                    .get('NewTestGroup')
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'name');
                        assert.property(result, 'info');
                        assert.property(result, 'numbers_count');
                        assert.equal(result.name, 'NewTestGroup');
                        assert.equal(result.numbers_count, 0);
                        done();
                    })
                    .catch(done);
            });

            it('should update group', function (done) {
                smsapi.phonebook.group
                    .update('NewTestGroup')
                    .name('UpdatedTestGroup')
                    .info('UpdatedTestGroupDescription')
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'name');
                        assert.property(result, 'info');
                        assert.equal(result.name, 'UpdatedTestGroup');
                        assert.equal(result.info, 'UpdatedTestGroupDescription');
                        done();
                    })
                    .catch(done);
            });

            it('should delete group', function (done) {
                smsapi.phonebook.group
                    .delete('UpdatedTestGroup')
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'deleted');
                        assert.property(result, 'removed_contacts');
                        assert.ok(result.deleted);
                        assert.equal(result.removed_contacts, 0);
                        done();
                    })
                    .catch(done);
            });
        });

        describe('contact', function () {
            var testContact = {
                number: '48500500500',
                first_name: 'TestName',
                last_name: 'LastName',
                info: 'Additional info',
                city: 'Gliwice',
                gender: 'male',
                email: 'test@example.com',
                birthday: '2000-12-12',
                groups: []
            };

            it('should get contacts list', function (done) {
                smsapi.phonebook.contact
                    .list()
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'total');
                        assert.property(result, 'count');
                        assert.property(result, 'list');
                        assert.isAbove(result.total, 0);
                        assert.isAbove(result.count, 0);
                        assert.isArray(result.list);
                        done();
                    })
                    .catch(done);
            });

            it('should add new contact', function (done) {
                smsapi.phonebook.contact
                    .add()
                    .params(testContact)
                    .execute()
                    .then(function (result) {
                        assert.deepEqual(_.omit(result, [
                            'date_add', 'date_mod'
                        ]), _.omit(testContact, [
                            'email', 'groups'
                        ]));
                        done();
                    })
                    .catch(done);
            });

            it('should get contact', function (done) {
                smsapi.phonebook.contact
                    .get(testContact.number)
                    .execute()
                    .then(function (result) {
                        assert.deepEqual(_.omit(result, [
                            'date_add', 'date_mod'
                        ]), _.omit(testContact, [
                            'email'
                        ]));
                        done();
                    })
                    .catch(done);
            });

            it('should update contact', function (done) {
                smsapi.phonebook.contact
                    .update(testContact.number)
                    .firstName('ChangedName')
                    .execute()
                    .then(function (result) {
                        assert.equal(result.first_name, 'ChangedName');
                        done();
                    })
                    .catch(done);
            });

            it('should add contact to a group', function (done) {
                var testGroupName = randomString();

                createGroup()
                    .then(addContactToAGroup)
                    .then(checkContactGroups)
                    .then(deleteGroup)
                    .then(done.bind(null, null))
                    .catch(function (err) {
                        deleteGroup();
                        done(err);
                    });

                function createGroup() {
                    return smsapi.phonebook.group
                        .add()
                        .name(testGroupName)
                        .execute();
                }

                function deleteGroup() {
                    return smsapi.phonebook.group
                        .delete(testGroupName)
                        .execute();
                }

                function addContactToAGroup() {
                    return smsapi.phonebook.contact
                        .update(testContact.number)
                        .groups([testGroupName])
                        .execute();
                }

                function checkContactGroups() {
                    return smsapi.phonebook.contact
                        .get(testContact.number)
                        .param('with_groups', 1)
                        .execute()
                        .then(function (result) {
                            assert.deepEqual(result.groups, [testGroupName]);
                        });
                }
            });

            it('should delete contact', function (done) {
                smsapi.phonebook.contact
                    .delete(testContact.number)
                    .execute()
                    .then(function (result) {
                        assert.ok(result.deleted);
                        done();
                    })
                    .catch(done);
            });
        });
    });

});
