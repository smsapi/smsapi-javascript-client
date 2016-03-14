var ActionAbstract = require('./action-abstract');

/**
 * get group
 * @param {Object} options
 * @param {String} name
 * @extends ActionAbstract
 * @constructor
 */
function PhonebookGroupGet(options, name) {
    ActionAbstract.call(this, options);
    this.name(name);
}

PhonebookGroupGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set name of the group
 * @param  {String} [name]
 * @return {PhonebookGroupGet|String}
 */
PhonebookGroupGet.prototype.name = function (name) {
    return this.param('get_group', name);
};

/**
 * execute action
 * @return {Promise}
 */
PhonebookGroupGet.prototype.execute = function () {
    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = PhonebookGroupGet;
