var ActionFactoryAbstract = require('./action-factory-abstract');
var PushAppDevice = require('./push-app-device');
var PushAppChannel = require('./push-app-channel');
var PushAppAnalytics = require('./push-app-analytics');
var PushAppList = require('./push-app-list');
var PushAppAdd = require('./push-app-add');
var PushAppUpdate = require('./push-app-update');
var PushAppGet = require('./push-app-get');
var PushAppDelete = require('./push-app-delete');

/**
 * @typedef {Object} PushAppObject
 * @property {String} id
 * @property {String} name
 * @property {String} environment
 */

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function PushApp(options) {
    ActionFactoryAbstract.call(this, options);
    this.device = new PushAppDevice(options);
    this.channel = new PushAppChannel(options);
    this.analytics = new PushAppAnalytics(options);
}

PushApp.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @return {PushAppDeviceList}
 */
PushApp.prototype.list = function() {
    return this.createAction(PushAppList);
};

/**
 * @param {String} appId
 * @return {PushAppGet}
 */
PushApp.prototype.get = function(appId) {
    return this.createAction(PushAppGet, appId);
};

/**
 * @return {PushAppAdd}
 */
PushApp.prototype.add = function() {
    return this.createAction(PushAppAdd);
};

/**
 *
 * @param {String} id
 * @return {PushAppUpdate}
 */
PushApp.prototype.update = function(id) {
    return this.createAction(PushAppUpdate, id);
};

/**
 * @param {String} appId
 * @return {PushAppDelete}
 */
PushApp.prototype.delete = function(appId) {
    return this.createAction(PushAppDelete, appId);
};

module.exports = PushApp;
