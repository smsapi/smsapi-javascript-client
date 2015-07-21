
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

/**
 * delete group
 * @param {Object} options
 * @param {String} name
 */
function PhonebookGroupDelete(options, name){
    ActionAbstract.call(this, options);
    this.name(name);
}

PhonebookGroupDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set name
 * @param  {String} [name]
 * @return {PhonebookGroupDelete} or {String}
 */
PhonebookGroupDelete.prototype.name = function(name){
    return this.param('delete_group', name);
};

/**
 * get/set removeContacts
 * @param  {Boolean} [removeContacts]
 * @return {PhonebookGroupDelete} or {Boolean}
 */
PhonebookGroupDelete.prototype.removeContacts = function(flag){
    return this.param('remove_contacts', _.isUndefined(flag) ? '1' : flag);
};

/**
 * execute action
 * @return {Promise}
 */
PhonebookGroupDelete.prototype.execute = function(){
    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = PhonebookGroupDelete;
