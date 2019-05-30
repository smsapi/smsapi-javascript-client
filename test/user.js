var chai = require('chai'),
    assert = chai.assert,
    SMSAPI = require('../lib/smsapi'),
    config = require('./config'),
    randomString = require('randomstring').generate,
    _ = require('lodash');

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

    describe('user (' + authName + ')', function () {
        var smsapi = new SMSAPI(options),
            userName = ('test-' + randomString()).substring(0, 10);

        if (authName === 'AuthenticationSimple') {
            before(function (done) {
                smsapi.authentication.loginHashed(config.username, config.password)
                    .then(done.bind(null, null))
                    .catch(done);
            });
        }

        it('should get subusers list', function (done) {
            smsapi.user
                .list()
                .execute()
                .then(function (result) {
                    assert.isArray(result);
                    done();
                })
                .catch(done);
        });

        it('should add new subuser', function (done) {
            smsapi.user
                .add()
                .name(userName)
                .pass('SubuserPassword')
                .execute()
                .then(function (result) {
                    assert.property(result, 'username');
                    assert.property(result, 'limit');
                    assert.property(result, 'month_limit');
                    assert.property(result, 'senders');
                    assert.property(result, 'phonebook');
                    assert.property(result, 'active');
                    assert.property(result, 'info');
                    done();
                })
                .catch(function (err) {
                    if (err.error == 1115) // user exists
                        done();
                    else
                        done(err);
                });
        });

        it('should get details of the added subuser', function (done) {
            smsapi.user
                .get(userName)
                .execute()
                .then(function (result) {
                    assert.property(result, 'username');
                    assert.property(result, 'limit');
                    assert.property(result, 'month_limit');
                    assert.property(result, 'senders');
                    assert.property(result, 'phonebook');
                    assert.property(result, 'active');
                    assert.property(result, 'info');
                    assert.match(result.username, new RegExp(userName, 'g'));
                    done();
                })
                .catch(done);
        });

        it('should edit added subuser', function (done) {
            var infoContent = 'Test';

            smsapi.user
                .update(userName)
                .info(infoContent)
                .execute()
                .then(function (result) {
                    assert.property(result, 'username');
                    assert.property(result, 'limit');
                    assert.property(result, 'month_limit');
                    assert.property(result, 'senders');
                    assert.property(result, 'phonebook');
                    assert.property(result, 'active');
                    assert.property(result, 'info');
                    assert.match(result.username, new RegExp(userName, 'g'));
                    assert.equal(result.info, infoContent);
                    done();
                })
                .catch(done);
        });
    });

});
