var ActionAbstract = require('./action-abstract');

/**
 * @typedef {Object} PushAppAnalyticsEventListResponse
 * @property {Number} size
 * @property {[PushAppAnalyticsEventObject]} collection
 */

/**
 *
 * @param [options]
 * @param {String} appId
 * @extends ActionAbstract
 * @constructor
 */
function PushAppAnalyticsEventList(options, appId) {
    ActionAbstract.call(this, options);
    this._appId = appId || null;
}

PushAppAnalyticsEventList.prototype = Object.create(ActionAbstract.prototype);

/**
 * @return {Promise.<PushAppAnalyticsEventListResponse>}
 */
PushAppAnalyticsEventList.prototype.execute = function() {
    return this.request()
        .get('push/apps/' + String(this._appId) + '/analytics/events')
        .execute();
};

module.exports = PushAppAnalyticsEventList;
