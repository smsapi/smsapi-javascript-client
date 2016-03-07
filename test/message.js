var _ = require('lodash'),
    chai = require('chai'),
    assert = chai.assert,
    SMSAPI = require('../lib/smsapi'),
    config = require('./config');

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

    describe('sms (' + authName + ')', function () {
        var smsapi = new SMSAPI(options);

        before(function (done) {
            smsapi.authentication.loginHashed(config.username, config.password)
                .then(done.bind(null, null))
                .catch(done);
        });

        describe('sms', function () {
            it('should send eco sms', function (done) {
                smsapi.message
                    .sms()
                    .eco()
                    .to(config.testNumber)
                    .test()
                    .message('Test message')
                    .execute()
                    .then(function (result) {
                        assert.equal(result.count, 1);
                        assert.isArray(result.list);
                        assert.equal(_.first(result.list).number, config.testNumber);
                        assert.property(_.first(result.list), 'points');
                        done();
                    })
                    .catch(done);
            });

            it('should send test sms with details', function (done) {
                smsapi.message
                    .sms()
                    .eco()
                    .to(config.testNumber)
                    .test()
                    .message('Test message')
                    .details()
                    .execute()
                    .then(function (result) {
                        assert.equal(result.count, 1);
                        assert.isArray(result.list);
                        assert.equal(_.first(result.list).number, config.testNumber);
                        assert.equal(result.message, 'Test message');
                        assert.property(result, 'length');
                        assert.property(result, 'parts');
                        done();
                    })
                    .catch(done);
            });

            it('should send eco sms to array of numbers', function (done) {
                smsapi.message
                    .sms()
                    .eco()
                    .to([config.testNumber])
                    .test()
                    .message('Test message')
                    .execute()
                    .then(function (result) {
                        assert.equal(result.count, 1);
                        assert.equal(result.list[0].number, config.testNumber);
                        done();
                    })
                    .catch(done);
            });

            it('should schedule and remove a sms', function (done) {
                var date = new Date();
                date.setHours(date.getHours() + 1);

                smsapi.message
                    .sms()
                    .eco()
                    .to(config.testNumber)
                    .message('Test message')
                    .date(date)
                    .dateValidate()
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'count');
                        assert.equal(result.count, 1);
                        assert.isArray(result.list);
                        return _.first(result.list).id;
                    })
                    .then(function (messageId) {
                        return smsapi.message
                            .delete(messageId)
                            .execute();
                    })
                    .then(function (result) {
                        assert.equal(result.count, 1);
                        done();
                    })
                    .catch(done);
            });
        });

        describe('mms', function () {
            it('should send mms', function (done) {
                var smil = '<smil><head><layout><root-layout height="600" width="425"/> <region id="Image" top="0" left="0" height="100%" width="100%" fit="meet"/></layout></head><body><par dur="5000ms"><img src="http://www.smsapi.pl/assets/img/mms.jpg" region="Image"></img></par></body></smil>';

                smsapi.message
                    .mms()
                    .to(config.testNumber)
                    .subject('Test message')
                    .smil(smil)
                    .test()
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'count');
                        assert.equal(result.count, 1);
                        assert.isArray(result.list);
                        done();
                    })
                    .catch(done);
            });
        });

        describe('vms', function () {
            it('should send vms (use tts)', function (done) {
                smsapi.message
                    .vms()
                    .to(config.testNumber)
                    .tts('Test message')
                    .test()
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'count');
                        assert.equal(result.count, 1);
                        assert.isArray(result.list);
                        done();
                    })
                    .catch(done);
            });

            it('should send vms (use local .wav file)', function (done) {
                smsapi.message
                    .vms()
                    .to(config.testNumber)
                    .localFile(__dirname + '/files/vms.wav')
                    .test()
                    .execute()
                    .then(function (result) {
                        assert.property(result, 'count');
                        assert.equal(result.count, 1);
                        assert.isArray(result.list);
                        done();
                    })
                    .catch(done);
            });
        });
    });

});
