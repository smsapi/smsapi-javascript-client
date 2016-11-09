var ActionAbstract = require('./action-abstract');

/**
 * get list of groups
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/list
 * @param {Object} options
 * @extends ActionAbstract
 * @constructor
 */
function ContactsGroupsList(options) {
    ActionAbstract.call(this, options);
}

ContactsGroupsList.prototype = Object.create(ActionAbstract.prototype);

ContactsGroupsList.prototype.defaultParams = {
    'with': 'contacts_count'
};

/**
 * get/set id
 * @param  {String} id
 * @return {ContactsGroupsList} or {String}
 */
ContactsGroupsList.prototype.id = function (id) {
    return this.param('id', id);
};

/**
 * get/set name
 * @param  {String} name
 * @return {ContactsGroupsList} or {String}
 */
ContactsGroupsList.prototype.name = function (name) {
    return this.param('name', name);
};

/**
 * execute action
 * @return {Promise}
 */
ContactsGroupsList.prototype.execute = function () {
    return this.request()
        .get('contacts/groups')
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsList;
