
var _                       = require('lodash'),
    ActionFactoryAbstract   = require('./action-factory-abstract.js'),
    PhonebookContactList    = require('./phonebook-contact-list.js'),
    PhonebookContactAdd     = require('./phonebook-contact-add.js'),
    PhonebookContactGet     = require('./phonebook-contact-get.js'),
    PhonebookContactUpdate  = require('./phonebook-contact-update.js'),
    PhonebookContactDelete  = require('./phonebook-contact-delete.js');

function PhonebookContact(options){
    ActionFactoryAbstract.call(this, options);
}

PhonebookContact.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * get info about phonebook contact
 * @param  {String} number
 * @return {PhonebookContactGet}
 */
PhonebookContact.prototype.get = function(number){
    return this.createAction(PhonebookContactGet, number);
};

/**
 * add phonebook contact
 * @returns {PhonebookContactAdd}
 */
PhonebookContact.prototype.add = function(){
    return this.createAction(PhonebookContactAdd);
};

/**
 * udate phonebook contact
 * @param  {String} number
 * @return {PhonebookContactUpdate}
 */
PhonebookContact.prototype.update = function(number){
    return this.createAction(PhonebookContactUpdate, number);
};

/**
 * delete phonebook contact
 * @param  {String} number
 * @return {PhonebookContactDelete}
 */
PhonebookContact.prototype.delete = function(number){
    return this.createAction(PhonebookContactDelete, number);
};

/**
 * get list of phonebook contacts
 * @return {PhonebookContactList}
 */
PhonebookContact.prototype.list = function(){
    return this.createAction(PhonebookContactList);
};

module.exports = PhonebookContact;
