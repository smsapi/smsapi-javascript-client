
var chai   = require('chai'),
    assert = chai.assert,
    SMSAPI = require(__dirname + '/../lib/smsapi.js'),
    config = require('./config.js');

describe('sender', function(){
    var smsapi = new SMSAPI({ server: config.server });

    before(function(done){
        smsapi.authentication.loginHashed(config.username, config.password)
            .then(done.bind(null, null))
            .catch(done);
    });

    it('should get senders list', function(done){
        smsapi.sender
            .list()
            .execute()
            .then(function(result){
                assert.isArray(result);
                done();
            })
            .catch(done);
    });

    it('should add new sender', function(done){
        var response = false;

        smsapi.sender
            .add()
            .name('TestSender')
            .execute()
            .then(function(result){
                assert.equal(result.count, 1);
                done();
            })
            .catch(done);
    });

    it('should check status of the added sender', function(done){
        smsapi.sender
            .status('TestSender')
            .execute()
            .then(function(result){
                assert.equal(result.name, 'TestSender');
                assert.equal(result.status, 'INACTIVE');
                done();
            })
            .catch(done);
    });

    it('should not set default sender, due to its INACTIVE status', function(done){
        smsapi.sender
            .default('TestSender')
            .execute()
            .then(done)
            .catch(function(err){
                assert.equal(err.message, 'Cannot set to default not active sendername!');
                done();
            })
            .catch(done);
    });

    it('should delete added sender', function(done){
        smsapi.sender
            .delete('TestSender')
            .execute()
            .then(function(result){
                assert.equal(result.count, 1);
                done();
            })
            .catch(done);
    });
});
