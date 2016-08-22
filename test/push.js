var chai = require('chai');
var assert = chai.assert;
var SMSAPI = require('../lib/smsapi');
var config = require('./config');
var Promise = require('rsvp').Promise;
var _ = require('lodash');
var randomString = require('randomstring').generate;

var optionsByAuth = {
    AuthenticationSimple: {
        server: config.server
    },
    AuthenticationOAuth: {
        server: config.server,
        oauth: config.oauth
    }
};

_.forEach(optionsByAuth, function(options, authName) {

    describe('push (' + authName + ')', function() {
        var smsapi = new SMSAPI(options);

        if (authName === 'AuthenticationSimple') {
            before(function() {
                return smsapi.authentication
                    .loginHashed(config.username, config.password);
            });
        }

        describe('apps', function() {
            var appsToDelete = [];
            afterEach(function() {
                if (appsToDelete.length > 0) {
                    return Promise.all(appsToDelete.map(function(app) {
                        return deleteApp(smsapi, app.id);
                    })).then(function() {
                        appsToDelete = [];
                    });
                }
            });

            it('should add push app', function() {
                var app = {
                    name: 'test-' + randomString()
                };

                return smsapi.push.app.add()
                    .params(app)
                    .execute()
                    .then(queueAppForDeletion)
                    .then(assertResult);

                /**
                 * @param {PushAppObject} createdApp
                 */
                function assertResult(createdApp) {
                    assert.property(createdApp, 'id');
                    assert.property(createdApp, 'name');
                    assert.property(createdApp, 'icon');
                    assert.property(createdApp, 'environment');

                    assert.isString(createdApp.id);
                    assert.equal(createdApp.name, app.name);
                }
            });

            it('should update push app', function() {
                var createdApp;

                return addApp(smsapi)
                    .then(queueAppForDeletion)
                    .then(memoCreatedApp)
                    .then(updateCreatedApp)
                    .then(getUpdatedApp)
                    .then(assertResult);

                /**
                 * @param {PushAppObject} app
                 * @returns {PushAppObject}
                 */
                function memoCreatedApp(app) {
                    createdApp = app;
                    return app;
                }

                /**
                 * @param {PushAppObject} app
                 * @returns {Promise.<PushAppObject>}
                 */
                function updateCreatedApp(app) {
                    return smsapi.push.app.update(app.id)
                        .name(app.name + '-updated')
                        .execute();
                }

                /**
                 * @param {PushAppObject} app
                 * @returns {Promise.<PushAppObject>}
                 */
                function getUpdatedApp(app) {
                    return getApp(smsapi, app.id);
                }

                /**
                 * @param {PushAppObject} updatedApp
                 */
                function assertResult(updatedApp) {
                    assert.deepEqual(_.omit(updatedApp, 'name'), _.omit(createdApp, 'name'));
                    assert.equal(updatedApp.name, createdApp.name + '-updated');
                }
            });

            it('should delete added app', function() {
                return addApp(smsapi)
                    .then(deleteCreatedApp)
                    .then(assertDeletion);

                /**
                 * @param {PushAppObject} app
                 * @returns {Promise.<PushAppObject>}
                 */
                function deleteCreatedApp(app) {
                    return smsapi.push.app.delete(app.id)
                        .execute()
                        .then(function() {
                            return app;
                        });
                }

                /**
                 * @param {PushAppObject} app
                 * @returns {Promise}
                 */
                function assertDeletion(app) {
                    return new Promise(function(resolve, reject) {
                        getApp(smsapi, app.id)
                            .then(reject)
                            .catch(function(err) {
                                err.error === 'not_found_app' ? resolve() : reject(err);
                            });
                    });
                }
            });

            it('should get list of apps', function() {
                return addApp(smsapi)
                    .then(queueAppForDeletion)
                    .then(fetchAppList)
                    .then(assertResult);

                /**
                 *
                 * @returns {Promise.<[PushAppObject]>}
                 */
                function fetchAppList() {
                    return smsapi.push.app.list()
                        .execute();
                }

                /**
                 * @param {PushAppListResponse} result
                 */
                function assertResult(result) {
                    var collection = result.collection;

                    assert.isOk(collection.length > 0, 'Length is above 0');
                    assert.isOk(result.size > 0, 'Size is above 0');

                    assert.property(collection[0], 'id');
                    assert.property(collection[0], 'name');
                    assert.property(collection[0], 'icon');
                    assert.property(collection[0], 'environment');
                }
            });

            it('should get single app', function() {
                var createdApp;

                return addApp(smsapi)
                // .then(queueAppForDeletion)
                    .then(memoApp)
                    .then(fetchApp)
                    .then(assertResult);

                /**
                 *
                 * @param {PushAppObject} app
                 * @returns {PushAppObject}
                 */
                function memoApp(app) {
                    createdApp = app;
                    return app;
                }

                /**
                 *
                 * @param {PushAppObject} app
                 * @returns {Promise.<PushAppObject, Error>}
                 */
                function fetchApp(app) {
                    return smsapi.push.app.get(app.id)
                        .execute();
                }

                /**
                 *
                 * @param {PushAppObject} app
                 */
                function assertResult(app) {
                    assert.property(app, 'id');
                    assert.property(app, 'name');
                    assert.property(app, 'icon');
                    assert.property(app, 'environment');

                    assert.equal(app.id, createdApp.id);
                    assert.equal(app.name, createdApp.name);
                }
            });

            describe('devices', function() {
                var app;

                beforeEach(function() {
                    return addApp(smsapi)
                        .then(function(createdApp) {
                            app = createdApp;
                        });
                });

                afterEach(function() {
                    return deleteApp(smsapi, app.id);
                });

                it('should get list of devices', function() {
                    return addExampleDevice()
                        .then(listDevices)
                        .then(assertResult);

                    /**
                     * @returns {Promise.<PushAppDeviceListResponse>}
                     */
                    function listDevices() {
                        return smsapi.push.app.device.list(app.id)
                            .execute();
                    }

                    /**
                     * @param {PushAppDeviceListResponse} result
                     */
                    function assertResult(result) {
                        var collection = result.collection;

                        assert.lengthOf(collection, 1, 'Collection length is 1');
                        assert.isOk(result.size > 0, 'Size is above 0');

                        assertDeviceProperties(collection[0]);
                    }
                });

                it('should add an android device', function() {
                    return smsapi.push.app.device.add(app.id)
                        .deviceId(randomString())
                        .deviceType('android')
                        .phoneNumber('500500500')
                        .channels(['test-channel-1', 'test-channel-2'])
                        .email('example@example.com')
                        .additionalData({foo: 'bar'})
                        .execute()
                        .then(assertDeviceProperties)
                        .then(assertResult);

                    /**
                     *
                     * @param {PushAppDeviceObject} device
                     */
                    function assertResult(device) {
                        assert.equal(device.device_type, 'android');
                        assert.equal(device.email, 'example@example.com');
                        assert.equal(device.phone_number, '500500500');
                        assert.lengthOf(device.channels, 2, 'Device has 2 channels');
                        assert.deepEqual(device.additional_data, {foo: 'bar'});
                    }
                });

                it('should add an ios device', function() {
                    return smsapi.push.app.device.add(app.id)
                        .deviceId(randomString())
                        .deviceType('ios')
                        .execute()
                        .then(assertDeviceProperties)
                        .then(assertResult);

                    /**
                     * @param {PushAppDeviceObject} device
                     */
                    function assertResult(device) {
                        assert.equal(device.device_type, 'ios');
                    }
                });

                it('should get device', function() {
                    return addExampleDevice()
                        .then(getDevice)
                        .then(assertDeviceProperties)
                        .then(assertResult);

                    /**
                     * @param {PushAppDeviceObject} device
                     * @returns {Promise.<PushAppDeviceObject, Error>}
                     */
                    function getDevice(device) {
                        return smsapi.push.app.device.get(app.id, device.device_id)
                            .execute();
                    }

                    /**
                     * @param device
                     */
                    function assertResult(device) {
                        assert.equal(device.email, 'example@example.com');
                    }
                });

                it('should update device', function() {
                    return addExampleDevice()
                        .then(updateDevice)
                        .then(fetchDevice)
                        .then(assertDeviceProperties)
                        .then(assertResult);

                    /**
                     *
                     * @param {PushAppDeviceObject} device
                     * @returns {Promise.<PushAppDeviceObject>}
                     */
                    function updateDevice(device) {
                        return smsapi.push.app.device.update(app.id, device.device_id)
                            .email('example2@example.com')
                            .phoneNumber('500500500')
                            .channels(['test-channel-1', 'test-channel-2'])
                            .additionalData({foo: 'bar'})
                            .execute();
                    }

                    /**
                     *
                     * @param {PushAppDeviceObject} device
                     * @returns {Promise.<PushAppDeviceObject, Error>}
                     */
                    function fetchDevice(device) {
                        return smsapi.push.app.device.get(app.id, device.device_id)
                            .execute();
                    }

                    /**
                     * @param {PushAppDeviceObject} device
                     */
                    function assertResult(device) {
                        assert.equal(device.device_type, 'android');
                        assert.equal(device.email, 'example2@example.com');
                        assert.equal(device.phone_number, '500500500');
                        assert.lengthOf(device.channels, 2, 'Device has 2 channels');
                        assert.deepEqual(device.additional_data, {foo: 'bar'});
                    }
                });

                it('should delete device', function() {
                    return addExampleDevice()
                        .then(removeDevice);

                    /**
                     *
                     * @param {PushAppDeviceObject} device
                     * @returns {Promise}
                     */
                    function removeDevice(device) {
                        return smsapi.push.app.device.delete(app.id, device.device_id)
                            .execute();
                    }
                });

                /**
                 * @returns {Promise.<PushAppObject>}
                 */
                function addExampleDevice() {
                    return smsapi.push.app.device.add(app.id)
                        .deviceId(randomString())
                        .deviceType('android')
                        .email('example@example.com')
                        .execute();
                }

                /**
                 * @param {PushAppDeviceObject} device
                 * @return {PushAppDeviceObject}
                 */
                function assertDeviceProperties(device) {
                    assert.property(device, 'device_id');
                    assert.property(device, 'device_type');
                    assert.property(device, 'channels');
                    assert.property(device, 'email');
                    assert.property(device, 'phone_number');
                    assert.property(device, 'additional_data');

                    return device;
                }
            });

            /**
             *
             * @param {PushAppObject} app
             * @returns {PushAppObject}
             */
            function queueAppForDeletion(app) {
                appsToDelete.push(app);
                return app;
            }
        });
    });
});

/**
 *
 * @param {SMSAPI} smsapi
 * @param {String} [name]
 * @returns {Promise}
 */
function addApp(smsapi, name) {
    return smsapi.push.app
        .add()
        .name(name || 'test-' + randomString())
        .execute();
}

/**
 *
 * @param {SMSAPI} smsapi
 * @param {String} appId
 * @returns {Promise.<PushAppObject>}
 */
function getApp(smsapi, appId) {
    return smsapi.push.app
        .get(appId)
        .execute();
}

/**
 * @param {SMSAPI} smsapi
 * @param {String} appId
 * @returns {Promise}
 */
function deleteApp(smsapi, appId) {
    return smsapi.push.app
        .delete(appId)
        .execute();
}
