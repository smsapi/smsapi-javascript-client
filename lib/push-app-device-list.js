var ActionAbstract = require('./action-abstract');

/**
 * @typedef {Object} PushAppDeviceListResponse
 * @property {Number} size
 * @property {Array} collection
 */

/**
 *
 * @param [options]
 * @param {String} appId
 * @extends ActionAbstract
 * @constructor
 */
function PushAppDeviceList(options, appId) {
    ActionAbstract.call(this, options);
    this._appId = appId || null;
}

PushAppDeviceList.prototype = Object.create(ActionAbstract.prototype);

/**
 * @return {Promise.<PushAppDeviceListResponse>}
 */
PushAppDeviceList.prototype.execute = function() {
    return this.request()
        .get('push/apps/' + String(this._appId) + '/devices')
        .execute();
};

module.exports = PushAppDeviceList;
