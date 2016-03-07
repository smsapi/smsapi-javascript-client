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

    describe('profile (' + authName + ')', function () {
        var smsapi = new SMSAPI(options);

        before(function (done) {
            smsapi.authentication.loginHashed(config.username, config.password)
                .then(done.bind(null, null))
                .catch(done);
        });

        it('should get profile data', function (done) {
            smsapi.profile.get()
                .execute()
                .then(function (result) {
                    assert.property(result, 'name');
                    assert.property(result, 'username');
                    assert.property(result, 'email');
                    assert.equal(result.username, config.username);
                    done();
                })
                .catch(function (err) {
                    console.log('err:', err);
                });
        });
    });

});
