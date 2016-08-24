var ActionFactoryAbstract = require('./action-factory-abstract');
var PushAppAnalyticsEvent = require('./push-app-analytics-event');

/**
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function PushAppAnalytics(options) {
    ActionFactoryAbstract.call(this, options);
    this.event = new PushAppAnalyticsEvent(options);
}

PushAppAnalytics.prototype = Object.create(ActionFactoryAbstract.prototype);

module.exports = PushAppAnalytics;
