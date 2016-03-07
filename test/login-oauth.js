var chai = require('chai'),
    assert = chai.assert,
    SMSAPI = require('../index'),
    config = require('./config');

// authentication credentials
var username = config.username,
    password = config.password,
    options = {oauth: config.oauth};

describe('authentication-oauth', function () {
    it('should login', function (done) {
        var smsapi = new SMSAPI(options);

        smsapi.authentication.loginHashed(username, password)
            .then(function (result) {
                assert.property(result, 'access_token');
                assert.property(result, 'refresh_token');
                assert.property(result, 'expires');
                assert.property(result, 'token_type');

                assert.ok(smsapi.authentication.isAuthorized(), 'User is authorized');

                done();
            })
            .catch(done);
    });

    it('should not login (invalid oauth secret)', function (done) {
        var smsapi = new SMSAPI({
            oauth: {
                clientId: 'xxx',
                clientSecret: 'xxx'
            }
        });

        smsapi.authentication.loginHashed(username, password)
            .then(done)
            .catch(function (err) {
                assert.property(err, 'error_description');
                assert.equal(err.error_description, 'Client authentication failed');
                done();
            })
            .catch(done);
    });

    it('should not login (invalid credentials)', function (done) {
        var smsapi = new SMSAPI(options);

        smsapi.authentication.loginHashed(username, password + 'x')
            .catch(function (err) {
                assert.property(err, 'error_description');
                assert.equal(err.error_description, 'The user credentials were incorrect.');
                done();
            });
    });

    it('should logout', function (done) {
        var smsapi = new SMSAPI(options);

        smsapi.authentication.loginHashed(username, password)
            .then(function () {
                return smsapi.authentication.logout();
            })
            .then(function () {
                assert.notOk(smsapi.authentication.isAuthorized(), 'User is not authorized');
                assert.notOk(smsapi.authentication.getToken(), 'Token is not present');
                done();
            })
            .catch(done);
    });

    describe('logged in', function () {
        var smsapi = new SMSAPI(options);

        before(function (done) {
            smsapi.authentication.loginHashed(username, password)
                .then(done.bind(null, null))
                .catch(done);
        });

        it('should refresh token', function (done) {
            var oldToken = smsapi.authentication.getToken();

            smsapi.authentication.refreshToken()
                .then(function () {
                    var newToken = smsapi.authentication.getToken();
                    assert.property(newToken, 'access');
                    assert.property(newToken, 'refresh');
                    assert.property(newToken, 'expires');

                    assert.ok(smsapi.authentication.isAuthorized(), 'is authorized');

                    assert.notDeepEqual(newToken, oldToken, 'tokens do not match');

                    done();
                })
                .catch(done);
        });

        it('should get points', function (done) {
            smsapi.points
                .get()
                .execute()
                .then(function (result) {
                    assert.property(result, 'points', 'Response has property `points`');
                    done();
                })
                .catch(done);
        });
    });
});
