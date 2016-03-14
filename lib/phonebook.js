var PhonebookGroup = require('./phonebook-group');
var PhonebookContact = require('./phonebook-contact');

/**
 * phonebook v1
 * @deprecated
 * @param {Object} options
 * @constructor
 */
function Phonebook(options) {
    this.group = new PhonebookGroup(options);
    this.contact = new PhonebookContact(options);
}

module.exports = Phonebook;
