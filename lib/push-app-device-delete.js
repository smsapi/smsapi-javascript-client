var ActionAbstract = require('./action-abstract');

/**
 * @param {Object} options
 * @param {String} appId
 * @param {String} deviceId
 * @extends ActionAbstract
 * @constructor
 */
function PushAppDeviceDelete(options, appId, deviceId) {
    ActionAbstract.call(this, options);
    this._appId = appId || null;
    this._deviceId = deviceId || null;
}

PushAppDeviceDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * execute action
 * @return {Promise}
 */
PushAppDeviceDelete.prototype.execute = function() {
    return this.request()
        .delete('push/apps/' + String(this._appId) + '/devices/' + String(this._deviceId))
        .execute();
};

module.exports = PushAppDeviceDelete;
