var ActionAbstract = require('./action-abstract');

/**
 * @param {Object} options
 * @param {String} appId
 * @param {String} channelId
 * @extends ActionAbstract
 * @constructor
 */
function PushAppChannelDelete(options, appId, channelId) {
    ActionAbstract.call(this, options);
    this._appId = appId || null;
    this._channelId = channelId || null;
}

PushAppChannelDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * execute action
 * @return {Promise}
 */
PushAppChannelDelete.prototype.execute = function() {
    return this.request()
        .delete('push/apps/' + String(this._appId) + '/channels/' + String(this._channelId))
        .execute();
};

module.exports = PushAppChannelDelete;
