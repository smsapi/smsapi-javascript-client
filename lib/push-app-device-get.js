var _ = require('lodash');
var ActionAbstract = require('./action-abstract');

/**
 * @param {Object} options
 * @param {String} appId
 * @param {String} deviceId
 * @extends ActionAbstract
 * @constructor
 */
function PushAppDeviceGet(options, appId, deviceId) {
    ActionAbstract.call(this, options);
    this._appId = appId || null;
    this._deviceId = deviceId || null;
}

PushAppDeviceGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * execute action
 * @return {Promise.<PushAppDeviceObject,Error>}
 */
PushAppDeviceGet.prototype.execute = function() {
    return this.request()
        .get('push/apps/' + String(this._appId) + '/devices/' + String(this._deviceId))
        .data(this.params())
        .execute();
};

module.exports = PushAppDeviceGet;
