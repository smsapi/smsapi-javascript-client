var ActionAbstract = require('./action-abstract');

/**
 * @param {Object} options
 * @param {String} appId
 * @extends ActionAbstract
 * @constructor
 */
function PushAppDeviceAdd(options, appId) {
    ActionAbstract.call(this, options);
    this._appId = appId || null;
}

PushAppDeviceAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} deviceId
 * @return {PushAppDeviceAdd|String}
 */
PushAppDeviceAdd.prototype.deviceId = function(deviceId) {
    return this.param('device_id', deviceId);
};

/**
 * @param  {String} type
 * @return {PushAppDeviceAdd|String}
 */
PushAppDeviceAdd.prototype.deviceType = function(type) {
    return this.param('device_type', type);
};

/**
 * @param  {String} email
 * @return {PushAppDeviceAdd|String}
 */
PushAppDeviceAdd.prototype.email = function(email) {
    return this.param('email', email);
};

/**
 * @param  {String} phoneNumber
 * @return {PushAppDeviceAdd|String}
 */
PushAppDeviceAdd.prototype.phoneNumber = function(phoneNumber) {
    return this.param('phone_number', phoneNumber);
};

/**
 * @param  {[String]} channels
 * @return {PushAppDeviceAdd|[String]}
 */
PushAppDeviceAdd.prototype.channels = function(channels) {
    return this.param('channels', channels);
};

/**
 * @param  {Object} additionalData
 * @return {PushAppDeviceAdd|Object}
 */
PushAppDeviceAdd.prototype.additionalData = function(additionalData) {
    return this.param('additional_data', additionalData);
};

/**
 * execute action
 * @return {Promise.<PushAppObject>}
 */
PushAppDeviceAdd.prototype.execute = function() {
    return this.request()
        .post('push/apps/' + this._appId + '/devices')
        .data(this.params())
        .execute();
};

module.exports = PushAppDeviceAdd;
