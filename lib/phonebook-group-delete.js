var _ = require('lodash');
var ActionAbstract = require('./action-abstract');

/**
 * delete group
 * @param {Object} options
 * @param {String} name
 * @extends ActionAbstract
 * @constructor
 */
function PhonebookGroupDelete(options, name) {
    ActionAbstract.call(this, options);
    this.name(name);
}

PhonebookGroupDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set name
 * @param  {String} [name]
 * @return {PhonebookGroupDelete|String}
 */
PhonebookGroupDelete.prototype.name = function (name) {
    return this.param('delete_group', name);
};

/**
 * get/set removeContacts
 * @param  {Boolean} [flag]
 * @return {PhonebookGroupDelete|Boolean}
 */
PhonebookGroupDelete.prototype.removeContacts = function (flag) {
    return this.param('remove_contacts', _.isUndefined(flag) ? '1' : flag);
};

/**
 * execute action
 * @return {Promise}
 */
PhonebookGroupDelete.prototype.execute = function () {
    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = PhonebookGroupDelete;
