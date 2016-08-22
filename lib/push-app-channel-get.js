var ActionAbstract = require('./action-abstract');

/**
 * @param {Object} options
 * @param {String} appId
 * @param {String} channelId
 * @extends ActionAbstract
 * @constructor
 */
function PushAppChannelGet(options, appId, channelId) {
    ActionAbstract.call(this, options);
    this._appId = appId || null;
    this._channelId = channelId || null;
}

PushAppChannelGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * execute action
 * @return {Promise.<PushAppDeviceObject,Error>}
 */
PushAppChannelGet.prototype.execute = function() {
    return this.request()
        .get('push/apps/' + String(this._appId) + '/channels/' + String(this._channelId))
        .data(this.params())
        .execute();
};

module.exports = PushAppChannelGet;
