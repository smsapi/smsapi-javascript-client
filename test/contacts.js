var _ = require('lodash'),
    chai = require('chai'),
    assert = chai.assert,
    SMSAPI = require('../lib/smsapi'),
    config = require('./config'),
    randomString = require('randomstring').generate,
    RSVP = require('rsvp');

var optionsByAuth = {
    AuthenticationSimple: {
        server: config.serverContacts
    },
    AuthenticationOAuth: {
        server: config.serverContacts,
        oauth: config.oauth
    }
};

_.forEach(optionsByAuth, function (options, authName) {

    describe('contacts (' + authName + ')', function () {
        var smsapi = new SMSAPI(options);

        before(function (done) {
            smsapi.authentication.loginHashed(config.username, config.password)
                .then(findTestContact)
                .then(deleteTestContactIfExists)
                .then(done.bind(null, null))
                .catch(done);

            function findTestContact() {
                return smsapi.contacts
                    .list()
                    .phoneNumber(config.testNumber)
                    .execute()
                    .then(function (result) {
                        return _.first(result.collection);
                    });
            }

            function deleteTestContactIfExists(contact) {
                if (!contact)
                    return;

                return smsapi.contacts
                    .delete(contact.id)
                    .execute();
            }
        });

        describe('contact', function () {
            var testContact = {
                id: null,
                phone_number: config.testNumber,
                first_name: 'TestName',
                last_name: 'LastName',
                description: 'Additional info',
                gender: 'male',
                city: 'Gliwice',
                country: 'Poland',
                email: 'test@example.com',
                birthday_date: '2000-12-12'
            };

            it('should get contacts list', function (done) {
                smsapi.contacts
                    .list()
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'size');
                        assert.property(result, 'collection');
                        assert.isArray(result.collection);

                        if (result.collection.length > 0) {
                            var item = _.first(result.collection);
                            assert.property(item, 'id');
                            assert.property(item, 'first_name');
                            assert.property(item, 'last_name');
                            assert.property(item, 'phone_number');
                            assert.property(item, 'email');
                            assert.property(item, 'gender');
                            assert.property(item, 'city');
                            assert.property(item, 'country');
                            assert.property(item, 'birthday_date');
                            assert.property(item, 'description');
                        }

                        done();
                    })
                    .catch(done);
            });

            it('should get contacts list (with limit:50 and offset:0)', function (done) {
                smsapi.contacts
                    .list()
                    .limit(50)
                    .offset(0)
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'size');
                        assert.property(result, 'collection');
                        assert.isArray(result.collection);

                        if (result.collection.length > 0) {
                            var item = _.first(result.collection);
                            assert.property(item, 'id');
                            assert.property(item, 'first_name');
                            assert.property(item, 'last_name');
                            assert.property(item, 'phone_number');
                            assert.property(item, 'email');
                            assert.property(item, 'gender');
                            assert.property(item, 'city');
                            assert.property(item, 'country');
                            assert.property(item, 'birthday_date');
                            assert.property(item, 'description');
                        }

                        done();
                    })
                    .catch(done);
            });

            it('should get contacts list (using order_by)', function (done) {
                smsapi.contacts
                    .list()
                    .orderBy('first_name')
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'size');
                        assert.property(result, 'collection');
                        assert.isArray(result.collection);

                        done();
                    })
                    .catch(done);
            });

            it('should get contacts list with some additional params', function (done) {
                smsapi.contacts
                    .list()
                    .q('test')
                    .offset(10)
                    .limit(10)
                    .phoneNumber('500500500')
                    .email('test@example.com')
                    .firstName('Test')
                    .lastName('Test')
                    .gender('male')
                    .birthday('2000-10-10')
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'size');
                        assert.property(result, 'collection');
                        assert.isArray(result.collection);

                        done();
                    })
                    .catch(done);
            });

            it('should add new contact', function (done) {
                smsapi.contacts
                    .add()
                    .params(testContact)
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'id');
                        testContact.id = result.id;
                        assert.deepEqual(_.omit(result, [
                            'date_created',
                            'date_updated',
                            'idx',
                            'source'
                        ]), testContact);
                        done();
                    })
                    .catch(done);
            });

            it('should find new contact', function (done) {
                smsapi.contacts
                    .list()
                    .phoneNumber(testContact.phone_number)
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'size');
                        assert.property(result, 'collection');

                        assert.equal(result.size, 1);
                        assert.deepEqual(_.omit(_.first(result.collection), [
                            'date_created',
                            'date_updated',
                            'idx',
                            'source'
                        ]), testContact);

                        done();
                    })
                    .catch(done);
            });

            it('should get contact', function (done) {
                smsapi.contacts
                    .get(testContact.id)
                    .execute()
                    .then(function (result) {
                        assert.deepEqual(_.omit(result, [
                            'date_created',
                            'date_updated',
                            'idx',
                            'source'
                        ]), testContact);
                        done();
                    })
                    .catch(done);
            });

            it('should update contact', function (done) {
                smsapi.contacts
                    .update(testContact.id)
                    .firstName('ChangedName')
                    .execute()
                    .then(function (result) {
                        testContact.first_name = 'ChangedName';
                        assert.deepEqual(_.omit(result, [
                            'date_created',
                            'date_updated',
                            'idx',
                            'source'
                        ]), testContact);
                        done();
                    })
                    .catch(done);
            });

            it('should delete contact', function (done) {
                smsapi.contacts
                    .delete(testContact.id)
                    .execute()
                    .then(done.bind(null, null))
                    .catch(done);
            });

            describe('groups.assignment', function () {
                var testGroups = [], // create 2 groups
                    testContact;

                before(function (done) {
                    createGroup()
                        .then(createGroup)
                        .then(createContact)
                        .then(done.bind(null, null))
                        .catch(done);

                    function createGroup() {
                        return smsapi.contacts.groups
                            .add()
                            .name(randomString())
                            .execute()
                            .then(function (result) {
                                testGroups.push(_.omit(result, [
                                    'date_updated', 'date_created', 'contacts_count'
                                ]));
                            });
                    }

                    function createContact() {
                        return smsapi.contacts
                            .add()
                            .firstName(randomString())
                            .phoneNumber(config.testNumber)
                            .execute()
                            .then(function (result) {
                                testContact = _.omit(result, [
                                    'date_updated', 'date_created'
                                ]);
                            });
                    }
                });

                after(function (done) {
                    deleteGroups()
                        .then(deleteContact)
                        .then(done.bind(null, null))
                        .catch(done);

                    function deleteContact() {
                        return smsapi.contacts
                            .delete(testContact.id)
                            .execute();
                    }

                    function deleteGroups() {
                        return RSVP.all(_.map(testGroups, function (testGroup) {
                            return smsapi.contacts.groups
                                .delete(testGroup.id)
                                .execute();
                        }));
                    }
                });

                it('should assign contact to group', function (done) {
                    smsapi.contacts.groups.assignments
                        .add(testContact.id, _.first(testGroups).id)
                        .execute()
                        .then(function (result) {
                            assert.property(result, 'size');
                            assert.property(result, 'collection');
                            assert.isArray(result.collection);
                            assert.equal(result.size, 1);
                            done();
                        })
                        .catch(done);
                });

                it('should get groups related to contact', function (done) {
                    smsapi.contacts.groups.assignments
                        .list(testContact.id)
                        .execute()
                        .then(function (result) {
                            assert.property(result, 'size');
                            assert.property(result, 'collection');
                            assert.isArray(result.collection);
                            assert.equal(result.size, 1);
                            assert.deepEqual(_.omit(_.first(result.collection), [
                                'date_updated', 'date_created', 'contacts_count'
                            ]), _.first(testGroups));
                            done();
                        })
                        .catch(done);
                });

                it('should get group related to contact', function (done) {
                    smsapi.contacts.groups.assignments
                        .get(testContact.id, _.first(testGroups).id)
                        .execute()
                        .then(function (result) {
                            assert.deepEqual(_.omit(result, [
                                'date_updated', 'date_created', 'contacts_count'
                            ]), _.first(testGroups));
                            done();
                        })
                        .catch(done);
                });

                it('should assign contact to the second group', function (done) {
                    smsapi.contacts.groups.assignments
                        .add(testContact.id, _.last(testGroups).id)
                        .execute()
                        .then(function (result) {
                            assert.property(result, 'size');
                            assert.property(result, 'collection');
                            assert.isArray(result.collection);
                            assert.equal(result.size, 1);
                            done();
                        })
                        .catch(done);
                });

                it('should get groups related to contact', function (done) {
                    smsapi.contacts.groups.assignments
                        .list(testContact.id)
                        .execute()
                        .then(function (result) {
                            assert.property(result, 'size');
                            assert.property(result, 'collection');
                            assert.isArray(result.collection);
                            assert.equal(result.size, 2);
                            done();
                        })
                        .catch(done);
                });

                it('should unpin contact from group', function (done) {
                    smsapi.contacts.groups.assignments
                        .delete(testContact.id, _.first(testGroups).id)
                        .execute()
                        .then(done.bind(null, null))
                        .catch(done);
                });

                it('should unpin contact from second group', function (done) {
                    smsapi.contacts.groups.assignments
                        .delete(testContact.id, _.last(testGroups).id)
                        .execute()
                        .then(done.bind(null, null))
                        .catch(done);
                });

                describe('parallel', function () {
                    var testGroups = [], // create 3 groups
                        testContact;

                    before(function (done) {
                        createGroup()
                            .then(createGroup)
                            .then(createGroup)
                            .then(createContact)
                            .then(done.bind(null, null))
                            .catch(done);

                        function createGroup() {
                            return smsapi.contacts.groups
                                .add()
                                .name(randomString())
                                .execute()
                                .then(function (result) {
                                    testGroups.push(_.omit(result, [
                                        'date_updated', 'date_created', 'contacts_count'
                                    ]));
                                });
                        }

                        function createContact() {
                            return smsapi.contacts
                                .add()
                                .firstName(randomString())
                                .email('test@example.com')
                                .execute()
                                .then(function (result) {
                                    testContact = _.omit(result, [
                                        'date_updated', 'date_created'
                                    ]);
                                });
                        }
                    });

                    after(function (done) {
                        deleteGroups()
                            .then(deleteContact)
                            .then(done.bind(null, null))
                            .catch(done);

                        function deleteContact() {
                            return smsapi.contacts
                                .delete(testContact.id)
                                .execute();
                        }

                        function deleteGroups() {
                            return RSVP.all(_.map(testGroups, function (testGroup) {
                                return smsapi.contacts.groups
                                    .delete(testGroup.id)
                                    .execute();
                            }));
                        }
                    });

                    it('should assign contact to multiple groups', function (done) {
                        RSVP.all(_.map(testGroups, function (testGroup) {
                                return smsapi.contacts.groups.assignments
                                    .add(testContact.id, testGroup.id)
                                    .execute();
                            }))
                            .then(function () {
                                return smsapi.contacts.groups.assignments
                                    .list(testContact.id)
                                    .execute()
                                    .then(function (result) {
                                        assert.property(result, 'size');
                                        assert.property(result, 'collection');
                                        assert.isArray(result.collection);
                                        assert.equal(result.size, 3);
                                        done();
                                    });
                            })
                            .catch(done);
                    });
                });
            });
        });

        describe('fields', function () {
            var testField;

            it('should get list of custom fields', function (done) {
                smsapi.contacts.fields
                    .list()
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'size');
                        assert.property(result, 'collection');
                        assert.isArray(result.collection);
                        done();
                    })
                    .catch(done);
            });

            it('should create a custom field', function (done) {
                smsapi.contacts.fields
                    .add()
                    .name(randomString())
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'name');
                        assert.property(result, 'type');
                        assert.equal(result.type, 'TEXT');

                        testField = result;

                        done();
                    })
                    .catch(done);
            });

            it('should find the created custom field on the list', function (done) {
                smsapi.contacts.fields
                    .list()
                    .execute()
                    .then(function (result) {
                        var field = _.find(result.collection, function (field) {
                            return field.name === testField.name;
                        });
                        assert.deepEqual(field, testField);
                        done();
                    })
                    .catch(done);
            });

            it('should update custom field', function (done) {
                smsapi.contacts.fields
                    .update(testField.id)
                    .name(testField.name + 'x')
                    .execute()
                    .then(function (result) {
                        assert.equal(result.name, testField.name + 'x');
                        done();
                    })
                    .catch(done);
            });

            it('should delete the custom field', function (done) {
                smsapi.contacts.fields
                    .delete(testField.id)
                    .execute()
                    .then(done.bind(null, null))
                    .catch(done);
            });
        });

        describe('groups', function () {
            var testGroup = {};

            before(function (done) {
                findTestGroup()
                    .then(deleteTestGroupIfExists)
                    .then(done.bind(null, null))
                    .catch(done);

                function findTestGroup() {
                    return smsapi.contacts.groups
                        .list()
                        .name('NewTestGroup')
                        .execute()
                        .then(function (result) {
                            return _.first(result.collection);
                        });
                }

                function deleteTestGroupIfExists(group) {
                    if (!group)
                        return;

                    return smsapi.contacts.groups
                        .delete(group.id)
                        .execute();
                }
            });

            it('should get groups list', function (done) {
                smsapi.contacts.groups
                    .list()
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'size');
                        assert.property(result, 'collection');
                        assert.isArray(result.collection);
                        done();
                    })
                    .catch(done);
            });

            it('should add new group', function (done) {
                smsapi.contacts.groups
                    .add()
                    .name('NewTestGroup')
                    .description('NewTestGroupDescription')
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'id');
                        assert.property(result, 'name');
                        assert.property(result, 'description');
                        assert.equal(result.name, 'NewTestGroup');
                        assert.equal(result.description, 'NewTestGroupDescription');

                        testGroup = _.omit(result, [
                            'date_updated', 'date_created'
                        ]);
                        done();
                    })
                    .catch(done);
            });

            it('should find new group by id', function (done) {
                smsapi.contacts.groups
                    .list()
                    .id(testGroup.id)
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'size');
                        assert.property(result, 'collection');
                        assert.isArray(result.collection);

                        assert.deepEqual(_.omit(_.first(result.collection), [
                            'date_created', 'date_updated'
                        ]), testGroup);
                        done();
                    })
                    .catch(done);
            });

            it('should find new group by name', function (done) {
                smsapi.contacts.groups
                    .list()
                    .name(testGroup.name)
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'size');
                        assert.property(result, 'collection');
                        assert.isArray(result.collection);

                        assert.deepEqual(_.omit(_.first(result.collection), [
                            'date_created',
                            'date_updated'
                        ]), testGroup);
                        done();
                    })
                    .catch(done);
            });

            it('should get group details', function (done) {
                smsapi.contacts.groups
                    .get(testGroup.id)
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'name');
                        assert.property(result, 'description');
                        assert.property(result, 'contacts_count');
                        assert.property(result, 'permissions');
                        assert.equal(result.name, 'NewTestGroup');
                        assert.equal(result.contacts_count, 0);
                        done();
                    })
                    .catch(done);
            });

            it('should update group', function (done) {
                smsapi.contacts.groups
                    .update(testGroup.id)
                    .name('UpdatedTestGroup')
                    .description('UpdatedTestGroupDescription')
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'name');
                        assert.property(result, 'description');
                        assert.equal(result.name, 'UpdatedTestGroup');
                        assert.equal(result.description, 'UpdatedTestGroupDescription');
                        done();
                    })
                    .catch(done);
            });

            it('should delete group', function (done) {
                smsapi.contacts.groups
                    .delete(testGroup.id)
                    .execute()
                    .then(done.bind(null, null))
                    .catch(done);
            });

            describe('permissions', function () {
                var testUser,
                    testGroup;

                before(function (done) {
                    // create test group and user
                    smsapi.user.add()
                        .name(randomString())
                        .pass(randomString())
                        .execute()
                        .then(function (result) {
                            testUser = result;
                        })
                        .then(function () {
                            return smsapi.contacts.groups
                                .add()
                                .name(randomString())
                                .execute();
                        })
                        .then(function (result) {
                            testGroup = result;
                        })
                        .then(done.bind(null, null))
                        .catch(done);
                });

                after(function (done) {
                    smsapi.contacts.groups
                        .delete(testGroup.id)
                        .execute()
                        .then(done.bind(null, null))
                        .catch(done);

                    // FIXME da się usunąć użytkownika?
                });

                it('should list group permissions', function (done) {
                    smsapi.contacts.groups.permissions
                        .list(testGroup.id)
                        .execute()
                        .then(function (result) {
                            assert.property(result, 'size');
                            assert.property(result, 'collection');
                            assert.isArray(result.collection);
                            done();
                        })
                        .catch(done);
                });

                it('should add group permission', function (done) {
                    smsapi.contacts.groups.permissions
                        .add(testGroup.id, testUser.username)
                        .read(1)
                        .write(1)
                        .send(1)
                        .execute()
                        .then(function (result) {
                            assert.property(result, 'group_id');
                            assert.property(result, 'username');
                            assert.property(result, 'write');
                            assert.property(result, 'read');
                            assert.property(result, 'send');

                            assert.equal(result.group_id, testGroup.id);
                            assert.equal(result.username, testUser.username);
                            assert.ok(result.write);
                            assert.ok(result.read);
                            assert.ok(result.send);

                            done();
                        })
                        .catch(done);
                });

                it('should get user group permission', function (done) {
                    smsapi.contacts.groups.permissions
                        .get(testGroup.id, testUser.username)
                        .execute()
                        .then(function (result) {
                            assert.property(result, 'group_id');
                            assert.property(result, 'username');
                            assert.property(result, 'write');
                            assert.property(result, 'read');
                            assert.property(result, 'send');

                            assert.equal(result.group_id, testGroup.id);
                            assert.equal(result.username, testUser.username);
                            assert.ok(result.write);
                            assert.ok(result.read);
                            assert.ok(result.send);

                            done();
                        })
                        .catch(done);
                });

                it('should edit user group permission', function (done) {
                    smsapi.contacts.groups.permissions
                        .update(testGroup.id, testUser.username)
                        .write(0)
                        .execute()
                        .then(function (result) {
                            assert.property(result, 'group_id');
                            assert.property(result, 'username');
                            assert.property(result, 'write');
                            assert.property(result, 'read');
                            assert.property(result, 'send');

                            assert.equal(result.group_id, testGroup.id);
                            assert.equal(result.username, testUser.username);
                            assert.notOk(result.write);
                            assert.ok(result.read);
                            assert.ok(result.send);

                            done();
                        })
                        .catch(done);
                });

                it('should delete user group permission', function (done) {
                    smsapi.contacts.groups.permissions
                        .delete(testGroup.id, testUser.username)
                        .execute()
                        .then(done.bind(null, null))
                        .catch(done);
                });
            });

            describe('members', function () {
                var testGroups = [], // create 2 groups
                    testContact;

                before(function (done) {
                    createGroup()
                        .then(createGroup)
                        .then(createContact)
                        .then(done.bind(null, null))
                        .catch(done);

                    function createGroup() {
                        return smsapi.contacts.groups
                            .add()
                            .name(randomString())
                            .execute()
                            .then(function (result) {
                                testGroups.push(result);
                            });
                    }

                    function createContact() {
                        return smsapi.contacts
                            .add()
                            .firstName(randomString())
                            .phoneNumber(config.testNumber)
                            .execute()
                            .then(function (result) {
                                testContact = _.omit(result, [
                                    'date_updated', 'date_created'
                                ]);
                            });
                    }
                });

                after(function (done) {
                    deleteGroups()
                        .then(deleteContact)
                        .then(done.bind(null, null))
                        .catch(done);

                    function deleteContact() {
                        return smsapi.contacts
                            .delete(testContact.id)
                            .execute();
                    }

                    function deleteGroups() {
                        return RSVP.all(_.map(testGroups, function (testGroup) {
                            return smsapi.contacts.groups
                                .delete(testGroup.id)
                                .execute();
                        }));
                    }
                });

                it('should pin contact to the group', function (done) {
                    smsapi.contacts.groups.members
                        .add(_.first(testGroups).id, testContact.id)
                        .execute()
                        .then(done.bind(null, null))
                        .catch(done);
                });

                it('should check if contact is in group', function (done) {
                    smsapi.contacts.groups.members
                        .get(_.first(testGroups).id, testContact.id)
                        .execute()
                        .then(function (result) {
                            assert.deepEqual(_.omit(result, [
                                'date_updated', 'date_created'
                            ]), testContact);
                            done();
                        })
                        .catch(done);
                });

                it('should pin contact to the second group', function (done) {
                    smsapi.contacts.groups.members
                        .add(_.last(testGroups).id, testContact.id)
                        .execute()
                        .then(done.bind(null, null))
                        .catch(done);
                });

                it('should check if contact is in two groups', function (done) {
                    smsapi.contacts.groups.assignments
                        .list(testContact.id)
                        .execute()
                        .then(function (result) {
                            assert.equal(result.size, 2);
                            done();
                        })
                        .catch(done);
                });

                it('should check if contact is in the second group', function (done) {
                    smsapi.contacts.groups.members
                        .get(_.last(testGroups).id, testContact.id)
                        .execute()
                        .then(function (result) {
                            assert.deepEqual(_.omit(result, [
                                'date_updated', 'date_created'
                            ]), testContact);
                            done();
                        })
                        .catch(done);
                });

                it('should unpin contact from group', function (done) {
                    smsapi.contacts.groups.members
                        .delete(_.first(testGroups).id, testContact.id)
                        .execute()
                        .then(done.bind(null, null))
                        .catch(done);
                });
            });
        });

    });

});
