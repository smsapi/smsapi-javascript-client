var _ = require('lodash');
var ActionAbstract = require('./action-abstract.js');

/**
 * @param {Object} options
 * @param {String} appId
 * @param {String} deviceId
 * @extends ActionAbstract
 * @constructor
 */
function PushAppDeviceUpdate(options, appId, deviceId) {
    ActionAbstract.call(this, options);
    this._appId = appId || null;
    this._deviceId = deviceId || null;
}

PushAppDeviceUpdate.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [deviceId]
 * @return {PushAppDeviceUpdate|String}
 */
PushAppDeviceUpdate.prototype.deviceId = function(deviceId) {
    if (_.isUndefined(deviceId)){
        return this._deviceId;
    }

    this._deviceId = deviceId;
    return this;
};

/**
 * @param  {String} type
 * @return {PushAppDeviceUpdate|String}
 */
PushAppDeviceUpdate.prototype.deviceType = function(type) {
    return this.param('device_type', type);
};

/**
 * @param  {String} email
 * @return {PushAppDeviceUpdate|String}
 */
PushAppDeviceUpdate.prototype.email = function(email) {
    return this.param('email', email);
};

/**
 * @param  {String} phoneNumber
 * @return {PushAppDeviceUpdate|String}
 */
PushAppDeviceUpdate.prototype.phoneNumber = function(phoneNumber) {
    return this.param('phone_number', phoneNumber);
};

/**
 * @param  {[String]} channels
 * @return {PushAppDeviceUpdate|[String]}
 */
PushAppDeviceUpdate.prototype.channels = function(channels) {
    return this.param('channels', channels);
};

/**
 * @param  {Object} additionalData
 * @return {PushAppDeviceUpdate|Object}
 */
PushAppDeviceUpdate.prototype.additionalData = function(additionalData) {
    return this.param('additional_data', additionalData);
};

/**
 * @return {Promise.<PushAppDeviceObject>}
 */
PushAppDeviceUpdate.prototype.execute = function() {
    return this.request()
        .put('push/apps/' + String(this._appId) + '/devices/' + String(this._deviceId))
        .data(this.params())
        .execute();
};

module.exports = PushAppDeviceUpdate;
