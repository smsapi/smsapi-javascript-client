var chai = require('chai'),
    assert = chai.assert,
    SMSAPI = require('../lib/smsapi'),
    config = require('./config'),
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
        var smsapi = new SMSAPI(options);

        before(function (done) {
            smsapi.authentication.loginHashed(config.username, config.password)
                .then(done.bind(null, null))
                .catch(done);
        });

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
                .name('TestSubuser')
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
                .get('TestSubuser')
                .execute()
                .then(function (result) {
                    assert.property(result, 'username');
                    assert.property(result, 'limit');
                    assert.property(result, 'month_limit');
                    assert.property(result, 'senders');
                    assert.property(result, 'phonebook');
                    assert.property(result, 'active');
                    assert.property(result, 'info');
                    assert.match(result.username, /TestSubuser/);
                    done();
                })
                .catch(done);
        });

        it('should edit added subuser', function (done) {
            smsapi.user
                .update('TestSubuser')
                .limit(100)
                .execute()
                .then(function (result) {
                    assert.property(result, 'username');
                    assert.property(result, 'limit');
                    assert.property(result, 'month_limit');
                    assert.property(result, 'senders');
                    assert.property(result, 'phonebook');
                    assert.property(result, 'active');
                    assert.property(result, 'info');
                    assert.match(result.username, /TestSubuser/);
                    assert.equal(result.limit, 100);
                    done();
                })
                .catch(done);
        });
    });

});
