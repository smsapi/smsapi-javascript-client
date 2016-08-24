var ActionAbstract = require('./action-abstract');

/**
 * @param {Object} options
 * @param {String} appId
 * @param {String} eventId
 * @extends ActionAbstract
 * @constructor
 */
function PushAppAnalyticsEventGet(options, appId, eventId) {
    ActionAbstract.call(this, options);
    this._appId = appId || null;
    this._eventId = eventId || null;
}

PushAppAnalyticsEventGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * @return {Promise.<PushAppAnalyticsEventObject,Error>}
 */
PushAppAnalyticsEventGet.prototype.execute = function() {
    return this.request()
        .get('push/apps/' + String(this._appId) + '/analytics/events/' + String(this._eventId))
        .data(this.params())
        .execute();
};

module.exports = PushAppAnalyticsEventGet;
