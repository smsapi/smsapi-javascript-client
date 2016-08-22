var ActionAbstract = require('./action-abstract.js');

/**
 * @param {Object} options
 * @param {String} appId
 * @param {String} channelId
 * @extends ActionAbstract
 * @constructor
 */
function PushAppChannelUpdate(options, appId, channelId) {
    ActionAbstract.call(this, options);
    this._appId = appId || null;
    this._channelId = channelId || null;
}

PushAppChannelUpdate.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} name
 * @return {PushAppChannelUpdate|String}
 */
PushAppChannelUpdate.prototype.name = function(name) {
    return this.param('name', name);
};

/**
 * @return {Promise.<PushAppDeviceObject>}
 */
PushAppChannelUpdate.prototype.execute = function() {
    return this.request()
        .put('push/apps/' + String(this._appId) + '/channels/' + String(this._channelId))
        .data(this.params())
        .execute();
};

module.exports = PushAppChannelUpdate;
