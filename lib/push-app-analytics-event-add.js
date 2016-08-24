var ActionAbstract = require('./action-abstract');
var _ = require('lodash');

/**
 * @param {Object} options
 * @param {String} appId
 * @extends ActionAbstract
 * @constructor
 */
function PushAppAnalyticsEventAdd(options, appId) {
    ActionAbstract.call(this, options);
    this._appId = appId || null;
}

PushAppAnalyticsEventAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} name
 * @return {PushAppAnalyticsEventAdd|String}
 */
PushAppAnalyticsEventAdd.prototype.name = function(name) {
    return this.param('name', name);
};

/**
 * @param  {String} label
 * @return {PushAppAnalyticsEventAdd|String}
 */
PushAppAnalyticsEventAdd.prototype.label = function(label) {
    return this.param('label', label);
};

/**
 * @param  {{latitude: Number, longitude: Number}} location
 * @return {PushAppAnalyticsEventAdd|String}
 */
PushAppAnalyticsEventAdd.prototype.location = function(location) {
    return this.param('location', location);
};

/**
 * always converts and returns Date to ISO8601
 * @param  {Date|String} at
 * @return {PushAppAnalyticsEventAdd|String}
 */
PushAppAnalyticsEventAdd.prototype.at = function(at) {
    if (_.isDate(at)) {
        return this.param('at', at.toISOString());
    }

    return this.param('at', at);
};

/**
 * execute action
 * @return {Promise.<PushAppAnalyticsEventObject>}
 */
PushAppAnalyticsEventAdd.prototype.execute = function() {
    return this.request()
        .post('push/apps/' + this._appId + '/analytics/events')
        .data(this.params())
        .execute();
};

module.exports = PushAppAnalyticsEventAdd;
