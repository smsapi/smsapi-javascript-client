
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * perform hlr check
 * note that it's async check and result will be returned
 * in the callback request (separate POST request from SMSAPI to the server)
 * for further details please refer to the SMSAPI documentation
 * @see http://www.smsapi.pl/rest
 * @param {Object} options
 */
function HlrCheck(options){
    ActionAbstract.call(this, options);
}

HlrCheck.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [idx]
 * @return {HlrCheck} or idx
 */
HlrCheck.prototype.idx = function(idx){
    return this.param('idx', idx);
};

/**
 * @param  {String} [number]
 * @return {HlrCheck} or number
 */
HlrCheck.prototype.number = function(number){
    return this.param('number', number);
};

/**
 * @return {Promise}
 */
HlrCheck.prototype.execute = function(){
    return this.request()
        .path('hlr.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = HlrCheck;
