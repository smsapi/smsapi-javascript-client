
var chai   = require('chai'),
    assert = chai.assert,
    SMSAPI = require(__dirname + '/../lib/smsapi.js'),
    config = require('./config.js');

describe('hlr', function(){
    var smsapi = new SMSAPI({ server: config.server });

    before(function(done){
        smsapi.authentication.loginHashed(config.username, config.password)
            .then(done.bind(null, null))
            .catch(done);
    });

    it('should send hlr request', function(done){
        smsapi.hlr
            .check()
            .number(config.testNumber)
            .execute()
            .then(function(result){
                assert.property(result, 'id');
                assert.property(result, 'number');
                assert.property(result, 'status');
                done();
            })
            .catch(done);
    });
});
