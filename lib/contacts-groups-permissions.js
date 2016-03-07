
var _                               = require('lodash'),
    ActionFactoryAbstract           = require('./action-factory-abstract.js'),
    ContactsGroupsPermissionsAdd    = require('./contacts-groups-permissions-add.js'),
    ContactsGroupsPermissionsGet    = require('./contacts-groups-permissions-get.js'),
    ContactsGroupsPermissionsUpdate = require('./contacts-groups-permissions-update.js'),
    ContactsGroupsPermissionsList   = require('./contacts-groups-permissions-list.js'),
    ContactsGroupsPermissionsDelete = require('./contacts-groups-permissions-delete.js');

/**
 * manage group permissions
 * @see http://dev.smsapi.pl/#!/contacts%2Fgroups/list_0
 * @param {Object} options
 */
function ContactsGroupsPermissions(options){
    ActionFactoryAbstract.call(this, options);
}

ContactsGroupsPermissions.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * add permissions for the user
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/edit_0
 * @param {String} groupId
 * @param {String} username
 * @return {ContactsGroupsPermissionsAdd}
 */
ContactsGroupsPermissions.prototype.add = function(groupId, username){
    return this.createAction(ContactsGroupsPermissionsAdd, groupId, username);
};

/**
 * update permissions
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/edit_0
 * @param {String} groupId
 * @param {String} username
 * @return {ContactsGroupsPermissionsUpdate}
 */
ContactsGroupsPermissions.prototype.update = function(groupId, username){
    return this.createAction(ContactsGroupsPermissionsUpdate, groupId, username);
};

/**
 * list group permissions
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/list_0
 * @param {String} groupId
 * @return {ContactsGroupsPermissionsList}
 */
ContactsGroupsPermissions.prototype.list = function(groupId){
    return this.createAction(ContactsGroupsPermissionsList, groupId);
};

/**
 * get group permissions for user
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/get_0
 * @param {String} groupId
 * @param {String} username
 * @return {ContactsGroupsPermissionsGet}
 */
ContactsGroupsPermissions.prototype.get = function(groupId, username){
    return this.createAction(ContactsGroupsPermissionsGet, groupId, username);
};

ContactsGroupsPermissions.prototype.delete = function(groupId, username){
    return this.createAction(ContactsGroupsPermissionsDelete, groupId, username);
};

module.exports = ContactsGroupsPermissions;
