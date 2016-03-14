var _ = require('lodash');
var ActionAbstract = require('./action-abstract');

/**
 * @see http://www.smsapi.pl/rest
 * @param {Object} options
 * @extends ActionAbstract
 * @constructor
 */
function MessageMms(options) {
    ActionAbstract.call(this, options);
}

MessageMms.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [number]
 * @return {MessageMms} or number
 */
MessageMms.prototype.to = function (number) {
    return this.param('to', number);
};

/**
 * @param  {String} [group]
 * @return {MessageMms} or group
 */
MessageMms.prototype.group = function (group) {
    return this.param('group', group);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageMms} or flag
 */
MessageMms.prototype.test = function (flag) {
    return this.param('test', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {Date} [date] or string/integer
 * @return {MessageMms} or date
 */
MessageMms.prototype.date = function (date) {
    if (_.isDate(date))
        return this.param('date', date.toISOString());
    else
        return this.param('date', date);
};

/**
 * @param  {String} [subject]
 * @return {MessageMms} or subject
 */
MessageMms.prototype.subject = function (subject) {
    return this.param('subject', subject);
};

/**
 * @param  {String} [smil]
 * @return {MessageMms} or smil
 */
MessageMms.prototype.smil = function (smil) {
    return this.param('smil', smil);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageMms} or flag
 */
MessageMms.prototype.checkIdx = function (flag) {
    return this.param('check_idx', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {String} [notifyUrl]
 * @return {MessageMms} or notifyUrl
 */
MessageMms.prototype.notifyUrl = function (notifyUrl) {
    return this.param('notify_url', notifyUrl);
};

/**
 * @return {Promise}
 */
MessageMms.prototype.execute = function () {
    return this.request()
        .path('mms.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = MessageMms;
