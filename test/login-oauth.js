var chai = require('chai');
var assert = chai.assert;
var SMSAPI = require('../index');
var config = require('./config');

var options = {oauth: config.oauth};

describe('authentication-oauth', function () {
    it('should login', function (done) {
        var smsapi = new SMSAPI(options);

        assert.ok(smsapi.authentication.isAuthorized(), 'User is authorized');

        smsapi.points.get()
            .execute()
            .then(function (result) {
                assert.property(result, 'points');
                done();
            })
            .catch(done);
    });

    it('should set and get access token', function () {
        var smsapi = new SMSAPI(options);
        var testToken = 'test-token';
        smsapi.authentication.setAccessToken(testToken);
        assert.equal(smsapi.authentication.getAccessToken(), testToken);
    });

    it('should not login (invalid token)', function (done) {
        var smsapi = new SMSAPI({oauth: {token: 'invalid'}});

        smsapi.points.get()
            .execute()
            .then(function () {
                done('Should not log in');
            })
            .catch(function(err){
                assert.equal(err.error, 101);
                done();
            });
    });
});
