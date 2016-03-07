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

    describe('sender (' + authName + ')', function () {
        var smsapi = new SMSAPI(options),
            senderName = ('test-' + randomString()).substring(0, 10);

        before(function (done) {
            smsapi.authentication.loginHashed(config.username, config.password)
                .then(done.bind(null, null))
                .catch(done);
        });

        it('should get senders list', function (done) {
            smsapi.sender
                .list()
                .execute()
                .then(function (result) {
                    assert.isArray(result);
                    done();
                })
                .catch(done);
        });

        it('should add new sender', function (done) {
            smsapi.sender
                .add()
                .name(senderName)
                .execute()
                .then(function (result) {
                    assert.equal(result.count, 1);
                    done();
                })
                .catch(done);
        });

        it('should check status of the added sender', function (done) {
            smsapi.sender
                .status(senderName)
                .execute()
                .then(function (result) {
                    assert.equal(result.name, senderName);
                    assert.equal(result.status, 'INACTIVE');
                    done();
                })
                .catch(done);
        });

        it('should not set default sender, due to its INACTIVE status', function (done) {
            smsapi.sender
                .default(senderName)
                .execute()
                .then(done)
                .catch(function (err) {
                    assert.equal(err.message, 'Cannot set to default not active sendername');
                    done();
                })
                .catch(done);
        });

        it('should delete added sender', function (done) {
            smsapi.sender
                .delete(senderName)
                .execute()
                .then(function (result) {
                    assert.equal(result.count, 1);
                    done();
                })
                .catch(done);
        });
    });

});
