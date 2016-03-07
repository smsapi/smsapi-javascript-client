
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

function PhonebookContactUpdate(options, oldNumber){
    ActionAbstract.call(this, options);
    this.oldNumber(oldNumber);
}

PhonebookContactUpdate.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [oldNumber]
 * @return {PhonebookContactUpdate} or oldNumber
 */
PhonebookContactUpdate.prototype.oldNumber = function(oldNumber){
    return this.param('edit_contact', oldNumber);
};

/**
 * @param  {String} [firstName]
 * @return {PhonebookContactUpdate} or firstName
 */
PhonebookContactUpdate.prototype.firstName = function(firstName){
    return this.param('first_name', firstName);
};

/**
 * @param  {String} [lastName]
 * @return {PhonebookContactUpdate} or lastName
 */
PhonebookContactUpdate.prototype.lastName = function(lastName){
    return this.param('last_name', lastName);
};

/**
 * @param  {String} [info]
 * @return {PhonebookContactUpdate} or info
 */
PhonebookContactUpdate.prototype.info = function(info){
    return this.param('info', info);
};

/**
 * @param  {String} [gender]
 * @return {PhonebookContactUpdate} or gender
 */
PhonebookContactUpdate.prototype.gender = function(gender){
    return this.param('gender', gender);
};

/**
 * @param  {String} [email]
 * @return {PhonebookContactUpdate} or email
 */
PhonebookContactUpdate.prototype.email = function(email){
    return this.param('email', email);
};

/**
 * @param  {String} [birthday]
 * @return {PhonebookContactUpdate} or birthday
 */
PhonebookContactUpdate.prototype.birthday = function(birthday){
    return this.param('birthday', birthday);
};

/**
 * @param  {String} [city]
 * @return {PhonebookContactUpdate} or city
 */
PhonebookContactUpdate.prototype.city = function(city){
    return this.param('city', city);
};

/**
 * @param  {String[]} [groups]
 * @return {PhonebookContactUpdate} or groups
 */
PhonebookContactUpdate.prototype.groups = function(groups){
    return this.param('groups', groups);
};

/**
 * @return {Promise}
 */
PhonebookContactUpdate.prototype.execute = function(){
    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = PhonebookContactUpdate;
