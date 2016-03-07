
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * update field
 * @see  http://dev.smsapi.pl/#!/contacts%2Ffields/create
 * @param {Options} options
 * @param {String} id
 */
function ContactsFieldsUpdate(options, id){
    ActionAbstract.call(this, options);
    this._id = id || null;
}

ContactsFieldsUpdate.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set id
 * @param  {String} [id]
 * @return {ContactsFieldsUpdate} or {String}
 */
ContactsFieldsUpdate.prototype.id = function(id){
    if (_.isUndefined(id))
        return this._id;

    this._id = id;
    return this;
};

/**
 * get/set name
 * @param  {String} [name]
 * @return {ContactsFieldsUpdate} or {String}
 */
ContactsFieldsUpdate.prototype.name = function(name){
    return this.param('name', name);
};

/**
 * execute
 * @return {Promise}
 */
ContactsFieldsUpdate.prototype.execute = function(){
    return this.request()
        .put('contacts/fields/' + String(this._id))
        .data(this.params())
        .execute();
};

module.exports = ContactsFieldsUpdate;
