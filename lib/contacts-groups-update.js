
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * update group
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/edit
 * @param {Object} options
 * @param {String} groupId
 */
function ContactsGroupsUpdate(options, id){
    ActionAbstract.call(this, options);
    this._id = id || null;
}

ContactsGroupsUpdate.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set id
 * @param  {String} id
 * @return {ContactsGroupsUpdate} or {String}
 */
ContactsGroupsUpdate.prototype.id = function(id){
    if (_.isUndefined(id))
        return this._id;

    this._id = id;
    return this;
};

/**
 * get/set name
 * @param  {String} name
 * @return {ContactsGroupsUpdate} or {String}
 */
ContactsGroupsUpdate.prototype.name = function(name){
    return this.param('name', name);
};

/**
 * get/set description
 * @param  {String} description
 * @return {ContactsGroupsUpdate} or {String}
 */
ContactsGroupsUpdate.prototype.description = function(description){
    return this.param('description', description);
};

/**
 * get/set idx
 * @param  {String} idx
 * @return {ContactsGroupsUpdate} or {String}
 */
ContactsGroupsUpdate.prototype.idx = function(idx){
    return this.param('idx', idx);
};

/**
 * execute action
 * @return {Promise}
 */
ContactsGroupsUpdate.prototype.execute = function(){
    return this.request()
        .put('contacts/groups/' + String(this._id))
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsUpdate;
