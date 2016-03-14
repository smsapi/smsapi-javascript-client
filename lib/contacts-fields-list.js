var ActionAbstract = require('./action-abstract');

/**
 * get list of fields
 * @see http://dev.smsapi.pl/#!/contacts%2Ffields/list
 * @param {Object} options
 * @extends ActionAbstract
 * @constructor
 */
function ContactsFieldsList(options) {
    ActionAbstract.call(this, options);
}

ContactsFieldsList.prototype = Object.create(ActionAbstract.prototype);

/**
 * execute
 * @return {Promise}
 */
ContactsFieldsList.prototype.execute = function () {
    return this.request()
        .get('contacts/fields')
        .data(this.params())
        .execute();
};

module.exports = ContactsFieldsList;
