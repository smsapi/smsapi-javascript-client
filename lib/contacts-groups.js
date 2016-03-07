
var _                         = require('lodash'),
    ActionFactoryAbstract     = require('./action-factory-abstract.js'),
    ContactsGroupsList        = require('./contacts-groups-list.js'),
    ContactsGroupsAdd         = require('./contacts-groups-add.js'),
    ContactsGroupsGet         = require('./contacts-groups-get.js'),
    ContactsGroupsUpdate      = require('./contacts-groups-update.js'),
    ContactsGroupsDelete      = require('./contacts-groups-delete.js'),

    // factory
    ContactsGroupsPermissions = require('./contacts-groups-permissions.js'),
    ContactsGroupsMembers     = require('./contacts-groups-members.js'),
    ContactsGroupsAssignments = require('./contacts-groups-assignments.js');

function ContactsGroups(options){
    ActionFactoryAbstract.call(this, options);

    this.permissions = new ContactsGroupsPermissions(options);
    this.members     = new ContactsGroupsMembers(options);
    this.assignments = new ContactsGroupsAssignments(options);
}

ContactsGroups.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * get list of groups
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/list
 * @param {Object} options
 */
ContactsGroups.prototype.list = function(){
    return this.createAction(ContactsGroupsList);
};

/**
 * add group
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/create
 * @return {ContactsGroupsAdd}
 */
ContactsGroups.prototype.add = function(){
    return this.createAction(ContactsGroupsAdd);
};

/**
 * get group
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/get
 * @param {String} groupId
 * @return {ContactsGroupsGet}
 */
ContactsGroups.prototype.get = function(groupId){
    return this.createAction(ContactsGroupsGet, groupId);
};

/**
 * update group
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/edit
 * @param {String} groupId
 * @return {ContactsGroupsUpdate}
 */
ContactsGroups.prototype.update = function(groupId){
    return this.createAction(ContactsGroupsUpdate, groupId);
};

/**
 * delete group
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/delete
 * @param {String} groupId
 * @return {ContactsGroupsDelete}
 */
ContactsGroups.prototype.delete = function(groupId){
    return this.createAction(ContactsGroupsDelete, groupId);
};

module.exports = ContactsGroups;
