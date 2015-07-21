
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

function PhonebookContactList(options){
    ActionAbstract.call(this, options);
}

PhonebookContactList.prototype = Object.create(ActionAbstract.prototype);

/**
 * @return {Promise}
 */
PhonebookContactList.prototype.execute = function(){
    this.param('list_contacts', '1'); // force param

    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = PhonebookContactList;
