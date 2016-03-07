
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * send sms message
 * @see http://www.smsapi.pl/rest
 * @param {Object} options
 */
function MessageSms(options){
    ActionAbstract.call(this, options);
}

MessageSms.prototype = Object.create(ActionAbstract.prototype);

MessageSms.prototype.defaultParams = {
    encoding: 'utf-8'
};

/**
 * set from=Eco
 * @return {MessageSms}
 */
MessageSms.prototype.eco = function(){
    return this.param('from', 'Eco');
};

/**
 * @param  {String} [from]
 * @return {MessageSms} or from
 */
MessageSms.prototype.from = function(from){
    return this.param('from', from);
};

/**
 * @param  {String} [number]
 * @return {MessageSms} or number
 */
MessageSms.prototype.to = function(number){
    return this.param('to', number);
};

/**
 * @param  {String} [from]
 * @return {MessageSms} or from
 */
MessageSms.prototype.group = function(group){
    return this.param('group', group);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageSms} or flag
 */
MessageSms.prototype.test = function(flag){
    return this.param('test', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageSms} or flag
 */
MessageSms.prototype.skipForeign = function(flag){
    return this.param('skip_foreign', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageSms} or flag
 */
MessageSms.prototype.flash = function(flag){
    return this.param('flash', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageSms} or flag
 */
MessageSms.prototype.details = function(flag){
    return this.param('details', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageSms} or flag
 */
MessageSms.prototype.dateValidate = function(flag){
    return this.param('date_validate', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {Date} [date] or string/integer
 * @return {MessageSms} or date
 */
MessageSms.prototype.date = function(date){
    if (_.isDate(date))
        return this.param('date', date.toISOString());
    else
        return this.param('date', date);
};

/**
 * @param  {String} [message]
 * @return {MessageSms} or message
 */
MessageSms.prototype.message = function(message){
    return this.param('message', message);
};

/**
 * @param  {String} [dataEncoding]
 * @return {MessageSms} or dataEncoding
 */
MessageSms.prototype.dataEncoding = function(dataEncoding){
    return this.param('dataencoding', dataEncoding);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageSms} or flag
 */
MessageSms.prototype.skipForeign = function(flag){
    return this.param('skip_foreign', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {String} [idx]
 * @return {MessageSms} or idx
 */
MessageSms.prototype.idx = function(idx){
    return this.param('idx', idx);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageSms} or flag
 */
MessageSms.prototype.checkIdx = function(flag){
    return this.param('check_idx', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageSms} or flag
 */
MessageSms.prototype.normalize = function(flag){
    return this.param('normalize', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {Boolean} [flag]
 * @return {MessageSms} or flag
 */
MessageSms.prototype.fast = function(flag){
    return this.param('fast', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @param  {String} [partnerId]
 * @return {MessageSms} or partnerId
 */
MessageSms.prototype.partnerId = function(partnerId){
    return this.param('partner_id', partnerId);
};

/**
 * @param  {String} [maxParts]
 * @return {MessageSms} or maxParts
 */
MessageSms.prototype.maxParts = function(maxParts){
    return this.param('max_parts', maxParts);
};

/**
 * @param  {Date} [expirationDate] or string/integer
 * @return {MessageSms} or expirationDate
 */
MessageSms.prototype.expirationDate = function(expirationDate){
    return this.param('expiration_date', expirationDate);
};

/**
 * @param  {String} [discountGroup]
 * @return {MessageSms} or discountGroup
 */
MessageSms.prototype.discountGroup = function(discountGroup){
    return this.param('discount_group', discountGroup);
};

/**
 * @param  {String} [notifyUrl]
 * @return {MessageSms} or notifyUrl
 */
MessageSms.prototype.notifyUrl = function(notifyUrl){
    return this.param('notify_url', notifyUrl);
};

/**
 * @return {Promise}
 */
MessageSms.prototype.execute = function(){
    return this.request()
        .path('sms.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = MessageSms;
