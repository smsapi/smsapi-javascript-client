
var _                         = require('lodash'),
    ActionFactoryAbstract     = require('./action-factory-abstract.js'),
    ContactsFieldsList        = require('./contacts-fields-list.js'),
    ContactsFieldsAdd         = require('./contacts-fields-add.js'),
    ContactsFieldsUpdate      = require('./contacts-fields-update.js'),
    ContactsFieldsDelete      = require('./contacts-fields-delete.js');

function ContactsFields(options){
    ActionFactoryAbstract.call(this, options);
}

ContactsFields.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * get list of fields
 * @see http://dev.smsapi.pl/#!/contacts%2Ffields/list
 * @return {ContactsFieldsList}
 */
ContactsFields.prototype.list = function(){
    return this.createAction(ContactsFieldsList);
};

/**
 * create new custom field
 * @see  http://dev.smsapi.pl/#!/contacts%2Ffields/create
 * @return {ContactsFieldsAdd}
 */
ContactsFields.prototype.add = function(){
    return this.createAction(ContactsFieldsAdd);
};

/**
 * update field
 * @see  http://dev.smsapi.pl/#!/contacts%2Ffields/create
 * @param {String} fieldId
 * @return {ContactsFieldsUpdate}
 */
ContactsFields.prototype.update = function(fieldId){
    return this.createAction(ContactsFieldsUpdate, fieldId);
};

/**
 * delete field
 * @see  http://dev.smsapi.pl/#!/contacts%2Ffields/delete
 * @param {String} fieldId
 * @return {ContactsFieldsDelete}
 */
ContactsFields.prototype.delete = function(fieldId){
    return this.createAction(ContactsFieldsDelete, fieldId);
};

module.exports = ContactsFields;
