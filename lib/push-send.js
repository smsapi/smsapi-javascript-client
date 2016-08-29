var ActionAbstract = require('./action-abstract');
var _ = require('lodash');

/**
 * @typedef {Object} PushSendResponseObject
 * @property {String} id
 * @property {String} status
 * @property {String} date_created
 * @property {String} scheduled_date
 *
 * @property {{
 *     alert: String,
 * }} payload
 *
 * @property {{
 *     id: String,
 *     name: String,
 *     summary: {
 *         recipients_count: Number,
 *         points: Number,
 *         error_code: Number|null
 *     }
 * }} app
 *
 * @property {{
 *     recipients_count: Number,
 *     points: Number,
 *     error_code: String
 * }} summary
 *
 * @property {{
 *     channels: Array,
 *     device_ids: Array,
 *     device_type: Array
 * }} dispatch_details
 *
 * @property {{
 *   id: String,
 *   message: String,
 *   from: String,
 *   delay: Number,
 *   status: String
 * }} fallback
 */

/**
 * @see http://www.smsapi.pl/rest
 * @param {Object} options
 * @extends ActionAbstract
 * @constructor
 */
function PushSend(options) {
    ActionAbstract.call(this, options);
}

PushSend.prototype = Object.create(ActionAbstract.prototype);

PushSend.prototype.defaultParams = {
    data: {}
};

/**
 * @param  {String} [appId]
 * @return {PushSend|String}
 */
PushSend.prototype.appId = function (appId) {
    return this.param('app_id', appId);
};

/**
 * array of channel names
 * @param  {[String]} [channels]
 * @return {PushSend|String}
 */
PushSend.prototype.channels = function (channels) {
    return this.param('channels', channels);
};

/**
 * @param  {[String]} [deviceIds]
 * @return {PushSend|String}
 */
PushSend.prototype.deviceIds = function (deviceIds) {
    return this.param('device_ids', deviceIds);
};

/**
 * device types (android, ios, osx, windows, etc.)
 * @param  {[String]} [deviceTypes]
 * @return {PushSend|[String]}
 */
PushSend.prototype.deviceTypes = function (deviceTypes) {
    return this.param('device_type', deviceTypes);
};

/**
 * @param  {Object} [data]
 * @return {PushSend|Object}
 */
PushSend.prototype.data = function (data) {
    return this.param('data', data);
};

/**
 * The notification's message
 * @param  {String} [alert]
 * @return {PushSend|String}
 */
PushSend.prototype.alert = function (alert) {
    var data = this.param('data');

    if (!_.isUndefined(alert)){
        data.alert = alert;
        return this;
    }

    return data.alert || '';
};

/**
 * (iOS only) the value visible in the top right corner of the app icon. Can be set to a specific value or to 'increment'
 * @param  {String|Number} [badge]
 * @return {PushSend|String|Number}
 */
PushSend.prototype.badge = function (badge) {
    var data = this.param('data');

    if (!_.isUndefined(badge)){
        data.badge = badge;
        return this;
    }

    return data.badge || '';
};

/**
 * (iOS only) the name of a sound file to play from the application bundle
 * @param  {String} [sound]
 * @return {PushSend|String}
 */
PushSend.prototype.sound = function (sound) {
    var data = this.param('data');

    if (!_.isUndefined(sound)){
        data.sound = sound;
        return this;
    }

    return data.sound || '';
};

/**
 * (Android only) text displayed in the Android notification's title section
 * @param  {String} [title]
 * @return {PushSend|String}
 */
PushSend.prototype.title = function (title) {
    var data = this.param('data');

    if (!_.isUndefined(title)){
        data.title = title;
        return this;
    }

    return data.title || '';
};

/**
 * (Android only) will open an Activity associated with this uri
 * @param  {String} [uri]
 * @return {PushSend|String}
 */
PushSend.prototype.uri = function (uri) {
    var data = this.param('data');

    if (!_.isUndefined(uri)){
        data.uri = uri;
        return this;
    }

    return data.uri || '';
};

/**
 * @return {Promise.<PushSendResponseObject>}
 */
PushSend.prototype.execute = function () {
    return this.request()
        .post('push')
        .data(this.params())
        .execute();
};

module.exports = PushSend;
