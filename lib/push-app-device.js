var ActionFactoryAbstract = require('./action-factory-abstract');
var PushAppDeviceList = require('./push-app-device-list');
var PushAppDeviceAdd = require('./push-app-device-add');
var PushAppDeviceUpdate = require('./push-app-device-update');
var PushAppDeviceGet = require('./push-app-device-get');
var PushAppDeviceDelete = require('./push-app-device-delete');

/**
 * @typedef {Object} PushAppDeviceObject
 * @property {String} device_id
 * @property {String} device_type
 * @property {Array} channels
 * @property {String} email
 * @property {String} phone_number
 * @property {Array} additional_data
 */

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function PushAppDevice(options) {
    ActionFactoryAbstract.call(this, options);
}

PushAppDevice.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @param {String} appId
 * @return {PushAppDeviceList}
 */
PushAppDevice.prototype.list = function(appId) {
    return this.createAction(PushAppDeviceList, appId);
};

/**
 * @param {String} appId
 * @param {String} deviceId
 * @return {PushAppDeviceGet}
 */
PushAppDevice.prototype.get = function(appId, deviceId) {
    return this.createAction(PushAppDeviceGet, appId, deviceId);
};

/**
 * @param {String} appId
 * @return {PushAppDeviceAdd}
 */
PushAppDevice.prototype.add = function(appId) {
    return this.createAction(PushAppDeviceAdd, appId);
};

/**
 * @param {String} appId
 * @param {String} [deviceId]
 * @return {PushAppDeviceUpdate}
 */
PushAppDevice.prototype.addOrUpdate = function(appId, deviceId) {
    return this.update.apply(this, arguments);
};

/**
 * @param {String} appId
 * @param {String} deviceId
 * @return {PushAppDeviceUpdate}
 */
PushAppDevice.prototype.update = function(appId, deviceId) {
    return this.createAction(PushAppDeviceUpdate, appId, deviceId);
};

/**
 * @param {String} appId
 * @param {String} deviceId
 * @return {PushAppDeviceDelete}
 */
PushAppDevice.prototype.delete = function(appId, deviceId) {
    return this.createAction(PushAppDeviceDelete, appId, deviceId);
};

module.exports = PushAppDevice;
