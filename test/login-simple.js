
var chai   = require('chai'),
    assert = chai.assert,
    SMSAPI = require(__dirname + '/../lib/smsapi.js'),
    config = require('./config.js');

describe('authentication', function(){
    it('should login and be able to get points', function(done){
        var smsapi = new SMSAPI({ server: config.server });

        smsapi.authentication.loginHashed(config.username, config.password)
            .then(function(result){
                return smsapi.points.get().execute();
            })
            .then(function(result){
                assert.property(result, 'points', 'Response has property `points`');
                done();
            })
            .catch(done);
    });

    it('should logout and not be able to get points', function(done){
        var smsapi = new SMSAPI();

        smsapi.authentication.loginHashed(config.username, config.password)
            .then(function(){
                return smsapi.authentication.logout();
            })
            .then(function(result){
                return smsapi.points.get().execute();
            })
            .then(done)
            .catch(function(err){
                assert.ok(true, 'Points could not be retrieved');
                done();
            });
    });
});
