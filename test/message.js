var _ = require('lodash');
var chai = require('chai');
var assert = chai.assert;
var SMSAPI = require('../lib/smsapi');
var config = require('./config');
var randomString = require('randomstring').generate;
var RSVP = require('rsvp');

var optionsByAuth = {
    AuthenticationSimple: {
        server: config.server
    },
    AuthenticationOAuth: {
        server: config.server,
        oauth: config.oauth
    }
};

_.forEach(optionsByAuth, function (options, authName) {

    describe('sms (' + authName + ')', function () {
        var smsapi = new SMSAPI(options);

        if (authName === 'AuthenticationSimple') {
            before(function (done) {
                smsapi.authentication.loginHashed(config.username, config.password)
                    .then(deleteContactWithPhoneNumber.bind(null, smsapi, config.testNumber))
                    .then(deleteContactWithPhoneNumber.bind(null, smsapi, config.testNumber2))
                    .then(done.bind(null, null))
                    .catch(done);
            });
        }

        describe('sms', function () {

            it('should send eco sms', function (done) {
                smsapi.message
                    .sms()
                    .eco()
                    .to(config.testNumber)
                    .test()
                    .message('Test message')
                    .execute()
                    .then(function (result) {
                        assert.equal(result.count, 1);
                        assert.isArray(result.list);
                        assert.equal(_.first(result.list).number, config.testNumber);
                        assert.property(_.first(result.list), 'points');
                        done();
                    })
                    .catch(done);
            });

            it('should send test sms with details', function (done) {
                smsapi.message
                    .sms()
                    .eco()
                    .to(config.testNumber)
                    .test()
                    .message('Test message')
                    .details()
                    .execute()
                    .then(function (result) {
                        assert.equal(result.count, 1);
                        assert.isArray(result.list);
                        assert.equal(_.first(result.list).number, config.testNumber);
                        assert.equal(result.message, 'Test message');
                        assert.property(result, 'length');
                        assert.property(result, 'parts');
                        done();
                    })
                    .catch(done);
            });

            it('should send eco sms to array of numbers', function (done) {
                smsapi.message
                    .sms()
                    .eco()
                    .to([config.testNumber])
                    .test()
                    .message('Test message')
                    .execute()
                    .then(function (result) {
                        assert.equal(result.count, 1);
                        assert.equal(result.list[0].number, config.testNumber);
                        done();
                    })
                    .catch(done);
            });

            it('should schedule and remove a sms', function (done) {
                var date = new Date();
                date.setHours(date.getHours() + 1);

                smsapi.message
                    .sms()
                    .eco()
                    .to(config.testNumber)
                    .message('Test message')
                    .date(date)
                    .dateValidate()
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'count');
                        assert.equal(result.count, 1);
                        assert.isArray(result.list);
                        return _.first(result.list).id;
                    })
                    .then(function (messageId) {
                        return smsapi.message
                            .delete(messageId)
                            .execute();
                    })
                    .then(function (result) {
                        assert.equal(result.count, 1);
                        done();
                    })
                    .catch(done);
            });

            describe('groups', function(){
                var groups = [];
                var contacts = [];

                beforeEach(function(done){
                    // create 2 groups, 2 contacts and assign contacts to groups
                    createRandomGroup(smsapi)
                        .then(function(group){ groups.push(group);})
                        .then(createRandomGroup.bind(null, smsapi))
                        .then(function(group){ groups.push(group);})
                        .then(createContact.bind(null, smsapi, config.testNumber))
                        .then(function(contact){ contacts.push(contact); })
                        .then(createContact.bind(null, smsapi, config.testNumber2))
                        .then(function(contact){ contacts.push(contact); })
                        .then(function(){ return assignContactToGroup(smsapi, contacts[0].id, groups[0].id); })
                        .then(function(){ return assignContactToGroup(smsapi, contacts[1].id, groups[1].id); })
                        .then(done.bind(null, null))
                        .catch(done);
                });

                it('should send sms to group', function(done){
                    smsapi.message
                        .sms()
                        .group(groups[0].name)
                        .test()
                        .message('Test message')
                        .execute()
                        .then(function (result) {
                            assert.equal(result.count, 1);
                            assert.isArray(result.list);
                            assert.equal(_.first(result.list).number, config.testNumber);
                            done();
                        })
                        .catch(done);
                });

                it('should send sms to second group', function(done){
                    smsapi.message
                        .sms()
                        .group(groups[1].name)
                        .test()
                        .message('Test message')
                        .execute()
                        .then(function (result) {
                            assert.equal(result.count, 1);
                            assert.isArray(result.list);
                            assert.equal(_.first(result.list).number, config.testNumber2);
                            done();
                        })
                        .catch(done);
                });

                it('should send sms to both groups', function(done){
                    smsapi.message
                        .sms()
                        .group([groups[0].name, groups[1].name])
                        .test()
                        .message('Test message')
                        .execute()
                        .then(function (result) {
                            assert.equal(result.count, 2);
                            assert.isArray(result.list);
                            assert.equal(_.first(result.list).number, config.testNumber);
                            assert.equal(_.last(result.list).number, config.testNumber2);
                            done();
                        })
                        .catch(done);
                });

                afterEach(function(done){
                    // clean everything up
                    deleteContact(smsapi, contacts.pop().id)
                        .then(function(){ return deleteContact(smsapi, contacts.pop().id); })
                        .then(function(){ return deleteGroup(smsapi, groups.pop().id); })
                        .then(function(){ return deleteGroup(smsapi, groups.pop().id); })
                        .then(done.bind(null, null))
                        .catch(done);
                });
            });
        });

        describe('mms', function () {
            it('should send mms', function (done) {
                var smil = '<smil><head><layout><root-layout height="600" width="425"/> <region id="Image" top="0" left="0" height="100%" width="100%" fit="meet"/></layout></head><body><par dur="5000ms"><img src="http://www.smsapi.pl/assets/img/mms.jpg" region="Image"></img></par></body></smil>';

                smsapi.message
                    .mms()
                    .to(config.testNumber)
                    .subject('Test message')
                    .smil(smil)
                    .test()
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'count');
                        assert.equal(result.count, 1);
                        assert.isArray(result.list);
                        done();
                    })
                    .catch(done);
            });
        });

        describe('vms', function () {
            it('should send vms (use tts)', function (done) {
                smsapi.message
                    .vms()
                    .to(config.testNumber)
                    .tts('Test message')
                    .test()
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'count');
                        assert.equal(result.count, 1);
                        assert.isArray(result.list);
                        done();
                    })
                    .catch(done);
            });

            it('should send vms (use local .wav file)', function (done) {
                smsapi.message
                    .vms()
                    .to(config.testNumber)
                    .localFile(__dirname + '/files/vms.wav')
                    .test()
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'count');
                        assert.equal(result.count, 1);
                        assert.isArray(result.list);
                        done();
                    })
                    .catch(done);
            });
        });
    });

});

/**
 *
 * @param {SMSAPI} smsapi
 * @param {String} phoneNumber
 * @returns {Promise<{id: String, phone_number: String}>}
 */
function createContact(smsapi, phoneNumber){
    return smsapi.contacts
        .add()
        .phoneNumber(phoneNumber)
        .execute();
}

/**
 *
 * @param {SMSAPI} smsapi
 * @param {String} contactId
 * @returns {Promise}
 */
function deleteContact(smsapi, contactId){
    return smsapi.contacts
        .delete(contactId)
        .execute();
}

/**
 *
 * @param {SMSAPI} smsapi
 * @param {String} phoneNumber
 */
function deleteContactWithPhoneNumber(smsapi, phoneNumber){
    return smsapi.contacts
        .list()
        .phoneNumber(phoneNumber)
        .execute()
        .then(handleResult);

    /**
     *
     * @param {{collection: Array}|void} result
     */
    function handleResult(result){
        var contact = _.first(result.collection);
        if (contact)
            return deleteContact(smsapi, contact.id);
    }
}

/**
 *
 * @param {SMSAPI} smsapi
 * @param {String} contactId
 * @param {String} groupId
 * @returns {Promise}
 */
function assignContactToGroup(smsapi, contactId, groupId){
    return smsapi.contacts.groups.assignments
        .add(contactId, groupId)
        .execute()
}

/**
 *
 * @param {SMSAPI} smsapi
 * @returns {Promise<{id: String, name: String}>}
 */
function createRandomGroup(smsapi){
    return smsapi.contacts.groups
        .add()
        .name('test-' + randomString(8))
        .execute();
}

/**
 *
 * @param {SMSAPI} smsapi
 * @param {String} groupId
 * @returns {Promise}
 */
function deleteGroup(smsapi, groupId){
    return smsapi.contacts.groups
        .delete(groupId)
        .execute();
}
