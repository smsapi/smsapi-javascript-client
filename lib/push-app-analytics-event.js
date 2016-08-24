var ActionFactoryAbstract = require('./action-factory-abstract');
var PushAppAnalyticsEventList = require('./push-app-analytics-event-list');
var PushAppAnalyticsEventAdd = require('./push-app-analytics-event-add');
var PushAppAnalyticsEventGet = require('./push-app-analytics-event-get');

/**
 * @typedef {Object} PushAppAnalyticsEventObject
 * @property {String} id
 * @property {String} app_id
 * @property {String} push_id
 * @property {String} name
 * @property {String} label
 * @property {String} at
 * @property {{latitude: Number, longitude: Number}} location
 * @property {Array} metadata
 */

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function PushAppAnalyticsEvent(options) {
    ActionFactoryAbstract.call(this, options);
}

PushAppAnalyticsEvent.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @param {String} appId
 * @return {PushAppAnalyticsEventList}
 */
PushAppAnalyticsEvent.prototype.list = function(appId) {
    return this.createAction(PushAppAnalyticsEventList, appId);
};

/**
 * @param {String} appId
 * @param {String} eventId
 * @return {PushAppAnalyticsEventGet}
 */
PushAppAnalyticsEvent.prototype.get = function(appId, eventId) {
    return this.createAction(PushAppAnalyticsEventGet, appId, eventId);
};

/**
 * @param {String} appId
 * @return {PushAppAnalyticsEventAdd}
 */
PushAppAnalyticsEvent.prototype.add = function(appId) {
    return this.createAction(PushAppAnalyticsEventAdd, appId);
};

module.exports = PushAppAnalyticsEvent;
