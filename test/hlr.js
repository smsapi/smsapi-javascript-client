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

    describe('hlr (' + authName + ')', function () {
        var smsapi = new SMSAPI(options);

        if (authName === 'AuthenticationSimple') {
            before(function (done) {
                smsapi.authentication.loginHashed(config.username, config.password)
                    .then(done.bind(null, null))
                    .catch(done);
            });
        }

        it('should send hlr request', function (done) {
            smsapi.hlr
                .check()
                .number(config.testNumber)
                .execute()
                .then(function (result) {
                    assert.property(result, 'id');
                    assert.property(result, 'number');
                    assert.property(result, 'status');
                    done();
                })
                .catch(done);
        });
    });

});
