
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

/**
 * add contact
 * @see  http://dev.smsapi.pl/#!/contacts/create
 * @param {Options} options
 */
function ContactsAdd(options){
    ActionAbstract.call(this, options);
}

ContactsAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set name
 * @param  {String} name
 * @return {ContactsAdd} or {String}
 */
ContactsAdd.prototype.name = function(name){
    return this.param('name', name);
};

/**
 * get/set description
 * @param  {String} description
 * @return {ContactsAdd} or {String}
 */
ContactsAdd.prototype.description = function(description){
    return this.param('description', description);
};

/**
 * get/set phoneNumber
 * @param  {String} phoneNumber
 * @return {ContactsAdd} or {String}
 */
ContactsAdd.prototype.phoneNumber = function(phoneNumber){
    return this.param('phone_number', phoneNumber);
};

/**
 * get/set email
 * @param  {String} email
 * @return {ContactsAdd} or {String}
 */
ContactsAdd.prototype.email = function(email){
    return this.param('email', email);
};

/**
 * get/set firstName
 * @param  {String} firstName
 * @return {ContactsAdd} or {String}
 */
ContactsAdd.prototype.firstName = function(firstName){
    return this.param('first_name', firstName);
};

/**
 * get/set lastName
 * @param  {String} lastName
 * @return {ContactsAdd} or {String}
 */
ContactsAdd.prototype.lastName = function(lastName){
    return this.param('last_name', lastName);
};

/**
 * get/set gender
 * @param  {String} gender
 * @return {ContactsAdd} or {String}
 */
ContactsAdd.prototype.gender = function(gender){
    return this.param('gender', gender);
};

/**
 * get/set city
 * @param  {String} city
 * @return {ContactsAdd} or {String}
 */
ContactsAdd.prototype.city = function(city){
    return this.param('city', city);
};

/**
 * get/set city
 * @param  {String} country
 * @return {ContactsAdd} or {String}
 */
ContactsAdd.prototype.country = function(country){
    return this.param('country', country);
};

/**
 * get/set birthdat
 * @param  {String} birthdat
 * @return {ContactsAdd} or {String}
 */
ContactsAdd.prototype.birthday = function(birthday){
    return this.param('birthday_date', birthday);
};

/**
 * execute action
 * @return {Promise}
 */
ContactsAdd.prototype.execute = function(){
    return this.request()
        .post('contacts')
        .data(this.params())
        .execute();
};

module.exports = ContactsAdd;
