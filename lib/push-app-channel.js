var ActionFactoryAbstract = require('./action-factory-abstract');
var PushAppChannelList = require('./push-app-channel-list');
var PushAppChannelAdd = require('./push-app-channel-add');
var PushAppChannelUpdate = require('./push-app-channel-update');
var PushAppChannelGet = require('./push-app-channel-get');
var PushAppChannelDelete = require('./push-app-channel-delete');

/**
 * @typedef {Object} PushAppChannelObject
 * @property {String} id
 * @property {String} name
 * @property {String} device_count
 */

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function PushAppChannel(options) {
    ActionFactoryAbstract.call(this, options);
}

PushAppChannel.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @param {String} appId
 * @return {PushAppChannelList}
 */
PushAppChannel.prototype.list = function(appId) {
    return this.createAction(PushAppChannelList, appId);
};

/**
 * @param {String} appId
 * @param {String} channelId
 * @return {PushAppChannelGet}
 */
PushAppChannel.prototype.get = function(appId, channelId) {
    return this.createAction(PushAppChannelGet, appId, channelId);
};

/**
 * @param {String} appId
 * @return {PushAppChannelAdd}
 */
PushAppChannel.prototype.add = function(appId) {
    return this.createAction(PushAppChannelAdd, appId);
};

/**
 * @param {String} appId
 * @param {String} channelId
 * @return {PushAppChannelUpdate}
 */
PushAppChannel.prototype.update = function(appId, channelId) {
    return this.createAction(PushAppChannelUpdate, appId, channelId);
};

/**
 * @param {String} appId
 * @param {String} channelId
 * @return {PushAppChannelDelete}
 */
PushAppChannel.prototype.delete = function(appId, channelId) {
    return this.createAction(PushAppChannelDelete, appId, channelId);
};

module.exports = PushAppChannel;
