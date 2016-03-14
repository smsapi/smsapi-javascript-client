var ActionAbstract = require('./action-abstract');

/**
 * @param {Object} options
 * @extends ActionAbstract
 * @constructor
 */
function PhonebookContactAdd(options) {
    ActionAbstract.call(this, options);
}

PhonebookContactAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [number]
 * @return {PhonebookContactAdd|String}
 */
PhonebookContactAdd.prototype.number = function (number) {
    return this.param('number', number);
};

/**
 * @param  {String} [firstName]
 * @return {PhonebookContactAdd|String}
 */
PhonebookContactAdd.prototype.firstName = function (firstName) {
    return this.param('first_name', firstName);
};

/**
 * @param  {String} [lastName]
 * @return {PhonebookContactAdd|String}
 */
PhonebookContactAdd.prototype.lastName = function (lastName) {
    return this.param('last_name', lastName);
};

/**
 * @param  {String} [info]
 * @return {PhonebookContactAdd|String}
 */
PhonebookContactAdd.prototype.info = function (info) {
    return this.param('info', info);
};

/**
 * @param  {String} [gender]
 * @return {PhonebookContactAdd|String}
 */
PhonebookContactAdd.prototype.gender = function (gender) {
    return this.param('gender', gender);
};

/**
 * @param  {String} [email]
 * @return {PhonebookContactAdd|String}
 */
PhonebookContactAdd.prototype.email = function (email) {
    return this.param('email', email);
};

/**
 * @param  {String} [birthday]
 * @return {PhonebookContactAdd|String}
 */
PhonebookContactAdd.prototype.birthday = function (birthday) {
    return this.param('birthday', birthday);
};

/**
 * @param  {String} [city]
 * @return {PhonebookContactAdd|String}
 */
PhonebookContactAdd.prototype.city = function (city) {
    return this.param('city', city);
};

/**
 * @param  {String[]} [groups]
 * @return {PhonebookContactAdd|String[]}
 */
PhonebookContactAdd.prototype.groups = function (groups) {
    return this.param('groups', groups);
};

/**
 * @return {Promise}
 */
PhonebookContactAdd.prototype.execute = function () {
    this.param('add_contact', this.param('number'));

    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = PhonebookContactAdd;
