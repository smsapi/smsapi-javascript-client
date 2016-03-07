
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * create new custom field
 * @see  http://dev.smsapi.pl/#!/contacts%2Ffields/create
 * @param {Object} options
 */
function ContactsFieldsAdd(options){
    ActionAbstract.call(this, options);
}

ContactsFieldsAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set name
 * @param  {String} [name]
 * @return {ContactsFieldsAdd} or {String}
 */
ContactsFieldsAdd.prototype.name = function(name){
    return this.param('name', name);
};

/**
 * get/set type
 * possible values:
 * - text (default)
 * - date
 * - email
 * - phone_number
 * - number
 * @param  {String} [type]
 * @return {ContactsFieldsAdd} or {String}
 */
ContactsFieldsAdd.prototype.type = function(type){
    return this.param('type', type);
};

/**
 * execute
 * @return {Promise}
 */
ContactsFieldsAdd.prototype.execute = function(){
    return this.request()
        .post('contacts/fields')
        .data(this.params())
        .execute();
};

module.exports = ContactsFieldsAdd;
