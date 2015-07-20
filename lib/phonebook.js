
var PhonebookGroup   = require('./phonebook-group.js'),
    PhonebookContact = require('./phonebook-contact.js');

/**
 * phonebook v1
 * @deprecated
 * @param {Object} options
 */
function Phonebook(options){
    this.group   = new PhonebookGroup(options);
    this.contact = new PhonebookContact(options);
}

module.exports = Phonebook;
