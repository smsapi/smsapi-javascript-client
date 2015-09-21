
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

/**
 * @see http://www.smsapi.pl/rest
 * @param {Object} options
 */
function MessageVms(options){
    ActionAbstract.call(this, options);
    this._file = null;
}

MessageVms.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [number]
 * @return {MessageVms} or number
 */
MessageVms.prototype.to = function(number){
    return this.param('to', number);
};

/**
 * @param  {String} [number]
 * @return {MessageVms} or number
 */
MessageVms.prototype.from = function(number){
    return this.param('from', number);
};

/**
 * @param  {String} [tts]
 * @return {MessageVms} or tts
 */
MessageVms.prototype.tts = function(tts){
    return this.param('tts', tts);
};

/**
 * @param  {String} [file] path to local file
 * @return {MessageVms} or file
 */
MessageVms.prototype.localFile = function(file){
    if (_.isUndefined(file))
        return this._file;

    this._file = file;
    return this;
};

/**
 * @param  {String} [file] link to external file
 * @return {MessageVms} or file
 */
MessageVms.prototype.remoteFile = function(file){
    return this.param('file', file);
};

/**
 * @param  {String} [group]
 * @return {MessageVms} or group
 */
MessageVms.prototype.group = function(group){
    return this.param('group', group);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageVms} or flag
 */
MessageVms.prototype.test = function(flag){
    return this.param('test', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {Date} [date] or string/integer
 * @return {MessageVms} or date
 */
MessageVms.prototype.date = function(date){
    if (_.isDate(date))
        return this.param('date', date.toISOString());
    else
        return this.param('date', date);
};

/**
 * @param  {Integer} [number]
 * @return {MessageVms} or number
 */
MessageVms.prototype.try = function(number){
    return this.param('try', number);
};

/**
 * @param  {Integer} [number]
 * @return {MessageVms} or number
 */
MessageVms.prototype.interval = function(number){
    return this.param('interval', number);
};

/**
 * @param  {String} [lector]
 * @return {MessageVms} or lector
 */
MessageVms.prototype.ttsLector = function(lector){
    return this.param('tts_lector', lector);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageVms} or flag
 */
MessageVms.prototype.checkIdx = function(flag){
    return this.param('check_idx', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {String} [notifyUrl]
 * @return {MessageVms} or notifyUrl
 */
MessageVms.prototype.notifyUrl = function(notifyUrl){
    return this.param('notify_url', notifyUrl);
};

/**
 * @return {Promise}
 */
MessageVms.prototype.execute = function(){
    var request = this.request()
        .path('vms.do')
        .data(this.params())
        .json();

    if (this._file)
        request.file(this._file);

    return request.execute();
};

module.exports = MessageVms;
