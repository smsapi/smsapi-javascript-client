var _ = require('lodash');
var ActionAbstract = require('./action-abstract');

/**
 * @see http://www.smsapi.pl/rest
 * @param {Object} options
 * @extends ActionAbstract
 * @constructor
 */
function MessageVms(options) {
    ActionAbstract.call(this, options);
    this._file = null;
}

MessageVms.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [number]
 * @return {MessageVms|String}
 */
MessageVms.prototype.to = function (number) {
    return this.param('to', number);
};

/**
 * @param  {String} [number]
 * @return {MessageVms|String}
 */
MessageVms.prototype.from = function (number) {
    return this.param('from', number);
};

/**
 * @param  {String} [tts]
 * @return {MessageVms|String}
 */
MessageVms.prototype.tts = function (tts) {
    return this.param('tts', tts);
};

/**
 * @param  {String} [file] path to local file
 * @return {MessageVms|String}
 */
MessageVms.prototype.localFile = function (file) {
    if (_.isUndefined(file))
        return this._file;

    this._file = file;
    return this;
};

/**
 * @param  {String} [file] link to external file
 * @return {MessageVms|String}
 */
MessageVms.prototype.remoteFile = function (file) {
    return this.param('file', file);
};

/**
 * @param  {String} [group]
 * @return {MessageVms|String}
 */
MessageVms.prototype.group = function (group) {
    return this.param('group', group);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageVms|Boolean}
 */
MessageVms.prototype.test = function (flag) {
    return this.param('test', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {Date} [date] or string/integer
 * @return {MessageVms|Date}
 */
MessageVms.prototype.date = function (date) {
    if (_.isDate(date))
        return this.param('date', date.toISOString());
    else
        return this.param('date', date);
};

/**
 * @param  {Number} [number]
 * @return {MessageVms|Number}
 */
MessageVms.prototype.try = function (number) {
    return this.param('try', number);
};

/**
 * @param  {Number} [number]
 * @return {MessageVms|Number}
 */
MessageVms.prototype.interval = function (number) {
    return this.param('interval', number);
};

/**
 * @param  {String} [lector]
 * @return {MessageVms|String}
 */
MessageVms.prototype.ttsLector = function (lector) {
    return this.param('tts_lector', lector);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageVms|Boolean}
 */
MessageVms.prototype.checkIdx = function (flag) {
    return this.param('check_idx', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {String} [notifyUrl]
 * @return {MessageVms|String}
 */
MessageVms.prototype.notifyUrl = function (notifyUrl) {
    return this.param('notify_url', notifyUrl);
};

/**
 * @return {Promise}
 */
MessageVms.prototype.execute = function () {
    var request = this.request()
        .path('vms.do')
        .data(this.params())
        .json();

    if (this._file)
        request.file(this._file);

    return request.execute();
};

module.exports = MessageVms;
