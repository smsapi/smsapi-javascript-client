
var chai   = require('chai'),
    assert = chai.assert,
    SMSAPI = require(__dirname + '/../lib/smsapi.js'),
    config = require('./config.js');

describe('points', function(){
    var smsapi = new SMSAPI({ server: config.server });

    before(function(done){
        smsapi.authentication.loginHashed(config.username, config.password)
            .then(done.bind(null, null))
            .catch(done);
    });

    it('should get points', function(done){
        smsapi.points.get()
            .execute()
            .then(function(result){
                assert.property(result, 'points', 'Response has property `points`');
                done();
            })
            .catch(done);
    });

    it('should get points with details', function(done){
        smsapi.points.get()
            .details()
            .execute()
            .then(function(result){
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
