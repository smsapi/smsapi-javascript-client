
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * delete group permissions for user
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/delete_0
 * @param {Object} options
 * @param {String} groupId
 * @param {String} username
 */
function ContactsGroupsPermissionsDelete(options, groupId, username){
    ActionAbstract.call(this, options);
    this._groupId = groupId;
    this._username = username;
}

ContactsGroupsPermissionsDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set groupId
 * @param  {String} groupId
 * @return {ContactsGroupsMembersDelete} or {String}
 */
ContactsGroupsPermissionsDelete.prototype.groupId = function(groupId){
    if (_.isUndefined(groupId))
        return this._groupId;

    this._groupId = groupId;
    return this;
};

/**
 * get/set username
 * @param  {String} username
 * @return {ContactsGroupsMembersDelete} or {String}
 */
ContactsGroupsPermissionsDelete.prototype.username = function(username){
    if (_.isUndefined(username))
        return this._username;

    this._username = username;
    return this;
};

/**
 * execute action
 * @return {Promise}
 */
ContactsGroupsPermissionsDelete.prototype.execute = function(){
    return this.request()
        .delete('contacts/groups/' + String(this._groupId) + '/permissions/' + String(this._username))
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsPermissionsDelete;
