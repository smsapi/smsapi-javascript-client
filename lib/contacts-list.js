
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * get list of contacts
 * @see  http://dev.smsapi.pl/#!/contacts/list
 * @param {Object} options
 */
function ContactsList(options){
    ActionAbstract.call(this, options);
}

ContactsList.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set q
 * @param  {String} q
 * @return {ContactsList} or {String}
 */
ContactsList.prototype.q = function(q){
    return this.param('q', q);
};

/**
 * get/set offset
 * @param  {Integer} offset
 * @return {ContactsList} or {Integer}
 */
ContactsList.prototype.offset = function(offset){
    return this.param('offset', offset);
};

/**
 * get/set limit
 * @param  {Integer} limit
 * @return {ContactsList} or {Integer}
 */
ContactsList.prototype.limit = function(limit){
    return this.param('limit', limit);
};

/**
 * get/set orderBy
 * @param  {String} orderBy
 * @return {ContactsList} or {String}
 */
ContactsList.prototype.orderBy = function(orderBy){
    return this.param('order_by', orderBy);
};

/**
 * get/set phoneNumber
 * @param  {String} phoneNumber
 * @return {ContactsList} or {String}
 */
ContactsList.prototype.phoneNumber = function(phoneNumber){
    return this.param('phone_number', phoneNumber);
};

/**
 * get/set email
 * @param  {String} email
 * @return {ContactsList} or {String}
 */
ContactsList.prototype.email = function(email){
    return this.param('email', email);
};

/**
 * get/set firstName
 * @param  {String} firstName
 * @return {ContactsList} or {String}
 */
ContactsList.prototype.firstName = function(firstName){
    return this.param('first_name', firstName);
};

/**
 * get/set lastName
 * @param  {String} lastName
 * @return {ContactsList} or {String}
 */
ContactsList.prototype.lastName = function(lastName){
    return this.param('last_name', lastName);
};

/**
 * get/set gender
 * @param  {String} gender
 * @return {ContactsList} or {String}
 */
ContactsList.prototype.gender = function(gender){
    return this.param('gender', gender);
};

/**
 * get/set birthday
 * @param  {String} birthday
 * @return {ContactsList} or {String}
 */
ContactsList.prototype.birthday = function(birthday){
    return this.param('birthday_date', birthday);
};

/**
 * execute action
 * @return {Promise}
 */
ContactsList.prototype.execute = function(){
    return this.request()
        .get('contacts')
        .data(this.params())
        .execute();
};

module.exports = ContactsList;
