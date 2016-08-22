var ActionAbstract = require('./action-abstract');

/**
 * @typedef {Object} PushAppChannelListResponse
 * @property {Number} size
 * @property {[PushAppChannelObject]} collection
 */

/**
 *
 * @param [options]
 * @param {String} appId
 * @extends ActionAbstract
 * @constructor
 */
function PushAppChannelList(options, appId) {
    ActionAbstract.call(this, options);
    this._appId = appId || null;
}

PushAppChannelList.prototype = Object.create(ActionAbstract.prototype);

/**
 * @return {Promise.<PushAppChannelListResponse>}
 */
PushAppChannelList.prototype.execute = function() {
    return this.request()
        .get('push/apps/' + String(this._appId) + '/channels')
        .execute();
};

module.exports = PushAppChannelList;
