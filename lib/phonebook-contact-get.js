var ActionAbstract = require('./action-abstract');

/**
 *
 * @param options
 * @param {String} number
 * @extends ActionAbstract
 * @constructor
 */
function PhonebookContactGet(options, number) {
    ActionAbstract.call(this, options);
    this.number(number);
}

PhonebookContactGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [number]
 * @return {PhonebookContactGet|String}
 */
PhonebookContactGet.prototype.number = function (number) {
    return this.param('get_contact', number);
};

/**
 * @return {Promise}
 */
PhonebookContactGet.prototype.execute = function () {
    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = PhonebookContactGet;
