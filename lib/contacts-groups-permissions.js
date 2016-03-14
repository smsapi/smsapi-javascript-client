var ActionFactoryAbstract = require('./action-factory-abstract');
var ContactsGroupsPermissionsAdd = require('./contacts-groups-permissions-add');
var ContactsGroupsPermissionsGet = require('./contacts-groups-permissions-get');
var ContactsGroupsPermissionsUpdate = require('./contacts-groups-permissions-update');
var ContactsGroupsPermissionsList = require('./contacts-groups-permissions-list');
var ContactsGroupsPermissionsDelete = require('./contacts-groups-permissions-delete');

/**
 * manage group permissions
 * @see http://dev.smsapi.pl/#!/contacts%2Fgroups/list_0
 * @param {Object} options
 * @extends ActionFactoryAbstract
 * @constructor
 */
function ContactsGroupsPermissions(options) {
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
ContactsGroupsPermissions.prototype.add = function (groupId, username) {
    return this.createAction(ContactsGroupsPermissionsAdd, groupId, username);
};

/**
 * update permissions
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/edit_0
 * @param {String} groupId
 * @param {String} username
 * @return {ContactsGroupsPermissionsUpdate}
 */
ContactsGroupsPermissions.prototype.update = function (groupId, username) {
    return this.createAction(ContactsGroupsPermissionsUpdate, groupId, username);
};

/**
 * list group permissions
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/list_0
 * @param {String} groupId
 * @return {ContactsGroupsPermissionsList}
 */
ContactsGroupsPermissions.prototype.list = function (groupId) {
    return this.createAction(ContactsGroupsPermissionsList, groupId);
};

/**
 * get group permissions for user
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/get_0
 * @param {String} groupId
 * @param {String} username
 * @return {ContactsGroupsPermissionsGet}
 */
ContactsGroupsPermissions.prototype.get = function (groupId, username) {
    return this.createAction(ContactsGroupsPermissionsGet, groupId, username);
};

ContactsGroupsPermissions.prototype.delete = function (groupId, username) {
    return this.createAction(ContactsGroupsPermissionsDelete, groupId, username);
};

module.exports = ContactsGroupsPermissions;
