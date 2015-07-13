
var PhonebookGroup   = require('./phonebook-group.js'),
    PhonebookContact = require('./phonebook-contact.js');

function Phonebook(options){
    this.group   = new PhonebookGroup(options);
    this.contact = new PhonebookContact(options);
}

module.exports = Phonebook;
