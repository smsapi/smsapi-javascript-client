
var _                     = require('lodash'),
    ActionFactoryAbstract = require('./action-factory-abstract.js'),
    ContactsList          = require('./contacts-list.js'),
    ContactsAdd           = require('./contacts-add.js'),
    ContactsGet           = require('./contacts-get.js'),
    ContactsUpdate        = require('./contacts-update.js'),
    ContactsDelete        = require('./contacts-delete.js'),

    // factory
    ContactsGroups        = require('./contacts-groups.js'),
    ContactsFields        = require('./contacts-fields.js');

/**
 * contacts v2
 * @see  http://dev.smsapi.pl/
 * @param {Options} options
 */
function Contacts(options){
    ActionFactoryAbstract.call(this, options);

    this.groups = new ContactsGroups(options);
    this.fields = new ContactsFields(options);
}

Contacts.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * get list of contacts
 * @see  http://dev.smsapi.pl/#!/contacts/list
 * @return {ContactsList}
 */
Contacts.prototype.list = function(){
    return this.createAction(ContactsList);
};

/**
 * add contact
 * @see  http://dev.smsapi.pl/#!/contacts/create
 * @return {ContactsAdd}
 */
Contacts.prototype.add = function(){
    return this.createAction(ContactsAdd);
};

/**
 * get contact
 * @see  http://dev.smsapi.pl/#!/contacts/get
 * @param {String} id
 * @return {ContactsGet}
 */
Contacts.prototype.get = function(id){
    return this.createAction(ContactsGet, id);
};

/**
 * update contact
 * @see  http://dev.smsapi.pl/#!/contacts/edit
 * @param {String} id
 * @return {ContactsUpdate}
 */
Contacts.prototype.update = function(id){
    return this.createAction(ContactsUpdate, id);
};

/**
 * delete contact
 * @see  http://dev.smsapi.pl/#!/contacts/delete
 * @param {String} id
 * @return {ContactsDelete}
 */
Contacts.prototype.delete = function(id){
    return this.createAction(ContactsDelete, id);
};

module.exports = Contacts;
