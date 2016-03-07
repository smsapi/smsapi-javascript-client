
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * delete message using acquired idx
 * @see http://www.smsapi.pl/rest
 * @param {Object} options
 * @param {String} id
 */
function MessageDelete(options, id){
    ActionAbstract.call(this, options);
    this.id(id);
}

MessageDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [id]
 * @return {MessageDelete} or idx
 */
MessageDelete.prototype.id = function(id){
    return this.param('sch_del', id);
};

/**
 * @return {Promise}
 */
MessageDelete.prototype.execute = function(){
    return this.request()
        .path('sms.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = MessageDelete;
