var ActionAbstract = require('./action-abstract');

/**
 *
 * @param options
 * @param number
 * @extends ActionAbstract
 * @constructor
 */
function PhonebookContactDelete(options, number) {
    ActionAbstract.call(this, options);
    this.number(number);
}

PhonebookContactDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [number]
 * @return {PhonebookContactDelete} or number
 */
PhonebookContactDelete.prototype.number = function (number) {
    return this.param('delete_contact', number);
};

/**
 * @return {Promise}
 */
PhonebookContactDelete.prototype.execute = function () {
    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = PhonebookContactDelete;
