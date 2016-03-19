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

    describe('points (' + authName + ')', function () {
        var smsapi = new SMSAPI(options);

        if (authName === 'AuthenticationSimple') {
            before(function (done) {
                smsapi.authentication.loginHashed(config.username, config.password)
                    .then(done.bind(null, null))
                    .catch(done);
            });
        }

        it('should get points', function (done) {
            smsapi.points.get()
                .execute()
                .then(function (result) {
                    assert.property(result, 'points', 'Response has property `points`');
                    done();
                })
                .catch(done);
        });

        it('should get points with details', function (done) {
            smsapi.points.get()
                .details()
                .execute()
                .then(function (result) {
                    assert.property(result, 'points');
                    assert.property(result, 'proCount');
                    assert.property(result, 'ecoCount');
                    assert.property(result, 'mmsCount');
                    assert.property(result, 'vmsGsmCount');
                    assert.property(result, 'vmsLandCount');
                    done();
                })
                .catch(done);
        });

    });

});
