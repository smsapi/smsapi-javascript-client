
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

/**
 * update contact
 * @see  http://dev.smsapi.pl/#!/contacts/edit
 * @param {Object} options
 * @param {String} id
 */
function ContactsUpdate(options, id){
    ActionAbstract.call(this, options);
    this._id = id || null;
}

ContactsUpdate.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set id
 * @param  {String} id
 * @return {ContactsUpdate} or {String}
 */
ContactsUpdate.prototype.id = function(id){
    if (_.isUndefined(id))
        return this._id;

    this._id = id;
    return this;
};

/**
 * get/set name
 * @param  {String} name
 * @return {ContactsUpdate} or {String}
 */
ContactsUpdate.prototype.name = function(name){
    return this.param('name', name);
};

/**
 * get/set description
 * @param  {String} description
 * @return {ContactsUpdate} or {String}
 */
ContactsUpdate.prototype.description = function(description){
    return this.param('description', description);
};

/**
 * get/set phoneNumber
 * @param  {String} phoneNumber
 * @return {ContactsUpdate} or {String}
 */
ContactsUpdate.prototype.phoneNumber = function(phoneNumber){
    return this.param('phone_number', phoneNumber);
};

/**
 * get/set email
 * @param  {String} email
 * @return {ContactsUpdate} or {String}
 */
ContactsUpdate.prototype.email = function(email){
    return this.param('email', email);
};

/**
 * get/set firstName
 * @param  {String} firstName
 * @return {ContactsUpdate} or {String}
 */
ContactsUpdate.prototype.firstName = function(firstName){
    return this.param('first_name', firstName);
};

/**
 * get/set lastName
 * @param  {String} lastName
 * @return {ContactsUpdate} or {String}
 */
ContactsUpdate.prototype.lastName = function(lastName){
    return this.param('last_name', lastName);
};

/**
 * get/set gender
 * @param  {String} gender
 * @return {ContactsUpdate} or {String}
 */
ContactsUpdate.prototype.gender = function(gender){
    return this.param('gender', gender);
};

ContactsUpdate.prototype.city = function(city){
    return this.param('city', city);
};

ContactsUpdate.prototype.country = function(country){
    return this.param('country', country);
};

/**
 * get/set birthday
 * @param  {String} birthday
 * @return {ContactsUpdate} or {String}
 */
ContactsUpdate.prototype.birthday = function(birthday){
    return this.param('birthday_date', birthday);
};

/**
 * execute action
 * @return {Promise}
 */
ContactsUpdate.prototype.execute = function(){
    return this.request()
        .put('contacts/' + String(this._id))
        .data(this.params())
        .execute();
};

module.exports = ContactsUpdate;
