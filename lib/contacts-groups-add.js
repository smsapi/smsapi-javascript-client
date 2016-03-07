
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * add group
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/create
 * @param {Object} options
 */
function ContactsGroupsAdd(options){
    ActionAbstract.call(this, options);
}

ContactsGroupsAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set name
 * @param  {String} name
 * @return {ContactsGroupsAdd} or {String}
 */
ContactsGroupsAdd.prototype.name = function(name){
    return this.param('name', name);
};

/**
 * get/set description
 * @param  {String} description
 * @return {ContactsGroupsAdd} or {String}
 */
ContactsGroupsAdd.prototype.description = function(description){
    return this.param('description', description);
};

/**
 * get/set idx
 * @param  {String} idx
 * @return {ContactsGroupsAdd} or {String}
 */
ContactsGroupsAdd.prototype.idx = function(idx){
    return this.param('idx', idx);
};

/**
 * execute action
 * @return {Promise}
 */
ContactsGroupsAdd.prototype.execute = function(){
    return this.request()
        .post('contacts/groups')
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsAdd;
