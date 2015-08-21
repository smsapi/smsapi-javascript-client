
var chai   = require('chai'),
    assert = chai.assert,
    SMSAPI = require(__dirname + '/../lib/smsapi.js'),
    config = require('./config.js');

describe('profile', function(){
    var smsapi = new SMSAPI({ server: config.server });

    before(function(done){
        smsapi.authentication.loginHashed(config.username, config.password)
            .then(done.bind(null, null))
            .catch(done);
    });

    it('should get profile data', function(done){
        smsapi.profile.get()
            .execute()
            .then(function(result){
                assert.property(result, 'name');
                assert.property(result, 'username');
                assert.property(result, 'email');
                assert.equal(result.username, config.username);
                done();
            })
            .catch(function(err){
                console.log('err:', err);
            });
    });
});
